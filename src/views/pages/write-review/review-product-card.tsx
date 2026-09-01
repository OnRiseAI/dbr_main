'use client'

// Next Imports
import Link from 'next/link'

// Type Imports
import type { Product } from '@/types/product'

// Component Imports
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

// Store Imports
import { useIsWishlisted, useWishlist } from '@/store/use-products-store'

// Utils Imports
import { cn } from '@/lib/utils'

// SVGs Imports
import Heart from '@/assets/svg/heart'

type Props = {
  product: Product
}

const ReviewProductCard = ({ product }: Props) => {
  const liked = useIsWishlisted(product.id)
  const { toggleWishlist } = useWishlist()

  return (
    <div>
      <Card className='relative h-auto pt-0'>
        <Link href={product.href} className='bg-muted flex justify-center'>
          <img src={product.image} alt={product.name} className='mt-6 max-h-64 w-full max-w-67 object-contain' />
        </Link>
        <Button
          variant='outline'
          size='icon-sm'
          className='bg-background! absolute top-3.5 right-4 z-10 size-7.25 rounded-full border-0 shadow-sm'
          onClick={() => toggleWishlist(product.id)}
        >
          <Heart className={cn('size-5.25', { 'fill-red-500 stroke-red-500': liked })} />
          <span className='sr-only'>{liked ? 'Remove from wishlist' : 'Add to wishlist'}</span>
        </Button>
        <CardContent>
          <p className='mb-2 text-lg font-semibold'>
            <Link href={product.href} className='hover:text-primary'>
              {product.brand}
            </Link>
          </p>
          <p className='text-muted-foreground text-sm'>{product.description}</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default ReviewProductCard
