// Next Imports
import type { Metadata } from 'next'

// Component Imports
import { HeroLayout01View } from '@/views/pages/home/hero-layout-01'

// Data Imports
import { getHomeData, getHeroLayoutProducts } from '@/app/server/actions'

export const metadata: Metadata = {
  title: 'Hero Layout 01 | Shop',
  description: 'Premium products showcase with featured hero carousel.'
}

const HeroLayout01Page = async () => {
  const { categories, dealsOfTheDay, newArrivals, popularProducts, brands } = await getHomeData()
  const heroLayoutProducts = await getHeroLayoutProducts()

  return (
    <HeroLayout01View
      heroLayoutProducts={heroLayoutProducts}
      categories={categories}
      dealsOfTheDay={dealsOfTheDay}
      newArrivals={newArrivals}
      popularProducts={popularProducts}
      brands={brands}
    />
  )
}

export default HeroLayout01Page
