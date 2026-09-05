'use client'

import { useState } from 'react'

import Link from 'next/link'

import type { Product } from '@/types/product'
import { Input } from '@/components/ui/input'
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
import { MAX_PLAN_WEEKS, PROTOCOL, buildGoalPlan, unitsForPlan } from '@/lib/weight-plan'

const WATER = [1, 2, 3]
const PLAN_COMPOUND = 'Retatrutide'

/** The teal of the pen body, sampled from the render. Marks the stable dose only. */
const ACCENT = '#0592b3'

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
 * Visual system: white card like the product cards, 1px rules instead of boxes, mono
 * labels for data, one oversized light numeral as the reading. No fills, no shadows.
 *
 * Dose mode: pens read in clicks (1 click = 0.0125 ml, 60 per turn of the dial, from the
 * pen dosing note), vials in insulin-syringe units (1 unit = 0.01 ml). See lib/pen-dosing.
 * Plan mode (first tab when a Retatrutide product is on screen): current and goal weight to
 * the weeks it takes on the shop's staged protocol (0.75 mg up to 1.75 mg) and the pens that
 * covers. See lib/weight-plan.
 */
const ProductGridCalculator = ({ products }: Props) => {
  const options = products.filter(product => product.specs)
  const planOptions = options.filter(product => product.specs?.compound === PLAN_COMPOUND)
  const canPlan = planOptions.length > 0

  const [mode, setMode] = useState<Mode>(canPlan ? 'plan' : 'units')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [water, setWater] = useState(2)
  const [doseText, setDoseText] = useState('1')
  const [startText, setStartText] = useState('100')
  const [goalText, setGoalText] = useState('80')

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

  // Plan
  const startKg = parseNumber(startText)
  const goalKg = parseNumber(goalText)
  const plan = buildGoalPlan(startKg, goalKg)

  const planRows = plan?.weeks
    ? planOptions
        .map(item => {
          const count = unitsForPlan(plan.totalMg, item.specs!.strengthMg)

          return { item, count, cost: count * item.price }
        })
        .sort((a, b) => a.cost - b.cost)
    : []

  // Clicks column for the schedule, read against the first pen on screen.
  const schedulePen = planOptions.find(item => item.specs?.form === 'pen' && item.specs.fillMl)

  return (
    <div className='max-sm:hidden sm:max-xl:nth-[2n]:col-[2/-1] sm:max-xl:nth-[2n+1]:hidden xl:nth-[3n+2]:col-[2/-1] xl:nth-[3n]:col-[3/-1] xl:nth-[3n+1]:hidden'>
      <section
        aria-label='Calculator'
        className='ring-foreground/10 @container flex h-full flex-col rounded-xl bg-white px-5 pt-4 pb-5 text-sm ring-1'
      >
        {/* Mode tabs as ruled text */}
        <div role='tablist' className='border-foreground flex gap-6 border-b'>
          {canPlan ? (
            <ModeTab active={mode === 'plan'} onClick={() => setMode('plan')}>
              Weight goal
            </ModeTab>
          ) : null}
          <ModeTab active={mode === 'units'} onClick={() => setMode('units')}>
            Dose
          </ModeTab>
        </div>

        {showPlan ? (
          <>
            <div className='grid grid-cols-2 gap-x-5'>
              <Field label='Current weight' unit='kg' htmlFor='grid-plan-start'>
                <Input
                  id='grid-plan-start'
                  inputMode='decimal'
                  value={startText}
                  onChange={event => setStartText(event.target.value)}
                  className={fieldInput}
                />
              </Field>
              <Field label='Goal weight' unit='kg' htmlFor='grid-plan-goal'>
                <Input
                  id='grid-plan-goal'
                  inputMode='decimal'
                  value={goalText}
                  onChange={event => setGoalText(event.target.value)}
                  className={fieldInput}
                />
              </Field>
            </div>

            {/* Schedule */}
            <table className='mt-5 w-full border-collapse text-xs'>
              <thead>
                <tr className='text-muted-foreground border-foreground/15 border-b font-mono text-[10px] tracking-[0.12em] uppercase'>
                  <th className='py-1.5 text-left font-medium'>Week</th>
                  <th className='py-1.5 text-right font-medium'>mg / wk</th>
                  {schedulePen ? <th className='py-1.5 text-right font-medium'>Clicks</th> : null}
                </tr>
              </thead>
              <tbody className='tabular-nums'>
                {PROTOCOL.map((step, index) => {
                  const from = PROTOCOL.slice(0, index).reduce((weeks, s) => weeks + s.weeks, 0) + 1
                  const last = index === PROTOCOL.length - 1

                  const clicks = schedulePen
                    ? Math.round(penReading(step.mg, schedulePen.specs!.strengthMg, schedulePen.specs!.fillMl!).clicks)
                    : null

                  return (
                    <tr key={step.mg} className={cn('border-foreground/15 border-b', last && 'font-semibold')}>
                      <td className='py-1.5 text-left'>
                        {last ? (
                          <span className='inline-flex items-center gap-1.5'>
                            <span aria-hidden className='size-1.5 rounded-full' style={{ backgroundColor: ACCENT }} />
                            {from} onward
                          </span>
                        ) : (
                          `${from}–${from + step.weeks - 1}`
                        )}
                      </td>
                      <td className='py-1.5 text-right'>{fmt(step.mg, 2)}</td>
                      {clicks !== null ? <td className='py-1.5 text-right'>{clicks}</td> : null}
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <p className='text-muted-foreground mt-1.5 font-mono text-[10px]'>
              Stepped up every 4 weeks. 1.75 mg is the most we recommend, and where it settles.
              {schedulePen ? ` Clicks on the ${schedulePen.name.replace(' | ', ' ')}.` : ''}
            </p>

            {/* Reading */}
            <div className='mt-auto pt-6'>
              <div className='flex items-baseline justify-between gap-3'>
                <p className={eyebrow}>Time to your goal</p>
                <button
                  type='button'
                  onClick={() => {
                    if (schedulePen) setSelectedId(schedulePen.id)
                    setDoseText(String(PROTOCOL[PROTOCOL.length - 1].mg))
                    setMode('units')
                  }}
                  className='text-foreground font-mono text-[10px] tracking-[0.12em] uppercase underline underline-offset-4'
                >
                  Dosage
                </button>
              </div>
              {plan ? (
                plan.weeks ? (
                  <>
                    <p className='mt-1 flex items-baseline gap-2 leading-none tabular-nums'>
                      <span className='text-6xl font-light tracking-tight'>{plan.weeks}</span>
                      <span className='text-muted-foreground font-mono text-xs uppercase'>weeks</span>
                    </p>
                    <dl className='border-foreground mt-4 border-t text-xs'>
                      <Row label='To lose' value={`${fmt(plan.lossKg, 1)} kg · ${fmt(plan.lossPct, 0)}%`} />
                      <Row label='After 24 weeks' value={`${fmt(plan.at24Kg, 0)} kg`} />
                      <Row label='Stable on 1.75 mg from' value={`week ${plan.stableFromWeek}`} />
                      <Row label='Total peptide' value={`${fmt(plan.totalMg, 1)} mg`} />
                    </dl>
                    <p className={cn(eyebrow, 'mt-4')}>What you need</p>
                    <ul className='mt-1 text-xs'>
                      {planRows.map(({ item, count, cost }, index) => (
                        <li key={item.id} className='border-foreground/15 flex items-baseline gap-3 border-b py-1.5'>
                          <span className='w-7 shrink-0 font-mono tabular-nums'>{count}×</span>
                          <Link href={item.href} className='min-w-0 flex-1 truncate hover:underline'>
                            {item.name}
                          </Link>
                          <span className={cn('shrink-0 font-mono tabular-nums', index > 0 && 'text-muted-foreground')}>
                            {formatPrice(cost)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <p className='mt-2 text-xs'>
                    Losing {fmt(plan.lossKg, 1)} kg ({fmt(plan.lossPct, 0)}%) takes more than {MAX_PLAN_WEEKS / 52} years on
                    this plan. After 24 weeks expect about {fmt(plan.at24Kg, 0)} kg.
                  </p>
                )
              ) : (
                <p className='text-muted-foreground mt-2 text-xs'>
                  Enter a current weight between 30 and 300 kg and a goal weight below it.
                </p>
              )}
              <p className='text-muted-foreground mt-3 font-mono text-[10px] leading-relaxed'>
                Based on Deep Beauty Research client results on this plan. Individual results vary. Research use only.
              </p>
            </div>
          </>
        ) : (
          <>
            <Field label='Product' htmlFor='grid-calc-product'>
              <Select
                items={options.map(item => ({ value: item.id, label: item.name }))}
                value={product.id}
                onValueChange={value => value && setSelectedId(value)}
              >
                <SelectTrigger
                  id='grid-calc-product'
                  className='h-8 w-full rounded-none border-0 bg-transparent px-0 shadow-none focus-visible:ring-0'
                >
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
            </Field>

            <Field label='Amount per use' unit='mg' htmlFor='grid-calc-dose'>
              <Input
                id='grid-calc-dose'
                inputMode='decimal'
                value={doseText}
                onChange={event => setDoseText(event.target.value)}
                className={fieldInput}
              />
            </Field>

            {!isPen ? (
              <Field label='Bacteriostatic water'>
                <div role='radiogroup' className='flex h-8 items-center gap-4'>
                  {WATER.map(ml => (
                    <button
                      key={ml}
                      type='button'
                      role='radio'
                      aria-checked={water === ml}
                      onClick={() => setWater(ml)}
                      className={cn(
                        'font-mono text-xs tabular-nums underline-offset-4 transition-colors',
                        water === ml ? 'text-foreground underline' : 'text-muted-foreground hover:text-foreground'
                      )}
                    >
                      {ml} ml
                    </button>
                  ))}
                </div>
              </Field>
            ) : null}

            {/* Reading. The dial end of the selected pen stands as a full-height column on the right. */}
            <div className='mt-auto grid grid-cols-[minmax(0,1fr)_auto] gap-x-5 pt-6'>
              <div className='self-end'>
                <p className={eyebrow}>{isPen ? 'On your pen dial' : 'On your syringe'}</p>
                <p className='mt-1 flex items-baseline gap-2 leading-none tabular-nums'>
                  <span className='text-6xl font-light tracking-tight'>{Math.round(reading)}</span>
                  <span className='text-muted-foreground font-mono text-xs uppercase'>{isPen ? 'clicks' : 'units'}</span>
                </p>
              </div>
              {isPen && product.dialImage ? (
                <img
                  src={product.dialImage}
                  alt={`Dial end of the ${product.name.replace(' | ', ' ')}: knob, dial ring and dose window`}
                  className='row-span-1 h-40 w-auto self-end object-contain object-bottom @md:row-span-2 @md:h-60'
                />
              ) : null}
              <dl className='border-foreground col-span-2 mt-4 border-t text-xs @md:col-span-1 @md:col-start-1'>

                {pen ? (
                  <>
                    <Row label='Volume' value={`${fmt(pen.ml, 2)} ml`} />
                    <Row label='Per click' value={`${fmt(pen.mgPerClick, 4)} mg`} />
                    <Row label='Uses per pen' value={fmt(uses, 1)} />
                    {pen.turns > 0 ? (
                      <Row
                        label='Dial'
                        value={`${pen.turns} full ${pen.turns === 1 ? 'turn' : 'turns'}${pen.remainder > 0 ? ` + ${pen.remainder}` : ''}`}
                        accent
                      />
                    ) : null}
                  </>
                ) : vial ? (
                  <>
                    <Row label='Volume' value={`${fmt(vial.ml, 2)} ml`} />
                    <Row label='Concentration' value={`${fmt(vial.mgPerMl, 2)} mg/ml`} />
                    <Row label='Uses per vial' value={fmt(uses, 1)} />
                    {vial.units > 100 ? <Row label='Syringe' value='Over one draw, split it' accent /> : null}
                  </>
                ) : (
                  <Row
                    label='Reading'
                    value={isPen && !specs.fillMl ? 'Fill volume not on file' : 'Enter an amount'}
                  />
                )}
              </dl>
              <p className='text-muted-foreground col-span-2 mt-3 flex items-baseline justify-between gap-3 font-mono text-[10px] leading-relaxed'>
                <span>
                  {isPen
                    ? `1 click = ${ML_PER_CLICK} ml · ${CLICKS_PER_TURN} per turn`
                    : `1 unit = ${ML_PER_SYRINGE_UNIT} ml`}
                  . Research use only.
                </span>
                <Link href='/#calculator' className='text-foreground shrink-0 underline underline-offset-4'>
                  Full calculator
                </Link>
              </p>
            </div>
          </>
        )}
      </section>
    </div>
  )
}

const eyebrow = 'text-muted-foreground font-mono text-[10px] tracking-[0.12em] uppercase'

const fieldInput =
  'h-8 rounded-none border-0 bg-transparent px-0 text-right text-sm tabular-nums shadow-none focus-visible:ring-0'

const ModeTab = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
  <button
    type='button'
    role='tab'
    aria-selected={active}
    onClick={onClick}
    className={cn(
      '-mb-px border-b pb-2.5 font-mono text-[11px] tracking-[0.12em] uppercase transition-colors',
      active ? 'border-foreground text-foreground' : 'text-muted-foreground hover:text-foreground border-transparent'
    )}
  >
    {children}
  </button>
)

/** Label above, control below, one rule underneath. */
const Field = ({
  label,
  unit,
  htmlFor,
  children
}: {
  label: string
  unit?: string
  htmlFor?: string
  children: React.ReactNode
}) => (
  <div className='border-foreground/15 mt-4 border-b pb-1'>
    <label htmlFor={htmlFor} className={eyebrow}>
      {label}
    </label>
    <div className='flex items-center gap-2'>
      <div className='min-w-0 flex-1'>{children}</div>
      {unit ? <span className='text-muted-foreground font-mono text-xs'>{unit}</span> : null}
    </div>
  </div>
)

/** Definition row: label left, value right, rule underneath. */
const Row = ({ label, value, accent }: { label: string; value: string; accent?: boolean }) => (
  <div className='border-foreground/15 flex items-baseline justify-between gap-3 border-b py-1.5'>
    <dt className='text-muted-foreground'>{label}</dt>
    <dd className={cn('font-mono tabular-nums', accent && 'font-semibold')} style={accent ? { color: ACCENT } : undefined}>
      {value}
    </dd>
  </div>
)

export default ProductGridCalculator
