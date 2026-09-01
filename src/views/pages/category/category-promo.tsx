'use client'

// React Imports
import { useEffect, useState } from 'react'

// Next Imports
import Link from 'next/link'

// Third-party Imports
import { ArrowRightIcon } from 'lucide-react'

// Component Imports
import { Button } from '@/components/ui/button'
import ContentLayout from '@/components/layout/content-layout'

const pad = (num: number) => String(num).padStart(2, '0')

const CategoryPromo = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 1,
    hours: 11,
    minutes: 43,
    seconds: 6
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev

        seconds--

        if (seconds < 0) {
          seconds = 59
          minutes--
        }

        if (minutes < 0) {
          minutes = 59
          hours--
        }

        if (hours < 0) {
          hours = 23
          days--
        }

        if (days < 0) {
          days = 0
          hours = 0
          minutes = 0
          seconds = 0
        }

        return { days, hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const countdown = [
    { value: pad(timeLeft.days), label: 'Days' },
    { value: pad(timeLeft.hours), label: 'Hours' },
    { value: pad(timeLeft.minutes), label: 'Minutes' },
    { value: pad(timeLeft.seconds), label: 'Seconds' }
  ]

  return (
    <section className='py-8 sm:py-10 lg:py-14'>
      <ContentLayout>
        <div className='relative grid items-center overflow-hidden rounded-md bg-linear-to-r from-[#FFECCA] from-[3.66%] via-[#FFD6C7] via-[55.05%] to-[#FFBDC2] to-[106.45%] ps-10 max-lg:pt-8 max-lg:pb-8 max-sm:p-4 lg:grid-cols-2'>
          <div className='dark:text-primary-foreground space-y-4'>
            <div>
              <h3 className='mb-2 text-2xl font-bold sm:text-4xl'>Hurry Up! 40% Off Everything</h3>
              <p className='text-lg'>
                Time&rsquo;s running out to score your wish-list items for less. Stock up now and save big before this
                offer disappears.
              </p>
            </div>
            <div>
              <p className='mb-2.5 text-sm font-medium'>Offer expires in:</p>
              <div className='mb-4 flex space-x-2.5'>
                {countdown.map(unit => (
                  <div key={unit.label} className='flex flex-col items-center gap-1.5'>
                    <span className='bg-card flex h-8.5 w-9.5 items-center justify-center rounded-sm font-medium dark:text-white'>
                      {unit.value}
                    </span>
                    <span className='text-xs font-medium'>{unit.label}</span>
                  </div>
                ))}
              </div>
              <Button
                render={<Link href='/shop' />}
                nativeButton={false}
                size='lg'
                className='dark:text-primary dark:bg-primary-foreground dark:hover:bg-primary-foreground/80'
              >
                Shop Now
                <ArrowRightIcon />
              </Button>
            </div>
          </div>
          <div className='relative lg:h-96'>
            <div className='absolute bottom-0 left-[11%] w-75 max-lg:hidden md:left-[7%] md:w-md lg:left-[0%]'>
              <img src='/images/category-listing/men-with-blue-shirt.webp' alt='Men with blue shirt' />
            </div>
          </div>
        </div>
      </ContentLayout>
    </section>
  )
}

export default CategoryPromo
