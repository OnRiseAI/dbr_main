'use client'

import Link from 'next/link'
import { ArrowRightIcon } from 'lucide-react'

import ProductCard from '@/components/blocks/product-card'
import { useIsHydrated, useWishlistProducts } from '@/store/use-products-store'

/** The wishlist lives in this browser. It is not tied to the account. */
const WishlistView = () => {
  const hydrated = useIsHydrated()
  const products = useWishlistProducts()

  if (!hydrated) return null

  if (products.length === 0) {
    return (
      <div className='rounded-xl border p-8'>
        <p className='font-semibold'>Nothing saved yet</p>
        <p className='text-muted-foreground mt-1 text-sm'>Tap the heart on any product to keep it here.</p>
        <Link href='/shop' className='mt-4 inline-flex items-center gap-1.5 text-sm font-semibold'>
          Browse the range
          <ArrowRightIcon className='size-4' />
        </Link>
      </div>
    )
  }

  return (
    <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default WishlistView
