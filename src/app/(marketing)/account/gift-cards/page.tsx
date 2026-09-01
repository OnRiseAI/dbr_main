// Next Imports
import type { Metadata } from 'next'

// Component Imports
import { GiftCardsView } from '@/views/account/gift-cards'

// Utils Imports
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Gift Cards',
  description: 'Send a Shopix gift card and let someone choose exactly what they want.',
  url: '/account/gift-cards'
})

const GiftCardsPage = () => {
  return <GiftCardsView />
}

export default GiftCardsPage
