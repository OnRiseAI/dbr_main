// Next Imports
import type { Metadata } from 'next'

// Component Imports
import { EmailNewsletterView } from '@/views/account/email-newsletter'

// Utils Imports
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Email Newsletter',
  description: 'Manage your Shopix newsletter preferences and marketing email subscriptions.',
  url: '/account/email-newsletter'
})

const EmailNewsletterPage = () => {
  return <EmailNewsletterView />
}

export default EmailNewsletterPage
