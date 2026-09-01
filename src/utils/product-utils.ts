import type { Product } from '@/types/product'

/** Resolve an ordered list of ids to products, preserving order and dropping misses. */
export function selectProductsByIds(products: Product[], ids: string[]): Product[] {
  return ids
    .map(id => products.find(product => product.id === id))
    .filter((product): product is Product => Boolean(product))
}

/** Format a numeric price for display (e.g. 249 → "$249.00"). */
export function formatPrice(value: number): string {
  return `$${value.toFixed(2)}`
}
