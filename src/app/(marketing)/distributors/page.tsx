// Next Imports
import type { Metadata } from 'next'

// Component Imports
import { DistributorsView } from '@/views/pages/distributors'

// Utils Imports
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Distributors',
  description:
    'Wholesale peptides from Germany. Volume pricing and recurring supply for clinics, shops, resellers and regional distributors, or 15% flat commission on the referral partner programme.',
  url: '/distributors'
})

const DistributorsPage = () => {
  return <DistributorsView />
}

export default DistributorsPage
