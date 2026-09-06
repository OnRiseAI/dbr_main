'use client'

// React Imports
import { useMemo, useState } from 'react'

// Next Imports
import Link from 'next/link'

// Third-party Imports
import { ArrowRightIcon } from 'lucide-react'

// Component Imports
import ContentLayout from '@/components/layout/content-layout'
import { Slider } from '@/components/ui/slider'

// Store Imports
import { useProductsStore } from '@/store/use-products-store'

// Lib Imports
import { CLIENT_LOSS_PCT_24W, MAX_PLAN_WEEKS, PROTOCOL, buildGoalPlan, unitsForPlan } from '@/lib/weight-plan'
import { formatPrice } from '@/utils/product-utils'

const MIN = 50
const MAX = 200

const sliderClass =
  'w-full py-1 [&_[data-slot=slider-track]]:h-1.5 [&_[data-slot=slider-track]]:bg-neutral-300 [&_[data-slot=slider-thumb]]:size-4 [&_[data-slot=slider-range]]:bg-[#0592b3]'

const fmt = (n: number, digits = 0) => new Intl.NumberFormat('en-GB', { maximumFractionDigits: digits }).format(n)

/**
 * The only question a customer has: how much do I want to lose, and how long will it take?
 * Two sliders in, one answer out, priced with the pens it takes. Uses the same client-result
 * curve and 0.75 to 1.75 mg protocol as the product cards.
 */
const HomeWeightGoal = () => {
  const [startKg, setStartKg] = useState(95)
  const [goalKg, setGoalKg] = useState(80)
  const products = useProductsStore(state => state.products)

  const goal = Math.min(goalKg, startKg - 1)
  const plan = useMemo(() => buildGoalPlan(startKg, goal), [startKg, goal])

  // Cheapest way to cover the plan with the Retatrutide pens on sale right now.
  const pens = useMemo(
    () =>
      products
        .filter(p => p.family === 'retatrutide-pen' && p.specs?.strengthMg)
        .map(p => ({ id: p.id, name: p.name.split(' | ')[0], strength: p.specs!.strengthMg, price: p.price, href: p.href })),
    [products]
  )

  const supply = useMemo(() => {
    if (!plan?.weeks || pens.length === 0) return null

    return pens
      .map(pen => {
        const count = unitsForPlan(plan.totalMg, pen.strength)

        return { ...pen, count, cost: count * pen.price }
      })
      .sort((a, b) => a.cost - b.cost)[0]
  }, [plan, pens])

  const maintenance = PROTOCOL[PROTOCOL.length - 1].mg
  const stableWeek = plan?.stableFromWeek ?? 17

  return (
    <section id='calculator' className='scroll-mt-(--header-height) pt-8 sm:pt-16 lg:pt-24'>
      <ContentLayout>
        <div className='bg-muted grid gap-8 rounded-2xl p-6 sm:p-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12 lg:p-10'>
          {/* The question */}
          <div className='flex flex-col gap-8'>
            <div className='space-y-2'>
              <h3 className='text-2xl font-bold sm:text-3xl'>How much weight do you want to lose?</h3>
              <p className='text-muted-foreground text-base'>Set where you are and where you want to be. We tell you how long it takes and what you need.</p>
            </div>

            <div className='space-y-7'>
              <div className='space-y-3'>
                <div className='flex items-baseline justify-between'>
                  <span className='font-medium'>I weigh</span>
                  <span className='text-3xl font-semibold tabular-nums'>
                    {startKg} <span className='text-muted-foreground text-base font-normal'>kg</span>
                  </span>
                </div>
                <Slider className={sliderClass} min={MIN} max={MAX} step={1} value={[startKg]} onValueChange={v => setStartKg(Array.isArray(v) ? v[0] : (v as number))} />
              </div>

              <div className='space-y-3'>
                <div className='flex items-baseline justify-between'>
                  <span className='font-medium'>I want to weigh</span>
                  <span className='text-3xl font-semibold tabular-nums'>
                    {goal} <span className='text-muted-foreground text-base font-normal'>kg</span>
                  </span>
                </div>
                <Slider className={sliderClass} min={MIN} max={MAX} step={1} value={[goal]} onValueChange={v => setGoalKg(Array.isArray(v) ? v[0] : (v as number))} />
              </div>
            </div>

            {plan ? (
              <p className='text-muted-foreground text-sm'>
                That is <span className='text-foreground font-semibold'>{fmt(plan.lossKg, 1)} kg</span>, {fmt(plan.lossPct)}% of your weight.
              </p>
            ) : null}
          </div>

          {/* The answer */}
          <div className='flex flex-col gap-6'>
            <div className='rounded-xl bg-neutral-950 p-6 text-white sm:p-8'>
              {plan?.weeks ? (
                <>
                  <p className='text-xs font-semibold tracking-[0.16em] text-white/55 uppercase'>Your plan</p>
                  <p className='mt-3 text-5xl font-semibold tracking-tight sm:text-6xl'>
                    {plan.weeks} <span className='text-2xl font-normal text-white/70'>weeks</span>
                  </p>
                  <p className='mt-2 text-lg text-white/80'>
                    to reach {goal} kg on Retatrutide.
                  </p>

                  <div className='mt-6 border-t border-white/15 pt-5'>
                    <div className='relative h-2 overflow-hidden rounded-full bg-white/15'>
                      <div className='absolute inset-y-0 left-0 rounded-full bg-[#0592b3]' style={{ width: `${Math.min(100, (Math.min(stableWeek, plan.weeks) / plan.weeks) * 100)}%` }} />
                    </div>
                    <div className='mt-2 flex justify-between text-xs text-white/60'>
                      <span>Week 1: {PROTOCOL[0].mg} mg a week</span>
                      <span>
                        {plan.weeks > stableWeek ? `Week ${stableWeek}: ${maintenance} mg, then steady` : `Week ${plan.weeks}: goal`}
                      </span>
                    </div>
                    <p className='mt-3 text-sm text-white/70'>
                      The dose steps up a little every four weeks, from {PROTOCOL[0].mg} mg to a maximum of {maintenance} mg a week. Never more.
                    </p>
                  </div>
                </>
              ) : plan ? (
                <>
                  <p className='text-xs font-semibold tracking-[0.16em] text-white/55 uppercase'>Your plan</p>
                  <p className='mt-3 text-3xl font-semibold tracking-tight'>More than {MAX_PLAN_WEEKS / 52} years</p>
                  <p className='mt-2 text-white/80'>
                    Losing {fmt(plan.lossKg, 1)} kg is a long road on this plan. After 24 weeks expect to be around {fmt(plan.at24Kg)} kg, about{' '}
                    {CLIENT_LOSS_PCT_24W}% down.
                  </p>
                </>
              ) : (
                <p className='text-white/80'>Set a goal below your current weight.</p>
              )}
            </div>

            {plan?.weeks && supply ? (
              <div className='grid gap-3 sm:grid-cols-3'>
                <div className='rounded-xl border bg-white p-4'>
                  <p className='text-muted-foreground text-xs font-medium uppercase'>You need</p>
                  <p className='mt-1 text-2xl font-semibold'>
                    {supply.count} {supply.count === 1 ? 'pen' : 'pens'}
                  </p>
                  <p className='text-muted-foreground text-xs'>{supply.name}</p>
                </div>
                <div className='rounded-xl border bg-white p-4'>
                  <p className='text-muted-foreground text-xs font-medium uppercase'>Total cost</p>
                  <p className='mt-1 text-2xl font-semibold'>{formatPrice(supply.cost)}</p>
                  <p className='text-muted-foreground text-xs'>about {formatPrice(supply.cost / plan.weeks)} a week</p>
                </div>
                <Link href={supply.href} className='group flex flex-col justify-between rounded-xl bg-neutral-950 p-4 text-white transition hover:bg-neutral-800'>
                  <p className='text-xs font-medium text-white/60 uppercase'>Start</p>
                  <p className='mt-1 flex items-center gap-1.5 text-base font-semibold'>
                    Shop the pen
                    <ArrowRightIcon className='size-4 transition-transform duration-300 group-hover:translate-x-1' />
                  </p>
                </Link>
              </div>
            ) : null}

            <p className='text-muted-foreground text-xs leading-relaxed'>
              Based on Deep Beauty Research client results on this protocol: about {CLIENT_LOSS_PCT_24W}% of starting weight after 24 weeks. Individual
              results vary. Research use only.
            </p>
          </div>
        </div>
      </ContentLayout>
    </section>
  )
}

export default HomeWeightGoal
