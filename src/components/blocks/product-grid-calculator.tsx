'use client'

import { useState } from 'react'

import Link from 'next/link'

import type { Product } from '@/types/product'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { formatPrice } from '@/utils/product-utils'
import { CLICKS_PER_TURN, ML_PER_CLICK, ML_PER_SYRINGE_UNIT, penReading, syringeUnits } from '@/lib/pen-dosing'
import { WEEKLY_DOSES_MG, buildWeightOutlook, unitsForPlan, type WeeklyDoseMg } from '@/lib/weight-plan'

const WATER = [1, 2, 3]
const PLAN_COMPOUND = 'Retatrutide'

const fmt = (n: number, digits = 1) =>
  Number.isFinite(n) ? n.toLocaleString('en-GB', { maximumFractionDigits: digits }) : '0'

const parseNumber = (text: string) => Number.parseFloat(text.replace(',', '.'))

type Mode = 'units' | 'plan'

type Props = {

  /** The products currently shown in the grid. Both modes are scoped to them. */
  products: Product[]
}

/**
 * Compact calculator that closes a short last grid row so the catalogue never
 * ends on an orphan card. Must be the LAST child of a `sm:grid-cols-2 xl:grid-cols-3` grid.
 *
 * Its own child index is count + 1, so nth-child arithmetic reads the product count:
 *   3 columns  count % 3 == 1 -> index 3n+2 -> start col 2, stretch to the end
 *              count % 3 == 2 -> index 3n   -> start col 3
 *              count % 3 == 0 -> index 3n+1 -> row already full, hide
 *   2 columns  count odd      -> index 2n   -> start col 2
 *              count even     -> index 2n+1 -> hide
 *   1 column   always its own row, hide
 *
 * Dose mode: pens read in clicks (1 click = 0.0125 ml, 60 per turn of the dial, from the
 * pen dosing note), vials in insulin-syringe units (1 unit = 0.01 ml). See lib/pen-dosing.
 * Plan mode: start weight and weekly dose (at most 1.75 mg) to the expected finish weight
 * after 24 weeks and the pens that covers. Offered when a Retatrutide product is on screen.
 * See lib/weight-plan.
 */
const ProductGridCalculator = ({ products }: Props) => {
  const options = products.filter(product => product.specs)
  const planOptions = options.filter(product => product.specs?.compound === PLAN_COMPOUND)
  const canPlan = planOptions.length > 0

  const [mode, setMode] = useState<Mode>('units')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [water, setWater] = useState(2)
  const [doseText, setDoseText] = useState('1')
  const [startText, setStartText] = useState('100')
  const [weekly, setWeekly] = useState<WeeklyDoseMg>(1)

  const product = options.find(item => item.id === selectedId) ?? options[0]
  const specs = product?.specs

  if (!product || !specs) return null

  const showPlan = canPlan && mode === 'plan'

  // Dose
  const dose = parseNumber(doseText)
  const hasDose = Number.isFinite(dose) && dose > 0
  const isPen = specs.form === 'pen'
  const pen = isPen && specs.fillMl && hasDose ? penReading(dose, specs.strengthMg, specs.fillMl) : null
  const vial = !isPen && hasDose ? syringeUnits(dose, specs.strengthMg, water) : null
  const reading = pen ? pen.clicks : vial ? vial.units : 0
  const uses = hasDose ? specs.strengthMg / dose : 0
  const noun = isPen ? 'pen' : 'vial'

  // Plan
  const startKg = parseNumber(startText)
  const outlook = buildWeightOutlook(startKg, weekly)

  const planRows = outlook
    ? planOptions
        .map(item => {
          const count = unitsForPlan(outlook.totalMg, item.specs!.strengthMg)

          return { item, count, cost: count * item.price }
        })
        .sort((a, b) => a.cost - b.cost)
    : []

  return (
    <div className='max-sm:hidden sm:max-xl:nth-[2n]:col-[2/-1] sm:max-xl:nth-[2n+1]:hidden xl:nth-[3n+2]:col-[2/-1] xl:nth-[3n]:col-[3/-1] xl:nth-[3n+1]:hidden'>
      <Card className='bg-muted h-full gap-0 border py-0 ring-0'>
        <div className='flex flex-1 flex-col gap-4 p-4'>
          <div className='space-y-0.5'>
            <h5 className='text-lg font-semibold'>{showPlan ? '24-week outlook' : 'Dose calculator'}</h5>
            <p className='text-muted-foreground text-xs'>
              {showPlan
                ? 'Start weight and weekly dose to an expected finish weight.'
                : 'Read the clicks off the pen dial or the units off the syringe.'}
            </p>
          </div>

          {canPlan ? (
            <Tabs value={mode} onValueChange={value => setMode(value as Mode)}>
              <TabsList className='grid w-full grid-cols-2 bg-white'>
                <TabsTrigger value='units'>Dose</TabsTrigger>
                <TabsTrigger value='plan'>Plan</TabsTrigger>
              </TabsList>
            </Tabs>
          ) : null}

          {showPlan ? (
            <>
              <div className='space-y-1.5'>
                <Label htmlFor='grid-plan-start' className='text-xs'>
                  Start weight
                </Label>
                <div className='flex items-center gap-2'>
                  <Input
                    id='grid-plan-start'
                    inputMode='decimal'
                    value={startText}
                    onChange={event => setStartText(event.target.value)}
                    className='h-9 bg-white text-right tabular-nums'
                  />
                  <span className='text-muted-foreground text-sm'>kg</span>
                </div>
              </div>

              <div className='space-y-1.5'>
                <Label className='text-xs'>Weekly dose</Label>
                <div className='grid grid-cols-6 gap-1.5'>
                  {WEEKLY_DOSES_MG.map(mg => (
                    <SegmentButton key={mg} active={weekly === mg} onClick={() => setWeekly(mg)}>
                      {fmt(mg, 2)}
                    </SegmentButton>
                  ))}
                </div>
                <p className='text-muted-foreground text-[11px]'>mg a week. 1.75 mg is the most we recommend.</p>
              </div>

              <div className='mt-auto rounded-lg bg-neutral-950 p-4 text-white'>
                <p className='text-[11px] font-semibold tracking-[0.14em] text-white/55 uppercase'>
                  After {outlook?.weeks ?? 24} weeks
                </p>
                {outlook ? (
                  <>
                    <div className='mt-1 flex items-baseline gap-3 tabular-nums'>
                      <span className='text-2xl font-semibold text-white/60'>{fmt(outlook.startKg, 0)} kg</span>
                      <span className='text-white/40'>to</span>
                      <span className='text-4xl font-bold tracking-tight'>{fmt(outlook.finishKg, 0)} kg</span>
                    </div>
                    <p className='mt-2 text-xs text-white/70'>
                      About {fmt(outlook.lossKg, 1)} kg ({fmt(outlook.lossPct, 1)}%) at {fmt(weekly, 2)} mg a week. Carrying on
                      to {outlook.extendedWeeks} weeks: about {fmt(outlook.extendedFinishKg, 0)} kg. {fmt(outlook.totalMg, 0)}{' '}
                      mg for the {outlook.weeks} weeks:
                    </p>
                    <ul className='mt-3 space-y-1.5 border-t border-white/15 pt-3 text-sm'>
                      {planRows.map(({ item, count, cost }, index) => (
                        <li key={item.id} className='flex items-baseline justify-between gap-3'>
                          <Link href={item.href} className='min-w-0 truncate hover:underline'>
                            <span className='font-semibold tabular-nums'>{count} ×</span> {item.name}
                          </Link>
                          <span className={cn('shrink-0 tabular-nums', index === 0 ? 'font-semibold' : 'text-white/60')}>
                            {formatPrice(cost)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <p className='mt-2 text-sm text-white/70'>Enter a start weight in kilograms.</p>
                )}
              </div>

              <p className='text-muted-foreground text-xs'>
                Trial averages at 24 and 48 weeks, interpolated between the published dose arms. Individual results vary.
                Research use only.
              </p>
            </>
          ) : (
            <>
              <div className='space-y-1.5'>
                <Label htmlFor='grid-calc-product' className='text-xs'>
                  Product
                </Label>
                <Select
                  items={options.map(item => ({ value: item.id, label: item.name }))}
                  value={product.id}
                  onValueChange={value => value && setSelectedId(value)}
                >
                  <SelectTrigger id='grid-calc-product' className='w-full bg-white'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent alignItemWithTrigger={false}>
                    <SelectGroup>
                      {options.map(item => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {!isPen ? (
                <div className='space-y-1.5'>
                  <Label className='text-xs'>Bacteriostatic water added</Label>
                  <div className='grid grid-cols-3 gap-1.5'>
                    {WATER.map(ml => (
                      <SegmentButton key={ml} active={water === ml} onClick={() => setWater(ml)}>
                        {ml} ml
                      </SegmentButton>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className='space-y-1.5'>
                <Label htmlFor='grid-calc-dose' className='text-xs'>
                  Amount per use
                </Label>
                <div className='flex items-center gap-2'>
                  <Input
                    id='grid-calc-dose'
                    inputMode='decimal'
                    value={doseText}
                    onChange={event => setDoseText(event.target.value)}
                    className='h-9 bg-white text-right tabular-nums'
                    aria-describedby='grid-calc-dose-unit'
                  />
                  <span id='grid-calc-dose-unit' className='text-muted-foreground text-sm'>
                    mg
                  </span>
                </div>
              </div>

              <div className='mt-auto rounded-lg bg-neutral-950 p-4 text-white'>
                <p className='text-[11px] font-semibold tracking-[0.14em] text-white/55 uppercase'>
                  {isPen ? 'On the dial' : 'On the syringe'}
                </p>
                <p className='mt-1 text-4xl font-bold tracking-tight tabular-nums'>
                  {Math.round(reading)}
                  <span className='ms-2 text-base font-semibold text-white/60'>{isPen ? 'clicks' : 'units'}</span>
                </p>
                <p className='mt-2 text-xs text-white/70'>
                  {pen
                    ? `${fmt(dose, 2)} mg is ${fmt(pen.ml, 2)} ml at ${fmt(pen.mgPerClick, 4)} mg per click. ${fmt(uses, 1)} uses per pen.`
                    : vial
                      ? `${fmt(dose, 2)} mg is ${fmt(vial.ml, 2)} ml at ${fmt(vial.mgPerMl, 2)} mg/ml. ${fmt(uses, 1)} uses per ${noun}.`
                      : isPen && !specs.fillMl
                        ? 'Fill volume not on file for this pen.'
                        : 'Enter an amount to read the dial.'}
                </p>
                {pen && pen.turns > 0 ? (
                  <p className='mt-1 text-xs font-semibold text-[#0592b3]'>
                    {pen.turns} full {pen.turns === 1 ? 'turn' : 'turns'} of the dial
                    {pen.remainder > 0 ? ` and ${pen.remainder} more clicks` : ''}.
                  </p>
                ) : null}
                {vial && vial.units > 100 ? (
                  <p className='mt-1 text-xs font-semibold text-[#0592b3]'>Over one full draw. Split it.</p>
                ) : null}
              </div>

              <div className='flex items-center justify-between gap-3 text-xs'>
                <span className='text-muted-foreground'>
                  {isPen
                    ? `1 click = ${ML_PER_CLICK} ml, ${CLICKS_PER_TURN} clicks a turn.`
                    : `1 unit = ${ML_PER_SYRINGE_UNIT} ml on the syringe.`}{' '}
                  Research use only.
                </span>
                <Link href='/#calculator' className='shrink-0 font-medium underline underline-offset-4'>
                  Full calculator
                </Link>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  )
}

const SegmentButton = ({
  active,
  onClick,
  children
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) => (
  <button
    type='button'
    onClick={onClick}
    aria-pressed={active}
    className={cn(
      'h-8 rounded-md border text-sm font-medium tabular-nums transition-colors',
      active ? 'border-foreground bg-foreground text-background' : 'hover:border-foreground/40 border-border bg-white'
    )}
  >
    {children}
  </button>
)

export default ProductGridCalculator
