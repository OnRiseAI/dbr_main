// Next Imports
import type { Metadata } from 'next'

// Component Imports
import { HelpView } from '@/views/pages/help'

// Data Imports
import { getHelpTopics, getHelpFaqs } from '@/app/server/actions'

// Utils Imports
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Help Center',
  description: 'Get help with shipping, orders, payments, returns, and more. Browse topics or reach our support team.',
  url: '/help'
})

const HelpPage = async () => {
  const helpTopics = await getHelpTopics()
  const helpFaqs = await getHelpFaqs()

  return <HelpView helpTopics={helpTopics} helpFaqs={helpFaqs} />
}

export default HelpPage
