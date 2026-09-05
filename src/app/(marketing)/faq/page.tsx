// Next Imports
import type { Metadata } from 'next'

// Component Imports
import { FaqView } from '@/views/pages/faq'

// Data Imports
import { FAQ_GROUPS } from '@/views/pages/faq/faq-data'

// Utils Imports
import { generateMetadata as generateSEOMetadata, combineSchemas } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'FAQ',
  description:
    'Answers on ordering and payment, dispatch from Germany, using the pens and vials, Certificates of Analysis, and trade or referral partnerships with Deep Beauty Research.',
  url: '/faq'
})

const FaqPage = () => {
  const jsonLd = combineSchemas({
    '@type': 'FAQPage',
    mainEntity: FAQ_GROUPS.flatMap(group =>
      group.items.map(item => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a
        }
      }))
    )
  })

  return (
    <>
      <FaqView />

      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')
        }}
      />
    </>
  )
}

export default FaqPage
