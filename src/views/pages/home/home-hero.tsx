// Next Imports
import Link from 'next/link'

// Third-party Imports
import { ArrowRightIcon } from 'lucide-react'

// Component Imports
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { MotionPreset } from '@/components/ui/motion-preset'
import ContentLayout from '@/components/layout/content-layout'

const ctaButtonClass =
  'hover:bg-foreground dark:hover:bg-foreground hover:text-background dark:hover:text-background group'

const HomeHero = () => {
  return (
    <section className='scroll-mt-(--header-height) pt-8 sm:pt-10 lg:pt-14' id='hero-section'>
      <ContentLayout>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {/* Macbook */}
          <Card className='bg-muted shadow-none ring-0'>
            <CardContent className='space-y-4'>
              <div className='space-y-2'>
                <h2 className='text-4xl font-bold'>Retatrutide pen</h2>
                <p className='text-lg'>
                  Pre-filled Retatrutide pens, ready straight from the fridge. 15 mg and 40 mg strengths, no reconstitution.
                </p>
              </div>
              <Button
                variant='outline'
                size='lg'
                className={ctaButtonClass}
                render={<Link href='/product/retatrutide-pen-15mg' />}
                nativeButton={false}
              >
                View product
                <ArrowRightIcon className='size-4 transition-transform duration-300 group-hover:translate-x-1/4' />
              </Button>
            </CardContent>
            <MotionPreset
              component='img'
              fade
              slide={{ direction: 'right', offset: 100 }}
              delay={0.3}
              transition={{ duration: 0.8 }}
              motionProps={{
                src: '/images/products/dbr-reta-pen-15mg.png',
                alt: 'Retatrutide pen'
              }}
              className='my-auto w-full px-2 py-4'
            />
          </Card>

          {/* AirPods Max */}
          <Card className='bg-amber-600/10 shadow-none ring-0'>
            <MotionPreset
              component='img'
              fade
              slide={{ direction: 'up', offset: 100 }}
              delay={0.5}
              transition={{ duration: 0.8 }}
              motionProps={{
                src: '/images/products/dbr-ghk-cu-pen-100mg.png',
                alt: 'GHK-Cu Skin Glow pen'
              }}
              className='my-auto w-full px-2 py-4'
            />
            <CardContent className='space-y-4'>
              <h2 className='text-4xl font-bold'>GHK-Cu pen</h2>
              <p className='text-lg'>Copper peptide for skin, tone and collagen support. Pre-filled, 100 mg or the 70 mg Skin Glow.</p>
              <Button
                variant='outline'
                size='lg'
                className={ctaButtonClass}
                render={<Link href='/product/ghk-cu-pen-100mg' />}
                nativeButton={false}
              >
                View product
                <ArrowRightIcon className='size-4 transition-transform duration-300 group-hover:translate-x-1/4' />
              </Button>
            </CardContent>
          </Card>

          {/* Shoes + Shopping girl */}
          <div className='grid gap-4 sm:grid-cols-2 md:col-span-2 lg:col-span-1 lg:grid-cols-1'>
            <Card className='ring-border gap-0 bg-white pb-0 shadow-none ring-1'>
              <CardContent className='space-y-4'>
                <h2 className='text-2xl font-bold sm:text-3xl'>Vials</h2>
                <Button
                  variant='outline'
                  size='lg'
                  className={ctaButtonClass}
                  render={<Link href='/shop?category=Vials' />}
                  nativeButton={false}
                >
                  Shop vials
                  <ArrowRightIcon className='size-4 transition-transform duration-300 group-hover:translate-x-1/4' />
                </Button>
              </CardContent>
              <MotionPreset
                component='img'
                fade
                slide={{ direction: 'down', offset: 100 }}
                delay={0.7}
                transition={{ duration: 0.8 }}
                motionProps={{
                  src: '/images/products/dbr-reta-vial-10mg.png',
                  alt: 'Retatrutide 10 mg vial'
                }}
                className='ms-auto mb-2 w-28'
              />
            </Card>
            <Card className='ring-border justify-between gap-0 bg-white pb-0 shadow-none ring-1'>
              <CardContent className='space-y-4'>
                <h2 className='text-2xl font-bold sm:text-3xl'>MOTS-c pen</h2>
                <Button
                  variant='outline'
                  size='lg'
                  className={ctaButtonClass}
                  render={<Link href='/product/mots-c-pen-20mg' />}
                  nativeButton={false}
                >
                  View product
                  <ArrowRightIcon className='size-4 transition-transform duration-300 group-hover:translate-x-1/4' />
                </Button>
              </CardContent>
              <MotionPreset
                component='img'
                fade
                slide={{ direction: 'down', offset: 100 }}
                delay={0.9}
                transition={{ duration: 0.8 }}
                motionProps={{
                  src: '/images/products/dbr-mots-c-pen-20mg.png',
                  alt: 'MOTS-c 20 mg pen'
                }}
                className='ms-auto mt-2 mb-4 w-64'
              />
            </Card>
          </div>
        </div>
      </ContentLayout>
    </section>
  )
}

export default HomeHero
