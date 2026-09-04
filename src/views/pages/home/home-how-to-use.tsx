import Link from 'next/link'
import { ArrowRightIcon } from 'lucide-react'

import ContentLayout from '@/components/layout/content-layout'

const FORMATS = [
  {
    name: 'Pens',
    lead: 'Pre-filled. The two chambers mix inside the pen on first use.',
    image: '/images/products/dbr-reta-pen-15mg-upright.png',
    href: '/shop?category=Pens',
    steps: [
      { title: 'Take it out of the fridge', body: 'Remove the cap. Nothing to prepare, nothing to measure.' },
      { title: 'Attach a pen needle', body: 'Standard pen needles fit. A fresh one each time.' },
      { title: 'Dial the units', body: 'Turn the dose knob to the number you need and you are done.' }
    ]
  },
  {
    name: 'Vials',
    lead: 'Lyophilised powder. Reconstitute once, then draw each dose.',
    image: '/images/products/dbr-reta-vial-10mg.png',
    href: '/shop?category=Vials',
    steps: [
      { title: 'Add bacteriostatic water', body: 'Slowly, down the side of the glass. Not included with the vial.' },
      { title: 'Swirl until clear', body: 'Gently. Never shake a peptide vial.' },
      { title: 'Draw the dose', body: 'With an insulin syringe, using the units from the calculator below.' }
    ]
  }
]

/** Side by side: how a pen is used, how a vial is used. */
const HomeHowToUse = () => {
  return (
    <section className='pt-8 sm:pt-16 lg:pt-24'>
      <ContentLayout className='space-y-8'>
        <div className='space-y-1'>
          <h3 className='text-2xl font-bold sm:text-3xl'>How each format works</h3>
          <p className='text-muted-foreground text-base'>Three steps either way. Pick the one that suits how you work.</p>
        </div>

        <div className='grid gap-6 lg:grid-cols-2'>
          {FORMATS.map(format => (
            <div key={format.name} className='bg-muted grid gap-6 rounded-xl p-6 sm:grid-cols-[160px_1fr] sm:p-8'>
              <div className='flex h-64 items-center justify-center rounded-lg bg-white sm:h-full'>
                <img src={format.image} alt={format.name} className='max-h-56 object-contain p-4 sm:max-h-72' />
              </div>
              <div className='flex flex-col gap-5'>
                <div className='space-y-1'>
                  <h4 className='text-xl font-bold'>{format.name}</h4>
                  <p className='text-muted-foreground text-sm'>{format.lead}</p>
                </div>
                <ol className='space-y-4'>
                  {format.steps.map((step, index) => (
                    <li key={step.title} className='flex gap-3'>
                      <span className='bg-foreground text-background flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold'>
                        {index + 1}
                      </span>
                      <div className='space-y-0.5'>
                        <p className='font-semibold'>{step.title}</p>
                        <p className='text-muted-foreground text-sm'>{step.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <Link
                  href={format.href}
                  className='group mt-auto inline-flex w-fit items-center gap-1.5 text-sm font-semibold'
                >
                  Shop {format.name.toLowerCase()}
                  <ArrowRightIcon className='size-4 transition-transform duration-300 group-hover:translate-x-1' />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </ContentLayout>
    </section>
  )
}

export default HomeHowToUse
