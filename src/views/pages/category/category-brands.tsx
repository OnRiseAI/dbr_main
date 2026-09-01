'use client'

// Next Imports
import Link from 'next/link'

// Third-party Imports
import { ArrowRightIcon } from 'lucide-react'

// Component Imports
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import ContentLayout from '@/components/layout/content-layout'

type BrandCard = {
  id: string
  name: string
  image: string
  logoIndex: number
  href: string
}

const brands: BrandCard[] = [
  {
    id: 'calvin-klein',
    name: 'Calvin Klein',
    image: '/images/category-listing/global-brand-01.webp',
    logoIndex: 1,
    href: '/shop?brand=Clothing'
  },
  {
    id: 'nautica',
    name: 'Nautica',
    image: '/images/category-listing/global-brand-02.webp',
    logoIndex: 2,
    href: '/shop?brand=Beauty+%26+Skincare'
  },
  {
    id: 'coach',
    name: 'Coach',
    image: '/images/category-listing/global-brand-03.webp',
    logoIndex: 3,
    href: '/shop?brand=Watches'
  },
  {
    id: 'fossil',
    name: 'Fossil',
    image: '/images/category-listing/global-brand-04.webp',
    logoIndex: 4,
    href: '/shop?brand=Clothing'
  }
]

const CategoryBrands = () => {
  return (
    <section className='py-8 sm:py-12 lg:py-14'>
      <ContentLayout>
        <Carousel opts={{ align: 'start' }} className='relative'>
          <div className='mb-8 flex items-center justify-between'>
            <h2 className='text-2xl font-bold sm:text-3xl'>Grand Global Brands</h2>
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
            {/* Promo Card - First Item */}
            <CarouselItem className='basis-full pl-2 md:basis-1/3 md:pl-4 lg:basis-1/4'>
              <div className='relative z-1 flex h-full flex-col justify-between overflow-hidden rounded-md p-6'>
                {/* Blur Background Image */}
                <img
                  src='/images/category-listing/bg-gradient-layer.webp'
                  alt='Background blur'
                  className='absolute inset-0 -z-1 h-full w-full object-cover'
                />

                {/* Content */}
                <div className='relative z-1 flex h-full flex-col justify-between'>
                  <div className='space-y-2.5'>
                    <h3 className='dark:text-primary-foreground text-2xl font-semibold lg:text-3xl xl:text-4xl'>
                      Biggest Deals on Top Brands
                    </h3>
                    <p className='text-lg text-black'>Shop premium brands you love.</p>
                  </div>
                  <Button
                    render={<Link href='/shop' />}
                    nativeButton={false}
                    size='lg'
                    className='dark:text-primary dark:bg-primary-foreground dark:hover:bg-primary-foreground/80 w-fit'
                  >
                    Shop by Brands
                    <ArrowRightIcon className='size-4' />
                  </Button>
                </div>
              </div>
            </CarouselItem>

            {/* Brand Cards */}
            {brands.map(brand => (
              <CarouselItem key={brand.id} className='basis-1/1 pl-2 sm:basis-1/2 md:basis-1/3 md:pl-4 lg:basis-1/4'>
                <Link href={brand.href} className='group block'>
                  <div className='flex flex-col items-center justify-start gap-4 overflow-hidden rounded-xl border pb-4'>
                    <div className='bg-muted flex w-full items-center justify-center overflow-hidden border-b transition-colors'>
                      <img src={brand.image} alt={brand.name} className='w-full max-w-64 object-cover' />
                    </div>

                    <div className='self-start px-4'>
                      {/* Light Mode */}
                      <img
                        src={`/images/category-listing/brand-logo-0${brand.logoIndex}.webp`}
                        alt={brand.name}
                        className='block h-8.5 w-23.5 object-contain dark:hidden'
                      />
                      {/* Dark Mode */}
                      <img
                        src={`/images/category-listing/brand-logo-0${brand.logoIndex}-dark.webp`}
                        alt={brand.name}
                        className='hidden h-8.5 w-23.5 object-contain dark:block'
                      />
                    </div>
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

export default CategoryBrands
