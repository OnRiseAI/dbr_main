'use client'

// React Imports
import { useMemo } from 'react'

// Third-party Imports
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { useShallow } from 'zustand/react/shallow'

// Type Imports
import type { Product } from '@/types/product'

// Utils Imports
import { selectProductsByIds } from '@/utils/product-utils'

// Data Imports
import { db, defaultWishlistIds, defaultCartIds } from '@/fake-db/products'

/**
 * ! If you're using a database, hydrate from the server action instead of the fake-db
 * ! import below - call `initialize({ products })` from an RSC boundary:
 * ! import { getProducts } from '@/app/server/actions'
 *
 * The store is the single runtime source of truth for product-related client state
 * (catalog + wishlist + cart), so an update made anywhere is reflected everywhere and
 * survives client-side navigation. It is seeded from the catalog `db`.
 *
 * Wishlist + cart are persisted to localStorage so they survive a full reload (the
 * catalog is never persisted - `partialize` below). `skipHydration` keeps the server
 * and first client render on the seeded state to avoid a hydration mismatch; the
 * `StoreHydration` boundary calls `useProductsStore.persist.rehydrate()` after mount.
 */

export type CartItem = {
  productId: string
  quantity: number
}

type ProductsData = {
  products: Product[]
  wishlistIds: string[]
  cart: CartItem[]
  isHydrated: boolean
}

type ProductsActions = {
  initialize: (options?: { products?: Product[] }) => void
  toggleWishlist: (id: string) => void
  addToWishlist: (id: string) => void
  removeFromWishlist: (id: string) => void
  addToCart: (id: string, quantity?: number) => void
  removeFromCart: (id: string) => void
  setCartQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  setHydrated: (hydrated: boolean) => void
}

export type ProductsStore = ProductsData & ProductsActions

export const useProductsStore = create<ProductsStore>()(
  persist(
    (set, get) => ({
      // Initial state (seeded from the fake-db catalog)
      products: db,
      wishlistIds: defaultWishlistIds,
      cart: defaultCartIds.map(productId => ({ productId, quantity: 1 })),
      isHydrated: false,

      initialize: ({ products } = {}) => {
        if (products && products !== get().products) {
          set({ products })
        }
      },

      // Wishlist
      toggleWishlist: id =>
        set(state => ({
          wishlistIds: state.wishlistIds.includes(id)
            ? state.wishlistIds.filter(currentId => currentId !== id)
            : [...state.wishlistIds, id]
        })),

      addToWishlist: id =>
        set(state => (state.wishlistIds.includes(id) ? state : { wishlistIds: [...state.wishlistIds, id] })),

      removeFromWishlist: id =>
        set(state => ({ wishlistIds: state.wishlistIds.filter(currentId => currentId !== id) })),

      // Cart
      addToCart: (id, quantity = 1) =>
        set(state => {
          const existing = state.cart.find(item => item.productId === id)

          if (existing) {
            return {
              cart: state.cart.map(item =>
                item.productId === id ? { ...item, quantity: item.quantity + quantity } : item
              )
            }
          }

          return { cart: [...state.cart, { productId: id, quantity }] }
        }),

      removeFromCart: id => set(state => ({ cart: state.cart.filter(item => item.productId !== id) })),

      setCartQuantity: (id, quantity) =>
        set(state => ({
          cart:
            quantity <= 0
              ? state.cart.filter(item => item.productId !== id)
              : state.cart.map(item => (item.productId === id ? { ...item, quantity } : item))
        })),

      clearCart: () => set({ cart: [] }),

      setHydrated: (hydrated: boolean) => set({ isHydrated: hydrated })
    }),
    {
      name: 'shopix-products-store',
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({ wishlistIds: state.wishlistIds, cart: state.cart }),
      skipHydration: true
    }
  )
)

// Selector hooks (grouped via useShallow to avoid unstable snapshots)

export function useWishlist() {
  return useProductsStore(
    useShallow(state => ({
      wishlistIds: state.wishlistIds,
      toggleWishlist: state.toggleWishlist,
      addToWishlist: state.addToWishlist,
      removeFromWishlist: state.removeFromWishlist
    }))
  )
}

/** Catalog products that are in the wishlist - memoized to prevent render loops */
export function useWishlistProducts() {
  const products = useProductsStore(state => state.products)
  const wishlistIds = useProductsStore(state => state.wishlistIds)

  return useMemo(() => selectProductsByIds(products, wishlistIds), [products, wishlistIds])
}

export function useIsWishlisted(id: string) {
  return useProductsStore(state => state.wishlistIds.includes(id))
}

export function useIsInCart(id: string) {
  return useProductsStore(state => state.cart.some(item => item.productId === id))
}

export function useWishlistCount() {
  return useProductsStore(state => state.wishlistIds.length)
}

export function useCart() {
  return useProductsStore(
    useShallow(state => ({
      cart: state.cart,
      addToCart: state.addToCart,
      removeFromCart: state.removeFromCart,
      setCartQuantity: state.setCartQuantity,
      clearCart: state.clearCart
    }))
  )
}

export function useCartCount() {
  return useProductsStore(state => state.cart.reduce((total, item) => total + item.quantity, 0))
}

export function useIsHydrated() {
  return useProductsStore(state => state.isHydrated)
}

export type CartLineItem = {
  product: Product
  quantity: number
}

/** Cart entries resolved to catalog products - memoized to prevent render loops */
export function useCartItems(): CartLineItem[] {
  const products = useProductsStore(state => state.products)
  const cart = useProductsStore(state => state.cart)

  return useMemo(
    () =>
      cart
        .map(item => {
          const product = products.find(current => current.id === item.productId)

          return product ? { product, quantity: item.quantity } : null
        })
        .filter((item): item is CartLineItem => item !== null),
    [products, cart]
  )
}
