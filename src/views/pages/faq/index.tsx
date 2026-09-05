// Next Imports
import Link from 'next/link'

// Component Imports
import FaqList from '@/components/blocks/faq-list'
import ContentLayout from '@/components/layout/content-layout'
import FaqGroupIndex from '@/views/pages/faq/faq-group-index'

// Data Imports
import { FAQ_GROUPS } from '@/views/pages/faq/faq-data'

// Utils Imports
import { cn } from '@/lib/utils'

const eyebrow = 'text-muted-foreground font-mono text-[10px] tracking-[0.12em] uppercase'

/**
 * FAQ page. White canvas, 1px rules, no boxes beyond the shared accordion. The
 * sticky left index reuses the shop filter row (dot, label, count in mono); the
 * right column runs the five groups, each with a mono eyebrow and the shared
 * FaqList. Facts come from faq-data and nowhere else.
 */
const FaqView = () => {
  return (
    <section className='py-8 lg:py-14'>
      <ContentLayout>
        <header className='border-foreground/15 max-w-2xl border-b pb-8'>
          <p className={eyebrow}>FAQ</p>
          <h1 className='mt-3 text-4xl font-bold tracking-tight text-balance sm:text-5xl'>Questions people ask</h1>
          <p className='text-muted-foreground mt-4 text-base leading-relaxed'>
            Ordering, dispatch from Germany, how the pens and vials are used, what the paperwork says, and how to work
            with us on trade. If your question is not here, write to us and you will have an answer within one business
            day.
          </p>
        </header>

        <div className='gap-8 pt-8 max-lg:space-y-10 lg:grid lg:grid-cols-4 lg:pt-12'>
          <aside className='col-span-1 hidden h-fit lg:sticky lg:top-[calc(var(--header-height)+1.5rem)] lg:block'>
            <FaqGroupIndex groups={FAQ_GROUPS} />
          </aside>

          <div className='col-span-3 space-y-12 lg:space-y-16'>
            {FAQ_GROUPS.map((group, index) => (
              <section key={group.id} id={group.id} className='scroll-mt-[calc(var(--header-height)+1.5rem)]'>
                <div className='border-foreground flex items-baseline justify-between gap-4 border-b pb-2.5'>
                  <p className={cn(eyebrow, 'tabular-nums')}>
                    Section {String(index + 1).padStart(2, '0')} / {String(FAQ_GROUPS.length).padStart(2, '0')}
                  </p>
                  <p className={cn(eyebrow, 'tabular-nums')}>{group.items.length} questions</p>
                </div>
                <h2 className='mt-4 mb-5 text-2xl font-bold tracking-tight text-balance sm:text-3xl'>{group.label}</h2>
                <FaqList items={group.items} defaultOpen={null} />
              </section>
            ))}

            <div className='border-foreground flex flex-wrap items-baseline justify-between gap-4 border-t pt-5'>
              <p className='text-base font-semibold'>Still stuck?</p>
              <Link href='/contact' className='text-sm underline underline-offset-4'>
                Write to us on the contact page
              </Link>
            </div>
          </div>
        </div>
      </ContentLayout>
    </section>
  )
}

export { FaqView }
