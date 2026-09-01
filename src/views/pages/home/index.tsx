// Type Imports
import type { Product, Category, Brand } from '@/types/product'

// Component Imports
import HomeHero from '@/views/pages/home/home-hero'
import HomeCategories from '@/views/pages/home/home-categories'
import HomeDeals from '@/views/pages/home/home-deals'
import HomeBrands from '@/views/pages/home/home-brands'
import HomeNewArrivals from '@/views/pages/home/home-new-arrivals'
import HomePopularProducts from '@/views/pages/home/home-popular-products'
import HomeCTA from '@/views/pages/home/home-cta'
import HomeBenefits from '@/views/pages/home/home-benefits'
import HomeCarousel from '@/views/pages/home/home-carousel'

type Props = {
  categories: Category[]
  dealsOfTheDay: Product[]
  newArrivals: Product[]
  popularProducts: Product[]
  brands: Brand[]
}

const HomeView = ({ categories, dealsOfTheDay, newArrivals, popularProducts, brands }: Props) => {
  return (
    <>
      <HomeHero />
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

export { HomeView }
