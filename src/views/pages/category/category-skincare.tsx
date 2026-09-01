'use client'

// Next Imports
import Link from 'next/link'

// Component Imports
import { Badge } from '@/components/ui/badge'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import ContentLayout from '@/components/layout/content-layout'

type SkinCareProduct = {
  id: string
  name: string
  brand: string
  image: string
  href: string
}

const skinCareProducts: SkinCareProduct[] = [
  {
    id: 'skincare-kit',
    name: 'Skincare Routine Kit',
    brand: 'Gabbit',
    image: '/images/category-listing/beauty-01.webp',
    href: '/shop?category=Beauty+%26+Skincare'
  },
  {
    id: 'glow-powder',
    name: 'Natural Glow Powder',
    brand: 'Ponds',
    image: '/images/category-listing/beauty-02.webp',
    href: '/shop?category=Beauty+%26+Skincare'
  },
  {
    id: 'micellar-water',
    name: 'Micellar Water',
    brand: 'Ponds',
    image: '/images/category-listing/beauty-03.webp',
    href: '/shop?category=Beauty+%26+Skincare'
  },
  {
    id: 'sleep-mask',
    name: 'Rice Sleep Mask',
    brand: 'Glown',
    image: '/images/category-listing/beauty-04.webp',
    href: '/shop?category=Beauty+%26+Skincare'
  },
  {
    id: 'sunscreen',
    name: 'Sunscreen SPF 50',
    brand: 'Clayco.',
    image: '/images/category-listing/beauty-05.webp',
    href: '/shop?category=Beauty+%26+Skincare'
  },
  {
    id: 'skincare-kit-2',
    name: 'Skincare Routine Kit',
    brand: 'Gabbit',
    image: '/images/category-listing/beauty-01.webp',
    href: '/shop?category=Beauty+%26+Skincare'
  },
  {
    id: 'glow-powder-2',
    name: 'Natural Glow Powder',
    brand: 'Ponds',
    image: '/images/category-listing/beauty-02.webp',
    href: '/shop?category=Beauty+%26+Skincare'
  },
  {
    id: 'micellar-water-2',
    name: 'Micellar Water',
    brand: 'Ponds',
    image: '/images/category-listing/beauty-03.webp',
    href: '/shop?category=Beauty+%26+Skincare'
  }
]

const CategorySkincare = () => {
  return (
    <section className='py-8 sm:py-12 lg:py-14'>
      <ContentLayout>
        <Carousel opts={{ align: 'start' }} className='relative'>
          <div className='mb-6 flex items-center justify-between'>
            <h2 className='text-2xl font-bold sm:text-3xl'>Beauty & Skincare</h2>
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
            {skinCareProducts.map(product => (
              <CarouselItem key={product.id} className='basis-1/1 pl-2 sm:basis-1/2 md:basis-1/3 md:pl-4 lg:basis-1/4'>
                <Link href={product.href} className='group block'>
                  <div className='flex flex-col items-center justify-start gap-4 overflow-hidden rounded-xl border pb-4'>
                    <div className='bg-muted relative flex w-full items-center justify-center overflow-hidden border-b transition-colors'>
                      <img src={product.image} alt={product.name} className='w-full max-w-64 object-cover' />
                      <Badge className='absolute top-2 right-2' variant='outline'>
                        {product.brand}
                      </Badge>
                    </div>

                    <div className='w-full self-start px-4 text-start'>
                      <p className='text-lg font-semibold'>{product.name}</p>
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

export default CategorySkincare
