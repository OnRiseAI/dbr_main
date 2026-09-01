// Next Imports
import type { Metadata } from 'next'

// Component Imports
import { ExchangeReturnView } from '@/views/account/exchange-return'

// Utils Imports
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Exchange & Return',
  description: 'Request an exchange or return for your Shopix order.',
  url: '/account/exchange-return'
})

const ExchangeReturnPage = () => {
  return <ExchangeReturnView />
}

export default ExchangeReturnPage
