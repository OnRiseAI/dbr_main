// Next Imports
import type { Metadata } from 'next'

// Component Imports
import { SupportTicketView } from '@/views/account/support-ticket'

// Utils Imports
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Support Tickets',
  description: 'View and manage your Shopix support tickets.',
  url: '/account/support-ticket'
})

const SupportTicketPage = () => {
  return <SupportTicketView />
}

export default SupportTicketPage
