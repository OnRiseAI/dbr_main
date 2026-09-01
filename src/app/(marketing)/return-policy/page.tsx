// Next Imports
import type { Metadata } from 'next'

// Component Imports
import { ReturnPolicyView } from '@/views/pages/return-policy'

// Utils Imports
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Return Policy',
  description:
    'Learn about our hassle-free returns, replacements, secure payments, and 100% purchase protection promise.',
  url: '/return-policy'
})

const ReturnPolicyPage = () => {
  return <ReturnPolicyView />
}

export default ReturnPolicyPage
