'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'

// Third-party Imports
import { HeartIcon } from 'lucide-react'

// Component Imports
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

// Utils Imports
import { cn } from '@/lib/utils'

const ProductSummary = () => {
  const [liked, setLiked] = useState(false)

  return (
    <div className='border-border flex flex-col overflow-hidden rounded-xl border md:flex-row'>
      <figure className='bg-muted relative flex w-full rounded-none py-4 max-md:justify-center md:max-w-60'>
        <Link href='/product/boat-airdopes-138'>
          <img src='/images/account/order-detail-01.webp' alt='Shirt' className='size-full object-cover md:px-6' />
        </Link>
        <Button
          variant='outline'
          size='icon-sm'
          className='dark:text-primary dark:bg-background dark:hover:bg-background! absolute top-4 right-4 size-7.25 rounded-full border-0 bg-white shadow-md hover:bg-white!'
          onClick={() => setLiked(!liked)}
        >
          <HeartIcon className={cn('size-5.25', { 'fill-red-500 text-red-500': liked })} />
          <span className='sr-only'>Add to wishlist</span>
        </Button>
      </figure>
      <div className='flex flex-col justify-center gap-1 p-3.5'>
        <div className='mb-3 flex flex-wrap items-center justify-between'>
          <div className='flex items-center gap-1.5'>
            <Badge
              variant='outline'
              className='rounded-full border-green-600 text-green-600 dark:border-green-400 dark:text-green-400'
            >
              Delivered
            </Badge>
            <Separator orientation='vertical' className='mx-1.5' />
            <p className='text-muted-foreground text-xs'>24 April 2022</p>
          </div>
          <Button
            variant='link'
            size='sm'
            className='text-muted-foreground hover:text-foreground h-auto p-0 text-xs font-medium hover:no-underline'
            render={<Link href='/account/orders/details' />}
            nativeButton={false}
          >
            View Details
          </Button>
        </div>
        <div className='space-y-3'>
          <p className='text-primary text-sm font-medium'>Order ID: XYZ-42324568</p>
          <h5 className='mb-1 text-lg font-semibold'>
            <Link href='/product/boat-airdopes-138' className='hover:text-primary'>
              Airdopes 138 True Wireless Earbuds
            </Link>
          </h5>
          <p className='text-muted-foreground text-sm'>
            Truly wireless earbuds with punchy bass, ENx environmental noise cancellation for calls, and a compact
            charging case for up to 24 hours of total playback.
          </p>
          <div className='flex gap-2.5'>
            <div className='flex gap-1.5'>
              <p className='text-sm'>Size:</p>
              <p className='text-muted-foreground text-sm'>M</p>
            </div>
            <Separator orientation='vertical' className='bg-primary h-4!' />
            <div className='flex gap-1.5'>
              <p className='text-sm'>Qty:</p>
              <p className='text-muted-foreground text-sm'>1</p>
            </div>
            <Separator orientation='vertical' className='bg-primary h-4!' />
            <div className='flex gap-1.5'>
              <p className='text-sm'>Color:</p>
              <p className='text-muted-foreground text-sm'>Green</p>
            </div>
          </div>
          <div className='flex items-center justify-start gap-1.5'>
            <span className='text-sm font-semibold'>$225.00</span>
            <span className='text-muted-foreground text-sm line-through'>$249.00</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductSummary
