import Link from 'next/link'
import { ArrowRightIcon } from 'lucide-react'

import ContentLayout from '@/components/layout/content-layout'

const FORMATS = [
  {
    name: 'Pens',
    blurb: 'Dual-chamber system. Pre-filled and ready.',
    cta: 'View pen specifications',
    href: '/product/retatrutide-pen-15mg',
    images: [
      { src: '/images/products/dbr-reta-pen-15mg-body.png', alt: 'Deep Beauty Research Retatrutide pen', className: 'w-full' },
      { src: '/images/products/dbr-reta-pen-15mg-cartridge.png', alt: 'Dual-chamber cartridge', className: 'w-[62%]' }
    ]
  },
  {
    name: 'Vials',
    blurb: 'Lyophilised format. Reconstitute before use.',
    cta: 'View vial specifications',
    href: '/product/retatrutide-vial-10mg',
    images: [{ src: '/images/products/dbr-reta-vial-10mg.png', alt: 'Deep Beauty Research Retatrutide vial', className: 'h-36 sm:h-40' }]
  }
]

const PARTS = [
  { n: 1, title: 'Cartridge holder', body: 'Holds the cartridge and attaches to the pen body. The needle screws onto the front.' },
  { n: 2, title: 'Liquid chamber', body: 'Sterile diluent, sealed on its own until first use.' },
  { n: 3, title: 'Lyophilised chamber', body: 'The peptide is kept dry, which is how it stays stable in storage.' },
  { n: 4, title: 'Pen body', body: 'The cartridge sits inside. Set your dose on the dial, inject at the needle end.' }
]

/** Numbered callout hung below a part, with a thin leader line up to it. */
const Marker = ({ n, left }: { n: number; left: string }) => (
  <span className='absolute bottom-0 flex -translate-x-1/2 flex-col items-center' style={{ left }}>
    <span className='bg-foreground/40 h-5 w-px' />
    <span className='ring-foreground text-foreground flex size-6 items-center justify-center rounded-full bg-white text-xs font-semibold ring-1'>
      {n}
    </span>
  </span>
)

/**
 * Candidate for the "Inside every pen" slot: the two formats side by side, then the pen taken
 * apart on one line with numbered parts. Real renders, cut from the product photography.
 */
const HomeFormatCompare = () => {
  return (
    <section id='formats' className='scroll-mt-(--header-height) py-8 sm:py-16 lg:py-24'>
      <ContentLayout className='space-y-10'>
        <h3 className='text-2xl font-bold sm:text-3xl'>Two formats. One clear comparison.</h3>

        <div className='grid gap-6 md:grid-cols-2'>
          {FORMATS.map(format => (
            <div key={format.name} className='ring-border grid gap-6 rounded-xl bg-white p-6 ring-1 sm:grid-cols-[1fr_1.1fr] sm:p-8'>
              <div className='flex flex-col gap-2'>
                <h4 className='text-xl font-semibold'>{format.name}</h4>
                <p className='text-muted-foreground text-sm'>{format.blurb}</p>
                <Link href={format.href} className='group mt-auto inline-flex w-fit items-center gap-1.5 pt-6 text-sm font-semibold'>
                  {format.cta}
                  <ArrowRightIcon className='size-4 transition-transform duration-300 group-hover:translate-x-1' />
                </Link>
              </div>
              <div className='flex min-h-36 flex-col items-center justify-center gap-4 sm:items-end'>
                {format.images.map(image => (
                  <img key={image.src} src={image.src} alt={image.alt} className={`${image.className} object-contain`} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className='grid items-center gap-8 border-t pt-10 lg:grid-cols-[minmax(220px,1fr)_3.4fr]'>
          <div className='space-y-2'>
            <h4 className='text-xl font-bold sm:text-2xl'>Inside every pen</h4>
            <p className='text-muted-foreground text-sm'>Explore the construction and product specifications.</p>
            <Link href='/product/retatrutide-pen-15mg' className='group inline-flex items-center gap-1.5 pt-2 text-sm font-semibold'>
              See product details
              <ArrowRightIcon className='size-4 transition-transform duration-300 group-hover:translate-x-1' />
            </Link>
          </div>

          <div className='grid grid-cols-[0.9fr_2.3fr] items-center gap-6 sm:gap-10'>
            {/* Markers use percentages of each figure's width, so they stay on their part at any size. */}
            <figure className='relative pb-12'>
              <img
                src='/images/products/dbr-reta-pen-15mg-cartridge.png'
                alt='Dual-chamber cartridge: liquid chamber at the gold cap end, lyophilised chamber at the plunger end'
                className='w-full object-contain'
              />
              <Marker n={2} left='30%' />
              <Marker n={3} left='82%' />
            </figure>
            <figure className='relative pb-12'>
              <img
                src='/images/products/dbr-reta-pen-15mg-body.png'
                alt='Pen: cartridge holder with needle thread and windows, then the body with dose window and dial'
                className='w-full object-contain'
              />
              <Marker n={1} left='17%' />
              <Marker n={4} left='66%' />
            </figure>
          </div>
        </div>

        <ol className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          {PARTS.map(part => (
            <li key={part.n} className='flex gap-3'>
              <span className='ring-foreground flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ring-1'>
                {part.n}
              </span>
              <div className='space-y-1'>
                <p className='font-semibold'>{part.title}</p>
                <p className='text-muted-foreground text-sm'>{part.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </ContentLayout>
    </section>
  )
}

export default HomeFormatCompare
