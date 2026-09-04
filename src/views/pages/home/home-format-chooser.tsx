import Link from 'next/link'
import { ArrowRightIcon } from 'lucide-react'

import ContentLayout from '@/components/layout/content-layout'

const OPTIONS = [
  {
    name: 'Choose a pen if',
    points: [
      'You want it ready straight from the fridge',
      'You would rather not handle vials, water and syringes',
      'You travel and want fewer parts to carry',
      'You want the amount set on a dial, not drawn by eye'
    ],
    href: '/shop?category=Pens',
    cta: 'See the pens'
  },
  {
    name: 'Choose a vial if',
    points: [
      'You already work with lyophilised peptides',
      'You want a lower price per milligram',
      'You want to set your own concentration',
      'You are after a compound only supplied as a vial'
    ],
    href: '/shop?category=Vials',
    cta: 'See the vials'
  }
]

/** Two honest columns. No loser. */
const HomeFormatChooser = () => {
  return (
    <section id='pen-or-vial' className='scroll-mt-(--header-height) pt-8 sm:pt-16 lg:pt-24'>
      <ContentLayout className='space-y-8'>
        <div className='space-y-1'>
          <h3 className='text-2xl font-bold sm:text-3xl'>Pen or vial?</h3>
          <p className='text-muted-foreground text-base'>Same peptides, two ways to work with them.</p>
        </div>
        <div className='grid gap-6 lg:grid-cols-2'>
          {OPTIONS.map(option => (
            <div key={option.name} className='flex flex-col gap-5 rounded-xl border p-6 sm:p-8'>
              <h4 className='text-xl font-bold'>{option.name}</h4>
              <ul className='space-y-2.5'>
                {option.points.map(point => (
                  <li key={point} className='flex gap-3 text-sm'>
                    <span className='bg-foreground mt-2 size-1.5 shrink-0 rounded-full' />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={option.href}
                className='group mt-auto inline-flex w-fit items-center gap-1.5 text-sm font-semibold'
              >
                {option.cta}
                <ArrowRightIcon className='size-4 transition-transform duration-300 group-hover:translate-x-1' />
              </Link>
            </div>
          ))}
        </div>
      </ContentLayout>
    </section>
  )
}

export default HomeFormatChooser
