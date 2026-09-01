'use client'

// Third-party Imports
import { ArrowRightIcon } from 'lucide-react'

// Component Imports
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MotionPreset } from '@/components/ui/motion-preset'
import ContentLayout from '@/components/layout/content-layout'

type Props = {
  onSelectCategory: (category: string) => void
}

const ProductListBanner = ({ onSelectCategory }: Props) => {
  return (
    <section className='py-8 lg:py-14'>
      <ContentLayout>
        <div className='grid items-start overflow-hidden rounded-md border bg-linear-to-r from-[#C1DBDC] via-[#C6DBE3] to-[#6BABD7] max-md:px-6 max-md:pt-10 md:min-h-94 md:grid-cols-5 md:ps-10 md:pt-10'>
          <div className='space-y-4 md:col-span-3'>
            <Badge variant='secondary' className='text-xs font-medium'>
              ⚡ Deals of the Day
            </Badge>
            <h3 className='dark:text-primary-foreground mb-2 text-3xl font-bold lg:text-4xl xl:text-5xl'>
              Modern Smartwatches for Life on the Move
            </h3>
            <p className='text-muted-foreground dark:text-primary-foreground text-lg'>
              Designed to support daily routines, fitness goals, and connected living, these smartwatches combine
              functionality.
            </p>
            <Button size='lg' variant='secondary' className='group' onClick={() => onSelectCategory('Watches')}>
              Purchase Now
              <ArrowRightIcon className='transition-all duration-300 group-hover:translate-x-1' />
            </Button>
          </div>
          <div className='mx-auto mt-auto md:col-span-2 md:mr-auto md:-ml-4'>
            <MotionPreset
              fade
              blur
              slide={{ direction: 'down', offset: 70 }}
              delay={0.7}
              transition={{ duration: 0.5 }}
            >
              <img src='/images/product-listing/list-product-7.webp' alt='Smartwatch' className='w-auto' />
            </MotionPreset>
          </div>
        </div>
      </ContentLayout>
    </section>
  )
}

export default ProductListBanner
