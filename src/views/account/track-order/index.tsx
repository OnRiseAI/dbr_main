'use client'

// Third-party Imports
import { ClipboardListIcon, PackageIcon, BusIcon, CircleCheckIcon, CopyIcon } from 'lucide-react'

// Component Imports
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Timeline,
  TimelineContent,
  TimelineDot,
  TimelineHeading,
  TimelineItem,
  TimelineLine
} from '@/components/ui/timeline'

// Utils Imports
import { cn } from '@/lib/utils'

const trackingSteps = [
  { title: 'Order Placed', icon: ClipboardListIcon },
  { title: 'Packaging', icon: PackageIcon },
  { title: 'On The Way', icon: BusIcon },
  { title: 'Delivered', icon: CircleCheckIcon }
]

const currentStepIndex = 1

const activities = [
  { label: 'Your order has been placed.', time: '22 Jan, 2026 at 2:51 PM', primary: true },
  { label: 'Your order is successfully verified.', time: '23 Jan, 2026 at 7:32 PM', primary: true },
  { label: 'Your order is packed and ready for dispatch.', time: '24 Jan, 2026 at 5:32 AM', primary: true },
  {
    label: 'Courier partner Alex Brown is en route with your package.',
    time: '25 Jan, 2026 at 2:00 PM',
    primary: false
  },
  { label: 'Expected delivery to your address.', time: '27 Jan, 2026 at 2:00 PM', primary: false }
]

const copyToClipboard = () => {
  navigator.clipboard.writeText('#KJ00019392')
}

const TrackOrderView = () => {
  return (
    <div className='space-y-6'>
      <Card className='gap-0 overflow-hidden p-4 pb-12 md:p-6 md:pb-12'>
        <div className='bg-muted flex flex-wrap items-start justify-between gap-1.5 rounded-md p-6'>
          <div className='space-y-1.5'>
            <h3 className='text-xl font-semibold'>Tracking Details</h3>
            <div className='text-muted-foreground flex items-center gap-1.5 text-lg'>
              <span>#KJ00019392</span>
              <Button variant='link' size='sm' className='text-muted-foreground h-auto p-0' onClick={copyToClipboard}>
                <CopyIcon className='size-5.5' />
              </Button>
            </div>
          </div>
          <Badge className='h-6.5 rounded-full border-0 bg-green-600 px-3 py-0 text-xs font-medium text-white dark:bg-green-400'>
            Expected delivery on Monday 27 Jan, 2026
          </Badge>
        </div>

        <CardContent className='px-6'>
          <div className='pt-12 pb-7.5'>
            <ol className='flex items-start max-md:flex-col'>
              {trackingSteps.map((step, index) => {
                const isCompleted = index <= currentStepIndex
                const isLast = index === trackingSteps.length - 1
                const Icon = step.icon

                return (
                  <li key={step.title} className={cn('flex items-start max-md:flex-col', !isLast && 'md:flex-1')}>
                    <div className='flex flex-col items-start'>
                      <div className='bg-card z-1 -ml-2 p-2'>
                        <span
                          className={cn(
                            'flex size-9.5 items-center justify-center rounded-full',
                            isCompleted ? 'bg-foreground text-background' : 'bg-secondary'
                          )}
                        >
                          <Icon className='size-5.5' />
                        </span>
                      </div>
                      <span className='text-base font-medium whitespace-nowrap'>{step.title}</span>
                    </div>
                    {!isLast && (
                      <span
                        className={cn(
                          'ml-4.5 max-md:h-12 max-md:w-0.5 md:mt-6.5 md:-ml-12.5 md:h-0.5 md:flex-1',
                          index < currentStepIndex ? 'bg-foreground' : 'bg-border'
                        )}
                      />
                    )}
                  </li>
                )
              })}
            </ol>
          </div>

          <h3 className='mb-1.5 text-xl font-semibold'>Order Activity</h3>
          <Timeline positions='left'>
            {activities.map((activity, index) => {
              const isLast = index === activities.length - 1

              return (
                <TimelineItem
                  key={index}
                  status={activity.primary ? 'done' : 'default'}
                  className='items-start gap-x-4'
                >
                  <TimelineDot status='custom' className='mt-3'>
                    <span
                      className={cn(
                        'size-3 rounded-full ring-3',
                        activity.primary
                          ? 'bg-green-600 ring-green-600/20 dark:bg-green-400 dark:ring-green-400/20'
                          : 'bg-primary ring-primary/10'
                      )}
                    />
                  </TimelineDot>
                  {!isLast && <TimelineLine className='bg-border min-h-10' />}
                  <TimelineHeading side='right' variant='primary' className='mt-1 -mb-6 flex w-full flex-col'>
                    <p className='mb-2 text-lg font-medium text-wrap'>{activity.label}</p>
                    <p className='text-muted-foreground text-base font-normal'>{activity.time}</p>
                  </TimelineHeading>
                  {!isLast && <TimelineContent side='right' />}
                </TimelineItem>
              )
            })}
          </Timeline>
        </CardContent>
      </Card>
    </div>
  )
}

export { TrackOrderView }
