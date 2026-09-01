'use client'

// React Imports
import { useLayoutEffect } from 'react'

// Store Imports
import { useProductsStore } from '@/store/use-products-store'

/**
 * Rehydrates the persisted products store (wishlist + cart) before paint.
 * Uses useLayoutEffect instead of useEffect to ensure hydration completes
 * before any child components render and read from the store.
 */
const StoreHydration = () => {
  useLayoutEffect(() => {
    useProductsStore.persist.rehydrate()
    useProductsStore.setState({ isHydrated: true })
  }, [])

  return null
}

export default StoreHydration
