'use client'

// React Imports
import { useEffect, useState } from 'react'

// Next Imports
import Link from 'next/link'

// Third-party Imports
import { ArrowRightIcon } from 'lucide-react'

// Component Imports
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const DealsPromotionalCard = () => {
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
    <Card className='h-full justify-between bg-linear-to-br from-[#6AA4E1] to-[#9DC0E2] py-6 text-white shadow-none ring-0'>
      <CardHeader className='px-6 text-3xl font-bold xl:text-4xl'>Big Savings on Your Top Picks!</CardHeader>
      <CardContent className='px-6'>
        <div className='flex flex-col gap-6'>
          <div>
            <p className='mb-2 text-base font-semibold'>Offers end today:</p>
            <div className='flex gap-2'>
              <div className='flex flex-col items-center gap-1.25'>
                <div className='text-foreground dark:text-primary-foreground flex size-9.75 items-center justify-center rounded-sm bg-white p-1.5 text-lg font-semibold xl:size-13.75'>
                  {pad(timeLeft.days)}
                </div>
                <span className='text-sm font-medium'>Day</span>
              </div>
              <div className='flex flex-col items-center gap-1.25'>
                <div className='text-foreground dark:text-primary-foreground flex size-9.75 items-center justify-center rounded-sm bg-white p-1.5 text-lg font-semibold xl:size-13.75'>
                  {pad(timeLeft.hours)}
                </div>
                <span className='text-sm font-medium'>Hours</span>
              </div>
              <div className='flex flex-col items-center gap-1.25'>
                <div className='text-foreground dark:text-primary-foreground flex size-9.75 items-center justify-center rounded-sm bg-white p-1.5 text-lg font-semibold xl:size-13.75'>
                  {pad(timeLeft.minutes)}
                </div>
                <span className='text-sm font-medium'>Min</span>
              </div>
              <div className='flex flex-col items-center gap-1.25'>
                <div className='text-foreground dark:text-primary-foreground flex size-9.75 items-center justify-center rounded-sm bg-white p-1.5 text-lg font-semibold xl:size-13.75'>
                  {pad(timeLeft.seconds)}
                </div>
                <span className='text-sm font-medium'>Sec</span>
              </div>
            </div>
          </div>
          <Button
            className='bg-destructive hover:bg-destructive/90 border-destructive group w-full transition-colors dark:text-white'
            render={<Link href='/shop' />}
            nativeButton={false}
          >
            Shop Now
            <ArrowRightIcon className='transition-transform duration-300 group-hover:translate-x-1/4' />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
