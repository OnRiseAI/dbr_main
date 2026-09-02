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
                  Stabilized research peptide pens, ready to use. 6mg to 40mg options from the Pen Peptide catalog.
                </p>
              </div>
              <Button
                variant='outline'
                size='lg'
                className={ctaButtonClass}
                render={<Link href='/product/retatrutide-pen-6-12-20-40mg' />}
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
                src: 'https://cdn.shopify.com/s/files/1/0696/8737/8187/files/retatrutide-6mg.jpg?v=1775584612',
                alt: 'Retatrutide pen'
              }}
              className='ms-auto mt-auto mb-7.5 w-66'
            />
          </Card>

          {/* AirPods Max */}
          <Card className='justify-between bg-amber-600/10 shadow-none ring-0'>
            <MotionPreset
              component='img'
              fade
              slide={{ direction: 'up', offset: 100 }}
              delay={0.5}
              transition={{ duration: 0.8 }}
              motionProps={{
                src: 'https://cdn.shopify.com/s/files/1/0696/8737/8187/files/ghk-cu-peptide.jpg?v=1775584619',
                alt: 'GHK-Cu Skin Glow pen'
              }}
              className='ms-auto mb-6'
            />
            <CardContent className='space-y-4'>
              <h2 className='text-4xl font-bold'>Skin Glow GHK-Cu</h2>
              <p className='text-lg'>Copper peptide 100mg in a pre-mixed pen for research use.</p>
              <Button
                variant='outline'
                size='lg'
                className={ctaButtonClass}
                render={<Link href='/product/copper-peptide-ghk-cu-skin-glow-100mg' />}
                nativeButton={false}
              >
                View product
                <ArrowRightIcon className='size-4 transition-transform duration-300 group-hover:translate-x-1/4' />
              </Button>
            </CardContent>
          </Card>

          {/* Shoes + Shopping girl */}
          <div className='grid gap-4 sm:grid-cols-2 md:col-span-2 lg:col-span-1 lg:grid-cols-1'>
            <Card className='gap-0 bg-sky-600/10 pb-0 shadow-none ring-0'>
              <CardContent className='space-y-4'>
                <h2 className='text-2xl font-bold sm:text-3xl'>Weight-loss collection</h2>
                <Button
                  variant='outline'
                  size='lg'
                  className={ctaButtonClass}
                  render={<Link href='/shop?category=Peptides%20for%20Weight%20Loss' />}
                  nativeButton={false}
                >
                  Shop collection
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
                  src: 'https://cdn.shopify.com/s/files/1/0696/8737/8187/files/semaglutide-5mg.jpg?v=1775584615',
                  alt: 'Semaglutide pen'
                }}
                className='ms-auto -mt-20 w-57 md:-mt-12 lg:-mt-22'
              />
            </Card>
            <Card className='bg-muted justify-between gap-0 pb-0 shadow-none ring-0'>
              <CardContent className='space-y-4'>
                <h2 className='text-2xl font-bold sm:text-3xl'>Browse all collections</h2>
                <Button
                  variant='outline'
                  size='lg'
                  className={ctaButtonClass}
                  render={<Link href='/category' />}
                  nativeButton={false}
                >
                  View collections
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
                  src: 'https://cdn.shopify.com/s/files/1/0696/8737/8187/files/mots_c.jpg?v=1775584585',
                  alt: 'MOTS-c pen'
                }}
                className='ms-auto w-54 max-sm:-mt-5 lg:-mt-4'
              />
            </Card>
          </div>
        </div>
      </ContentLayout>
    </section>
  )
}

export default HomeHero
