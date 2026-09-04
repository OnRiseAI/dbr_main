// Next Imports
import type { Metadata } from 'next'

// Component Imports
import { HomeView } from '@/views/pages/home'

// Utils Imports
import { generateMetadata as generateSEOMetadata, combineSchemas, generateWebsiteSchema } from '@/lib/seo'

// Data Imports
import { getHomeData } from '@/app/server/actions'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Home',
  description: 'Deep Beauty Research: pre-filled Retatrutide and GHK-Cu pens plus lyophilised vials, dispatched from Germany.',
  url: '/'
})

const Home = async () => {
  const { categories, pens, vials } = await getHomeData()

  const jsonLd = combineSchemas(generateWebsiteSchema())

  return (
    <>
      <HomeView categories={categories} pens={pens} vials={vials} />

      {/* Add JSON-LD to your page */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')
        }}
      />
    </>
  )
}

export default Home
