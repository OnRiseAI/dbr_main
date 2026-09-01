// Next Imports
import Link from 'next/link'

// Third-party Imports
import { ArrowRightIcon } from 'lucide-react'

// Component Imports
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MotionPreset } from '@/components/ui/motion-preset'
import ContentLayout from '@/components/layout/content-layout'

const HomeCTA = () => {
  return (
    <section>
      <ContentLayout>
        <Card className='from-0.5% via-48.87% to-97.24% justify-end bg-linear-to-r from-[#929BE1] via-[#BAB0E0] to-[#F2D0E1] text-white shadow-none ring-0 sm:max-lg:py-8 lg:h-100 lg:py-0'>
          <CardContent className='relative z-1 grid h-full max-lg:gap-6 md:pr-0 md:pl-10 lg:grid-cols-7 lg:items-center'>
            <div className='lg:col-span-4'>
              <h2 className='mb-2 text-2xl font-bold md:text-3xl lg:text-4xl xl:text-5xl'>
                iPhone Performance in an Elegant Purple Finish.
              </h2>
              <p className='mb-4 max-w-xl text-base lg:text-lg'>
                Enjoy stunning picture clarity, immersive sound, and smart features designed to elevate your everyday
                entertainment.
              </p>
              <Button
                size='lg'
                className='text-foreground dark:text-primary-foreground group bg-white hover:bg-white/85'
                render={<Link href='/shop' />}
                nativeButton={false}
              >
                Shop Now <ArrowRightIcon className='transition-transform duration-300 group-hover:translate-x-1/4' />
              </Button>
            </div>
            <div className='lg:col-span-3'>
              <MotionPreset
                fade
                blur
                slide={{ direction: 'down', offset: 70 }}
                delay={0.7}
                transition={{ duration: 0.5 }}
              >
                <img
                  src='/images/landing-page/cta-iphone.webp'
                  alt='purple iphone'
                  className='-mb-15 max-lg:mx-auto xl:-mb-5'
                />
              </MotionPreset>
            </div>
            <div className='absolute -right-25 bottom-[-60%] -z-1 max-md:hidden lg:bottom-[-90%] xl:-right-8'>
              <MotionPreset
                fade
                blur
                slide={{ direction: 'down', offset: 50 }}
                delay={0.3}
                transition={{ duration: 0.5 }}
              >
                <img src='/images/landing-page/cta-layer.webp' alt='cta background layer' />
              </MotionPreset>
            </div>
          </CardContent>
        </Card>
      </ContentLayout>
    </section>
  )
}

export default HomeCTA
