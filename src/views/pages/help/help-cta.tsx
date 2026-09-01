// Next Imports
import Link from 'next/link'

// Component Imports
import { Button } from '@/components/ui/button'
import ContentLayout from '@/components/layout/content-layout'

const HelpCta = () => {
  return (
    <section className='bg-muted py-14 md:py-24 lg:py-32'>
      <ContentLayout className='flex flex-col items-center justify-center text-center'>
        <h2 className='mb-2 text-2xl font-bold sm:text-3xl'>Need a Little More Support?</h2>
        <p className='mb-6 max-w-4xl text-lg'>
          We&apos;re here to make your shopping experience smooth. Browse by topic to get quick answers and solutions
          for every step of your order from shipping to returns, payments, and more.
        </p>
        <div className='flex flex-wrap justify-center gap-1.5'>
          <Button render={<Link href='/#community' />} size='lg' className='px-4 shadow-sm' nativeButton={false}>
            View Community
          </Button>
          <Button
            variant='outline'
            render={<Link href='#' />}
            size='lg'
            className='px-4 shadow-sm'
            nativeButton={false}
          >
            Contact Us
          </Button>
        </div>
      </ContentLayout>
    </section>
  )
}

export default HelpCta
