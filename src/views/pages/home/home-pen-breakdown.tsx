import Link from 'next/link'
import { ArrowRightIcon } from 'lucide-react'

import ContentLayout from '@/components/layout/content-layout'

const PENS = [
  {
    name: 'Retatrutide pen',
    strength: '15 mg and 40 mg',
    image: '/images/products/dbr-reta-pen-40mg-stacked.jpg',
    href: '/product/retatrutide-pen-15mg'
  },
  {
    name: 'GHK-Cu pen',
    strength: '100 mg',
    image: '/images/products/dbr-ghk-cu-pen-100mg-stacked.jpg',
    href: '/product/ghk-cu-pen-100mg'
  },
  {
    name: 'MOTS-c pen',
    strength: '10 mg',
    image: '/images/products/dbr-mots-c-pen-10mg-stacked.jpg',
    href: '/product/mots-c-pen-10mg'
  }
]

const STEPS = [
  {
    step: '1',
    title: 'Liquid chamber',
    body: 'Sterile diluent, sealed on its own until first use.'
  },
  {
    step: '2',
    title: 'Lyophilised chamber',
    body: 'The peptide is kept dry, which is how it stays stable in storage.'
  },
  {
    step: '3',
    title: 'Mixed inside the pen',
    body: 'The two chambers combine in the pen on first use. No vial, no syringe, nothing to measure.'
  }
]

/** Homepage section: what is inside a Deep Beauty Research pen. */
const HomePenBreakdown = () => {
  return (
    <section className='pt-8 sm:pt-16 lg:pt-24'>
      <ContentLayout className='space-y-8'>
        <div className='flex items-end justify-between gap-4'>
          <div className='space-y-1'>
            <h3 className='text-2xl font-bold sm:text-3xl'>Inside every pen</h3>
            <p className='text-muted-foreground text-base'>
              A dual-chamber cartridge, pre-filled and ready when you are.
            </p>
          </div>
          <Link
            href='/shop?category=Pens'
            className='text-muted-foreground hover:text-foreground shrink-0 text-base font-medium'
          >
            Shop pens
          </Link>
        </div>

        <div className='grid gap-6 lg:grid-cols-3'>
          <div className='bg-muted flex flex-col gap-6 rounded-xl p-6 sm:p-8'>
            <div className='flex h-64 items-center justify-center overflow-hidden rounded-lg bg-white sm:h-72'>
              <img
                src='/images/products/dbr-reta-chamber.jpg'
                alt='Dual-chamber cartridge: liquid part and lyophilised part'
                className='h-full object-contain p-2'
              />
            </div>
            <ol className='space-y-4'>
              {STEPS.map(item => (
                <li key={item.step} className='flex gap-3'>
                  <span className='bg-foreground text-background flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold'>
                    {item.step}
                  </span>
                  <div className='space-y-0.5'>
                    <p className='font-semibold'>{item.title}</p>
                    <p className='text-muted-foreground text-sm'>{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className='grid gap-6 sm:grid-cols-3 lg:col-span-2'>
            {PENS.map(pen => (
              <Link key={pen.name} href={pen.href} className='group flex h-full flex-col gap-3 focus-visible:outline-none'>
                <div className='ring-border flex aspect-[3/4] items-center justify-center overflow-hidden rounded-xl bg-white ring-1 lg:aspect-auto lg:min-h-0 lg:flex-1'>
                      <img
                    src={pen.image}
                    alt={`${pen.name} breakdown`}
                    className='size-full object-contain p-3 transition-transform duration-500 group-hover:scale-105'
                  />
                </div>
                <div className='flex items-center justify-between gap-2'>
                  <div>
                    <p className='font-semibold'>{pen.name}</p>
                    <p className='text-muted-foreground text-sm'>{pen.strength}</p>
                  </div>
                  <ArrowRightIcon className='text-muted-foreground size-4 transition-transform duration-300 group-hover:translate-x-1' />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </ContentLayout>
    </section>
  )
}

export default HomePenBreakdown
