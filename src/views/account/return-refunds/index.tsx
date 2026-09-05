'use client'

// React Imports
import { useState } from 'react'

// Third-party Imports
import { CopyIcon, CircleCheckIcon, HeartIcon, ChevronDownIcon, InfoIcon } from 'lucide-react'

// Component Imports
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Rating } from '@/components/ui/rating'

// Utils Imports
import { cn } from '@/lib/utils'

const ReturnRefundsView = () => {
  const [liked, setLiked] = useState(false)
  const [refundExpanded, setRefundExpanded] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopyReturnId = () => {
    navigator.clipboard.writeText('#KJ0001392')
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const [ratings, setRatings] = useState({
    productQuality: 0,
    deliveryExperience: 0,
    refundProcess: 0
  })

  const handleRatingChange = (category: keyof typeof ratings, value: number) => {
    setRatings(prev => ({
      ...prev,
      [category]: value
    }))
  }

  return (
    <div className='space-y-6'>
      <h3 className='text-xl font-semibold'>Return & Refunds</h3>

      {/* Product Details */}
      <Card className='py-0'>
        <CardContent className='grid grid-cols-4 px-0'>
          {/* Product Image */}
          <div className='bg-muted relative shrink-0'>
            <img src='/images/account/order-detail-01.webp' alt='Product' className='mx-auto mt-4 rounded-lg' />
            <div className='absolute top-4 right-4'>
              <Button
                variant='outline'
                size='icon-sm'
                className='dark:bg-background dark:hover:bg-background! size-7.25 rounded-full border-0 bg-white hover:bg-white!'
                onClick={() => setLiked(!liked)}
              >
                <HeartIcon className={cn('size-5.25', { 'fill-rose-500 stroke-rose-500': liked })} />
              </Button>
            </div>
          </div>

          {/* Product Info */}
          <div className='col-span-3 p-4'>
            <div className='mb-3 flex items-center justify-between gap-2'>
              <Badge
                variant='outline'
                className='h-6 border-green-600 px-3 py-0 text-green-600 dark:border-green-400 dark:text-green-400'
              >
                Returned & Fully Refunded
              </Badge>
              <div className='flex items-center gap-1.5'>
                <span className='text-muted-foreground text-base'>#KJ0001392</span>
                <Button
                  variant='link'
                  size='sm'
                  className='text-muted-foreground h-auto p-0'
                  onClick={handleCopyReturnId}
                >
                  {copied ? (
                    <CircleCheckIcon className='size-4.5 text-green-600 dark:text-green-400' />
                  ) : (
                    <CopyIcon className='size-4.5' />
                  )}
                </Button>
              </div>
            </div>

            <p className='mb-3 text-sm font-medium'>Order ID: XYZ-42324234</p>

            <h4 className='mb-1 text-lg font-semibold'>Bewkoof</h4>
            <p className='text-muted-foreground mb-3 text-sm'>
              A sleek rectangular smartwatch featuring a large 1.95&quot; HD display and a slim, lightweight design.
              Ideal for everyday wear, it offers essential fitness and health tracking along with smart notifications,
              making it a perfect blend of style and functionality for daily use.
            </p>

            <div className='flex gap-2.5 text-sm'>
              <div>
                <span className='text-card-foreground'>Size:</span>
                <span className='text-muted-foreground ml-1'>M</span>
              </div>
              <Separator orientation='vertical' className='bg-primary my-1' />
              <div>
                <span className='text-card-foreground'>Qty:</span>
                <span className='text-muted-foreground ml-1'>1</span>
              </div>
              <Separator orientation='vertical' className='bg-primary my-1' />
              <div>
                <span className='text-card-foreground'>Color:</span>
                <span className='text-muted-foreground ml-1'>pitch</span>
              </div>
            </div>

            <div className='mt-3 flex items-center gap-1.5'>
              <span className='text-sm font-semibold'>$225.00</span>
              <span className='text-muted-foreground text-sm line-through'>$249.00</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Return Progressed Timeline */}
      <Card className='py-6'>
        <CardContent className='px-6'>
          <h4 className='mb-5 text-xl font-semibold'>Return Progressed</h4>
          <div className='mb-5 flex items-center justify-start'>
            {[
              { status: 'Delivered', date: 'Sept 21, 2026' },
              { status: 'Return', date: 'Sept 23, 2026' },
              { status: 'Refund', date: 'Sept 27, 2026' }
            ].map((item, index) => (
              <div key={item.status} className='flex max-w-37 flex-1 items-start'>
                <div className='flex flex-col items-start'>
                  <div className='flex h-7.5 w-7.5 items-center justify-center rounded-full border-2 border-green-600 bg-green-600 dark:border-green-400 dark:bg-green-400'>
                    <CircleCheckIcon className='size-4.5 text-white' />
                  </div>
                  <p className='mt-2 text-xs font-medium'>{item.status}</p>
                  <p className='text-muted-foreground text-xs'>{item.date}</p>
                </div>
                {index < 2 && (
                  <div className='mt-3.5 mr-2 -ml-10 max-w-25 flex-1 border-t-2 border-green-600 dark:border-green-400' />
                )}
              </div>
            ))}
          </div>
          <div>
            <p className='mb-3 text-xl font-semibold'>Total refund $ 225.00</p>
            <button
              onClick={() => setRefundExpanded(!refundExpanded)}
              className={cn(
                'bg-muted flex w-full items-center justify-between rounded-md p-5 transition-colors',
                refundExpanded && 'rounded-b-none'
              )}
            >
              <div className='flex items-center gap-2.5'>
                <div className='rounded-xs border bg-white px-1.5 py-px'>
                  <img src='/images/account/mastercard.webp' alt='Mastercard' className='w-6.25' />
                </div>
                <div className='flex items-center gap-2'>
                  <span className='text-xl font-medium'>$ 225.00</span>
                  <ChevronDownIcon
                    className={cn('size-4.5 transition-transform duration-200', refundExpanded && 'rotate-180')}
                  />
                </div>
              </div>
              <Badge className='h-auto py-1'>Completed</Badge>
            </button>
            {refundExpanded && (
              <div className='space-y-2'>
                <div className='bg-muted rounded-md rounded-t-none p-2 px-4 pt-0'>
                  <p className='text-muted-foreground text-sm'>
                    Refund was added to your Mastercard linked bank account on Sep 29 2025, 06:11 PM. If you can&apos;t
                    see the refund in your bank statement (bank app/passbook), contact your bank and share refund
                    reference number <span className='font-medium'>30650790269</span> to track it.
                  </p>
                  <Button
                    variant='link'
                    className='h-auto p-0 text-sm font-medium text-sky-600 dark:text-sky-400'
                    render={<a href='#' />}
                    nativeButton={false}
                  >
                    How do I check my bank account?
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Rate Your Experience */}
      <div>
        <h4 className='mb-3 text-xl font-semibold'>Rate your experience</h4>

        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
          <div className='border-input flex h-30 flex-col items-center justify-center rounded-xl border p-4 text-center'>
            <p className='mb-3.5 text-xl'>Product Quality</p>
            <Rating
              value={ratings.productQuality}
              onValueChange={value => handleRatingChange('productQuality', value)}
              variant='yellow'
              size={24}
            />
          </div>

          <div className='border-input flex h-30 flex-col items-center justify-center rounded-xl border p-4 text-center'>
            <p className='mb-3.5 text-xl'>Delivery Experience</p>
            <Rating
              value={ratings.deliveryExperience}
              onValueChange={value => handleRatingChange('deliveryExperience', value)}
              variant='yellow'
              size={24}
            />
          </div>

          <div className='border-input flex h-30 flex-col items-center justify-center rounded-xl border p-4 text-center'>
            <p className='mb-3.5 text-xl'>Refund Process</p>
            <Rating
              value={ratings.refundProcess}
              onValueChange={value => handleRatingChange('refundProcess', value)}
              variant='yellow'
              size={24}
            />
          </div>
        </div>
      </div>

      {/* Need Help */}
      <Card className='bg-muted rounded-md ring-0'>
        <CardContent className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <InfoIcon className='size-5.5' />
            <p className='text-xl font-semibold'>Need any help?</p>
          </div>
          <Button className='rounded-full' size='xs' render={<a href='#' />} nativeButton={false}>
            Contact Support
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export { ReturnRefundsView }
