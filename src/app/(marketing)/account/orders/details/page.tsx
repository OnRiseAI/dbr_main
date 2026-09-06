// Next Imports
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

// Component Imports
import { OrderDetailsView } from '@/views/account/order-details'

// Utils Imports
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

// Data Imports
import { getOrder, getProfile } from '@/lib/account/data'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Order Details',
  description: 'View detailed information about your Deep Beauty Research orders.',
  url: '/account/orders/details'
})

export const dynamic = 'force-dynamic'

type Props = { searchParams: Promise<{ id?: string }> }

const OrderDetailsPage = async ({ searchParams }: Props) => {
  const { id } = await searchParams

  if (!id) redirect('/account/orders')

  const [order, profile] = await Promise.all([getOrder(id), getProfile()])

  if (!order) redirect('/account/orders')

  return <OrderDetailsView order={order} profile={profile} />
}

export default OrderDetailsPage
