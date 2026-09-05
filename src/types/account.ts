export type Profile = {
  id: string
  email: string
  first_name: string | null
  last_name: string | null
  phone: string | null
  locale: string
}

export type Address = {
  id: string
  user_id: string
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

export type OrderItem = {
  id: string
  product_id: string
  name_snapshot: string
  qty: number
  unit_price_cents: number
}

export type Order = {
  id: string
  status: string
  created_at: string
  paid_at: string | null
  subtotal_cents: number
  shipping_cents: number
  discount_cents: number
  total_cents: number
  currency: string
  promo_code: string | null
  tracking_number: string | null
  tracking_url: string | null
  payment_link_url: string | null
  order_items: OrderItem[]
}

/** Human labels for the dashboard's order_status enum. Unknown values fall back to a tidied string. */
export const ORDER_STATUS_LABEL: Record<string, string> = {
  draft: 'Draft',
  pending_payment: 'Awaiting payment',
  awaiting_bank_transfer: 'Awaiting bank transfer',
  awaiting_crypto: 'Awaiting payment',
  paid: 'Paid',
  processing: 'Being prepared',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
  refunded: 'Refunded'
}

export function orderStatusLabel(status: string) {
  return ORDER_STATUS_LABEL[status] ?? status.replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase())
}

export function formatMoney(cents: number, currency = 'EUR') {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency }).format(cents / 100)
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(value))
}
