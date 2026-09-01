// Type Imports
import type { Product, Category, Brand } from '@/types/product'

// Component Imports
import HomeHeroLayout02 from '@/views/pages/home/home-hero-layout-02'
import HomeCategories from '@/views/pages/home/home-categories'
import HomeDeals from '@/views/pages/home/home-deals'
import HomeBrands from '@/views/pages/home/home-brands'
import HomeNewArrivals from '@/views/pages/home/home-new-arrivals'
import HomeCarousel from '@/views/pages/home/home-carousel'
import HomeCTA from '@/views/pages/home/home-cta'
import HomePopularProducts from '@/views/pages/home/home-popular-products'
import HomeBenefits from '@/views/pages/home/home-benefits'

// Data Imports
import { heroLayout02 } from '@/fake-db/hero-layout'

type Props = {
  categories: Category[]
  dealsOfTheDay: Product[]
  newArrivals: Product[]
  popularProducts: Product[]
  brands: Brand[]
}

const HeroLayout02View = ({ categories, dealsOfTheDay, newArrivals, popularProducts, brands }: Props) => {
  return (
    <>
      <HomeHeroLayout02 product={heroLayout02} />
      <HomeCategories categories={categories} />
      <HomeDeals products={dealsOfTheDay} />
      <HomeBrands brands={brands} />
      <HomeNewArrivals products={newArrivals} />
      <HomeCTA />
      <HomePopularProducts products={popularProducts} />
      <HomeCarousel />
      <HomeBenefits />
    </>
  )
}

export { HeroLayout02View }
export default HeroLayout02View
