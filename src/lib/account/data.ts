import 'server-only'

import { redirect } from 'next/navigation'

import { createServerSupabase, getSessionUser } from '@/lib/supabase/server'
import { DB_SLUG_ALIASES, loadCatalogue } from '@/lib/catalogue'

/** Signed-in customer or a redirect to the login page. */
export async function requireUser() {
  const user = await getSessionUser()

  if (!user) redirect('/login?next=/account')

  return user
}

export type Profile = {
  id: string
  email: string
  firstName: string
  lastName: string
  phone: string
  name: string
  initials: string
}

export async function getProfile(): Promise<Profile | null> {
  const user = await getSessionUser()

  if (!user) return null

  const supabase = await createServerSupabase()
  const { data } = await supabase.from('profiles').select('id, email, first_name, last_name, phone').eq('id', user.id).maybeSingle()

  const row = (data ?? { id: user.id, email: user.email ?? '', first_name: null, last_name: null, phone: null }) as {
    id: string
    email: string
    first_name: string | null
    last_name: string | null
    phone: string | null
  }

  const firstName = row.first_name ?? ''
  const lastName = row.last_name ?? ''
  const name = `${firstName} ${lastName}`.trim() || row.email
  const initials = (firstName && lastName ? `${firstName[0]}${lastName[0]}` : row.email.slice(0, 2)).toUpperCase()

  return { id: row.id, email: row.email, firstName, lastName, phone: row.phone ?? '', name, initials }
}

/* ---------- Orders ---------- */

export type AccountStatus = 'awaiting_payment' | 'paid' | 'shipped' | 'delivered' | 'cancelled' | 'refunded' | 'expired' | 'draft'

export const STATUS_LABEL: Record<AccountStatus, string> = {
  awaiting_payment: 'Awaiting payment',
  paid: 'Paid, being prepared',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
  refunded: 'Refunded',
  expired: 'Expired',
  draft: 'Draft'
}

export type AccountOrderItem = {
  name: string
  qty: number
  unitPriceCents: number
  lineCents: number
  image: string | null
  href: string | null
}

export type AccountOrder = {
  id: string
  reference: string
  status: AccountStatus
  statusLabel: string
  createdAt: string
  paidAt: string | null
  shippedAt: string | null
  currency: string
  subtotalCents: number
  shippingCents: number
  discountCents: number
  totalCents: number
  promoCode: string | null
  paymentMethod: string
  paymentLinkUrl: string | null
  trackingNumber: string | null
  trackingUrl: string | null
  items: AccountOrderItem[]
  itemsSummary: string
  image: string | null
}

type OrderRow = {
  id: string
  status: string
  created_at: string
  paid_at: string | null
  shipped_at: string | null
  currency: string
  subtotal_cents: number
  shipping_cents: number
  discount_cents: number
  total_cents: number
  promo_code: string | null
  payment_method: string | null
  payment_link_url: string | null
  tracking_number: string | null
  tracking_url: string | null
  admin_notes: string | null
  order_items: { name_snapshot: string; qty: number; unit_price_cents: number; products: { slug: string } | null }[]
}

const ORDER_SELECT =
  'id, status, created_at, paid_at, shipped_at, currency, subtotal_cents, shipping_cents, discount_cents, total_cents, promo_code, payment_method, payment_link_url, tracking_number, tracking_url, admin_notes, order_items(name_snapshot, qty, unit_price_cents, products(slug))'

export const orderReference = (id: string) => `DBR-${id.slice(0, 8).toUpperCase()}`

function accountStatus(status: string, notes: string | null): AccountStatus {
  if (status === 'delivered' || (notes ?? '').includes('[Delivered ')) return 'delivered'
  if (['payment_link_sent', 'awaiting_bank_transfer', 'awaiting_crypto'].includes(status)) return 'awaiting_payment'
  if (['paid', 'shipped', 'cancelled', 'refunded', 'expired', 'draft'].includes(status)) return status as AccountStatus

  return 'awaiting_payment'
}

const PAYMENT_LABEL: Record<string, string> = {
  card: 'Card',
  bank_transfer: 'Bank transfer',
  crypto: 'Crypto',
  stripe: 'Card'
}

/** Tracking link when the order carries none of its own (Deutsche Post covers all our numbers). */
export function trackingLink(number: string | null, saved: string | null) {
  if (saved) return saved
  if (!number) return null

  return `https://www.deutschepost.de/de/s/sendungsverfolgung.html?piececode=${encodeURIComponent(number.trim())}&lang=de`
}

async function toOrder(row: OrderRow, images: Map<string, { image: string; href: string }>): Promise<AccountOrder> {
  const items = row.order_items.map(i => {
    const dbSlug = i.products?.slug
    const meta = dbSlug ? images.get(dbSlug) : undefined

    return {
      name: i.name_snapshot,
      qty: i.qty,
      unitPriceCents: i.unit_price_cents,
      lineCents: i.unit_price_cents * i.qty,
      image: meta?.image ?? null,
      href: meta?.href ?? null
    }
  })

  const status = accountStatus(row.status, row.admin_notes)

  return {
    id: row.id,
    reference: orderReference(row.id),
    status,
    statusLabel: STATUS_LABEL[status],
    createdAt: row.created_at,
    paidAt: row.paid_at,
    shippedAt: row.shipped_at,
    currency: row.currency || 'EUR',
    subtotalCents: row.subtotal_cents,
    shippingCents: row.shipping_cents,
    discountCents: row.discount_cents,
    totalCents: row.total_cents,
    promoCode: row.promo_code,
    paymentMethod: PAYMENT_LABEL[row.payment_method ?? ''] ?? (row.payment_method ?? 'Not chosen'),
    paymentLinkUrl: status === 'awaiting_payment' ? row.payment_link_url : null,
    trackingNumber: row.tracking_number,
    trackingUrl: trackingLink(row.tracking_number, row.tracking_url),
    items,
    itemsSummary: items.map(i => (i.qty > 1 ? `${i.qty} × ${i.name}` : i.name)).join(', '),
    image: items.find(i => i.image)?.image ?? null
  }
}

async function productImages() {
  const catalogue = await loadCatalogue().catch(() => [])
  const map = new Map<string, { image: string; href: string }>()

  // Catalogue ids are the storefront slugs; the database may use an older slug for a few (DB_SLUG_ALIASES).
  catalogue.forEach(p => {
    const image = p.images?.[0] ?? p.image

    if (!p.id || !image) return

    map.set(p.id, { image, href: `/product/${p.id}` })
    map.set(DB_SLUG_ALIASES[p.id] ?? p.id, { image, href: `/product/${p.id}` })
  })

  return map
}

export async function listOrders(): Promise<AccountOrder[]> {
  const user = await requireUser()
  const supabase = await createServerSupabase()

  const [{ data }, images] = await Promise.all([
    supabase.from('orders').select(ORDER_SELECT).eq('user_id', user.id).order('created_at', { ascending: false }).limit(100),
    productImages()
  ])

  return Promise.all(((data ?? []) as unknown as OrderRow[]).map(row => toOrder(row, images)))
}

export async function getOrder(id: string): Promise<AccountOrder | null> {
  const user = await requireUser()
  const supabase = await createServerSupabase()

  const [{ data }, images] = await Promise.all([
    supabase.from('orders').select(ORDER_SELECT).eq('user_id', user.id).eq('id', id).maybeSingle(),
    productImages()
  ])

  return data ? toOrder(data as unknown as OrderRow, images) : null
}

/* ---------- Addresses ---------- */

export type AccountAddress = {
  id: string
  firstName: string
  lastName: string
  company: string
  address1: string
  address2: string
  city: string
  province: string
  postalCode: string
  country: string
  phone: string
  isDefaultShipping: boolean
  isDefaultBilling: boolean
}

type AddressRow = {
  id: string
  first_name: string
  last_name: string
  company: string | null
  address1: string
  address2: string | null
  city: string
  province: string | null
  postal_code: string
  country: string
  phone: string | null
  is_default_shipping: boolean
  is_default_billing: boolean
}

export async function listAddresses(): Promise<AccountAddress[]> {
  const user = await requireUser()
  const supabase = await createServerSupabase()
  const { data } = await supabase.from('addresses').select('*').eq('user_id', user.id).order('created_at', { ascending: true })

  return ((data ?? []) as AddressRow[]).map(a => ({
    id: a.id,
    firstName: a.first_name,
    lastName: a.last_name,
    company: a.company ?? '',
    address1: a.address1,
    address2: a.address2 ?? '',
    city: a.city,
    province: a.province ?? '',
    postalCode: a.postal_code,
    country: a.country,
    phone: a.phone ?? '',
    isDefaultShipping: a.is_default_shipping,
    isDefaultBilling: a.is_default_billing
  }))
}
