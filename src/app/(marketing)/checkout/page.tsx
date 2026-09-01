// Next Imports
import type { Metadata } from 'next'

// Component Imports
import ContentCard from '@/components/layout/content-card'
import { CheckoutView } from '@/views/pages/checkout'

// Utils Imports
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Checkout',
  description: 'Enter your shipping address, choose delivery and payment, and place your Shopix order.',
  url: '/checkout'
})

const CheckoutPage = () => {
  return (
    <ContentCard>
      <CheckoutView />
    </ContentCard>
  )
}

export default CheckoutPage
