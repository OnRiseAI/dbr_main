// Next Imports
import Link from 'next/link'

// Third-party Imports
import { ArrowRightIcon } from 'lucide-react'

// Component Imports
import ContentLayout from '@/components/layout/content-layout'
import FaqList from '@/components/blocks/faq-list'
import HomeWeightGoal from '@/views/pages/home/home-weight-goal'
import HomeCalculator from '@/views/pages/home/home-calculator'

// Lib Imports
import { CLIENT_LOSS_PCT_24W, MAX_WEEKLY_DOSE_MG, PROTOCOL } from '@/lib/weight-plan'
import { CLICKS_PER_TURN, ML_PER_CLICK } from '@/lib/pen-dosing'

const eyebrow = 'text-muted-foreground font-mono text-[10px] tracking-[0.12em] uppercase'

export const CALCULATOR_FAQ = [
  {
    question: 'How much weight can I lose on Retatrutide?',
    answer: `Deep Beauty Research clients on the staged protocol lose about ${CLIENT_LOSS_PCT_24W}% of their starting weight over 24 weeks. Someone starting at 100 kg would expect to be around 83 kg. Individual results vary.`
  },
  {
    question: 'What is the Retatrutide protocol?',
    answer: `A weekly dose that starts at ${PROTOCOL[0].mg} mg and steps up every four weeks: ${PROTOCOL.slice(0, -1)
      .map(s => `${s.mg} mg`)
      .join(', ')} and then ${MAX_WEEKLY_DOSE_MG} mg, which is held from week 17. ${MAX_WEEKLY_DOSE_MG} mg a week is the most we recommend.`
  },
  {
    question: 'How many clicks is 1 mg on the Retatrutide pen?',
    answer: `On the 15 mg pen (3 ml), 1 mg is 16 clicks. On the 40 mg pen (4 ml) it is 8 clicks. One click of the dial is ${ML_PER_CLICK} ml and a full turn is ${CLICKS_PER_TURN} clicks. The dose calculator on this page works it out for any amount.`
  },
  {
    question: 'How long does a Retatrutide pen last?',
    answer: 'A 15 mg pen gives 15 doses of 1 mg, so 15 weeks at one dose a week. A 40 mg pen gives 40. The weight-goal calculator counts the pens for your whole plan, including the lower starting doses.'
  },
  {
    question: 'Pen or vial for Retatrutide?',
    answer: 'The pen is pre-filled and dialled in clicks, nothing to mix or measure. The vial is lyophilised powder you reconstitute with bacteriostatic water and draw with an insulin syringe, and costs less per milligram. Both hold the same peptide.'
  }
]

/**
 * Retatrutide calculator page. Two tools: the weight-goal planner for people deciding, and the
 * dose calculator for people who already hold a pen or a vial. Written to rank for
 * "retatrutide calculator" searches and to send the reader to the shop with a plan.
 */
const RetatrutideCalculatorView = () => {
  return (
    <div className='pb-8 lg:pb-14'>
      <section className='py-8 lg:py-14'>
        <ContentLayout>
          <header className='border-foreground/15 max-w-2xl border-b pb-8'>
            <p className={eyebrow}>Calculator</p>
            <h1 className='mt-3 text-4xl font-bold tracking-tight text-balance sm:text-5xl'>Retatrutide calculator</h1>
            <p className='text-muted-foreground mt-4 text-base leading-relaxed'>
              Two questions, answered with numbers. How long will it take to reach your goal weight, and what does a
              dose look like on the pen dial or the syringe. Built on the same staged protocol our clients use.
            </p>
          </header>
        </ContentLayout>
      </section>

      <HomeWeightGoal />

      {/* The protocol, spelled out */}
      <section className='pt-8 sm:pt-16 lg:pt-24'>
        <ContentLayout className='space-y-8'>
          <div className='max-w-2xl space-y-2'>
            <p className={eyebrow}>The protocol</p>
            <h2 className='text-2xl font-bold sm:text-3xl'>Start low, step up every four weeks, then hold.</h2>
            <p className='text-muted-foreground text-base'>
              Every plan on this page uses the same schedule. The weekly dose rises in small steps so the body settles at
              each level, and it never goes above {MAX_WEEKLY_DOSE_MG} mg.
            </p>
          </div>
          <ol className='grid gap-4 sm:grid-cols-5'>
            {PROTOCOL.map((step, index) => {
              const from = PROTOCOL.slice(0, index).reduce((n, s) => n + s.weeks, 0) + 1
              const last = index === PROTOCOL.length - 1

              return (
                <li key={step.mg} className='rounded-xl border p-4'>
                  <p className='text-muted-foreground text-xs font-medium uppercase'>{last ? `Week ${from} onwards` : `Weeks ${from} to ${from + step.weeks - 1}`}</p>
                  <p className='mt-1 text-3xl font-semibold tabular-nums'>
                    {step.mg} <span className='text-muted-foreground text-base font-normal'>mg a week</span>
                  </p>
                  <p className='text-muted-foreground mt-1 text-xs'>{last ? 'Maintenance. Held for as long as the plan runs.' : 'Four weekly doses at this level.'}</p>
                </li>
              )
            })}
          </ol>
        </ContentLayout>
      </section>

      <HomeCalculator
        defaultFormat='pen'
        defaultProductId='retatrutide-pen-15mg'
        title='Retatrutide dose calculator'
        subtitle='Already have a pen or a vial? Enter the amount per use and read the clicks off the dial or the units off the syringe.'
      />

      <section className='pt-8 sm:pt-16 lg:pt-24'>
        <ContentLayout className='space-y-8'>
          <div className='max-w-2xl space-y-2'>
            <p className={eyebrow}>Questions</p>
            <h2 className='text-2xl font-bold sm:text-3xl'>The numbers people ask about</h2>
          </div>
          <div className='max-w-3xl'>
            <FaqList items={CALCULATOR_FAQ.map(item => ({ q: item.question, a: item.answer }))} />
          </div>
          <div className='flex flex-wrap gap-3 border-t pt-8'>
            <Link
              href='/shop?category=Weight%20Management'
              className='group bg-foreground text-background inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold'
            >
              Shop Retatrutide
              <ArrowRightIcon className='size-4 transition-transform duration-300 group-hover:translate-x-1' />
            </Link>
            <Link href='/faq' className='inline-flex items-center gap-2 rounded-md border px-5 py-3 text-sm font-semibold'>
              More questions
            </Link>
          </div>
          <p className='text-muted-foreground max-w-3xl text-xs leading-relaxed'>
            Figures are arithmetic from the label values and Deep Beauty Research client results. They are not medical
            advice and not a recommendation on how much to use. Research use only.
          </p>
        </ContentLayout>
      </section>
    </div>
  )
}

export default RetatrutideCalculatorView
