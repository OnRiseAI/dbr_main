// Next Imports
import type { Metadata } from 'next'

// Component Imports
import { AboutView } from '@/views/pages/about'

// Utils Imports
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'About',
  description:
    'Deep Beauty Research is a German peptide wholesaler of seven years, now selling direct. Every lot tested twice, greater than 99% purity, CoA in every box.',
  url: '/about'
})

const AboutPage = () => {
  return <AboutView />
}

export default AboutPage
