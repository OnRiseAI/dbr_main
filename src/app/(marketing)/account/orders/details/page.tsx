// Next Imports
import type { Metadata } from 'next'

// Component Imports
import { OrderDetailsView } from '@/views/account/order-details'

// Utils Imports
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

// Data Imports
import { getOrderDetails } from '@/app/server/actions'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Order Details',
  description: 'View detailed information about your Shopix orders.',
  url: '/account/orders/details'
})

const OrderDetailsPage = async () => {
  const groups = await getOrderDetails()

  return <OrderDetailsView groups={groups} />
}

export default OrderDetailsPage
