// Next Imports
import type { Metadata } from 'next'

// Component Imports
import { AddressesView } from '@/views/account/addresses'

// Utils Imports
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

// Data Imports
import { listAddresses } from '@/lib/account/data'

export const metadata: Metadata = generateSEOMetadata({
  title: 'My Addresses',
  description: 'Manage the addresses on your Deep Beauty Research account.',
  url: '/account/addresses'
})

export const dynamic = 'force-dynamic'

const AddressesPage = async () => {
  const addresses = await listAddresses()

  return <AddressesView addresses={addresses} />
}

export default AddressesPage
