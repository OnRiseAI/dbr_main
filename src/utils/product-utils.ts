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

/** Product-line name without the strength: "Retatrutide pen | 15 mg" -> "Retatrutide pen". */
export function familyTitle(product: Product): string {
  return product.familyName ?? product.name.split(' | ')[0]
}

/** Format only, no volumes or strengths. Used where the product page carries the detail. */
export function formatMeta(product: Product): string {
  if (!product.specs) return product.brand

  return product.specs.form === 'pen' ? 'Pre-filled pen' : 'Lyophilised vial'
}

export type ProductLine = {

  /** The cheapest member, whose price and href the card shows. */
  product: Product
  title: string

  /** Number of strengths in the line. */
  count: number
}

/**
 * One entry per product line (variant family), in first-seen order. Singletons pass
 * through. The card shows the cheapest member so a From price is honest.
 */
export function collapseFamilies(products: Product[]): ProductLine[] {
  const lines = new Map<string, Product[]>()

  products.forEach(product => {
    const key = product.family ?? product.id
    const members = lines.get(key) ?? []

    members.push(product)
    lines.set(key, members)
  })

  return [...lines.values()].map(members => {
    const cheapest = [...members].sort((a, b) => a.price - b.price)[0]

    return { product: cheapest, title: familyTitle(cheapest), count: members.length }
  })
}
