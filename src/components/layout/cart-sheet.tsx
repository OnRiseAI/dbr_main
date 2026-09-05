'use client'

import Link from 'next/link'
import { ArrowRightIcon, MinusIcon, PlusIcon, ShoppingBagIcon, XIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { checkoutUrl, hasDashboard } from '@/lib/dashboard'
import { useCart, useCartCount, useCartItems } from '@/store/use-products-store'
import { cn } from '@/lib/utils'
import { formatPrice } from '@/utils/product-utils'

/**
 * The cart. Items are kept here; payment happens in the Deep Beauty Research
 * checkout, which takes one product at a time, so each line has its own
 * checkout button.
 */
const CartSheet = () => {
  const count = useCartCount()
  const items = useCartItems()
  const { removeFromCart, setCartQuantity } = useCart()
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  return (
    <Sheet>
      <SheetTrigger render={<Button variant='ghost' size='icon-lg' className='relative' />}>
        <ShoppingBagIcon className='size-5.5' />
        {count > 0 && (
          <Badge
            className={cn(
              'bg-destructive absolute top-1 justify-center rounded-full text-xs text-white',
              count > 9 ? '-right-1.5 h-3.5 py-0 pr-0.5 pl-1' : 'right-0.5 size-3.5 p-0'
            )}
          >
            {count > 9 ? '9+' : count}
          </Badge>
        )}
        <span className='sr-only'>Cart</span>
      </SheetTrigger>
      <SheetContent className='flex w-full flex-col gap-0 p-0 sm:max-w-md'>
        <SheetHeader className='border-b px-6 py-5'>
          <SheetTitle>Your cart</SheetTitle>
          <SheetDescription>
            {items.length === 0 ? 'Nothing in it yet.' : `${count} item${count === 1 ? '' : 's'}`}
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className='flex flex-1 flex-col items-start justify-center gap-3 px-6'>
            <p className='text-muted-foreground text-sm'>Add a pen or a vial and it will wait here.</p>
            <Link href='/shop' className='inline-flex items-center gap-1.5 text-sm font-semibold'>
              Browse the range
              <ArrowRightIcon className='size-4' />
            </Link>
          </div>
        ) : (
          <>
            <ul className='flex-1 divide-y overflow-y-auto'>
              {items.map(({ product, quantity }) => (
                <li key={product.id} className='flex gap-4 px-6 py-4'>
                  <span className='ring-border flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white ring-1'>
                    <img src={product.image} alt='' className='max-h-12 max-w-12 object-contain' />
                  </span>
                  <div className='min-w-0 flex-1 space-y-2'>
                    <div className='flex items-start justify-between gap-3'>
                      <Link href={product.href} className='truncate text-sm font-semibold hover:underline'>
                        {product.name}
                      </Link>
                      <button
                        type='button'
                        onClick={() => removeFromCart(product.id)}
                        className='text-muted-foreground hover:text-foreground shrink-0'
                        aria-label={`Remove ${product.name}`}
                      >
                        <XIcon className='size-4' />
                      </button>
                    </div>
                    <div className='flex items-center justify-between gap-3'>
                      <div className='border-border flex h-8 items-center rounded-md border'>
                        <button
                          type='button'
                          onClick={() => setCartQuantity(product.id, quantity - 1)}
                          className='flex size-8 items-center justify-center'
                          aria-label='Decrease quantity'
                        >
                          <MinusIcon className='size-3.5' />
                        </button>
                        <span className='w-8 text-center text-sm tabular-nums'>{quantity}</span>
                        <button
                          type='button'
                          onClick={() => setCartQuantity(product.id, quantity + 1)}
                          className='flex size-8 items-center justify-center'
                          aria-label='Increase quantity'
                        >
                          <PlusIcon className='size-3.5' />
                        </button>
                      </div>
                      <span className='text-sm font-semibold tabular-nums'>{formatPrice(product.price * quantity)}</span>
                    </div>
                    {hasDashboard ? (
                      <a
                        href={checkoutUrl(product.id, quantity)}
                        className='inline-flex items-center gap-1.5 text-xs font-semibold underline underline-offset-4'
                      >
                        Check out this item
                        <ArrowRightIcon className='size-3.5' />
                      </a>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
            <div className='space-y-3 border-t px-6 py-5'>
              <div className='flex items-center justify-between text-sm'>
                <span className='text-muted-foreground'>Subtotal</span>
                <span className='font-semibold tabular-nums'>{formatPrice(total)}</span>
              </div>
              {items.length === 1 && hasDashboard ? (
                <Button
                  size='lg'
                  className='group h-11 w-full'
                  render={<a href={checkoutUrl(items[0].product.id, items[0].quantity)} />}
                  nativeButton={false}
                >
                  Check out
                  <ArrowRightIcon className='size-4 transition-transform duration-300 group-hover:translate-x-1' />
                </Button>
              ) : (
                <p className='text-muted-foreground text-xs'>
                  Checkout takes one product at a time. Use the link under each item; shipping is combined when
                  orders are packed together.
                </p>
              )}
              <p className='text-muted-foreground text-xs'>Payment and delivery are handled by app.deepbeautyresearch.com.</p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}

export default CartSheet
