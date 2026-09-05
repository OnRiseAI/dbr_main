// Next Imports
import Link from 'next/link'

// Component Imports
import ContentLayout from '@/components/layout/content-layout'
import { cn } from '@/lib/utils'

/** The teal of the pen body. One marker only, on the reply time. */
const ACCENT = '#0592b3'

const eyebrow = 'text-muted-foreground font-mono text-[10px] tracking-[0.12em] uppercase'

const mailLink =
  'text-foreground font-mono text-xs break-all underline underline-offset-4 focus-visible:outline-foreground focus-visible:outline-2 focus-visible:outline-offset-4'

type Channel = {
  label: string
  audience: string
  address: string
  subject: string
}

const CHANNELS: Channel[] = [
  {
    label: 'General',
    audience: 'Anything that does not belong to one of the three below.',
    address: 'contact@deepbeautyresearch.com',
    subject: 'General enquiry'
  },
  {
    label: 'Orders and shipping',
    audience: 'Existing orders, tracking and damaged arrivals.',
    address: 'orders@deepbeautyresearch.com',
    subject: 'Order enquiry'
  },
  {
    label: 'Trade',
    audience: 'Wholesale, distribution, quotes and referral partners.',
    address: 'partners@deepbeautyresearch.com',
    subject: 'Wholesale enquiry'
  },
  {
    label: 'Product and documentation',
    audience: 'CoA, lot records and how a product works.',
    address: 'research@deepbeautyresearch.com',
    subject: 'Documentation request'
  }
]

const FACTS = [
  { label: 'Hours', value: 'Mon to Fri 09:00 to 17:00 CET' },
  { label: 'Closed', value: 'German public holidays' },
  { label: 'Dispatched from', value: 'Germany' },
  { label: 'Fulfilment address', value: 'Verified trade, on request' }
]

const BEFORE_YOU_WRITE = [
  {
    href: '/faq#shipping',
    label: 'Shipping and delivery',
    line: 'Dispatch times, tracking and where a parcel can go.'
  },
  {
    href: '/faq#ordering',
    label: 'Ordering and payment',
    line: 'Payment methods, minimums and what checkout charges.'
  },
  {
    href: '/faq#quality',
    label: 'Quality and documentation',
    line: 'Testing, purity, CoA and lot records.'
  }
]

const mailto = ({ address, subject }: Channel) => `mailto:${address}?subject=${encodeURIComponent(subject)}`

/**
 * Contact. There is no mail backend in this repo, so the page is four addressed
 * channels rather than a form: ruled rows with a mono address and a prefilled
 * subject. Same system as the grid calculator and the shop filters: white canvas,
 * one muted band, 1px rules, mono eyebrows, one oversized light numeral.
 */
const ContactView = () => {
  return (
    <>
      {/* Lede */}
      <section className='pt-10 pb-10 sm:pt-14 sm:pb-14'>
        <ContentLayout>
          <p className={eyebrow}>Contact</p>
          <h1 className='mt-3 max-w-3xl text-4xl font-bold tracking-tight text-balance sm:text-5xl'>
            Talk to the people who make it.
          </h1>
          <p className='text-muted-foreground mt-4 max-w-2xl text-base leading-relaxed'>
            Every order, product and documentation question is answered within one business day, German business
            hours.
          </p>
        </ContentLayout>
      </section>

      {/* Four channels */}
      <section className='pb-12 sm:pb-16'>
        <ContentLayout>
          <p className={cn(eyebrow, 'border-foreground border-b pb-2.5')}>Where to write</p>
          <dl>
            {CHANNELS.map(channel => (
              <div
                key={channel.address}
                className='border-foreground/15 grid gap-2 border-b py-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline sm:gap-8'
              >
                <div className='min-w-0'>
                  <dt className={eyebrow}>{channel.label}</dt>
                  <p className='mt-1.5 text-sm'>{channel.audience}</p>
                </div>
                <dd className='sm:text-right'>
                  <a href={mailto(channel)} className={mailLink}>
                    {channel.address}
                  </a>
                  <p className={cn(eyebrow, 'mt-1.5')}>Subject: {channel.subject}</p>
                </dd>
              </div>
            ))}
          </dl>
        </ContentLayout>
      </section>

      {/* Reply time, hours, and what to do with a damaged parcel */}
      <section className='bg-muted py-12 sm:py-16'>
        <ContentLayout>
          <div className='grid gap-10 lg:grid-cols-2 lg:gap-16'>
            <div>
              <p className={cn(eyebrow, 'flex items-center gap-2')}>
                <span aria-hidden className='size-1.5 rounded-full' style={{ backgroundColor: ACCENT }} />
                Reply time
              </p>
              <p className='mt-2 flex items-baseline gap-2 leading-none tabular-nums'>
                <span className='text-5xl font-light tracking-tight'>1</span>
                <span className='text-muted-foreground font-mono text-xs uppercase'>business day</span>
              </p>
              <dl className='border-foreground mt-6 border-t text-sm'>
                {FACTS.map(fact => (
                  <div
                    key={fact.label}
                    className='border-foreground/15 flex items-baseline justify-between gap-4 border-b py-2'
                  >
                    <dt className='text-muted-foreground'>{fact.label}</dt>
                    <dd className='text-right font-mono text-xs tabular-nums'>{fact.value}</dd>
                  </div>
                ))}
              </dl>
              <p className='text-muted-foreground mt-3 font-mono text-[10px] leading-relaxed'>
                The fulfilment address is shared with verified trade accounts on request. It is not published.
              </p>
            </div>

            <div className='border-foreground border-t pt-5'>
              <p className={eyebrow}>Damaged in transit</p>
              <p className='mt-2 max-w-md text-sm leading-relaxed'>
                Photograph the parcel and the contents, then write to orders@deepbeautyresearch.com within 48 hours of
                arrival. We replace it.
              </p>
              <p className='mt-4'>
                <a
                  href={`mailto:orders@deepbeautyresearch.com?subject=${encodeURIComponent('Order enquiry')}`}
                  className={mailLink}
                >
                  orders@deepbeautyresearch.com
                </a>
              </p>
              <dl className='border-foreground/15 mt-6 border-t text-sm'>
                <div className='border-foreground/15 flex items-baseline justify-between gap-4 border-b py-2'>
                  <dt className='text-muted-foreground'>Window to report</dt>
                  <dd className='font-mono text-xs tabular-nums'>48 hours</dd>
                </div>
                <div className='border-foreground/15 flex items-baseline justify-between gap-4 border-b py-2'>
                  <dt className='text-muted-foreground'>Outcome</dt>
                  <dd className='font-mono text-xs'>Replacement</dd>
                </div>
              </dl>
            </div>
          </div>
        </ContentLayout>
      </section>

      {/* Three answers that already exist */}
      <section className='py-12 sm:py-16'>
        <ContentLayout>
          <p className={cn(eyebrow, 'border-foreground border-b pb-2.5')}>Before you write</p>
          <ul>
            {BEFORE_YOU_WRITE.map(item => (
              <li key={item.href} className='border-foreground/15 border-b'>
                <Link
                  href={item.href}
                  className='focus-visible:outline-foreground grid gap-1 py-4 focus-visible:outline-2 focus-visible:outline-offset-4 sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] sm:items-baseline sm:gap-8'
                >
                  <span className='text-sm font-semibold underline underline-offset-4'>{item.label}</span>
                  <span className='text-muted-foreground text-sm'>{item.line}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className='border-foreground/15 mt-10 border p-5 sm:p-6'>
            <p className={eyebrow}>Please note</p>
            <p className='text-muted-foreground mt-2 max-w-2xl text-sm leading-relaxed'>
              Deep Beauty Research sells wellness peptides, not medicines. We do not give medical advice. What you send
              us is used only to answer your question.
            </p>
          </div>
        </ContentLayout>
      </section>
    </>
  )
}

export { ContactView }
export default ContactView
