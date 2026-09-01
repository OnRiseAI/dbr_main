// Type Imports
import type { Product, Category, Brand } from '@/types/product'
import type { HeroProduct } from '@/fake-db/hero-layout'

// Component Imports
import HomeHeroLayout01 from '@/views/pages/home/home-hero-layout-01'
import HomeCategories from '@/views/pages/home/home-categories'
import HomeDeals from '@/views/pages/home/home-deals'
import HomeBrands from '@/views/pages/home/home-brands'
import HomeNewArrivals from '@/views/pages/home/home-new-arrivals'
import HomeCarousel from '@/views/pages/home/home-carousel'
import HomeCTA from '@/views/pages/home/home-cta'
import HomePopularProducts from '@/views/pages/home/home-popular-products'
import HomeBenefits from '@/views/pages/home/home-benefits'

type Props = {
  heroLayoutProducts: HeroProduct[]
  categories: Category[]
  dealsOfTheDay: Product[]
  newArrivals: Product[]
  popularProducts: Product[]
  brands: Brand[]
}

const HeroLayout01View = ({
  heroLayoutProducts,
  categories,
  dealsOfTheDay,
  newArrivals,
  popularProducts,
  brands
}: Props) => {
  return (
    <>
      <HomeHeroLayout01 products={heroLayoutProducts} />
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

export { HeroLayout01View }
export default HeroLayout01View
