// Next Imports
import type { Metadata } from 'next'

// Component Imports
import { ContactView } from '@/views/pages/contact'

// Utils Imports
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Contact',
  description:
    'Four ways to reach Deep Beauty Research: general, orders and shipping, trade, and product documentation. Answered within one business day, Mon to Fri 09:00 to 17:00 CET.',
  url: '/contact'
})

const ContactPage = () => {
  return <ContactView />
}

export default ContactPage
