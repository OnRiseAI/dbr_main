import type { Product } from '@/types/product'

/** Resolve an ordered list of ids to products, preserving order and dropping misses. */
export function selectProductsByIds(products: Product[], ids: string[]): Product[] {
  return ids
    .map(id => products.find(product => product.id === id))
    .filter((product): product is Product => Boolean(product))
}

/** Format a numeric price for display (e.g. 249 → "$249.00"). */
export function formatPrice(value: number): string {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value)
}

/**
 * Card meta line. Single-brand shop, so the brand adds nothing; show the facts
 * a buyer compares instead. Pens: format, fill volume, concentration. Vials: format, purity.
 */
export function productMeta(product: Product): string {
  const specs = product.specs

  if (!specs) return product.brand

  if (specs.form === 'pen') {
    const parts = ['Pre-filled pen']

    if (specs.fillMl) {
      const mgPerMl = specs.strengthMg / specs.fillMl
      const concentration = Number.isInteger(mgPerMl) ? `${mgPerMl}` : mgPerMl.toFixed(1)

      parts.push(`${specs.fillMl} ml`, `${concentration} mg/ml`)
    }

    return parts.join(' · ')
  }

  return 'Lyophilised vial · ≥99% HPLC'
}
