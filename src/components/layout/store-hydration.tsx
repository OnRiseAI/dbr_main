'use client'

// React Imports
import { useLayoutEffect } from 'react'

// Type Imports
import type { Product } from '@/types/product'

// Store Imports
import { useProductsStore } from '@/store/use-products-store'

type Props = {

  /** The database-backed catalogue from the server, so cart and wishlist price off the same rows. */
  products?: Product[]
}

/**
 * Seeds the products store with the server catalogue, then rehydrates the persisted
 * wishlist + cart before paint. useLayoutEffect so children read a settled store.
 */
const StoreHydration = ({ products }: Props) => {
  useLayoutEffect(() => {
    if (products) useProductsStore.getState().initialize({ products })
    useProductsStore.persist.rehydrate()
    useProductsStore.setState({ isHydrated: true })
  }, [products])

  return null
}

export default StoreHydration
