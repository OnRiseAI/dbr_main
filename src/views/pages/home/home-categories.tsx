// Next Imports
import Link from 'next/link'

// Type Imports
import type { Category } from '@/types/product'

// Component Imports
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import ContentLayout from '@/components/layout/content-layout'
import CategoryCard from '@/views/pages/home/category-card'

type Props = {
  categories: Category[]
}

const HomeCategories = ({ categories }: Props) => {
  return (
    <section className='pt-8 sm:pt-16 lg:pt-24'>
      <ContentLayout className='space-y-8'>
        <div className='flex items-center justify-between'>
          <h3 className='text-2xl font-bold sm:text-3xl'>Shop by Categories</h3>
          <Link href='/category' className='text-primary text-lg font-medium underline-offset-3 hover:underline'>
            View All
          </Link>
        </div>

        <Carousel opts={{ align: 'start', slidesToScroll: 1 }} className='relative'>
          <CarouselContent>
            {categories.map(category => (
              <CarouselItem
                key={category.name}
                className='basis-1/1 focus-visible:outline-none sm:basis-1/2 md:basis-1/3 lg:basis-1/5 xl:basis-1/6'
              >
                <CategoryCard category={category} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className='left-0 size-7.5 border-0 bg-transparent sm:-left-4 xl:-left-1 [&_svg]:size-6!' />
          <CarouselNext className='right-0 size-7.5 border-0 bg-transparent sm:-right-4 xl:-right-1 [&_svg]:size-6!' />
        </Carousel>
      </ContentLayout>
    </section>
  )
}

export default HomeCategories
