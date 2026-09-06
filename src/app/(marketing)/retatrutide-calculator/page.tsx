// Next Imports
import type { Metadata } from 'next'

// Component Imports
import RetatrutideCalculatorView, { CALCULATOR_FAQ } from '@/views/pages/retatrutide-calculator'

// Utils Imports
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Retatrutide Calculator: weight goal, weeks and pen clicks',
  description:
    'Work out how long it takes to reach your goal weight on Retatrutide, how many pens you need, and how many clicks or units a dose is. Based on real client results.',
  url: '/retatrutide-calculator',
  keywords: [
    'retatrutide calculator',
    'retatrutide dose calculator',
    'retatrutide pen clicks',
    'retatrutide weight loss calculator',
    'how long retatrutide',
    'retatrutide units'
  ]
})

const RetatrutideCalculatorPage = () => {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: CALCULATOR_FAQ.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer }
    }))
  }

  return (
    <>
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <RetatrutideCalculatorView />
    </>
  )
}

export default RetatrutideCalculatorPage
