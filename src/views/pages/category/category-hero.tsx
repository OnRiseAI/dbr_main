'use client'

// Next Imports
import Link from 'next/link'

// Third-party Imports
import { ArrowRightIcon } from 'lucide-react'
import Autoplay from 'embla-carousel-autoplay'

// Component Imports
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import ContentLayout from '@/components/layout/content-layout'

const CategoryHero = () => {
  return (
    <section className='py-8 sm:py-12 lg:py-14'>
      <ContentLayout>
        <Carousel
          opts={{ loop: true }}
          plugins={[Autoplay({ delay: 2000, stopOnInteraction: true })]}
          className='relative'
        >
          <CarouselContent>
            {/* Card 1: Moisturizer */}
            <CarouselItem>
              <div className='bg-primary dark:bg-primary-foreground flex h-full justify-center rounded-md'>
                <div className='relative z-1 grid w-full items-center overflow-hidden max-md:px-6 max-md:pt-10 md:min-h-94 md:grid-cols-2 md:ps-10'>
                  <div className='my-auto space-y-4'>
                    <h3 className='text-3xl font-bold text-white lg:text-4xl'>
                      Your Next Moisturizer to Keep Your Skin Healthy
                    </h3>
                    <p className='text-lg text-white'>
                      Find pieces that inspire from relaxed essentials to standout statements all crafted to elevate
                      your daily style.
                    </p>
                    <Button render={<Link href='/shop' />} size='lg' nativeButton={false} variant='secondary'>
                      See What&apos;s New
                      <ArrowRightIcon />
                    </Button>
                  </div>
                  <div className='mx-auto mt-auto'>
                    <img
                      src='/images/category-listing/category-hero-01.webp'
                      alt='Nivea Cream'
                      className='max-lg:max-w-50 max-md:mt-10 md:w-auto'
                    />
                    {/* Add blur image here */}
                    <img
                      src='/images/category-listing/category-hero-blur-01.webp'
                      alt='Bg Blur layer'
                      className='absolute bottom-0 left-[35%] -z-1 h-full max-lg:hidden'
                    />
                  </div>
                </div>
              </div>
            </CarouselItem>

            {/* Card 2: Samsung Mobile */}
            <CarouselItem>
              <div className='flex h-full justify-center rounded-md bg-linear-to-r from-[#CBE8D2] to-[#FFFDD3]'>
                <div className='grid w-full items-center max-md:px-6 max-md:pt-10 md:min-h-94 md:grid-cols-2 md:ps-10'>
                  <div className='dark:text-primary-foreground my-auto space-y-4'>
                    <h3 className='text-3xl font-bold lg:text-4xl'>Samsung Galaxy M06 5G Mobile</h3>
                    <p className='text-lg'>
                      Monster processor - Segment Leading MediaTek Dimensity 6300, AnTuTu score 422k+, Latest Android 15
                      Operating System.
                    </p>
                    <Button render={<Link href='/shop' />} size='lg' nativeButton={false} variant='secondary'>
                      See What&apos;s New
                      <ArrowRightIcon />
                    </Button>
                  </div>
                  <div className='mx-auto mt-auto'>
                    <img src='/images/category-listing/category-hero-02.webp' alt='Samsung Galaxy M06' />
                  </div>
                </div>
              </div>
            </CarouselItem>

            {/* Card 3: Skincare */}
            <CarouselItem>
              <div className='flex h-full justify-center rounded-md bg-linear-to-r from-[#A9E1FB] to-[#D6F2FD]'>
                <div className='relative z-1 grid w-full items-center max-md:px-6 max-md:pt-10 md:min-h-94 md:grid-cols-2 md:ps-10'>
                  <div className='dark:text-primary-foreground my-auto space-y-4'>
                    <h3 className='text-3xl font-bold lg:text-4xl'>Your Next Moisturizer to Keep Your Skin Healthy</h3>
                    <p className='leading-xl text-lg'>
                      Find pieces that inspire from relaxed essentials to standout statements all crafted to elevate
                      your daily style.
                    </p>
                    <Button render={<Link href='/shop' />} size='lg' nativeButton={false} variant='secondary'>
                      See What&apos;s New
                      <ArrowRightIcon />
                    </Button>
                  </div>
                  <div className='mx-auto mt-auto'>
                    <img src='/images/category-listing/category-hero-03.webp' alt='Moisturizer' className='w-auto' />
                    {/* Add blur image here */}
                    <img
                      src='/images/category-listing/category-hero-blur-02.webp'
                      alt='Bg Blur layer'
                      className='absolute bottom-0 left-1/2 -z-1 h-full -translate-x-1/2'
                    />
                  </div>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </ContentLayout>
    </section>
  )
}

export default CategoryHero
