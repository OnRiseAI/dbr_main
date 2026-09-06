// Next Imports
import Link from 'next/link'

// Third-party Imports
import { ArrowLeftIcon, CreditCardIcon, TruckIcon } from 'lucide-react'

// Type Imports
import type { AccountOrder, Profile } from '@/lib/account/data'

// Component Imports
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import OrderCard, { formatOrderDate } from '@/views/account/orders/order-card'

// Utils Imports
import { formatPrice } from '@/utils/product-utils'

type Props = {
  order: AccountOrder
  profile: Profile | null
}

const STEPS: { key: string; label: string; at: (o: AccountOrder) => string | null; reached: (o: AccountOrder) => boolean }[] = [
  { key: 'placed', label: 'Order placed', at: o => o.createdAt, reached: () => true },
  { key: 'paid', label: 'Payment received', at: o => o.paidAt, reached: o => Boolean(o.paidAt) || ['paid', 'shipped', 'delivered'].includes(o.status) },
  { key: 'shipped', label: 'Shipped', at: o => o.shippedAt, reached: o => ['shipped', 'delivered'].includes(o.status) },
  { key: 'delivered', label: 'Delivered', at: () => null, reached: o => o.status === 'delivered' }
]

/** One order in full: where it stands, what to do next, what was in it, what it cost. */
const OrderDetailsView = ({ order, profile }: Props) => {
  const closed = ['cancelled', 'refunded', 'expired'].includes(order.status)

  return (
    <div className='space-y-6'>
      <div className='flex flex-wrap items-center justify-between gap-3'>
        <div>
          <Link href='/account/orders' className='text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm'>
            <ArrowLeftIcon className='size-4' /> All orders
          </Link>
          <h2 className='mt-1 text-xl font-semibold'>Order {order.reference}</h2>
        </div>
        <div className='flex flex-wrap gap-2.5'>
          {order.status === 'awaiting_payment' && order.paymentLinkUrl ? (
            <Button render={<a href={order.paymentLinkUrl} target='_blank' rel='noreferrer' />} nativeButton={false}>
              Pay now
              <CreditCardIcon />
            </Button>
          ) : null}
          {order.trackingUrl ? (
            <Button variant='outline' render={<a href={order.trackingUrl} target='_blank' rel='noreferrer' />} nativeButton={false}>
              Track parcel
              <TruckIcon />
            </Button>
          ) : null}
        </div>
      </div>

      <OrderCard order={order} compact />

      {!closed ? (
        <ol className='grid gap-3 rounded-xl border p-4 sm:grid-cols-4'>
          {STEPS.map(step => {
            const reached = step.reached(order)
            const at = step.at(order)

            return (
              <li key={step.key} className='flex items-start gap-3'>
                <span
                  className={
                    reached
                      ? 'bg-primary text-primary-foreground mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold'
                      : 'border-muted-foreground/40 mt-0.5 size-5 shrink-0 rounded-full border-2'
                  }
                >
                  {reached ? '✓' : ''}
                </span>
                <div>
                  <p className={reached ? 'text-sm font-medium' : 'text-muted-foreground text-sm'}>{step.label}</p>
                  <p className='text-muted-foreground text-xs'>{at ? formatOrderDate(at) : reached ? '' : 'Pending'}</p>
                </div>
              </li>
            )
          })}
        </ol>
      ) : null}

      <div className='grid gap-6 rounded-xl border p-4 sm:grid-cols-2 sm:p-6'>
        <div>
          <p className='text-muted-foreground mb-1 text-sm font-medium'>Customer</p>
          <p className='font-medium'>{profile?.name ?? ''}</p>
          <p className='text-muted-foreground text-sm'>{profile?.email ?? ''}</p>
          {profile?.phone ? <p className='text-muted-foreground text-sm'>{profile.phone}</p> : null}
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <p className='text-muted-foreground mb-1 text-sm font-medium'>Order date</p>
            <p className='font-medium'>{formatOrderDate(order.createdAt)}</p>
          </div>
          <div>
            <p className='text-muted-foreground mb-1 text-sm font-medium'>Payment</p>
            <p className='font-medium'>{order.paymentMethod}</p>
          </div>
          {order.trackingNumber ? (
            <div className='col-span-2'>
              <p className='text-muted-foreground mb-1 text-sm font-medium'>Tracking number</p>
              <p className='font-mono font-medium'>{order.trackingNumber}</p>
            </div>
          ) : null}
        </div>
      </div>

      <div className='rounded-xl border p-4 sm:p-6'>
        <h3 className='mb-3 text-lg font-semibold'>Items</h3>
        <ul className='divide-y'>
          {order.items.map((item, i) => (
            <li key={i} className='flex items-center gap-4 py-3'>
              <div className='bg-muted flex size-16 shrink-0 items-center justify-center rounded-lg'>
                {item.image ? <img src={item.image} alt={item.name} className='max-h-14 object-contain' /> : null}
              </div>
              <div className='min-w-0 flex-1'>
                {item.href ? (
                  <Link href={item.href} className='hover:text-primary font-medium'>
                    {item.name}
                  </Link>
                ) : (
                  <p className='font-medium'>{item.name}</p>
                )}
                <p className='text-muted-foreground text-sm'>
                  {item.qty} × {formatPrice(item.unitPriceCents / 100)}
                </p>
              </div>
              <p className='font-semibold'>{formatPrice(item.lineCents / 100)}</p>
            </li>
          ))}
        </ul>

        <Separator className='my-4' />

        <div className='ml-auto max-w-sm space-y-2'>
          <div className='flex items-center justify-between'>
            <p className='text-muted-foreground text-sm'>Subtotal</p>
            <p>{formatPrice(order.subtotalCents / 100)}</p>
          </div>
          {order.discountCents > 0 ? (
            <div className='flex items-center justify-between'>
              <p className='text-muted-foreground text-sm'>Discount{order.promoCode ? ` (${order.promoCode})` : ''}</p>
              <p>-{formatPrice(order.discountCents / 100)}</p>
            </div>
          ) : null}
          <div className='flex items-center justify-between'>
            <p className='text-muted-foreground text-sm'>Shipping</p>
            <p>{order.shippingCents > 0 ? formatPrice(order.shippingCents / 100) : 'Free'}</p>
          </div>
          <Separator className='my-2' />
          <div className='flex items-center justify-between'>
            <p className='font-medium'>Total</p>
            <p className='text-lg font-semibold'>{formatPrice(order.totalCents / 100)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export { OrderDetailsView }
export default OrderDetailsView
