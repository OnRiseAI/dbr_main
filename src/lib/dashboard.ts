/**
 * Links into the Deep Beauty Research dashboard app, which owns checkout,
 * payment and order fulfilment. Product ids here are the dashboard's slugs.
 */
const DASHBOARD_URL = (process.env.NEXT_PUBLIC_DASHBOARD_URL ?? '').replace(/\/$/, '')
const SITE_ID = process.env.NEXT_PUBLIC_SITE_ID?.trim() || 'deep-beauty-research'

export const hasDashboard = DASHBOARD_URL.length > 0

/** Checkout for one SKU. The dashboard takes one product per checkout. */
export function checkoutUrl(slug: string, qty = 1) {
  if (!hasDashboard) return '#'

  const params = new URLSearchParams({ product: slug, qty: String(Math.max(1, qty)), site: SITE_ID })

  return `${DASHBOARD_URL}/checkout?${params.toString()}`
}
