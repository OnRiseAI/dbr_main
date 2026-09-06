// Next Imports
import Link from 'next/link'

// Third-party Imports
import { CreditCardIcon, PackageIcon, TruckIcon } from 'lucide-react'

// Type Imports
import type { AccountOrder, AccountStatus } from '@/lib/account/data'

// Component Imports
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

// Utils Imports
import { cn } from '@/lib/utils'
import { formatPrice } from '@/utils/product-utils'

const STATUS_CLASS: Record<AccountStatus, string> = {
  awaiting_payment: 'border-amber-600 text-amber-700 dark:border-amber-400 dark:text-amber-400',
  paid: 'border-sky-600 text-sky-700 dark:border-sky-400 dark:text-sky-400',
  shipped: 'border-indigo-600 text-indigo-700 dark:border-indigo-400 dark:text-indigo-400',
  delivered: 'border-green-600 text-green-700 dark:border-green-400 dark:text-green-400',
  cancelled: 'border-destructive text-destructive',
  refunded: 'border-muted-foreground text-muted-foreground',
  expired: 'border-muted-foreground text-muted-foreground',
  draft: 'border-muted-foreground text-muted-foreground'
}

export const formatOrderDate = (iso: string | null) =>
  iso ? new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Europe/Berlin' }).format(new Date(iso)) : '-'

type Props = {
  order: AccountOrder

  /** On the details page the card already is the detail. */
  compact?: boolean
}

/** One order: what was in it, where it stands, and the one thing to do next. */
const OrderCard = ({ order, compact }: Props) => {
  return (
    <div className='group grid grid-cols-1 overflow-hidden rounded-xl border transition-colors sm:grid-cols-4'>
      <figure className='bg-muted relative col-span-1 flex items-center justify-center p-4'>
        {order.image ? (
          <img src={order.image} alt={order.itemsSummary} className='max-h-36 object-contain' />
        ) : (
          <PackageIcon className='text-muted-foreground size-10' />
        )}
      </figure>

      <div className='flex flex-col p-4 sm:col-span-3'>
        <div className='mb-3 flex items-center justify-between gap-2'>
          <div className='flex items-center gap-1.5'>
            <Badge variant='outline' className={cn('rounded-full', STATUS_CLASS[order.status])}>
              {order.statusLabel}
            </Badge>
            <Separator orientation='vertical' className='mx-1.5 h-4!' />
            <p className='text-muted-foreground text-xs'>{formatOrderDate(order.createdAt)}</p>
          </div>
          {!compact ? (
            <Button
              variant='link'
              size='xs'
              className='text-muted-foreground hover:text-foreground h-auto p-0 hover:no-underline'
              render={<Link href={`/account/orders/details?id=${order.id}`} />}
              nativeButton={false}
            >
              View Details
            </Button>
          ) : null}
        </div>

        <div className='space-y-2'>
          <p className='text-primary text-sm font-medium'>Order {order.reference}</p>
          <h5 className='text-lg font-semibold'>{order.itemsSummary}</h5>
          <p className='text-muted-foreground text-sm'>
            {order.items.reduce((n, i) => n + i.qty, 0)} item{order.items.reduce((n, i) => n + i.qty, 0) === 1 ? '' : 's'} · {order.paymentMethod}
            {order.promoCode ? ` · code ${order.promoCode}` : ''}
          </p>
          <p className='text-sm font-semibold'>{formatPrice(order.totalCents / 100)}</p>
        </div>

        {!compact ? (
          <div className='mt-3 flex flex-wrap gap-2.5'>
            {order.status === 'awaiting_payment' && order.paymentLinkUrl ? (
              <Button render={<a href={order.paymentLinkUrl} target='_blank' rel='noreferrer' />} nativeButton={false}>
                Pay now
                <CreditCardIcon />
              </Button>
            ) : null}
            {order.status === 'shipped' && order.trackingUrl ? (
              <Button
                className='border-border hover:bg-primary hover:text-primary-foreground'
                render={<a href={order.trackingUrl} target='_blank' rel='noreferrer' />}
                nativeButton={false}
              >
                Track parcel
                <TruckIcon />
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default OrderCard
