// Next Imports
import type { Metadata } from 'next'

// Component Imports
import { PaymentsView } from '@/views/account/payments'

// Utils Imports
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Payments',
  description: 'Manage your saved payment methods on your Deep Beauty Research account.',
  url: '/account/payments'
})

const PaymentsPage = () => {
  return <PaymentsView />
}

export default PaymentsPage
