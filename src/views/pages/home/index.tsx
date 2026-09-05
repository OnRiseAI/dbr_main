// Type Imports
import type { Product, Category } from '@/types/product'

// Component Imports
import HomeHero from '@/views/pages/home/home-hero'
import HomeTrust from '@/views/pages/home/home-trust'
import HomeCategories from '@/views/pages/home/home-categories'
import HomeProductRow from '@/views/pages/home/home-product-row'
import HomePenBreakdown from '@/views/pages/home/home-pen-breakdown'
import HomeHowToUse from '@/views/pages/home/home-how-to-use'
import HomeCalculator from '@/views/pages/home/home-calculator'
import HomeFormatChooser from '@/views/pages/home/home-format-chooser'
import HomeFaq from '@/views/pages/home/home-faq'
import HomeFormatCompare from '@/views/pages/home/home-format-compare'

type Props = {
  categories: Category[]
  pens: Product[]
  vials: Product[]
}

const HomeView = ({ categories, pens, vials }: Props) => {
  return (
    <>
      <HomeHero products={[...pens, ...vials]} />
      <HomeTrust />

      {/* The shop: one muted band, white cards lift off it. */}
      <div className='bg-muted pb-8 sm:pb-16 lg:pb-24'>
        <HomeCategories categories={categories} />
        <HomeProductRow
          title='Pens'
          subtitle='Pre-filled, ready straight from the fridge.'
          href='/shop?category=Pens'
          products={pens}
        />
        <HomeProductRow
          title='Vials'
          subtitle='Lyophilised, reconstitute before use.'
          href='/shop?category=Vials'
          products={vials}
        />
      </div>

      {/* The pen story and the calculator, on white. */}
      <HomePenBreakdown />
      <HomeHowToUse />
      <HomeCalculator />

      {/* Closing band. */}
      <div className='bg-muted'>
        <HomeFormatChooser />
        <HomeFaq />
      </div>

      {/* Candidate to replace "Inside every pen" above; sits at the bottom for review. */}
      <HomeFormatCompare />
    </>
  )
}

export { HomeView }
