// Third-party Imports
import { create } from 'zustand'

// Type Imports
import type { Product, ProductReview } from '@/types/product'

type ProductsStore = {
  products: Map<string, Product>
  initializeProducts: (products: Product[]) => void
  addReview: (productId: string, review: Omit<ProductReview, 'date' | 'avatar'> & { author?: string }) => void
  getProduct: (productId: string) => Product | undefined
}

const AVATARS = [
  '/images/product-details/avatar-1.webp',
  '/images/product-details/avatar-2.webp',
  '/images/product-details/avatar-3.webp'
]

export const useProductsStore = create<ProductsStore>((set, get) => ({
  products: new Map(),

  initializeProducts: (products: Product[]) => {
    const map = new Map(products.map(p => [p.id, p]))

    set({ products: map })
  },

  addReview: (productId: string, review: Omit<ProductReview, 'date' | 'avatar'> & { author?: string }) => {
    set((state: ProductsStore) => {
      const product = state.products.get(productId)

      if (!product) return state

      const newReview: ProductReview = {
        ...review,
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        avatar: AVATARS[Math.floor(Math.random() * AVATARS.length)]
      }

      product.reviews.push(newReview)
      product.reviewCount = (product.reviewCount || 0) + 1

      const newProducts = new Map(state.products)

      newProducts.set(productId, { ...product })

      return { products: newProducts }
    })
  },

  getProduct: (productId: string): Product | undefined => {
    const store = get()

    return store.products.get(productId)
  }
}))
