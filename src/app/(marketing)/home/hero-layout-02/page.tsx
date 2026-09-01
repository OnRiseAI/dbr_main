// Next Imports
import type { Metadata } from 'next'

// Component Imports
import { HeroLayout02View } from '@/views/pages/home/hero-layout-02'

// Data Imports
import { getHomeData } from '@/app/server/actions'

export const metadata: Metadata = {
  title: 'Hero Layout 02 | Shop',
  description: 'Premium products showcase with featured hero carousel.'
}

const HeroLayout02Page = async () => {
  const { categories, dealsOfTheDay, newArrivals, popularProducts, brands } = await getHomeData()

  return (
    <HeroLayout02View
      categories={categories}
      dealsOfTheDay={dealsOfTheDay}
      newArrivals={newArrivals}
      popularProducts={popularProducts}
      brands={brands}
    />
  )
}

export default HeroLayout02Page
