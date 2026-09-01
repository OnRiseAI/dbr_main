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
  description: 'Shop the latest deals, new arrivals, and featured products across electronics, fashion, and more.',
  url: '/'
})

const Home = async () => {
  const { categories, dealsOfTheDay, newArrivals, popularProducts, brands } = await getHomeData()

  const jsonLd = combineSchemas(generateWebsiteSchema())

  return (
    <>
      <HomeView
        categories={categories}
        dealsOfTheDay={dealsOfTheDay}
        newArrivals={newArrivals}
        popularProducts={popularProducts}
        brands={brands}
      />

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
