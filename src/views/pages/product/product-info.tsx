'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'

// Third-party Imports
import { HeartIcon, MinusIcon, PlusIcon, Share2Icon, ShoppingBagIcon, ArrowRightIcon } from 'lucide-react'

// Type Imports
import type { Product } from '@/types/product'

// Component Imports
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Rating } from '@/components/ui/rating'

// Store Imports
import { useCart, useIsInCart, useIsWishlisted, useWishlist } from '@/store/use-products-store'

// Utils Imports
import { cn } from '@/lib/utils'
import { formatPrice } from '@/utils/product-utils'
import { checkoutUrl, hasDashboard } from '@/lib/dashboard'

type Props = {
  product: Product
  variants?: Product[]
}

/** Three things that are true for every order. No promises the shop has not made. */
const FACTS = [
  { title: 'Dispatched from Germany', body: 'Tracked, in discreet packaging.' },
  { title: 'Batch documentation in the box', body: 'Every batch tested for purity and documented before dispatch.' },
  { title: 'Research use only', body: 'Not for human or veterinary use.' }
]

const ProductInfo = ({ product, variants = [product] }: Props) => {
  const [quantity, setQuantity] = useState(1)
  const [shareDropdownOpen, setShareDropdownOpen] = useState(false)

  const liked = useIsWishlisted(product.id)
  const inCart = useIsInCart(product.id)
  const { toggleWishlist } = useWishlist()
  const { addToCart } = useCart()

  const form = product.specs?.form ?? (product.collections?.includes('Vials') ? 'vial' : 'pen')

  const formLine =
    form === 'pen' ? 'Pre-filled pen. Ready to use, no reconstitution.' : 'Lyophilised vial. Reconstitute before use.'

  return (
    <div className='flex flex-col gap-7'>
      <div className='flex items-start justify-between gap-4'>
        <div className='space-y-2'>
          <p className='text-muted-foreground text-xs font-semibold tracking-[0.14em] uppercase'>
            {product.specs?.compound ?? product.category} · {form === 'pen' ? 'Pen' : 'Vial'}
          </p>
          <h1 className='text-3xl font-semibold tracking-tight sm:text-4xl'>{product.familyName ?? product.name}</h1>
          <p className='text-muted-foreground text-base'>{formLine}</p>
        </div>
        <div className='flex shrink-0 gap-2'>
          <Button
            variant='outline'
            size='icon-sm'
            className='size-9 rounded-full'
            onClick={() => toggleWishlist(product.id)}
            aria-pressed={liked}
          >
            <HeartIcon className={cn('size-4', { 'fill-red-500 stroke-red-500': liked })} />
            <span className='sr-only'>{liked ? 'Remove from wishlist' : 'Add to wishlist'}</span>
          </Button>
          <DropdownMenu open={shareDropdownOpen} onOpenChange={setShareDropdownOpen}>
            <DropdownMenuTrigger render={<Button variant='outline' size='icon-sm' className='size-9 rounded-full' />}>
              <Share2Icon className='size-4' />
              <span className='sr-only'>Share</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='min-w-36'>
              <DropdownMenuItem>WhatsApp</DropdownMenuItem>
              <DropdownMenuItem>Copy link</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className='flex items-baseline gap-3'>
        <span className='text-3xl font-semibold tracking-tight tabular-nums'>{formatPrice(product.price)}</span>
        {product.discount > 0 && (
          <span className='text-muted-foreground text-lg line-through tabular-nums'>
            {formatPrice(product.originalPrice)}
          </span>
        )}
        {product.reviewCount > 0 && (
          <span className='ms-auto flex items-center gap-2'>
            <Rating readOnly variant='yellow' size={14} value={product.rating} precision={0.5} />
            <span className='text-muted-foreground text-sm'>({product.reviewCount})</span>
          </span>
        )}
      </div>

      {variants.length > 1 && (
        <div className='space-y-3'>
          <p className='text-sm font-semibold'>{product.variantAxis ?? 'Strength'}</p>
          <div className='flex flex-wrap gap-2.5'>
            {variants.map(variant => {
              const active = variant.id === product.id

              return (
                <Link
                  key={variant.id}
                  href={variant.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'flex min-w-36 flex-col rounded-lg border px-4 py-3 transition-colors',
                    active ? 'border-foreground bg-foreground text-background' : 'hover:border-foreground/40'
                  )}
                >
                  <span className='text-sm font-semibold'>{variant.variantLabel ?? variant.name}</span>
                  <span className={cn('text-xs tabular-nums', active ? 'text-background/80' : 'text-muted-foreground')}>
                    {formatPrice(variant.price)}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      )}

      <p className='text-muted-foreground text-base leading-relaxed'>{product.description}</p>

      <div className='flex gap-3 max-sm:flex-col sm:items-center'>
        <div className='border-border flex h-11 w-32 shrink-0 items-center justify-between rounded-lg border px-1.5'>
          <Button
            variant='ghost'
            size='icon-sm'
            className='size-8'
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
            className='h-8 w-10 border-0 text-center shadow-none tabular-nums focus-visible:ring-0 dark:bg-transparent'
            aria-label='Quantity'
          />
          <Button variant='ghost' size='icon-sm' className='size-8' onClick={() => setQuantity(value => value + 1)}>
            <PlusIcon className='size-3.5' />
            <span className='sr-only'>Increase quantity</span>
          </Button>
        </div>
        {inCart ? (
          <Button size='lg' className='h-11 sm:flex-1' disabled>
            In cart
            <ShoppingBagIcon className='size-4' />
          </Button>
        ) : (
          <Button size='lg' className='h-11 sm:flex-1' onClick={() => addToCart(product.id, quantity)}>
            Add to cart
            <ShoppingBagIcon className='size-4' />
          </Button>
        )}
        {hasDashboard ? (
          <Button
            size='lg'
            variant='outline'
            className='group h-11 sm:flex-1'
            render={<a href={checkoutUrl(product.id, quantity)} />}
            nativeButton={false}
          >
            Buy now
            <ArrowRightIcon className='size-4 transition-transform duration-300 group-hover:translate-x-1' />
          </Button>
        ) : null}
      </div>

      <ul className='divide-border divide-y rounded-xl border'>
        {FACTS.map(fact => (
          <li key={fact.title} className='flex flex-col gap-0.5 px-4 py-3 sm:flex-row sm:items-baseline sm:gap-4'>
            <span className='text-sm font-semibold sm:w-64 sm:shrink-0'>{fact.title}</span>
            <span className='text-muted-foreground text-sm'>{fact.body}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProductInfo
