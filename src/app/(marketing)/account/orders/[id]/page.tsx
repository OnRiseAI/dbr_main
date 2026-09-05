import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'
import { db as catalogue } from '@/fake-db/products'
import { formatDate, formatMoney, orderStatusLabel, type Address, type Order } from '@/types/account'

export const metadata = { title: 'Order' }

type Props = { params: Promise<{ id: string }> }

const OrderDetailPage = async ({ params }: Props) => {
  const { id } = await params
  const supabase = await createClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) redirect(`/login?next=/account/orders/${id}`)

  const { data } = await supabase
    .from('orders')
    .select(
      'id, status, created_at, paid_at, subtotal_cents, shipping_cents, discount_cents, total_cents, currency, promo_code, tracking_number, tracking_url, payment_link_url, shipping_address_id, order_items ( id, product_id, name_snapshot, qty, unit_price_cents )'
    )
    .eq('id', id)
    .eq('user_id', user.id)
    .maybeSingle<Order & { shipping_address_id: string | null }>()

  if (!data) notFound()

  const order = data

  const { data: address } = order.shipping_address_id
    ? await supabase.from('addresses').select('*').eq('id', order.shipping_address_id).maybeSingle<Address>()
    : { data: null }

  const productIds = order.order_items.map(item => item.product_id)

  const { data: products } = productIds.length
    ? await supabase.from('products').select('id, slug').in('id', productIds)
    : { data: [] as Array<{ id: string; slug: string }> }

  const imageFor = (productId: string) => {
    const slug = products?.find(product => product.id === productId)?.slug

    return catalogue.find(product => product.id === slug)?.image
  }

  const rows: Array<[string, string]> = [
    ['Placed', formatDate(order.created_at)],
    ['Status', orderStatusLabel(order.status)],
    ...(order.paid_at ? [['Paid', formatDate(order.paid_at)] as [string, string]] : []),
    ...(order.tracking_number ? [['Tracking', order.tracking_number] as [string, string]] : []),
    ...(order.promo_code ? [['Code', order.promo_code] as [string, string]] : [])
  ]

  return (
    <div className='space-y-8'>
      <div className='space-y-1'>
        <Link href='/account/orders' className='text-muted-foreground hover:text-foreground text-sm'>
          All orders
        </Link>
        <h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>
          Order <span className='font-mono text-xl'>#{order.id.slice(0, 8)}</span>
        </h1>
      </div>

      <div className='grid gap-8 lg:grid-cols-[1fr_320px]'>
        <div className='space-y-6'>
          <ul className='divide-y rounded-xl border'>
            {order.order_items.map(item => {
              const image = imageFor(item.product_id)

              return (
                <li key={item.id} className='flex items-center gap-4 px-5 py-4'>
                  <span className='ring-border flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white ring-1'>
                    {image ? <img src={image} alt='' className='max-h-12 max-w-12 object-contain' /> : null}
                  </span>
                  <span className='min-w-0 flex-1'>
                    <span className='block font-semibold'>{item.name_snapshot}</span>
                    <span className='text-muted-foreground text-sm tabular-nums'>
                      {item.qty} × {formatMoney(item.unit_price_cents, order.currency)}
                    </span>
                  </span>
                  <span className='font-semibold tabular-nums'>{formatMoney(item.qty * item.unit_price_cents, order.currency)}</span>
                </li>
              )
            })}
          </ul>

          <dl className='divide-y rounded-xl border text-sm'>
            <div className='flex justify-between px-5 py-3'>
              <dt className='text-muted-foreground'>Subtotal</dt>
              <dd className='tabular-nums'>{formatMoney(order.subtotal_cents, order.currency)}</dd>
            </div>
            {order.discount_cents > 0 ? (
              <div className='flex justify-between px-5 py-3'>
                <dt className='text-muted-foreground'>Discount</dt>
                <dd className='tabular-nums'>−{formatMoney(order.discount_cents, order.currency)}</dd>
              </div>
            ) : null}
            <div className='flex justify-between px-5 py-3'>
              <dt className='text-muted-foreground'>Shipping</dt>
              <dd className='tabular-nums'>{formatMoney(order.shipping_cents, order.currency)}</dd>
            </div>
            <div className='flex justify-between px-5 py-3 font-semibold'>
              <dt>Total</dt>
              <dd className='tabular-nums'>{formatMoney(order.total_cents, order.currency)}</dd>
            </div>
          </dl>
        </div>

        <div className='space-y-6'>
          <dl className='divide-y rounded-xl border text-sm'>
            {rows.map(([label, value]) => (
              <div key={label} className='flex justify-between gap-4 px-5 py-3'>
                <dt className='text-muted-foreground'>{label}</dt>
                <dd className='text-right font-medium tabular-nums'>{value}</dd>
              </div>
            ))}
          </dl>

          {order.tracking_url ? (
            <a
              href={order.tracking_url}
              target='_blank'
              rel='noreferrer'
              className='bg-foreground text-background inline-flex h-11 w-full items-center justify-center rounded-lg text-sm font-semibold'
            >
              Track the parcel
            </a>
          ) : !order.paid_at && order.payment_link_url ? (
            <a
              href={order.payment_link_url}
              className='bg-foreground text-background inline-flex h-11 w-full items-center justify-center rounded-lg text-sm font-semibold'
            >
              Complete payment
            </a>
          ) : null}

          {address ? (
            <div className='rounded-xl border p-5 text-sm'>
              <p className='text-muted-foreground mb-2 text-xs font-semibold tracking-[0.14em] uppercase'>Ships to</p>
              <p className='font-medium'>
                {address.first_name} {address.last_name}
              </p>
              {address.company ? <p>{address.company}</p> : null}
              <p>{address.address1}</p>
              {address.address2 ? <p>{address.address2}</p> : null}
              <p>
                {address.postal_code} {address.city}
              </p>
              <p>{address.country}</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default OrderDetailPage
