// Next Imports
import type { Metadata } from 'next'

// Component Imports
import { WishlistView } from '@/views/account/wishlist'

// Utils Imports
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'My Wishlist',
  description: 'View and manage the products saved to your Deep Beauty Research wishlist.',
  url: '/account/wishlist'
})

const WishlistPage = () => {
  // Wishlist state (and the catalog it resolves against) lives in the products store.
  return <WishlistView />
}

export default WishlistPage
