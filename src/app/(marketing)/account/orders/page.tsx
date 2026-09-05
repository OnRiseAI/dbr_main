import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ArrowRightIcon } from 'lucide-react'

import { createClient } from '@/lib/supabase/server'
import { db as catalogue } from '@/fake-db/products'
import { formatDate, formatMoney, orderStatusLabel, type Order } from '@/types/account'
import { cn } from '@/lib/utils'

export const metadata = { title: 'Orders' }

const STATUS_TONE: Record<string, string> = {
  delivered: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  shipped: 'bg-sky-50 text-sky-800 border-sky-200',
  paid: 'bg-sky-50 text-sky-800 border-sky-200',
  cancelled: 'bg-muted text-muted-foreground',
  refunded: 'bg-muted text-muted-foreground'
}

const OrdersPage = async () => {
  const supabase = await createClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) redirect('/login?next=/account/orders')

  const { data } = await supabase
    .from('orders')
    .select(
      'id, status, created_at, paid_at, subtotal_cents, shipping_cents, discount_cents, total_cents, currency, promo_code, tracking_number, tracking_url, payment_link_url, order_items ( id, product_id, name_snapshot, qty, unit_price_cents )'
    )
    .eq('user_id', user.id)
    .neq('status', 'draft')
    .order('created_at', { ascending: false })

  const orders = (data ?? []) as Order[]
  const productIds = [...new Set(orders.flatMap(order => order.order_items.map(item => item.product_id)))]

  const { data: products } = productIds.length
    ? await supabase.from('products').select('id, slug').in('id', productIds)
    : { data: [] as Array<{ id: string; slug: string }> }

  const imageFor = (productId: string) => {
    const slug = products?.find(product => product.id === productId)?.slug

    return catalogue.find(product => product.id === slug)?.image
  }

  return (
    <div className='space-y-8'>
      <div className='space-y-1'>
        <h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>Orders</h1>
        <p className='text-muted-foreground'>Every order on this account, newest first.</p>
      </div>

      {orders.length === 0 ? (
        <div className='rounded-xl border p-8'>
          <p className='font-semibold'>No orders yet</p>
          <p className='text-muted-foreground mt-1 text-sm'>When you place one, it appears here with its status and tracking.</p>
          <Link href='/shop' className='mt-4 inline-flex items-center gap-1.5 text-sm font-semibold'>
            Go to the shop
            <ArrowRightIcon className='size-4' />
          </Link>
        </div>
      ) : (
        <ul className='space-y-4'>
          {orders.map(order => (
            <li key={order.id} className='rounded-xl border'>
              <div className='flex flex-wrap items-center justify-between gap-3 border-b px-5 py-3.5 text-sm'>
                <div className='flex flex-wrap items-center gap-x-4 gap-y-1'>
                  <span className='font-semibold tabular-nums'>{formatDate(order.created_at)}</span>
                  <span className='text-muted-foreground font-mono text-xs'>#{order.id.slice(0, 8)}</span>
                  <span
                    className={cn(
                      'rounded-full border px-2.5 py-0.5 text-xs font-semibold',
                      STATUS_TONE[order.status] ?? 'bg-amber-50 text-amber-900 border-amber-200'
                    )}
                  >
                    {orderStatusLabel(order.status)}
                  </span>
                </div>
                <Link href={`/account/orders/${order.id}`} className='inline-flex items-center gap-1.5 font-semibold'>
                  Details
                  <ArrowRightIcon className='size-4' />
                </Link>
              </div>
              <ul className='divide-y'>
                {order.order_items.map(item => {
                  const image = imageFor(item.product_id)

                  return (
                    <li key={item.id} className='flex items-center gap-4 px-5 py-3'>
                      <span className='ring-border flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white ring-1'>
                        {image ? <img src={image} alt='' className='max-h-11 max-w-11 object-contain' /> : null}
                      </span>
                      <span className='min-w-0 flex-1'>
                        <span className='block truncate text-sm font-semibold'>{item.name_snapshot}</span>
                        <span className='text-muted-foreground text-xs tabular-nums'>
                          {item.qty} × {formatMoney(item.unit_price_cents, order.currency)}
                        </span>
                      </span>
                    </li>
                  )
                })}
              </ul>
              <div className='flex flex-wrap items-center justify-between gap-3 border-t px-5 py-3.5 text-sm'>
                <span className='text-muted-foreground'>
                  {order.tracking_number ? (
                    order.tracking_url ? (
                      <a href={order.tracking_url} target='_blank' rel='noreferrer' className='text-foreground font-medium underline underline-offset-4'>
                        Track {order.tracking_number}
                      </a>
                    ) : (
                      <>Tracking {order.tracking_number}</>
                    )
                  ) : order.paid_at ? (
                    'Paid. Tracking appears here once dispatched.'
                  ) : order.payment_link_url ? (
                    <a href={order.payment_link_url} className='text-foreground font-medium underline underline-offset-4'>
                      Complete payment
                    </a>
                  ) : (
                    'Awaiting payment'
                  )}
                </span>
                <span className='font-semibold tabular-nums'>{formatMoney(order.total_cents, order.currency)}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default OrdersPage
