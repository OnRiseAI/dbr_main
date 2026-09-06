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

/** The two formats side by side, with real renders. */
const HomeFormatCompare = () => {
  return (
    <section id='formats' className='scroll-mt-(--header-height) py-8 sm:py-16 lg:py-24'>
      <ContentLayout className='space-y-8'>
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

      </ContentLayout>
    </section>
  )
}

export default HomeFormatCompare
