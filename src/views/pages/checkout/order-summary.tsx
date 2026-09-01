'use client'

// React Imports
import type { ReactNode } from 'react'

// Next Imports
import Link from 'next/link'

// Third-party Imports
import { ChevronRightIcon } from 'lucide-react'

// Type Imports
import type { CartLineItem } from '@/store/use-products-store'

// Component Imports
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

// Utils Imports
import { formatPrice } from '@/utils/product-utils'

type Props = {
  items: CartLineItem[]
  footer?: ReactNode
  variant?: 'cart' | 'compact'
}

const SHIPPING_COST = 10.66

const OrderSummary = ({ items, footer, variant = 'compact' }: Props) => {
  const subtotal = items.reduce((total, item) => total + item.product.originalPrice * item.quantity, 0)
  const discountedTotal = items.reduce((total, item) => total + item.product.price * item.quantity, 0)
  const discount = subtotal - discountedTotal
  const total = discountedTotal + SHIPPING_COST

  return (
    <div className='border-border flex flex-col gap-6 rounded-xl border p-6'>
      <div>
        <h6 className='mb-1.5 text-xl font-semibold'>Pricing Details</h6>
        <p className='text-muted-foreground text-base'>
          You have {items.length} {items.length === 1 ? 'item' : 'items'} Selected in your cart
        </p>
      </div>

      {variant === 'cart' && (
        <div className='bg-muted rounded-md border p-2.5'>
          <div className='mb-2.5 flex items-center justify-between gap-3 text-xs font-medium'>
            <span className='flex items-center gap-1 text-sm font-semibold'>
              Coupon Code <img src='/images/product-details/discount-success.webp' alt='Discount badge icon' />
            </span>
            <Link href='#' className='text-muted-foreground flex items-center gap-1 text-sm font-medium'>
              Show more offers <ChevronRightIcon className='size-3.5' />
            </Link>
          </div>
          <Input placeholder='Add discount code' className='bg-background h-9 rounded-sm border-transparent' />
        </div>
      )}

      <div className={variant === 'cart' ? 'hidden' : 'flex flex-col gap-4'}>
        {items.map(item => (
          <div key={item.product.id} className='flex items-center gap-4'>
            <div className='bg-muted h-21.5 w-23 shrink-0 overflow-hidden rounded-lg'>
              <img src={item.product.image} alt={item.product.name} className='size-full object-cover' />
            </div>
            <div className='min-w-0 flex-1'>
              <p className='mb-1 text-lg font-semibold'>{item.product.brand}</p>
              <p className='text-muted-foreground mb-1 truncate text-sm'>{item.product.name}</p>
              <p className='text-xs text-green-600 dark:text-green-400'>Estimated Delivery: 12 Jan 2026</p>
            </div>
          </div>
        ))}
      </div>

      <div className='flex flex-col gap-3.5'>
        <div className='flex items-center justify-between gap-6 text-lg'>
          <span>Subtotal</span>
          <span className='font-medium'>{formatPrice(discountedTotal)}</span>
        </div>
        <div className='flex items-center justify-between gap-6 text-lg'>
          <span>Shipping Cost (+)</span>
          <span className='font-medium'>{formatPrice(SHIPPING_COST)}</span>
        </div>
        <div className='flex items-center justify-between gap-6 text-lg'>
          <span>Discount (-)</span>
          <span className='font-medium'>{formatPrice(discount)}</span>
        </div>
        <Separator className='my-2.5' />
        <div className='flex items-center justify-between gap-6 text-lg'>
          <span className='font-medium'>Total Payable</span>
          <span className='font-medium'>{formatPrice(total)}</span>
        </div>
      </div>

      {footer}
    </div>
  )
}

export default OrderSummary
