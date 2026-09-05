'use client'

// Next Imports
import Link from 'next/link'

// Third-party Imports
import { ShoppingBagIcon } from 'lucide-react'

// Type Imports
import type { Product } from '@/types/product'

// Component Imports
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

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
}

const ProductListCard = ({ product, badges }: Props) => {
  const liked = useIsWishlisted(product.id)
  const inCart = useIsInCart(product.id)
  const { toggleWishlist } = useWishlist()
  const { addToCart } = useCart()

  return (
    <Card className='group gap-0 py-0 sm:flex-row'>
      <div className='bg-muted relative flex h-56 shrink-0 items-center justify-center overflow-hidden rounded-l-xl sm:h-49.5 sm:w-50'>
        <Link href={product.href} className='flex size-full items-center justify-center p-4'>
          <img
            src={product.image}
            alt={product.name}
            className='max-h-full object-contain transition-transform duration-300 group-hover:scale-105'
          />
          {badges && badges.length > 0 && (
            <div className='absolute top-3 left-3 flex flex-col gap-1'>
              {badges.map((badge, idx) => (
                <Badge
                  key={idx}
                  className={cn(
                    'inline-block h-auto rounded-full px-2 py-px text-xs font-medium text-white',
                    badge.variant === 'new' && 'bg-green-600 dark:bg-green-400',
                    badge.variant === 'destructive' && 'bg-destructive'
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
          className='bg-background! hover:bg-background/90 absolute top-3 right-3 z-10 size-7.25 rounded-full border-0 shadow-sm'
          onClick={() => toggleWishlist(product.id)}
        >
          <Heart className={cn('size-5', { 'fill-rose-500 stroke-rose-500': liked })} />
          <span className='sr-only'>{liked ? 'Remove from wishlist' : 'Add to wishlist'}</span>
        </Button>
      </div>
      <CardContent className='flex flex-1 flex-col justify-center gap-3 py-4'>
        <div>
          <h5 className='mb-1 text-lg font-semibold'>
            <Link href={product.href} className='hover:text-primary transition-colors'>
              {product.name}
            </Link>
          </h5>
          <p className='text-muted-foreground mb-1 text-xs font-medium'>{productMeta(product)}</p>
          <p className='text-muted-foreground mb-1.5 text-sm'>{product.description}</p>
          <div className='flex items-center gap-1.5 text-sm'>
            <span className='font-semibold'>{formatPrice(product.price)}</span>
            {product.discount > 0 && (
              <span className='text-muted-foreground line-through'>{formatPrice(product.originalPrice)}</span>
            )}
          </div>
        </div>
        <div className='flex flex-wrap gap-3'>
          {inCart ? (
            <Button disabled>
              In cart
              <ShoppingBagIcon />
            </Button>
          ) : (
            <Button onClick={() => addToCart(product.id)}>
              Add to Cart
              <ShoppingBagIcon />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductListCard
