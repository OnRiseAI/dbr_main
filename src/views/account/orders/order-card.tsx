'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'

// Third-party Imports
import { HeartIcon, ShoppingBagIcon, BusIcon, ArrowLeftRightIcon } from 'lucide-react'

// Type Imports
import type { Order } from '@/types/order'

// Component Imports
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

// Utils Imports
import { cn } from '@/lib/utils'
import { formatPrice } from '@/utils/product-utils'

const statusConfig = {
  'in-progress': { label: 'In Progress', className: 'border-amber-600 text-amber-600 dark:text-amber-400' },
  delivered: {
    label: 'Delivered',
    className: 'border-green-600 text-green-600 dark:text-green-400 dark:border-green-400'
  },
  returned: { label: 'Returned', className: 'border-sky-600 dark:border-sky-400 text-sky-600 dark:text-sky-400' },
  cancelled: { label: 'Cancelled', className: 'border-destructive text-destructive' }
} as const

type Props = {
  order: Order
  disableDetailsAndOrderAgainLinks?: boolean
}

const OrderCard = ({ order, disableDetailsAndOrderAgainLinks = false }: Props) => {
  const [liked, setLiked] = useState(false)

  const status = statusConfig[order.status]

  const detailsHref = disableDetailsAndOrderAgainLinks
    ? '#'
    : order.status === 'in-progress'
      ? '/account/track-order'
      : '/account/exchange-return'

  return (
    <div className='group grid grid-cols-1 overflow-hidden rounded-xl border transition-colors sm:grid-cols-4 md:grid-cols-1 lg:grid-cols-4'>
      <figure className='bg-muted relative col-span-1 flex items-center justify-center p-4'>
        <Link href={order.href}>
          <img
            src={order.image}
            alt={order.title}
            className='max-h-full object-contain transition-transform duration-300 group-hover:scale-105'
          />
        </Link>
        <Button
          variant='outline'
          size='icon-sm'
          className='dark:text-primary dark:bg-background dark:hover:bg-background! absolute top-4 right-4 size-7.25 rounded-full border-0 bg-white shadow-md hover:bg-white!'
          onClick={() => setLiked(!liked)}
        >
          <HeartIcon className={cn('size-5.25', { 'fill-red-500 text-red-500': liked })} />
          <span className='sr-only'>Add to wishlist</span>
        </Button>
      </figure>

      <div className='flex flex-col p-4 sm:col-span-3 md:col-span-1 lg:col-span-3'>
        <div className='mb-3 flex items-center justify-between gap-2'>
          <div className='flex items-center gap-1.5'>
            <Badge variant='outline' className={cn('rounded-full', status.className)}>
              {status.label}
            </Badge>
            <Separator orientation='vertical' className='mx-1.5 h-4!' />
            <p className='text-muted-foreground text-xs'>{order.date}</p>
          </div>
          <Button
            variant='link'
            size='xs'
            className='text-muted-foreground hover:text-foreground h-auto p-0 hover:no-underline'
            render={<Link href={detailsHref} />}
            nativeButton={false}
          >
            View Details
          </Button>
        </div>

        <div className='space-y-3'>
          <p className='text-primary text-sm font-medium'>Order ID: {order.orderId}</p>
          <h5 className='mb-1 text-lg font-semibold'>
            <Link href={order.href} className='hover:text-primary transition-colors'>
              {order.title}
            </Link>
          </h5>
          <p className='text-muted-foreground mb-1.5 text-sm'>{order.description}</p>
          <div className='flex items-center gap-1.5'>
            <span className='text-sm font-semibold'>{formatPrice(order.price)}</span>
            <span className='text-muted-foreground text-sm font-normal line-through'>
              {formatPrice(order.originalPrice)}
            </span>
          </div>
        </div>

        <div className='mt-3 flex flex-wrap gap-2.5'>
          {order.status === 'in-progress' ? (
            <Button
              className='border-border hover:bg-primary hover:text-primary-foreground'
              render={<Link href='/account/track-order' />}
              nativeButton={false}
            >
              Track Order
              <BusIcon />
            </Button>
          ) : (
            <>
              {(order.status === 'delivered' || order.status === 'cancelled' || order.status === 'returned') && (
                <Button
                  className='border-border'
                  render={<Link href={disableDetailsAndOrderAgainLinks ? '#' : '/checkout'} />}
                  nativeButton={false}
                >
                  Order Again
                  <ShoppingBagIcon />
                </Button>
              )}
              {order.status === 'delivered' && (
                <Button
                  variant='outline'
                  className='border-border shadow-sm'
                  render={<Link href='/account/exchange-return' />}
                  nativeButton={false}
                >
                  Return or Exchange
                  <ArrowLeftRightIcon />
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default OrderCard
