'use client'

// Next Imports
import Link from 'next/link'

// Third-party Imports
import { ShoppingBagIcon } from 'lucide-react'

// Type Imports
import type { Product } from '@/types/product'

// Component Imports
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// Store Imports
import { useIsInCart, useIsWishlisted, useWishlist, useCart } from '@/store/use-products-store'

// Utils Imports
import { cn } from '@/lib/utils'
import { formatPrice, productMeta } from '@/utils/product-utils'

// SVGs Imports
import Heart from '@/assets/svg/heart'

type BadgeData = {
  label: string
  variant?: 'default' | 'new' | 'destructive'
}

type Props = {
  product: Product
  badges?: BadgeData[]

  /** Replaces the product name (e.g. the product line without a strength). */
  title?: string

  /** Replaces the meta line. */
  meta?: string

  /** Prefix the price with "From" (product lines with several strengths). */
  fromPrice?: boolean
  variant?: 'deals' | 'new-arrivals' | 'popular' | 'default'
  galleryView?: boolean
  onWishlistClick?: (productId: string) => void
}

const ProductCard = ({
  product,
  badges,
  title,
  meta,
  fromPrice = false,
  variant = 'default',
  galleryView = false,
  onWishlistClick
}: Props) => {
  const liked = useIsWishlisted(product.id)
  const inCart = useIsInCart(product.id)
  const { toggleWishlist } = useWishlist()
  const { addToCart } = useCart()

  const handleWishlistClick = () => {
    if (onWishlistClick) {
      onWishlistClick(product.id)
    } else {
      toggleWishlist(product.id)
    }
  }

  return (
    <Card
      className={cn(
        'group border pt-0 ring-0 transition-colors',
        variant === 'deals' && 'border-destructive/20',
        variant === 'popular' && 'dark:ring-amber-700'
      )}
    >
      <div className='bg-white relative h-70 overflow-hidden rounded-t-xl border-b border-border'>
        <Link
          href={product.href}
          className={cn(
            'flex h-full items-center justify-center p-5 pb-0',
            variant === 'new-arrivals' && 'pt-2',
            variant === 'deals' && 'pt-0',
            galleryView === true && 'pb-0'
          )}
        >
          <img
            src={product.image}
            alt={product.name}
            className='mt-auto max-h-full object-contain py-4 transition-transform duration-300 group-hover:scale-105'
          />
          {badges && badges.length > 0 && (
            <div className='absolute top-4.75 left-3 flex flex-col'>
              {badges.map((badge, idx) => (
                <Badge
                  key={idx}
                  className={cn(
                    'flex h-5 items-center justify-center rounded-full px-2 text-xs font-semibold',
                    badge.variant === 'new' && 'bg-green-600 text-white dark:bg-green-400',
                    badge.variant === 'destructive' && 'bg-destructive text-white'
                  )}
                >
                  {badge.label}
                </Badge>
              ))}
            </div>
          )}
        </Link>
        <Button
          variant='outline'
          size='icon-sm'
          className='bg-background! hover:bg-background/90 absolute top-3.5 right-4 z-10 size-7.25 rounded-full border-0 shadow-sm'
          onClick={handleWishlistClick}
        >
          <Heart className={cn('size-5.25', { 'fill-rose-500 stroke-rose-500': liked })} />
          <span className='sr-only'>{liked ? 'Remove from wishlist' : 'Add to wishlist'}</span>
        </Button>
      </div>
      <CardContent className='flex flex-col'>
        <h5 className='mb-0.5 overflow-hidden text-lg font-semibold text-nowrap text-ellipsis'>
          <Link href={product.href} className='hover:text-primary transition-colors'>
            {title ?? product.name}
          </Link>
        </h5>
        <p className='text-muted-foreground mb-1.5 text-xs font-medium'>{meta ?? productMeta(product)}</p>
        <div className='flex items-center gap-1.5 text-sm'>
          <span className='font-semibold'>
            {fromPrice ? <span className='text-muted-foreground me-1 font-normal'>From</span> : null}
            {formatPrice(product.price)}
          </span>
          {product.discount > 0 && (
            <span className='text-muted-foreground line-through'>{formatPrice(product.originalPrice)}</span>
          )}
        </div>
        {product.available === false ? (
          <Button variant='outline' className='border-border mt-3 w-full' disabled>
            Currently unavailable
          </Button>
        ) : inCart ? (
          <Button className='border-border mt-3 w-full' disabled>
            In cart
            <ShoppingBagIcon className='size-4' />
          </Button>
        ) : (
          <Button className='border-border mt-3 w-full' onClick={() => addToCart(product.id)}>
            Add to Cart
            <ShoppingBagIcon className='size-4' />
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export default ProductCard
