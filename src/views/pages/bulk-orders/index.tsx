// Next Imports
import Link from 'next/link'

// Third-party Imports
import { ArrowRightIcon } from 'lucide-react'

// Component Imports
import ContentLayout from '@/components/layout/content-layout'
import FaqList from '@/components/blocks/faq-list'
import BulkOrderBuilder from '@/views/pages/bulk-orders/bulk-order-builder'

// Utils Imports
import { cn } from '@/lib/utils'

const eyebrow = 'text-muted-foreground font-mono text-[10px] tracking-[0.12em] uppercase'

const FACTS = [
  { value: '7', unit: 'years', label: 'In the peptide business' },
  { value: 'Germany', label: 'Where every unit ships from' },
  { value: '>99', unit: '%', label: 'Purity floor by HPLC' },
  { value: '1', unit: 'day', label: 'To your quote, business days' }
]

const STEPS = [
  { title: 'Build the request', body: 'Pick the pens and vials and set quantities. No minimum order, mix products freely.' },
  { title: 'Get the quote', body: 'A named contact replies within one business day with volume pricing and delivery timing.' },
  { title: 'Pay and receive', body: 'Bank transfer, card or crypto. Tracked dispatch from German stock within 2 business days of payment.' }
]

const WHO = [
  { lead: 'Clinics and practices', body: 'Recurring supply on your cadence, batch documentation with every delivery.' },
  { lead: 'Shops and resellers', body: 'Stock for resale at volume pricing, with one contact for quotes and reorders.' },
  { lead: 'Research groups', body: 'Larger quantities of one compound, same purity floor and the same paperwork.' },
  { lead: 'Regular customers', body: 'Buying several months at once. Ask for a quote before you order five or more.' }
]

export const BULK_FAQ = [
  {
    q: 'Is there a minimum order for bulk?',
    a: 'No. Volume pricing starts to apply from around five units of the same product, but you can request a quote for any quantity and mix pens and vials in one request.'
  },
  {
    q: 'How much is the bulk discount?',
    a: 'It depends on the products, the quantity and how often you reorder, so it is agreed on the quote rather than printed as a table. You will have a number within one business day.'
  },
  {
    q: 'Can I buy Retatrutide in bulk?',
    a: 'Yes. Retatrutide pens (15 mg and 40 mg) and vials (10 mg and 20 mg) are the most requested bulk lines, alongside GHK-Cu pens and vials.'
  },
  {
    q: 'Where do bulk orders ship from and how fast?',
    a: 'All stock sits in Germany. Bulk orders dispatch within 2 business days of payment, tracked and in discreet packaging. Typical EU delivery is 2 to 3 days.'
  },
  {
    q: 'What paperwork comes with a bulk order?',
    a: 'Batch documentation for every product in the delivery. Every batch is tested during manufacture and again by an independent ISO 17025 accredited laboratory.'
  },
  {
    q: 'How do I pay for a bulk order?',
    a: 'Bank transfer, card or crypto. Payment details come with the quote. First shipments need a quick verification: a company email domain or a short note on the business.'
  }
]

/**
 * Bulk orders. Built to rank for "buy peptides in bulk", "wholesale retatrutide" and the
 * like, and to turn that traffic into a quote request the admin already sees. Same design
 * system as the trade page: 1px rules, mono labels, light numerals, one dark panel.
 */
const BulkOrdersView = () => {
  return (
    <>
      <section className='pt-10 lg:pt-14'>
        <ContentLayout>
          <div className='max-w-3xl'>
            <p className={eyebrow}>Bulk orders</p>
            <h1 className='mt-3 text-4xl font-bold tracking-tight text-balance sm:text-5xl'>
              Buy peptides in bulk, direct from German stock.
            </h1>
            <p className='text-muted-foreground mt-5 text-base leading-relaxed text-pretty sm:text-lg'>
              Retatrutide, GHK-Cu, MOTS-c, Melanotan and Selank in pens and vials, at volume pricing for clinics, shops,
              research groups and anyone buying several months at once. Build the request below and a named contact
              quotes it within one business day.
            </p>
            <div className='mt-6 flex flex-wrap gap-3'>
              <a href='#bulk-builder' className='group bg-foreground text-background inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold'>
                Build a bulk request
                <ArrowRightIcon className='size-4 transition-transform duration-300 group-hover:translate-x-1' />
              </a>
              <Link href='/distributors' className='inline-flex items-center gap-2 rounded-md border px-5 py-3 text-sm font-semibold'>
                Become a distributor
              </Link>
            </div>
          </div>

          <dl className='border-foreground mt-10 grid gap-y-8 border-t pt-8 sm:grid-cols-2 sm:gap-x-8 lg:mt-14 lg:grid-cols-4'>
            {FACTS.map(fact => (
              <div key={fact.label}>
                <dt className={cn(eyebrow, 'sr-only')}>{fact.label}</dt>
                <dd>
                  <span className='flex items-baseline gap-2 leading-none'>
                    <span className='text-4xl font-light tracking-tight tabular-nums lg:text-5xl'>{fact.value}</span>
                    {fact.unit ? <span className='text-muted-foreground font-mono text-xs uppercase'>{fact.unit}</span> : null}
                  </span>
                  <span className={cn(eyebrow, 'mt-3 block')}>{fact.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </ContentLayout>
      </section>

      <section className='pt-12 sm:pt-16'>
        <ContentLayout>
          <h2 className='text-2xl font-bold tracking-tight sm:text-3xl'>How a bulk order works</h2>
          <ol className='border-foreground/15 mt-6 grid gap-8 border-t pt-8 sm:grid-cols-3'>
            {STEPS.map((step, index) => (
              <li key={step.title}>
                <p className={eyebrow}>Step {index + 1}</p>
                <p className='mt-2 text-lg font-semibold'>{step.title}</p>
                <p className='text-muted-foreground mt-1 text-sm leading-relaxed'>{step.body}</p>
              </li>
            ))}
          </ol>
        </ContentLayout>
      </section>

      <section className='pt-12 sm:pt-16'>
        <ContentLayout>
          <h2 className='text-2xl font-bold tracking-tight sm:text-3xl'>Who buys in bulk from us</h2>
          <dl className='border-foreground/15 mt-6 grid gap-8 border-t pt-8 sm:grid-cols-2 lg:grid-cols-4'>
            {WHO.map(item => (
              <div key={item.lead}>
                <dt className='text-lg font-semibold'>{item.lead}</dt>
                <dd className='text-muted-foreground mt-1 text-sm leading-relaxed'>{item.body}</dd>
              </div>
            ))}
          </dl>
        </ContentLayout>
      </section>

      <section className='pt-12 sm:pt-16'>
        <ContentLayout>
          <div className='max-w-2xl'>
            <p className={eyebrow}>Bulk request</p>
            <h2 className='mt-2 text-2xl font-bold tracking-tight sm:text-3xl'>Build your bulk order</h2>
            <p className='text-muted-foreground mt-2 text-base'>
              Live products and list prices from the shop. The quote applies volume pricing on top.
            </p>
          </div>
          <div className='mt-8'>
            <BulkOrderBuilder />
          </div>
        </ContentLayout>
      </section>

      <section className='py-12 sm:py-16'>
        <ContentLayout>
          <h2 className='text-2xl font-bold tracking-tight sm:text-3xl'>Bulk order questions</h2>
          <div className='mt-6 max-w-3xl'>
            <FaqList items={BULK_FAQ} />
          </div>
        </ContentLayout>
      </section>
    </>
  )
}

export default BulkOrdersView
