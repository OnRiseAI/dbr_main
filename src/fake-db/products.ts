import type { Product } from '@/types/product'
import raw from './dts-products.json'
import meta from './dts-meta.json'

export const db = raw as Product[]
export const dealIds = meta.dealIds
export const newArrivalIds = meta.newArrivalIds
export const defaultWishlistIds = meta.defaultWishlistIds
export const defaultCartIds = meta.defaultCartIds
export const sampleProductId = meta.sampleProductId
