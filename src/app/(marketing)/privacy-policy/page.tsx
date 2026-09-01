// Next Imports
import type { Metadata } from 'next'

// Component Imports
import { PrivacyPolicyView } from '@/views/pages/privacy-policy'

// Utils Imports
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Privacy Policy',
  description:
    'Read how we collect, use, share, and protect your personal information when you use our platform and services.',
  url: '/privacy-policy'
})

const PrivacyPolicyPage = () => {
  return <PrivacyPolicyView />
}

export default PrivacyPolicyPage
