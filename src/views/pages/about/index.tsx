// Next Imports
import Link from 'next/link'

// Third-party Imports
import { ArrowRightIcon, ArrowUpRightIcon } from 'lucide-react'

// Component Imports
import ContentLayout from '@/components/layout/content-layout'

// Utils Imports
import { cn } from '@/lib/utils'

const eyebrow = 'text-muted-foreground font-mono text-[10px] tracking-[0.12em] uppercase'

/** Facts block. One oversized light value per cell, mono label underneath. */
const FACTS = [
  { value: '7', label: 'Years in the business' },
  { value: 'Germany', label: 'Where we are based', tight: true },
  { value: '>99%', label: 'Purity floor by HPLC' },
  { value: '2', label: 'Tests on every lot' },
  { value: '10', label: 'Years of lot records' }
]

const MADE = [
  { label: 'Tests per lot', value: '2' },
  { label: 'Second test', value: 'ISO 17025' },
  { label: 'Purity floor', value: '>99%' },
  { label: 'Identity', value: 'Mass spec' },
  { label: 'QC stages', value: '6' },
  { label: 'Lot record kept', value: '10 years' }
]

const SHIPPING = [
  { label: 'Dispatch', value: '2 business days' },
  { label: 'EU delivery', value: '2 to 3 days' },
  { label: 'Sent from', value: 'German stock' },
  { label: 'Packaging', value: 'Discreet, tracked' },
  { label: 'Damaged in transit', value: 'Replaced' },
  { label: 'Outside the EU', value: 'Case by case' },
  { label: 'Minimum order', value: 'None' },
  { label: 'Payment', value: 'Card, SEPA, crypto' }
]

const PENS = [
  {
    name: 'Retatrutide pen',
    strength: '15 mg and 40 mg',
    image: '/images/products/dbr-reta-pen-40mg-stacked.jpg',
    alt: 'Retatrutide pen with its dual-chamber cartridge shown beside it'
  },
  {
    name: 'GHK-Cu pen',
    strength: '100 mg',
    image: '/images/products/dbr-ghk-cu-pen-100mg-stacked.jpg',
    alt: 'GHK-Cu pen with its dual-chamber cartridge shown beside it'
  },
  {
    name: 'MOTS-c pen',
    strength: '20 mg',
    image: '/images/products/dbr-mots-c-pen-stacked.jpg',
    alt: 'MOTS-c pen with its dual-chamber cartridge shown beside it'
  }
]

const NEXT = [
  {
    title: 'Quality standards',
    body: 'The testing, the release floor and what sits in the box.',
    href: 'https://www.deepbeautyresearch.com/en/quality',
    external: true
  },
  {
    title: 'FAQ',
    body: 'Ordering, delivery, pens and vials, documentation, trade.',
    href: '/faq',
    external: false
  },
  {
    title: 'Contact',
    body: 'Four channels, one business day, Mon to Fri 09:00 to 17:00 CET.',
    href: '/contact',
    external: false
  }
]

/**
 * About page. Editorial, in the locked visual system: white canvas, 1px rules instead of
 * boxes, mono eyebrows, one oversized light numeral per fact, one dark statement band.
 * Every claim on this page comes from the approved company facts. No team, no founder
 * story, no cold-chain claim.
 */
const AboutView = () => {
  return (
    <>
      {/* Lede */}
      <section className='pt-10 sm:pt-14 lg:pt-20'>
        <ContentLayout>
          <p className={eyebrow}>About</p>
          <div className='mt-4 grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-16'>
            <h1 className='text-4xl font-bold tracking-tight text-balance sm:text-5xl'>
              Seven years in peptides, based in Germany, now selling direct.
            </h1>
            <div className='space-y-4 text-base leading-relaxed'>
              <p>
                Deep Beauty Research is one of Europe&apos;s largest peptide wholesalers. For seven years the work was
                trade supply. The same stock, the same lots and the same paperwork now go direct to you as well.
              </p>
              <p>
                The range is deliberately short. Pre-filled peptide pens and lyophilised vials: Retatrutide, GHK-Cu,
                MOTS-c, Melanotan I and II, Selank. These are premium wellness peptides, not medicines. Every product is
                labelled research purposes only and we do not give medical advice.
              </p>
            </div>
          </div>
        </ContentLayout>
      </section>

      {/* Facts */}
      <section className='mt-12 sm:mt-16'>
        <ContentLayout>
          <div className='border-foreground grid grid-cols-2 border-t sm:grid-cols-3 lg:grid-cols-5'>
            {FACTS.map(fact => (
              <div key={fact.label} className='border-foreground/15 border-b py-6 pr-6 sm:py-8'>
                <p
                  className={cn(
                    'font-light tracking-tight tabular-nums',
                    fact.tight ? 'text-3xl sm:text-4xl' : 'text-4xl sm:text-5xl'
                  )}
                >
                  {fact.value}
                </p>
                <p className={cn(eyebrow, 'mt-3')}>{fact.label}</p>
              </div>
            ))}
          </div>
        </ContentLayout>
      </section>

      {/* Statement band: how the range is made */}
      <section className='mt-12 bg-neutral-950 text-white sm:mt-16'>
        <ContentLayout>
          <div className='grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-20'>
            <div className='space-y-5'>
              <p className='font-mono text-[10px] tracking-[0.12em] text-white/55 uppercase'>How the range is made</p>
              <h2 className='text-3xl font-bold tracking-tight text-balance sm:text-4xl'>
                Tested twice, documented in the box, released or destroyed.
              </h2>
              <div className='max-w-md space-y-4 text-sm leading-relaxed text-white/70'>
                <p>
                  Every lot is tested during manufacture, then again by an ISO 17025 accredited third-party laboratory.
                  The release floor is greater than 99% purity by HPLC on every active, with identity confirmed by mass
                  spectrometry.
                </p>
                <p>
                  Quality control runs to six steps. A lot that fails any stage is destroyed. It is never reworked and
                  never discounted.
                </p>
                <p>
                  The Certificate of Analysis ships with every order and is available on request before you order. The
                  lot ID is printed on the pen and on the outer box, and the full lot record is kept for ten years.
                </p>
              </div>
            </div>

            <dl className='self-start border-t border-white/40 text-sm'>
              {MADE.map(row => (
                <div
                  key={row.label}
                  className='flex items-baseline justify-between gap-3 border-b border-white/15 py-2.5'
                >
                  <dt className='text-white/60'>{row.label}</dt>
                  <dd className='font-mono tabular-nums'>{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </ContentLayout>
      </section>

      {/* Shipping */}
      <section className='mt-12 sm:mt-16'>
        <ContentLayout>
          <div className='grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16'>
            <div className='space-y-5'>
              <p className={eyebrow}>How we ship</p>
              <h2 className='text-2xl font-bold tracking-tight text-balance sm:text-3xl'>
                Tracked from German stock, in packaging that says nothing.
              </h2>
              <div className='text-muted-foreground max-w-md space-y-4 text-sm leading-relaxed'>
                <p>
                  Orders dispatch within two business days of payment and EU delivery typically takes two to three
                  business days. Batch documentation for the lot you received is in the box.
                </p>
                <p>
                  If a parcel arrives damaged, photograph the parcel and the contents and write to{' '}
                  <a
                    href='mailto:orders@deepbeautyresearch.com'
                    className='text-foreground underline underline-offset-4'
                  >
                    orders@deepbeautyresearch.com
                  </a>{' '}
                  within 48 hours of arrival. We replace it. Delivery outside the EU is handled case by case, so ask
                  before you order.
                </p>
                <p>
                  There is no minimum order. A single pen or a single vial is fine, and card checkout at quantity one
                  charges the shop price shown.
                </p>
              </div>
            </div>

            <dl className='border-foreground self-start border-t text-sm'>
              {SHIPPING.map(row => (
                <div
                  key={row.label}
                  className='border-foreground/15 flex items-baseline justify-between gap-3 border-b py-2.5'
                >
                  <dt className='text-muted-foreground'>{row.label}</dt>
                  <dd className='font-mono tabular-nums'>{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </ContentLayout>
      </section>

      {/* Inside the pen */}
      <section className='mt-14 sm:mt-20'>
        <ContentLayout>
          <div className='border-foreground flex flex-wrap items-end justify-between gap-4 border-b pb-3'>
            <p className={eyebrow}>Inside the pen</p>
            <p className='text-muted-foreground font-mono text-[10px] tracking-[0.12em] uppercase'>
              1 click = 0.0125 ml
            </p>
          </div>

          <div className='mt-8 grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-16'>
            <div className='space-y-4'>
              <h2 className='text-2xl font-bold tracking-tight text-balance sm:text-3xl'>
                Two chambers, mixed on first use, ready from the fridge.
              </h2>
              <div className='text-muted-foreground space-y-4 text-sm leading-relaxed'>
                <p>
                  Each pen holds a dual-chamber cartridge: sterile diluent in one side, the lyophilised peptide in the
                  other. They combine inside the pen when you first use it, so there is nothing to reconstitute and
                  nothing to draw up. The dial moves in clicks of 0.0125 ml, sixty clicks to a full turn.
                </p>
                <p>
                  Vials arrive lyophilised. Reconstitute with bacteriostatic water and draw with an insulin syringe,
                  where one unit is 0.01 ml. Store pens and vials refrigerated at 2 to 8 C.
                </p>
              </div>
            </div>

            <div className='grid grid-cols-3 gap-4 sm:gap-6'>
              {PENS.map(pen => (
                <figure key={pen.name} className='space-y-3'>
                  <div className='ring-foreground/10 flex aspect-[2/3] items-center justify-center overflow-hidden rounded-xl bg-white ring-1'>
                    <img src={pen.image} alt={pen.alt} className='size-full object-contain p-3' />
                  </div>
                  <figcaption>
                    <p className='text-sm font-semibold'>{pen.name}</p>
                    <p className='text-muted-foreground font-mono text-[10px] tracking-[0.12em] uppercase'>
                      {pen.strength}
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </ContentLayout>
      </section>

      {/* Closing links */}
      <section className='mt-14 pb-16 sm:mt-20 sm:pb-24'>
        <ContentLayout>
          <div className='grid gap-px sm:grid-cols-3'>
            {NEXT.map(item => {
              const content = (
                <>
                  <span className='flex items-baseline justify-between gap-3'>
                    <span className='text-lg font-bold tracking-tight'>{item.title}</span>
                    {item.external ? (
                      <ArrowUpRightIcon className='text-muted-foreground group-hover:text-foreground size-4 shrink-0 self-center transition-colors' />
                    ) : (
                      <ArrowRightIcon className='text-muted-foreground group-hover:text-foreground size-4 shrink-0 self-center transition-transform duration-300 group-hover:translate-x-1' />
                    )}
                  </span>
                  <span className='text-muted-foreground mt-2 block text-sm leading-relaxed'>{item.body}</span>
                </>
              )

              return item.external ? (
                <a
                  key={item.title}
                  href={item.href}
                  target='_blank'
                  rel='noreferrer'
                  className='border-foreground group block border-t py-5 pr-6 sm:pr-10'
                >
                  {content}
                </a>
              ) : (
                <Link
                  key={item.title}
                  href={item.href}
                  className='border-foreground group block border-t py-5 pr-6 sm:pr-10'
                >
                  {content}
                </Link>
              )
            })}
          </div>
        </ContentLayout>
      </section>
    </>
  )
}

export { AboutView }
export default AboutView
