'use client'

// React Imports
import { useEffect, useState } from 'react'

// Component Imports
import { MegamenuImageCarousel } from '@/components/layout/megamenu-image-carousel'

export const MegamenuPromotionalCard2 = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 1,
    hours: 12,
    minutes: 45,
    seconds: 2
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

  const pad = (num: number) => String(num).padStart(2, '0')

  return (
    <div className='w-full shrink-0 lg:w-87.5'>
      <div className='flex h-104 flex-col items-center justify-between rounded-lg bg-linear-to-b from-sky-600/20 via-sky-200/10 to-sky-300/10 p-4 pt-8 text-center'>
        <div>
          <h3 className='text-foreground text-2xl font-bold'>Big Savings on Today&apos;s</h3>
          <h4 className='text-foreground mb-4 text-2xl font-bold'>Mega Deals</h4>
          <p className='text-muted-foreground dark:text-primary mb-2 text-xs font-medium'>Offers end today:</p>
          <div className='mb-6 flex justify-center gap-4'>
            <div className='flex size-12.5 flex-col items-center gap-1'>
              <div className='flex size-7.5 items-center justify-center rounded-sm bg-white p-1.5'>
                <span className='text-foreground dark:text-primary-foreground text-xs font-medium'>
                  {pad(timeLeft.days)}
                </span>
              </div>
              <span className='text-xs font-medium'>Day</span>
            </div>
            <div className='flex size-12.5 flex-col items-center gap-1'>
              <div className='flex size-7.5 items-center justify-center rounded-sm bg-white p-1.5'>
                <span className='text-foreground dark:text-primary-foreground text-xs font-medium'>
                  {pad(timeLeft.hours)}
                </span>
              </div>
              <span className='text-xs font-medium'>Hours</span>
            </div>
            <div className='flex size-12.5 flex-col items-center gap-1'>
              <div className='flex size-7.5 items-center justify-center rounded-sm bg-white p-1.5'>
                <span className='text-foreground dark:text-primary-foreground text-xs font-medium'>
                  {pad(timeLeft.minutes)}
                </span>
              </div>
              <span className='text-xs font-medium'>Min</span>
            </div>
            <div className='flex size-12.5 flex-col items-center gap-1'>
              <div className='flex size-7.5 items-center justify-center rounded-sm bg-white p-1.5'>
                <span className='text-foreground dark:text-primary-foreground text-xs font-medium'>
                  {pad(timeLeft.seconds)}
                </span>
              </div>
              <span className='text-xs font-medium'>Sec</span>
            </div>
          </div>
        </div>

        <MegamenuImageCarousel
          images={[
            '/images/mega-menu/image-07.webp',
            '/images/mega-menu/image-05.webp',
            '/images/mega-menu/image-06.webp',
            '/images/mega-menu/image-04.webp',
            '/images/mega-menu/image-08.webp'
          ]}
        />
      </div>
    </div>
  )
}
