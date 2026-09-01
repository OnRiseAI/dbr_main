'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'

// Third-party Imports
import { ArrowRightIcon } from 'lucide-react'

// Type Imports
import type { HeroProduct02 } from '@/fake-db/hero-layout'

// Component Imports
import { Button } from '@/components/ui/button'
import ContentLayout from '@/components/layout/content-layout'

// Utils Imports
import { cn } from '@/lib/utils'

interface Props {
  product: HeroProduct02
}

const HomeHeroLayout02 = ({ product }: Props) => {
  const [selectedVariant, setSelectedVariant] = useState(0)

  const currentVariant = product.variants[selectedVariant]

  return (
    <section className={cn('py-8 sm:py-10 lg:py-14', product.bgClass)}>
      <ContentLayout>
        <div className='relative rounded-lg'>
          <div className='relative grid grid-cols-1 gap-8 lg:grid-cols-3'>
            {/* Left: Content */}
            <div className='flex flex-col justify-start gap-8 pb-0 max-lg:h-fit lg:col-span-2'>
              <div className='space-y-4'>
                <div className='dark:text-primary-foreground space-y-4'>
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

              {/* Variant Thumbnails */}
              <div className='flex flex-wrap items-center justify-start gap-4'>
                {product.variants.map((variant, idx) => (
                  <div key={idx} className='relative'>
                    <Button
                      variant='link'
                      onClick={() => setSelectedVariant(idx)}
                      className={cn(
                        'h-35.5 w-25 flex-col gap-4 overflow-hidden rounded-full p-1.5 transition-all hover:no-underline',
                        idx === selectedVariant ? 'border-foreground dark:border-background' : 'border-black/8'
                      )}
                    >
                      <img src={variant.image} alt={`Variant ${idx + 1}`} className='h-18.5 w-16 object-cover' />
                      {variant.price && (
                        <p className='dark:text-primary-foreground text-sm font-medium'>${variant.price}</p>
                      )}
                    </Button>
                    {idx === selectedVariant && (
                      <Button
                        size='icon-sm'
                        className='bg-destructive hover:bg-destructive/90 absolute right-0 bottom-0 size-7.25 rounded-full text-white'
                        render={<Link href='/shop' />}
                        nativeButton={false}
                      >
                        <ArrowRightIcon className='size-4 -rotate-45' />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Product Image with Discount Badge */}
            <div className='relative z-1 flex items-center justify-center'>
              <img
                src={currentVariant.image}
                alt={product.title}
                className={cn(
                  'size-auto object-cover transition-opacity duration-300 max-lg:mx-auto',
                  product.imgClass
                )}
              />

              <div className='absolute left-[20%] -z-1 size-60 lg:top-[15%] lg:left-[-20%]'>
                <img
                  src='/images/landing-page/hero-layout/image-17.webp'
                  alt='shadcn bg layer'
                  className='animation-duration-[10s] animate-spin'
                />
              </div>

              {/* Discount Badge */}
              {currentVariant.discount && (
                <div className='absolute right-18 bottom-10'>
                  <img
                    src={
                      currentVariant.discount === 20
                        ? '/images/landing-page/hero-layout/image-16.webp'
                        : '/images/landing-page/hero-layout/image-15.webp'
                    }
                    alt={`${currentVariant.discount}% discount`}
                    className='size-24 drop-shadow-lg'
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </ContentLayout>
    </section>
  )
}

export default HomeHeroLayout02
