'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'

// Third-party Imports
import {
  ChevronRightIcon,
  HeartIcon,
  MinusIcon,
  PlusIcon,
  ArrowRightLeftIcon,
  Share2Icon,
  ShoppingBagIcon,
  ArrowRightIcon
} from 'lucide-react'

// Type Imports
import type { Product } from '@/types/product'

// Component Imports
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Rating } from '@/components/ui/rating'

// Store Imports
import { useCart, useIsInCart, useIsWishlisted, useWishlist } from '@/store/use-products-store'

// Utils Imports
import { cn } from '@/lib/utils'
import { formatPrice } from '@/utils/product-utils'

type Props = {
  product: Product
}

const ProductInfo = ({ product }: Props) => {
  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedSize, setSelectedSize] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [shareDropdownOpen, setShareDropdownOpen] = useState(false)

  const liked = useIsWishlisted(product.id)
  const inCart = useIsInCart(product.id)
  const { toggleWishlist } = useWishlist()
  const { addToCart } = useCart()

  return (
    <div className='space-y-6'>
      <div className='mb-3.5 flex items-center justify-between'>
        <Badge className='h-6.5 border-0 bg-green-600/10 py-0 text-xs font-medium text-green-600 dark:bg-green-400/10 dark:text-green-400'>
          In Stock
        </Badge>
        <div className='flex gap-3'>
          <Button
            variant='ghost'
            size='icon-sm'
            className='bg-secondary hover:bg-muted size-7'
            onClick={() => toggleWishlist(product.id)}
          >
            <HeartIcon className={cn('size-4', { 'fill-red-500 stroke-red-500': liked })} />
            <span className='sr-only'>{liked ? 'Remove from wishlist' : 'Add to wishlist'}</span>
          </Button>
          <DropdownMenu open={shareDropdownOpen} onOpenChange={setShareDropdownOpen}>
            <DropdownMenuTrigger
              render={
                <Button
                  variant='link'
                  size='icon-sm'
                  className={cn('size-7', shareDropdownOpen ? 'bg-primary text-primary-foreground' : 'bg-muted')}
                />
              }
            >
              <Share2Icon className='size-4' />
              <span className='sr-only'>Share</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='min-w-36'>
              <DropdownMenuItem>WhatsApp</DropdownMenuItem>
              <DropdownMenuItem>Facebook</DropdownMenuItem>
              <DropdownMenuItem>Twitter</DropdownMenuItem>
              <DropdownMenuItem>LinkedIn</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className='mb-7 space-y-1.5'>
        <h2 className='text-3xl font-semibold'>{product.name}</h2>
        <div className='flex items-center gap-3'>
          <Rating readOnly variant='yellow' size={16} value={product.rating} precision={0.5} />
          <span className='text-muted-foreground text-sm font-medium'>({product.reviewCount} Reviews)</span>
        </div>
        <div className='flex items-center gap-2'>
          <span className='text-2xl font-semibold'>{formatPrice(product.price)}</span>
          {product.discount > 0 && (
            <>
              <span className='text-muted-foreground text-xl line-through'>{formatPrice(product.originalPrice)}</span>
              <span className='text-sm text-green-600 dark:text-green-400'>({product.discount}% OFF)</span>
            </>
          )}
        </div>
      </div>

      <p className='text-muted-foreground text-lg'>{product.description}</p>

      {/* Coupon banner */}
      <div className='bg-muted border-border space-y-2.5 rounded-xl border p-2.5'>
        <div className='flex justify-between gap-2 max-sm:flex-col sm:items-center'>
          <div className='flex items-center justify-between gap-1'>
            <p className='text-sm font-semibold'>Unlock Extra Savings Today</p>
            <img src='/images/product-details/discount-success.webp' alt='discount badge green color' />
          </div>
          <p className='text-sm font-semibold'>
            Code: <span className='text-green-600 dark:text-green-400'>WELCOME10</span>
          </p>
        </div>
        <div className='bg-card flex content-center justify-between rounded-lg px-4 py-2.5'>
          <p className='text-muted-foreground text-xs font-medium'>Apply coupon at checkout</p>
          <Button
            variant='link'
            className='text-muted-foreground h-4 gap-0 p-0 text-xs font-medium'
            render={<Link href='#' />}
            nativeButton={false}
          >
            Show more offers
            <ChevronRightIcon className='ms-0.5 size-3.5' />
          </Button>
        </div>
      </div>

      {product.colors.length > 0 && (
        <div className='flex flex-col gap-3'>
          <h4 className='text-lg font-medium'>
            Color: <span className='text-muted-foreground'>{product.colors[selectedColor]?.name}</span>
          </h4>
          <div className='flex items-center gap-3'>
            {product.colors.map((color, index) => (
              <Button
                key={color.name}
                variant='ghost'
                size='icon-sm'
                aria-label={color.name}
                style={{
                  backgroundColor: color.value,
                  ...(selectedColor === index && {
                    boxShadow: `0 0 0 2px var(--background), 0 0 0 4px ${color.value}`
                  })
                }}
                className={cn(
                  'border-border size-7 rounded-full border p-0 hover:opacity-90',
                  selectedColor === index && 'ring-2 ring-offset-2'
                )}
                onClick={() => setSelectedColor(index)}
              >
                <span className='sr-only'>{color.name}</span>
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Sizes */}
      {product.sizes && (
        <div className='flex flex-col gap-4'>
          <div className='flex justify-between'>
            <h4 className='text-lg font-medium'>Select Size</h4>
            <Button
              variant='link'
              className='h-auto gap-1 p-0 text-sm text-sky-600 dark:text-sky-400'
              render={<Link href='#' />}
              nativeButton={false}
            >
              Size Guide
              <ChevronRightIcon className='size-4.5' />
            </Button>
          </div>
          <div className='flex items-start gap-4'>
            {product.sizes.map((size, index) => (
              <div key={index} className='flex flex-col items-center gap-1'>
                <Button
                  variant='outline'
                  size='sm'
                  disabled={size.disabled}
                  className={cn(
                    'px-2.5 text-sm font-medium',
                    selectedSize === index &&
                      !size.disabled &&
                      'text-primary-foreground bg-primary hover:bg-primary dark:text-primary-foreground dark:bg-primary dark:hover:bg-primary hover:text-primary-foreground',
                    size.disabled && 'text-muted-foreground line-through'
                  )}
                  onClick={() => setSelectedSize(index)}
                >
                  {size.label}
                </Button>
                {size.note && <span className='text-destructive text-sm font-medium'>{size.note}</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      <p className='mb-4 text-base font-medium'>
        Product not available?{' '}
        <Button
          variant='link'
          className='h-auto p-0 text-base font-medium text-green-600 dark:text-green-400'
          render={<Link href='#' />}
          nativeButton={false}
        >
          notify me
        </Button>
      </p>

      {/* Quantity + actions */}
      <div className='flex gap-4 max-sm:flex-col sm:items-center'>
        <div className='border-border flex h-9 w-30 items-center gap-2 rounded-lg border px-2'>
          <Button
            variant='secondary'
            size='icon-sm'
            className='size-6'
            onClick={() => setQuantity(value => Math.max(1, value - 1))}
          >
            <MinusIcon className='size-3.5' />
            <span className='sr-only'>Decrease quantity</span>
          </Button>
          <Input
            value={quantity}
            onChange={event => {
              const next = Number(event.target.value)

              if (!Number.isNaN(next)) setQuantity(Math.max(1, next))
            }}
            className='h-8 w-12 border-0 text-center shadow-none focus-visible:ring-0 dark:bg-transparent'
            aria-label='Quantity'
          />
          <Button variant='secondary' size='icon-sm' className='size-6' onClick={() => setQuantity(value => value + 1)}>
            <PlusIcon className='size-3.5' />
            <span className='sr-only'>Increase quantity</span>
          </Button>
        </div>
        {inCart ? (
          <Button size='lg' className='sm:flex-1' disabled>
            In cart
            <ShoppingBagIcon className='size-4' />
          </Button>
        ) : (
          <Button size='lg' className='sm:flex-1' onClick={() => addToCart(product.id, quantity)}>
            Add to cart
            <ShoppingBagIcon className='size-4' />
          </Button>
        )}
        <Button
          size='lg'
          variant='outline'
          className='group shadow-sm sm:flex-1'
          onClick={() => addToCart(product.id, quantity)}
        >
          Buy Now
          <ArrowRightIcon className='size-4 transition-all duration-300 group-hover:translate-x-1' />
        </Button>
      </div>

      {/* Delivery / return info */}
      <div className='border-border rounded-xl border'>
        <div className='flex items-center gap-6 p-4'>
          <ArrowRightLeftIcon className='size-7.5 shrink-0' />
          <div className='flex flex-col gap-1.5'>
            <p className='text-lg font-medium'>Return or Exchange</p>
            <p className='text-muted-foreground text-base'>
              Free 30 Days Delivery{' '}
              <Button
                variant='link'
                className='text-primary h-auto p-0 text-base font-normal underline-offset-3'
                render={<Link href='#' />}
                nativeButton={false}
              >
                Return or Exchange Policy
              </Button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductInfo
