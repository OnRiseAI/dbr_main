// Next Imports
import type { Metadata } from 'next'

// Component Imports
import BulkOrdersView, { BULK_FAQ } from '@/views/pages/bulk-orders'

// Utils Imports
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Buy Peptides in Bulk: wholesale Retatrutide, GHK-Cu pens and vials from Germany',
  description:
    'Bulk and wholesale peptide orders from German stock. Retatrutide, GHK-Cu, MOTS-c, Melanotan and Selank pens and vials at volume pricing. No minimum order, quote within one business day, batch documentation with every delivery.',
  url: '/bulk-orders',
  keywords: [
    'buy peptides in bulk',
    'bulk peptides',
    'wholesale peptides',
    'wholesale retatrutide',
    'retatrutide bulk order',
    'bulk ghk-cu',
    'peptide wholesale germany',
    'bulk peptide pens'
  ]
})

const BulkOrdersPage = () => {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: BULK_FAQ.map(item => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } }))
  }

  return (
    <>
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <BulkOrdersView />
    </>
  )
}

export default BulkOrdersPage
