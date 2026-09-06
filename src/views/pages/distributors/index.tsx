// Next Imports
import Link from 'next/link'

// Component Imports
import { Button } from '@/components/ui/button'
import ContentLayout from '@/components/layout/content-layout'

// Utils Imports
import { cn } from '@/lib/utils'

const eyebrow = 'text-muted-foreground font-mono text-[10px] tracking-[0.12em] uppercase'

const ctaButtonClass =
  'hover:bg-foreground dark:hover:bg-foreground hover:text-background dark:hover:text-background'

const WHOLESALE_MAILTO = 'mailto:partners@deepbeautyresearch.com?subject=Wholesale%20enquiry'
const REFERRAL_APPLY = 'https://app.deepbeautyresearch.com/partners/apply'

/** The four facts a trade buyer checks first. One light numeral each, mono label beside it. */
const FACTS = [
  { value: '7', unit: 'years', label: 'In the peptide business' },
  { value: 'Germany', label: 'Where the stock sits' },
  { value: '>99', unit: '%', label: 'Purity floor by HPLC' },
  { value: '2 to 3', unit: 'days', label: 'EU delivery, typical' }
]

const WHOLESALE_ROWS = [
  { label: 'Who it is for', value: 'Clinics, shops, resellers' },
  { label: 'Pricing', value: 'Volume, agreed by email' },
  { label: 'Supply', value: 'Recurring, your cadence' },
  { label: 'In the box', value: 'Batch documentation' },
  { label: 'Your contact', value: 'One named person' },
  { label: 'Dispatch', value: 'Tracked, German stock' }
]

const REFERRAL_ROWS = [
  { label: 'Commission', value: '15% flat' },
  { label: 'Applies to', value: 'First order and reorders' },
  { label: 'Tracking window', value: '30 days' },
  { label: 'Payouts', value: 'Monthly, SEPA or crypto' },
  { label: 'Minimum payout', value: 'EUR 1' },
  { label: 'You get', value: 'Link and dashboard' }
]

/** The dark statement band. What is in the box, and what stands behind it, on every trade order. */
const INCLUDED = [
  { lead: 'Batch documentation', body: 'In the box with every order. The lot ID is on the pen and the outer box.' },
  { lead: 'Tracked dispatch', body: 'From German stock, within 2 business days of payment, in discreet packaging.' },
  { lead: 'Damaged in transit', body: 'Replaced. Photograph the parcel and contents within 48 hours of arrival.' },
  { lead: 'One named contact', body: 'The same person handles your account, your quotes and your reorders.' },
  { lead: 'Twice tested', body: 'During manufacture, then independently by an ISO 17025 accredited laboratory.' }
]

const REFERRAL_FACTS = [
  { value: '15', unit: '%', label: 'Flat, on every order' },
  { value: '30', unit: 'days', label: 'Tracking window' },
  { value: 'Monthly', label: 'Payouts by SEPA or crypto' },
  { value: '1', unit: 'EUR', label: 'Minimum payout' }
]

/**
 * Trade page. Two ways to work with us, set side by side as ruled definition blocks so a
 * buyer can read down one column and pick. Same system as the grid calculator: no boxes,
 * 1px rules, mono labels, one oversized light numeral per fact, a single dark band.
 *
 * Every fact here is from the company page spec. No minimums, no prices and no discounts
 * are quoted, because volume terms are agreed by email.
 */
const DistributorsView = () => {
  return (
    <>
      {/* Opening */}
      <section className='pt-10 lg:pt-14'>
        <ContentLayout>
          <div className='max-w-3xl'>
            <p className={eyebrow}>Trade</p>
            <h1 className='mt-3 text-4xl font-bold tracking-tight text-balance sm:text-5xl'>
              Buy from one of Europe&apos;s largest peptide wholesalers.
            </h1>
            <p className='text-muted-foreground mt-5 text-base leading-relaxed text-pretty sm:text-lg'>
              Seven years in the peptide business, based in Germany. We supply clinics, shops, resellers and regional distributors, and now customers directly.
              Now we supply clinics, shops, resellers and regional distributors directly, on the same stock and the
              same paperwork.
            </p>
          </div>

          {/* Facts */}
          <dl className='border-foreground mt-10 grid gap-y-8 border-t pt-8 sm:grid-cols-3 sm:gap-x-8 lg:mt-14 lg:grid-cols-4'>
            {FACTS.map(fact => (
              <div key={fact.label}>
                <dt className={cn(eyebrow, 'sr-only')}>{fact.label}</dt>
                <dd>
                  <span className='flex items-baseline gap-2 leading-none'>
                    <span className='text-4xl font-light tracking-tight tabular-nums lg:text-5xl'>{fact.value}</span>
                    {fact.unit ? (
                      <span className='text-muted-foreground font-mono text-xs uppercase'>{fact.unit}</span>
                    ) : null}
                  </span>
                  <span className={cn(eyebrow, 'mt-3 block')}>{fact.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </ContentLayout>
      </section>

      {/* The two routes */}
      <section className='pt-12 pb-12 sm:pt-16 sm:pb-16'>
        <ContentLayout>
          <h2 className='text-2xl font-bold tracking-tight text-balance sm:text-3xl'>Two ways to work with us.</h2>
          <div className='mt-8 grid gap-10 lg:grid-cols-2 lg:gap-12'>
            <Route
              eyebrowText='Route one'
              title='Wholesale and distribution'
              intro='For clinics, shops, resellers and regional distributors buying to stock or to resell.'
              rows={WHOLESALE_ROWS}
              note='Verification before the first shipment: a company email domain, or a short note on the business.'
              cta={
                <Button
                  variant='outline'
                  size='lg'
                  className={ctaButtonClass}
                  render={<a href={WHOLESALE_MAILTO} />}
                  nativeButton={false}
                >
                  Start a wholesale enquiry
                </Button>
              }
              ctaNote={
                <>
                  Tell us quantity, region and how often you reorder, or{' '}
                  <Link href='/bulk-orders' className='text-foreground underline underline-offset-4'>
                    build a priced request on the bulk orders page
                  </Link>
                  .
                </>
              }
            />
            <Route
              eyebrowText='Route two'
              title='Referral partner programme'
              intro='For anyone with an audience who would rather send customers to us than hold stock.'
              rows={REFERRAL_ROWS}
              note='Applications are reviewed within two weeks.'
              cta={
                <Button
                  variant='outline'
                  size='lg'
                  className={ctaButtonClass}
                  render={<a href={REFERRAL_APPLY} target='_blank' rel='noopener noreferrer' />}
                  nativeButton={false}
                >
                  Apply as a referral partner
                </Button>
              }
              ctaNote='You get a unique link and a partner dashboard.'
            />
          </div>
        </ContentLayout>
      </section>

      {/* Statement band */}
      <section className='bg-neutral-950 text-white'>
        <ContentLayout>
          <div className='grid gap-10 py-12 sm:py-14 lg:grid-cols-[1fr_1.3fr] lg:gap-16 lg:py-20'>
            <div className='space-y-4'>
              <p className='font-mono text-[10px] tracking-[0.12em] text-white/55 uppercase'>The standard</p>
              <h2 className='text-3xl font-semibold tracking-tight text-balance sm:text-4xl'>
                What every trade order includes.
              </h2>
              <p className='max-w-md text-base text-white/70'>
                The same release rules on a pallet as on a single pen. A lot that fails any stage is destroyed, never
                reworked and never discounted.
              </p>
            </div>

            <dl className='grid gap-x-10 gap-y-7 sm:grid-cols-2'>
              {INCLUDED.map(item => (
                <div key={item.lead} className='space-y-1.5 border-t border-white/15 pt-4'>
                  <dt className='text-lg font-semibold tracking-tight'>{item.lead}</dt>
                  <dd className='text-sm leading-relaxed text-white/70'>{item.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </ContentLayout>
      </section>

      {/* Referral numbers */}
      <section className='pt-12 sm:pt-16'>
        <ContentLayout>
          <div className='max-w-2xl'>
            <p className={eyebrow}>Referral programme</p>
            <h2 className='mt-3 text-2xl font-bold tracking-tight text-balance sm:text-3xl'>
              The numbers, in full.
            </h2>
            <p className='text-muted-foreground mt-4 text-base leading-relaxed'>
              One rate on every order a referred customer places, the first one and every reorder after it. No tiers to
              climb and nothing to hold in stock.
            </p>
          </div>

          <dl className='border-foreground mt-8 grid gap-y-8 border-t pt-8 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-4'>
            {REFERRAL_FACTS.map(fact => (
              <div key={fact.label}>
                <dt className={cn(eyebrow, 'sr-only')}>{fact.label}</dt>
                <dd>
                  <span className='flex items-baseline gap-2 leading-none'>
                    <span className='text-4xl font-light tracking-tight tabular-nums lg:text-5xl'>{fact.value}</span>
                    {fact.unit ? (
                      <span className='text-muted-foreground font-mono text-xs uppercase'>{fact.unit}</span>
                    ) : null}
                  </span>
                  <span className={cn(eyebrow, 'mt-3 block')}>{fact.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </ContentLayout>
      </section>

      {/* Closing */}
      <section className='py-12 sm:py-16'>
        <ContentLayout>
          <div className='border-foreground max-w-3xl border-t pt-8'>
            <h2 className='text-2xl font-bold tracking-tight text-balance'>Still deciding which route fits.</h2>
            <p className='text-muted-foreground mt-4 text-base leading-relaxed'>
              Write to{' '}
              <a href={WHOLESALE_MAILTO} className='text-foreground underline underline-offset-4'>
                partners@deepbeautyresearch.com
              </a>{' '}
              with what you sell and where you sell it, and we will tell you which one makes you more. Replies inside
              one business day, Monday to Friday, 09:00 to 17:00 CET.
            </p>
            <p className='mt-4 text-sm'>
              <Link href='/faq#trade' className='underline underline-offset-4'>
                Trade questions in the FAQ
              </Link>
            </p>
          </div>
        </ContentLayout>
      </section>
    </>
  )
}

/** One route: eyebrow, heading, a short line, ruled rows, a note, and a single CTA. */
const Route = ({
  eyebrowText,
  title,
  intro,
  rows,
  note,
  cta,
  ctaNote
}: {
  eyebrowText: string
  title: string
  intro: string
  rows: { label: string; value: string }[]
  note: string
  cta: React.ReactNode
  ctaNote: React.ReactNode
}) => (
  <div className='flex flex-col'>
    <p className={eyebrow}>{eyebrowText}</p>
    <h3 className='mt-3 text-xl font-bold tracking-tight text-balance sm:text-2xl'>{title}</h3>
    <p className='text-muted-foreground mt-3 text-sm leading-relaxed'>{intro}</p>

    <dl className='border-foreground mt-6 border-t text-sm'>
      {rows.map(row => (
        <div key={row.label} className='border-foreground/15 flex items-baseline justify-between gap-4 border-b py-2.5'>
          <dt className='text-muted-foreground'>{row.label}</dt>
          <dd className='text-right font-mono tabular-nums'>{row.value}</dd>
        </div>
      ))}
    </dl>

    <p className='text-muted-foreground mt-4 font-mono text-[10px] leading-relaxed'>{note}</p>

    <div className='mt-auto pt-6'>
      {cta}
      <p className='text-muted-foreground mt-3 text-sm'>{ctaNote}</p>
    </div>
  </div>
)

export { DistributorsView }
export default DistributorsView
