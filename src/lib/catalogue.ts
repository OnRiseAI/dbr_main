import type { Product } from '@/types/product'
import { db as storefront } from '@/fake-db/products'
import { SITE_ID, createPublicClient, hasSupabase } from '@/lib/supabase/public'

/**
 * The catalogue the storefront sells from.
 *
 * The database (shared with the admin) is the source of truth for whether a product
 * exists, is active, its stock and its list price. The storefront JSON still carries
 * the display metadata the pages need (renders, specs, copy, families) until those
 * columns exist in the database; it is matched to a database row by slug.
 *
 * Sale prices: the JSON carries the shop's sale price where one is set. The list price
 * always comes from the database, so a price edited in the admin shows here.
 */

/** Storefront slug -> database slug where the two differ. */
const DB_SLUG_ALIASES: Record<string, string> = {
  'ghk-cu-pen-100mg': 'ghk-cu-pen-10mg',
  'mots-c-pen-20mg': 'mots-c-pen-10mg'
}

type ProductRow = {
  id: string
  slug: string
  name: string
  price_cents: number
  currency: string
  stock: number | null
  active: boolean
}

const TTL_MS = 60_000

let cache: { at: number; products: Product[] } | null = null

async function fetchRows(): Promise<Map<string, ProductRow> | null> {
  if (!hasSupabase) return null

  try {
    const { data, error } = await createPublicClient()
      .from('products')
      .select('id, slug, name, price_cents, currency, stock, active')
      .eq('site_id', SITE_ID)

    if (error) {
      console.warn('[catalogue] products fetch failed:', error.message)

      return null
    }

    return new Map((data as ProductRow[]).map(row => [row.slug, row]))
  } catch (error) {
    console.warn('[catalogue] products fetch threw:', error)

    return null
  }
}

function merge(item: Product, row: ProductRow | undefined): Product {
  if (!row) {
    // Not in the database: keep it visible but not purchasable.
    return { ...item, available: false, stock: 0 }
  }

  const listPrice = row.price_cents / 100
  const onSale = item.discount > 0 && item.price < listPrice
  const price = onSale ? item.price : listPrice
  const discount = onSale ? Math.round((1 - price / listPrice) * 100) : 0
  const available = row.active && (row.stock === null || row.stock > 0)

  return {
    ...item,
    dbId: row.id,
    price,
    originalPrice: listPrice,
    discount,
    showDiscountBadge: discount > 0,
    stock: row.stock,
    available
  }
}

/** Every storefront product, priced and gated by the database. Cached for a minute per server. */
export async function loadCatalogue(): Promise<Product[]> {
  if (cache && Date.now() - cache.at < TTL_MS) return cache.products

  const rows = await fetchRows()

  const products = rows
    ? storefront.map(item => merge(item, rows.get(DB_SLUG_ALIASES[item.id] ?? item.id)))
    : storefront.map(item => ({ ...item, available: true }))

  cache = { at: Date.now(), products }

  return products
}

/** Drop the in-memory copy so the next read hits the database (after an admin edit, for example). */
export function invalidateCatalogue() {
  cache = null
}
