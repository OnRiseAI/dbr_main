// Next Imports
import type { Metadata } from 'next'

// Component Imports
import OrdersWithClientData from '@/views/account/orders-with-client-data'

// Utils Imports
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

// Data Imports
import { getOrders } from '@/app/server/actions'

export const metadata: Metadata = generateSEOMetadata({
  title: 'My Orders',
  description: 'Track and manage your Deep Beauty Research orders.',
  url: '/account/orders'
})

const OrdersPage = async () => {
  const orders = await getOrders()

  return <OrdersWithClientData staticOrders={orders} />
}

export default OrdersPage
