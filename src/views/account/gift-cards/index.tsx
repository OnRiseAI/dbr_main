// Next Imports
import Link from 'next/link'

// Third-party Imports
import { ArrowRightIcon } from 'lucide-react'

// Component Imports
import { Button } from '@/components/ui/button'
import { MotionPreset } from '@/components/ui/motion-preset'
import GiftCardsForm from './gift-cards-form'

const GiftCardsView = () => {
  return (
    <div className='space-y-3.5'>
      <div className='bg-muted grid overflow-hidden rounded-sm sm:max-lg:h-85 lg:grid-cols-7'>
        <div className='space-y-1.5 p-6 lg:col-span-4'>
          <h4 className='text-2xl font-semibold'>Give the Perfect Gift Anytime, Anywhere.</h4>
          <p className='text-muted-foreground mb-4 text-base'>
            Surprise someone special with the freedom to choose what they really want.
          </p>
          <Button render={<Link href='/account/gift-cards' />} className='group' nativeButton={false}>
            Send a Gift
            <ArrowRightIcon className='size-4 transition-all duration-300 group-hover:translate-x-1' />
          </Button>
        </div>
        <div className='relative lg:col-span-3'>
          <div className='absolute right-15 bottom-0 max-sm:hidden'>
            <MotionPreset fade blur slide={{ direction: 'down' }} delay={0.3} transition={{ duration: 0.5 }}>
              <img src='/images/account/gift-cards.webp' alt='gift cards' />
            </MotionPreset>
          </div>
        </div>
      </div>

      <GiftCardsForm />
    </div>
  )
}

export { GiftCardsView }
