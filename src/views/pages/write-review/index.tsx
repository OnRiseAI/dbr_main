'use client'

// React Imports
import { useEffect } from 'react'

// Type Imports
import type { Product } from '@/types/product'

// Component Imports
import ReviewProductCard from './review-product-card'
import ReviewForm from './review-form'

// Store Imports
import { useProductsStore } from '@/store/products-store'

type Props = {
  product: Product
}

const WriteReviewView = ({ product }: Props) => {
  const initializeProducts = useProductsStore(state => state.initializeProducts)

  useEffect(() => {
    initializeProducts([product])
  }, [product, initializeProducts])

  return (
    <>
      <h1 className='mb-8 text-2xl font-bold sm:text-3xl'>How was this item?</h1>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-[310px_1fr]'>
        <ReviewProductCard product={product} />
        <ReviewForm product={product} />
      </div>
    </>
  )
}

export { WriteReviewView }
export default WriteReviewView
