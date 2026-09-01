// Third-party Imports
import { ArrowRight } from 'lucide-react'

// Component Imports
import { Button } from '@/components/ui/button'

const NewsletterBanner = () => {
  return (
    <div className='bg-muted grid items-end rounded-sm lg:grid-cols-7 xl:items-center'>
      <div className='space-y-4 p-6 lg:col-span-4'>
        <div className='space-y-1.5'>
          <h4 className='text-2xl font-semibold'>Join & Be First to Know About Exclusive Drops and Secret Deals</h4>
          <p className='text-muted-foreground text-base'>
            Sign up today to get early access to new collections, secret sales, and curated picks you won&apos;t find
            anywhere else.
          </p>
        </div>
        <Button size='lg' className='group'>
          Get Updates
          <ArrowRight className='size-4 transition-all duration-300 group-hover:translate-x-1' />
        </Button>
      </div>
      <div className='lg:col-span-3'>
        <img
          src='/images/account/email-newsletter.webp'
          className='mt-auto mr-auto ml-auto lg:mr-6'
          alt='email newsletter'
        />
      </div>
    </div>
  )
}

export default NewsletterBanner
