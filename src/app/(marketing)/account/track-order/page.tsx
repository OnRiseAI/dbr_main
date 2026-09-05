// Next Imports
import type { Metadata } from 'next'

// Component Imports
import { TrackOrderView } from '@/views/account/track-order'

// Utils Imports
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Track Order',
  description: 'Track the delivery status of your Deep Beauty Research order.',
  url: '/account/track-order'
})

const TrackOrderPage = () => {
  return <TrackOrderView />
}

export default TrackOrderPage
