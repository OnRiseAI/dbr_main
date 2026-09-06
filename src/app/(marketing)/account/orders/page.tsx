// Next Imports
import type { Metadata } from 'next'

// Component Imports
import OrdersView from '@/views/account/orders'

// Utils Imports
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

// Data Imports
import { listOrders } from '@/lib/account/data'

export const metadata: Metadata = generateSEOMetadata({
  title: 'My Orders',
  description: 'Track and manage your Deep Beauty Research orders.',
  url: '/account/orders'
})

export const dynamic = 'force-dynamic'

const OrdersPage = async () => {
  const orders = await listOrders()

  return <OrdersView orders={orders} />
}

export default OrdersPage
