// Type Imports
import type { Product } from '@/types/product'

// Utils Imports
import { selectProductsByIds } from '@/utils/product-utils'

// Data Imports
import { dealIds, newArrivalIds, defaultWishlistIds } from '@/fake-db/products'
import { loadCatalogue } from '@/lib/catalogue'
import { db as categories } from '@/fake-db/categories'
import { db as brands } from '@/fake-db/brands'
import { db as announcements } from '@/fake-db/announcement'
import { db as pages } from '@/fake-db/pages'
import { db as orderDetailGroups } from '@/fake-db/order-details'
import { db as orders } from '@/fake-db/orders'

/**
 * Data-access layer (the single DB seam).
 *
 * Every read of the fake-db happens here. To move to a real database, swap the
 * `@/fake-db/*` imports for your DB client and keep these signatures - no component
 * or page needs to change. All functions are async so they are already
 * drop-in compatible with awaited DB queries.
 */

// ---------- Products ----------

/**
 * Products come from the database (price, stock, active) merged with the storefront's
 * display metadata. See lib/catalogue.ts. Grids list every SKU, each strength its own card.
 */
export const getProducts = async () => {
  const products = await loadCatalogue()

  return products.filter(product => !product.hiddenVariant)
}

/** Every SKU in the same variant family, in display order. */
export const getProductVariants = async (product: Product) => {
  if (!product.family) return [product]

  const products = await loadCatalogue()

  return products
    .filter(item => item.family === product.family)
    .sort((a, b) => (a.variantOrder ?? 0) - (b.variantOrder ?? 0))
}

export const getProductById = async (id: string) => {
  const products = await loadCatalogue()

  return products.find(product => product.id === id) ?? null
}

/** Catalog ids - used by the dynamic product route's generateStaticParams. */
export const getProductIds = async () => {
  const products = await loadCatalogue()

  return products.map(product => product.id)
}

export const getProductsByIds = async (ids: string[]): Promise<Product[]> => {
  return selectProductsByIds(await loadCatalogue(), ids)
}

export const getDeals = async () => {
  return selectProductsByIds(await loadCatalogue(), dealIds)
}

export const getNewArrivals = async () => {
  return selectProductsByIds(await loadCatalogue(), newArrivalIds)
}

export const getProductsByCategory = async (category: string) => {
  const products = await getProducts()

  return products.filter(
    product => product.category === category || Boolean(product.collections?.includes(category))
  )
}

export const getDefaultWishlistIds = async () => {
  return defaultWishlistIds
}

// ---------- Storefront ----------

export const getCategories = async () => {
  return categories
}

export const getBrands = async () => {
  return brands
}

export const getHomeData = async () => {
  const products = await loadCatalogue()
  const listed = products.filter(product => !product.hiddenVariant)

  return {
    categories,
    brands,
    dealsOfTheDay: selectProductsByIds(products, dealIds),
    newArrivals: selectProductsByIds(products, newArrivalIds),
    popularProducts: listed.filter(p => p.isPopular),
    pens: listed.filter(p => p.collections?.includes('Pens')),
    vials: listed.filter(p => p.collections?.includes('Vials'))
  }
}

export const getAnnouncements = async () => {
  return announcements
}

export const getPages = async () => {
  return pages
}

export const getPageByHandle = async (handle: string) => {
  return pages.find(page => page.handle === handle) ?? null
}

// ---------- Client area (demo data until the account database is wired) ----------

export const getOrders = async () => {
  return orders
}

export const getOrderDetails = async () => {
  return orderDetailGroups
}
