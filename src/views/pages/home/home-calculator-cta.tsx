import Link from 'next/link'
import { ArrowRightIcon } from 'lucide-react'

import ContentLayout from '@/components/layout/content-layout'

/** One line that sends people to the calculator page instead of a calculator on the homepage. */
const HomeCalculatorCta = () => {
  return (
    <section className='pt-8 sm:pt-16 lg:pt-24'>
      <ContentLayout>
        <Link
          href='/retatrutide-calculator'
          className='group bg-muted hover:bg-muted/70 flex flex-wrap items-center justify-between gap-4 rounded-xl px-6 py-5 transition-colors sm:px-8'
        >
          <div>
            <p className='text-lg font-semibold sm:text-xl'>How much weight do you want to lose?</p>
            <p className='text-muted-foreground text-sm'>Set your goal and see how long it takes, how many pens you need, and what it costs.</p>
          </div>
          <span className='inline-flex items-center gap-2 text-sm font-semibold'>
            Open the Retatrutide calculator
            <ArrowRightIcon className='size-4 transition-transform duration-300 group-hover:translate-x-1' />
          </span>
        </Link>
      </ContentLayout>
    </section>
  )
}

export default HomeCalculatorCta
