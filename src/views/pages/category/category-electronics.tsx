'use client'

// Next Imports
import Link from 'next/link'

// Component Imports
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import ContentLayout from '@/components/layout/content-layout'

type CategoryCard = {
  id: string
  name: string
  image: string
  href: string
}

const categories: CategoryCard[] = [
  {
    id: 'smart-watches',
    name: 'Smart Watches',
    image: '/images/category-listing/electronic-01.webp',
    href: '/shop?category=Electronics'
  },
  {
    id: 'headphones',
    name: 'Headphones',
    image: '/images/category-listing/electronic-02.webp',
    href: '/shop?category=Electronics'
  },
  {
    id: 'speakers',
    name: 'Speakers',
    image: '/images/category-listing/electronic-03.webp',
    href: '/shop?category=Electronics'
  },
  {
    id: 'television',
    name: 'Television',
    image: '/images/category-listing/electronic-04.webp',
    href: '/shop?category=Electronics'
  },
  {
    id: 'refrigerator',
    name: 'Refrigerator',
    image: '/images/category-listing/electronic-05.webp',
    href: '/shop?category=Electronics'
  },
  {
    id: 'watches',
    name: 'Watches',
    image: '/images/category-listing/electronic-01.webp',
    href: '/shop?category=Electronics'
  }
]

const CategoryElectronics = () => {
  return (
    <section className='py-8 sm:py-12 lg:py-14'>
      <ContentLayout>
        <Carousel opts={{ align: 'start' }} className='relative'>
          <div className='mb-6 flex items-center justify-between'>
            <h3 className='text-2xl font-bold sm:text-3xl'>Electronics Categories</h3>
            <div className='flex gap-1'>
              <CarouselPrevious
                variant='ghost'
                size='icon-sm'
                className='static size-7.5 translate-y-0 [&_svg]:size-6!'
              />
              <CarouselNext variant='ghost' size='icon-sm' className='static size-7.5 translate-y-0 [&_svg]:size-6!' />
            </div>
          </div>

          <CarouselContent className='-ml-2 md:-ml-4'>
            {categories.map(category => (
              <CarouselItem key={category.id} className='basis-1/1 pl-2 sm:basis-1/2 md:basis-1/3 md:pl-4 lg:basis-1/4'>
                <Link href={category.href} className='group block'>
                  <div className='flex flex-col items-center justify-start gap-4 overflow-hidden rounded-xl border pb-4'>
                    <div className='bg-muted flex aspect-square w-full items-center justify-center overflow-hidden border-b transition-colors'>
                      <img src={category.image} alt={category.name} className='w-full max-w-64 object-cover' />
                    </div>
                    <p className='self-start px-4 text-lg font-semibold'>{category.name}</p>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </ContentLayout>
    </section>
  )
}

export default CategoryElectronics
