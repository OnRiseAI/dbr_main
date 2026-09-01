// Next Imports
import type { Metadata } from 'next'

// Component Imports
import { FaqView } from '@/views/pages/faq'

// Data Imports
import { getFaqCategories } from '@/app/server/actions'

// Utils Imports
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'FAQ',
  description: 'Find answers to the most commonly asked questions about shipping, orders, payments, returns, and more.',
  url: '/faq'
})

const FaqPage = async () => {
  const faqCategories = await getFaqCategories()

  return <FaqView faqCategories={faqCategories} />
}

export default FaqPage
