'use client'

// React Imports
import { useState, useEffect } from 'react'

// Next Imports
import Link from 'next/link'

// Third-party Imports
import { ArrowRightIcon } from 'lucide-react'
import Autoplay from 'embla-carousel-autoplay'

// Type Imports
import type { CarouselApi } from '@/components/ui/carousel'
import type { HeroProduct } from '@/fake-db/hero-layout'

// Component Imports
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel'
import ContentLayout from '@/components/layout/content-layout'

// Utils Imports
import { cn } from '@/lib/utils'

interface Props {
  products: HeroProduct[]
}

const HomeHeroLayout01 = ({ products }: Props) => {
  const [api, setApi] = useState<CarouselApi>()
  const [selectedVariant, setSelectedVariant] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!api) return

    api.on('select', () => {
      setCurrentIndex(api.selectedScrollSnap())
      setSelectedVariant(0)
    })
  }, [api])

  const currentProduct = products[currentIndex]

  return (
    <section className='pt-8 sm:pt-10 lg:pt-14'>
      <ContentLayout>
        <div className={cn('relative rounded-lg', currentProduct.bgClass)}>
          <Carousel
            opts={{
              align: 'start',
              loop: true
            }}
            plugins={[
              Autoplay({
                delay: 6000000
              })
            ]}
            setApi={setApi}
            className='lg:h-full'
          >
            <CarouselContent className='relative ml-0 h-fit lg:h-93.75'>
              {products.map(product => (
                <CarouselItem key={product.id} className='p-0 max-lg:h-fit'>
                  <div className='relative grid grid-cols-1 lg:h-full lg:grid-cols-3 lg:gap-8'>
                    {/* Left: Content */}
                    <div className='flex flex-col justify-start space-y-4 p-4 pb-0 max-lg:h-fit max-lg:items-center sm:p-8 lg:col-span-2 lg:p-10 lg:pr-0'>
                      <div className='dark:text-primary-foreground w-fit space-y-4 max-lg:text-center'>
                        <h2 className='max-w-xl text-2xl font-semibold sm:text-3xl md:font-bold lg:text-4xl'>
                          {product.title}
                        </h2>
                        <p className='max-w-xl text-base sm:text-lg'>{product.description}</p>
                      </div>

                      <Button
                        render={<Link href={product.buttonLink} />}
                        nativeButton={false}
                        size='lg'
                        variant='outline'
                        className='hover:bg-foreground dark:hover:bg-primary-foreground hover:text-background dark:hover:text-primary dark:text-primary-foreground dark:bg-foreground group w-fit'
                      >
                        {product.buttonText}
                        <ArrowRightIcon className='size-4 transition-transform duration-300 group-hover:translate-x-1/4' />
                      </Button>
                    </div>

                    {/* Right: Product Image */}
                    {/* Main Image */}
                    <div>
                      <img
                        src={product.mainImages?.[selectedVariant] ?? product.variantImages[selectedVariant]}
                        alt={product.title}
                        className={cn(
                          'size-auto object-cover transition-opacity duration-300 max-lg:mx-auto',
                          product.imgClass
                        )}
                      />
                    </div>

                    {/* Variant Thumbnails */}
                    <div className='absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center justify-center gap-2.5'>
                      {product.variantImages.map((variant, idx) => (
                        <Button
                          key={idx}
                          variant='link'
                          onClick={() => setSelectedVariant(idx)}
                          className={cn(
                            'size-15 overflow-hidden rounded-lg border-2 bg-white p-1.5 transition-all lg:size-19',
                            idx === selectedVariant
                              ? 'border-foreground dark:border-background shadow-md'
                              : 'border-black/8'
                          )}
                        >
                          <img src={variant} alt={`Variant ${idx + 1}`} className='object-cover lg:h-16 lg:w-16' />
                        </Button>
                      ))}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className='dark:text-primary-foreground left-2 size-8 border-0 bg-white shadow-md sm:-left-4 md:-left-4 dark:bg-white dark:hover:bg-white [&_svg]:size-6!' />
            <CarouselNext className='dark:text-primary-foreground right-2 size-8 border-0 bg-white shadow-md sm:-right-4 md:-right-4 dark:bg-white dark:hover:bg-white [&_svg]:size-6!' />
          </Carousel>
        </div>
      </ContentLayout>
    </section>
  )
}

export default HomeHeroLayout01
