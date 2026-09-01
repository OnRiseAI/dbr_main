// Next Imports
import type { Metadata } from 'next'

// Component Imports
import ContentCard from '@/components/layout/content-card'
import { CompareView } from '@/views/pages/compare'

// Utils Imports
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Compare Products',
  description: 'Compare Shopix products side by side across price, specs, and features to find the right match.',
  url: '/compare'
})

const ComparePage = () => {
  return (
    <ContentCard>
      <CompareView />
    </ContentCard>
  )
}

export default ComparePage
