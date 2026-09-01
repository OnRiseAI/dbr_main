// Next Imports
import type { Metadata } from 'next'

// Component Imports
import { ReturnRefundsView } from '@/views/account/return-refunds'

// Utils Imports
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Return & Refunds',
  description: 'View the status of your Shopix product returns and refunds.',
  url: '/account/return-refunds'
})

const ReturnRefundsPage = () => {
  return <ReturnRefundsView />
}

export default ReturnRefundsPage
