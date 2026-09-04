'use client'

import { useState } from 'react'

import { ChevronDownIcon } from 'lucide-react'

import ContentLayout from '@/components/layout/content-layout'
import { cn } from '@/lib/utils'

const FAQS = [
  {
    q: 'Do the pens need mixing before use?',
    a: 'No. Each pen holds the diluent and the lyophilised peptide in separate chambers and combines them inside the pen on first use. Take it from the fridge, remove the cap, attach a needle and dial the units.'
  },
  {
    q: 'Do the vials need reconstituting?',
    a: 'Yes. Vials are supplied lyophilised. Add bacteriostatic water, swirl gently until clear, then draw each amount with an insulin syringe. The calculator above gives the units for your concentration.'
  },
  {
    q: 'Where do orders ship from?',
    a: 'Germany, with tracking on every order.'
  },
  {
    q: 'What arrives in the box?',
    a: 'The pen or vial, a handling insert with storage and use guidance, and the batch documentation for that product.'
  },
  {
    q: 'Is every batch tested?',
    a: 'Yes. Each batch is tested for purity and documented before dispatch, and the documentation ships with the order.'
  },
  {
    q: 'Who are these products for?',
    a: 'Deep Beauty Research products are supplied for research purposes only. They are not for human or veterinary use.'
  }
]

const HomeFaq = () => {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className='py-8 sm:py-16 lg:py-24'>
      <ContentLayout className='grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-12'>
        <div className='space-y-2'>
          <h3 className='text-2xl font-bold sm:text-3xl'>Questions people ask</h3>
          <p className='text-muted-foreground text-base'>The short answers. Anything else, use the contact page.</p>
        </div>
        <ul className='divide-border divide-y rounded-xl border'>
          {FAQS.map((item, index) => {
            const isOpen = open === index

            return (
              <li key={item.q}>
                <button
                  type='button'
                  onClick={() => setOpen(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className='flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold'
                >
                  {item.q}
                  <ChevronDownIcon
                    className={cn('text-muted-foreground size-4 shrink-0 transition-transform', isOpen && 'rotate-180')}
                  />
                </button>
                {isOpen ? <p className='text-muted-foreground px-5 pb-5 text-sm leading-relaxed'>{item.a}</p> : null}
              </li>
            )
          })}
        </ul>
      </ContentLayout>
    </section>
  )
}

export default HomeFaq
