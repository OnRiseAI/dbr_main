// Type Imports
import type { Product } from '@/types/product'

// Utils Imports
import { selectProductsByIds } from '@/utils/product-utils'

// Data Imports
import { db as products, dealIds, newArrivalIds, defaultWishlistIds, sampleProductId } from '@/fake-db/products'
import { db as categories } from '@/fake-db/categories'
import { db as brands } from '@/fake-db/brands'
import { db as orders } from '@/fake-db/orders'
import { db as orderDetailGroups } from '@/fake-db/order-details'
import { db as announcements } from '@/fake-db/announcement'
import { db as heroLayoutProducts } from '@/fake-db/hero-layout'
import { db as helpTopics } from '@/fake-db/help-topics'
import { db as helpFaqs } from '@/fake-db/help-faq'
import { db as faqCategories } from '@/fake-db/faq-categories'

/**
 * Data-access layer (the single DB seam).
 *
 * Every read of the fake-db happens here. To move to a real database, swap the
 * `@/fake-db/*` imports for your DB client and keep these signatures - no component
 * or page needs to change. All functions are async so they are already
 * drop-in compatible with awaited DB queries.
 */

// ---------- Products ----------

export const getProducts = async () => {
  return products
}

export const getProductById = async (id: string) => {
  return products.find(product => product.id === id) ?? null
}

/** Default product for the "Product Details" nav link and the bare /write-review page. */
export const getSampleProduct = async () => {
  return products.find(product => product.id === sampleProductId) ?? products[0]
}

/** Catalog ids - used by the dynamic product route's generateStaticParams. */
export const getProductIds = async () => {
  return products.map(product => product.id)
}

export const getProductsByIds = async (ids: string[]): Promise<Product[]> => {
  return selectProductsByIds(products, ids)
}

export const getDeals = async () => {
  return selectProductsByIds(products, dealIds)
}

export const getNewArrivals = async () => {
  return selectProductsByIds(products, newArrivalIds)
}

export const getProductsByCategory = async (category: string) => {
  return products.filter(product => product.category === category)
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
  return {
    categories,
    brands,
    dealsOfTheDay: selectProductsByIds(products, dealIds),
    newArrivals: selectProductsByIds(products, newArrivalIds),
    popularProducts: products.filter(p => p.isPopular)
  }
}

export const getAnnouncements = async () => {
  return announcements
}

export const getHeroLayoutProducts = async () => {
  return heroLayoutProducts
}

// ---------- Orders ----------

export const getOrders = async () => {
  return orders
}

export const getOrderDetails = async () => {
  return orderDetailGroups
}

// ---------- Help ----------

export const getHelpTopics = async () => {
  return helpTopics
}

export const getHelpFaqs = async () => {
  return helpFaqs
}

// ---------- FAQ ----------

export const getFaqCategories = async () => {
  return faqCategories
}
