// Next Imports
import type { Metadata } from 'next'

// Component Imports
import { AddressesView } from '@/views/account/addresses'

// Utils Imports
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'My Addresses',
  description: 'Manage your saved delivery and billing addresses on Deep Beauty Research.',
  url: '/account/addresses'
})

const AddressesPage = () => {
  return <AddressesView />
}

export default AddressesPage
