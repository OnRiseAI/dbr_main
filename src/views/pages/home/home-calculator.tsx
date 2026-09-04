'use client'

import { useMemo, useState } from 'react'

import ContentLayout from '@/components/layout/content-layout'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
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

type Format = 'pen' | 'vial'

/** Pen strengths and fill volumes as printed on the pen labels. */
const PENS = [
  {
    value: 'retatrutide-pen-15mg',
    label: 'Retatrutide pen 15 mg',
    mg: 15,
    ml: 3,
    image: '/images/products/dbr-reta-pen-15mg-upright.png'
  },
  {
    value: 'retatrutide-pen-40mg',
    label: 'Retatrutide pen 40 mg',
    mg: 40,
    ml: 4,
    image: '/images/products/dbr-reta-pen-40mg-upright.png'
  },
  {
    value: 'ghk-cu-pen-100mg',
    label: 'GHK-Cu pen 100 mg',
    mg: 100,
    ml: 3,
    image: '/images/products/dbr-ghk-cu-pen-100mg-upright.png'
  },
  {
    value: 'mots-c-pen-20mg',
    label: 'MOTS-c pen 20 mg',
    mg: 20,
    ml: 4,
    image: '/images/products/dbr-mots-c-pen-20mg-upright.png'
  }
]

const VIALS = [
  { value: 'retatrutide-vial-10mg', label: 'Retatrutide vial 10 mg', mg: 10, image: '/images/products/dbr-reta-vial-10mg.png' },
  { value: 'retatrutide-vial-20mg', label: 'Retatrutide vial 20 mg', mg: 20, image: '/images/products/dbr-reta-vial-20mg.png' },
  { value: 'ghk-cu-vial-100mg', label: 'GHK-Cu vial 100 mg', mg: 100, image: '/images/products/dbr-ghk-cu-vial-100mg.png' },
  { value: 'mt1-vial-10mg', label: 'Melanotan I (MT1) vial 10 mg', mg: 10, image: '/images/products/dbr-mt1-vial-10mg.png' },
  { value: 'mt2-vial-10mg', label: 'Melanotan II (MT2) vial 10 mg', mg: 10, image: '/images/products/dbr-mt2-vial-10mg.png' },
  { value: 'selank-vial-10mg', label: 'Selank vial 10 mg', mg: 10, image: '/images/products/dbr-selank-vial-10mg.png' }
]

const WATER = [1, 2, 3]
const WEEKLY = [1, 2, 3, 4, 5, 6, 7]
const PLAN_WEEKS = 12

/** The teal of the pen body, sampled from the render. */
const ACCENT = '#0592b3'

const fmt = (n: number, digits = 1) =>
  Number.isFinite(n) ? n.toLocaleString('en-GB', { maximumFractionDigits: digits }) : '0'

type Props = {
  defaultFormat?: Format
  defaultProductId?: string
  title?: string
  subtitle?: string
}

/**
 * Units calculator. 1 unit on an insulin syringe or pen dial = 0.01 ml.
 * Pure arithmetic from the label values; no guidance on amounts.
 */
const HomeCalculator = ({
  defaultFormat = 'pen',
  defaultProductId,
  title = 'Units calculator',
  subtitle = 'Set the amount you work with and read the units off the dial or the syringe.'
}: Props) => {
  const [format, setFormat] = useState<Format>(defaultFormat)
  const [pen, setPen] = useState(PENS.find(p => p.value === defaultProductId)?.value ?? PENS[0].value)
  const [vial, setVial] = useState(VIALS.find(v => v.value === defaultProductId)?.value ?? VIALS[0].value)
  const [water, setWater] = useState(2)
  const [doseText, setDoseText] = useState('1')
  const [perWeek, setPerWeek] = useState(1)

  const product = format === 'pen' ? PENS.find(p => p.value === pen) : VIALS.find(v => v.value === vial)
  const items = format === 'pen' ? PENS : VIALS

  const dose = Number.parseFloat(doseText.replace(',', '.'))
  const hasDose = Number.isFinite(dose) && dose > 0

  // Slider range scales with the product: fine steps for small strengths.
  const sliderMax = product ? Math.min(product.mg, 10) : 10
  const sliderStep = 0.1

  const result = useMemo(() => {
    if (!product) return null

    const volumeMl = format === 'pen' ? (product as (typeof PENS)[number]).ml : water
    const mgPerMl = product.mg / volumeMl
    const unitsPerDose = hasDose ? (dose / mgPerMl) * 100 : 0
    const usesPerUnit = hasDose ? product.mg / dose : 0
    const weeks = hasDose ? usesPerUnit / perWeek : 0
    const unitsForPlan = hasDose ? Math.ceil(PLAN_WEEKS / weeks) : 0

    return { mgPerMl, unitsPerDose, usesPerUnit, weeks, unitsForPlan }
  }, [product, format, water, dose, hasDose, perWeek])

  const noun = format === 'pen' ? 'pen' : 'vial'

  return (
    <section className='pt-8 sm:pt-16 lg:pt-24'>
      <ContentLayout>
        <div className='bg-muted grid gap-8 rounded-xl p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-12'>
          {/* Inputs */}
          <div className='flex flex-col gap-7'>
            <div className='space-y-1.5'>
              <h3 className='text-2xl font-bold tracking-tight sm:text-3xl'>{title}</h3>
              <p className='text-muted-foreground text-base'>{subtitle}</p>
            </div>

            <div className='space-y-2'>
              <Label>Format</Label>
              <Tabs value={format} onValueChange={value => setFormat(value as Format)}>
                <TabsList className='grid w-full grid-cols-2 bg-white'>
                  <TabsTrigger value='pen'>Pen</TabsTrigger>
                  <TabsTrigger value='vial'>Vial</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='calc-product'>Product</Label>
              <Select
                items={items}
                value={format === 'pen' ? pen : vial}
                onValueChange={value => {
                  if (!value) return
                  if (format === 'pen') setPen(value)
                  else setVial(value)
                }}
              >
                <SelectTrigger id='calc-product' className='w-full bg-white'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent alignItemWithTrigger={false}>
                  <SelectGroup>
                    {items.map(item => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {format === 'vial' ? (
              <div className='space-y-2'>
                <Label>Bacteriostatic water added</Label>
                <div className='grid grid-cols-3 gap-2'>
                  {WATER.map(ml => (
                    <SegmentButton key={ml} active={water === ml} onClick={() => setWater(ml)}>
                      {ml} ml
                    </SegmentButton>
                  ))}
                </div>
              </div>
            ) : null}

            <div className='space-y-3'>
              <div className='flex items-end justify-between gap-4'>
                <Label htmlFor='calc-dose'>Amount per use</Label>
                <div className='flex items-baseline gap-1.5'>
                  <Input
                    id='calc-dose'
                    inputMode='decimal'
                    value={doseText}
                    onChange={event => setDoseText(event.target.value)}
                    className='h-9 w-20 bg-white text-right tabular-nums'
                    aria-describedby='calc-dose-unit'
                  />
                  <span id='calc-dose-unit' className='text-muted-foreground text-sm'>
                    mg
                  </span>
                </div>
              </div>
              <Slider
                min={sliderStep}
                max={sliderMax}
                step={sliderStep}
                value={[Math.min(Math.max(hasDose ? dose : sliderStep, sliderStep), sliderMax)]}
                onValueChange={value => {
                  const next = Array.isArray(value) ? value[0] : value

                  setDoseText(String(Math.round(next * 100) / 100))
                }}
                aria-label='Amount per use in milligrams'
                className='w-full py-1 [&_[data-slot=slider-track]]:h-1.5 [&_[data-slot=slider-track]]:bg-neutral-300 [&_[data-slot=slider-thumb]]:size-4 [&_[data-slot=slider-range]]:bg-[#0592b3]'
              />
              <div className='text-muted-foreground flex justify-between text-[11px] tabular-nums'>
                <span>{fmt(sliderStep, 1)} mg</span>
                <span>{fmt(sliderMax, 0)} mg</span>
              </div>
            </div>

            <div className='space-y-2'>
              <Label>Uses per week</Label>
              <div className='grid grid-cols-7 gap-1.5'>
                {WEEKLY.map(n => (
                  <SegmentButton key={n} active={perWeek === n} onClick={() => setPerWeek(n)}>
                    {n}
                  </SegmentButton>
                ))}
              </div>
            </div>

            <p className='text-muted-foreground text-xs'>
              Arithmetic from the label values only. 1 unit = 0.01 ml. Research use only, not guidance on how much to
              use.
            </p>
          </div>

          {/* Instrument */}
          <div className='flex flex-col gap-4'>
            <div className='relative flex flex-col gap-6 rounded-xl bg-neutral-950 p-6 text-white sm:p-8'>
              <div className='flex items-center justify-between gap-4'>
                <div>
                  <p className='text-xs font-semibold tracking-[0.14em] text-white/55 uppercase'>
                    {format === 'pen' ? 'On the dial' : 'On the syringe'}
                  </p>
                  <p className='font-semibold'>{product?.label}</p>
                </div>
                {product ? (
                  <span className='flex h-16 w-16 items-center justify-center rounded-lg bg-white p-1.5'>
                    <img src={product.image} alt='' className='max-h-full max-w-full object-contain' />
                  </span>
                ) : null}
              </div>

              {result ? (
                format === 'pen' ? (
                  <PenDial units={result.unitsPerDose} />
                ) : (
                  <Syringe units={result.unitsPerDose} />
                )
              ) : null}

              <div className='flex items-baseline justify-between gap-4 border-t border-white/15 pt-4'>
                <p className='text-sm text-white/70'>
                  {hasDose && result
                    ? `${fmt(dose, 2)} mg is ${fmt(result.unitsPerDose / 100, 2)} ml at ${fmt(result.mgPerMl, 2)} mg/ml`
                    : 'Enter an amount to read the units.'}
                </p>
                {result && result.unitsPerDose > 100 ? (
                  <p className='text-sm font-semibold' style={{ color: ACCENT }}>Over one full draw. Split it.</p>
                ) : null}
              </div>
            </div>

            <div className='grid gap-3 sm:grid-cols-3'>
              <Stat label={`Uses per ${noun}`} value={hasDose && result ? fmt(result.usesPerUnit, 1) : '0'} />
              <Stat
                label={`One ${noun} lasts`}
                value={hasDose && result ? `${fmt(result.weeks, 1)} wk` : '0 wk'}
                note={`at ${perWeek} per week`}
              />
              <Stat
                label={`${PLAN_WEEKS} weeks needs`}
                value={
                  hasDose && result ? `${result.unitsForPlan} ${noun}${result.unitsForPlan === 1 ? '' : 's'}` : '0'
                }
              />
            </div>
          </div>
        </div>
      </ContentLayout>
    </section>
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
      'h-9 rounded-md border text-sm font-medium tabular-nums transition-colors',
      active ? 'border-foreground bg-foreground text-background' : 'hover:border-foreground/40 border-border bg-white'
    )}
  >
    {children}
  </button>
)

const Stat = ({ label, value, note }: { label: string; value: string; note?: string }) => (
  <div className='ring-border space-y-0.5 rounded-lg bg-white p-4 ring-1'>
    <p className='text-muted-foreground text-xs font-medium tracking-wide uppercase'>{label}</p>
    <p className='text-xl font-bold tabular-nums'>{value}</p>
    {note ? <p className='text-muted-foreground text-xs'>{note}</p> : null}
  </div>
)

/** A pen dose dial: 270 degree sweep, 0 to 100 units, ticks every 10, the reading in the window. */
const PenDial = ({ units }: { units: number }) => {
  const size = 240
  const c = size / 2
  const r = 96
  const start = 135
  const sweep = 270
  const clamped = Math.max(0, Math.min(100, units))

  const toXY = (deg: number, radius: number) => {
    const rad = (deg * Math.PI) / 180

    return [c + radius * Math.cos(rad), c + radius * Math.sin(rad)]
  }

  const arc = (from: number, to: number, radius: number) => {
    const [x1, y1] = toXY(from, radius)
    const [x2, y2] = toXY(to, radius)
    const large = to - from > 180 ? 1 : 0

    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${large} 1 ${x2} ${y2}`
  }

  const valueEnd = start + (sweep * clamped) / 100

  return (
    <div className='flex justify-center'>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role='img'
        aria-label={`${Math.round(units)} units`}
      >
        <path
          d={arc(start, start + sweep, r)}
          fill='none'
          stroke='currentColor'
          strokeOpacity='0.15'
          strokeWidth='10'
          strokeLinecap='round'
        />
        {clamped > 0 ? (
          <path
            d={arc(start, valueEnd, r)}
            fill='none'
            stroke={ACCENT}
            strokeWidth='10'
            strokeLinecap='round'
            className='transition-all duration-300'
          />
        ) : null}
        {Array.from({ length: 11 }).map((_, i) => {
          const deg = start + (sweep * i) / 10
          const [x1, y1] = toXY(deg, r - 14)
          const [x2, y2] = toXY(deg, r - (i % 5 === 0 ? 26 : 20))
          const [lx, ly] = toXY(deg, r - 38)

          return (
            <g key={i}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke='currentColor'
                strokeOpacity={i % 5 === 0 ? 0.8 : 0.35}
                strokeWidth='1.5'
              />
              {i % 5 === 0 ? (
                <text
                  x={lx}
                  y={ly}
                  textAnchor='middle'
                  dominantBaseline='middle'
                  fontSize='10'
                  fill='currentColor'
                  fillOpacity='0.6'
                >
                  {i * 10}
                </text>
              ) : null}
            </g>
          )
        })}
        <text
          x={c}
          y={c - 4}
          textAnchor='middle'
          dominantBaseline='middle'
          fontSize='52'
          fontWeight='700'
          fill='currentColor'
        >
          {Math.round(units)}
        </text>
        <text
          x={c}
          y={c + 30}
          textAnchor='middle'
          dominantBaseline='middle'
          fontSize='12'
          fill='currentColor'
          fillOpacity='0.6'
          letterSpacing='1.5'
        >
          UNITS
        </text>
      </svg>
    </div>
  )
}

/** An insulin syringe barrel, graduated 0 to 100 units, filled to the reading. */
const Syringe = ({ units }: { units: number }) => {
  const clamped = Math.max(0, Math.min(100, units))
  const w = 360
  const h = 120
  const x0 = 36
  const x1 = 300
  const y0 = 42
  const y1 = 78
  const fillX = x0 + ((x1 - x0) * clamped) / 100

  return (
    <div className='flex flex-col items-center gap-3'>
      <svg
        width='100%'
        viewBox={`0 0 ${w} ${h}`}
        role='img'
        aria-label={`${Math.round(units)} units`}
        className='max-w-[460px]'
      >
        <rect x={x0 - 8} y={y0 - 12} width='8' height={y1 - y0 + 24} rx='2' fill='currentColor' fillOpacity='0.35' />
        <rect
          x={x0}
          y={y0}
          width={x1 - x0}
          height={y1 - y0}
          rx='4'
          fill='none'
          stroke='currentColor'
          strokeOpacity='0.5'
          strokeWidth='1.5'
        />
        {clamped > 0 ? (
          <rect
            x={x0}
            y={y0 + 1}
            width={fillX - x0}
            height={y1 - y0 - 2}
            rx='3'
            fill={ACCENT}
            fillOpacity='0.55'
            className='transition-all duration-300'
          />
        ) : null}
        {clamped > 0 ? (
          <line
            x1={fillX}
            y1={y0 - 6}
            x2={fillX}
            y2={y1 + 6}
            stroke={ACCENT}
            strokeWidth='3'
            className='transition-all duration-300'
          />
        ) : null}
        {Array.from({ length: 21 }).map((_, i) => {
          const x = x0 + ((x1 - x0) * i) / 20
          const major = i % 2 === 0

          return (
            <g key={i}>
              <line
                x1={x}
                y1={y0}
                x2={x}
                y2={y0 + (major ? 10 : 6)}
                stroke='currentColor'
                strokeOpacity={major ? 0.7 : 0.35}
                strokeWidth='1'
              />
              {i % 10 === 0 ? (
                <text x={x} y={y1 + 18} textAnchor='middle' fontSize='10' fill='currentColor' fillOpacity='0.6'>
                  {i * 5}
                </text>
              ) : null}
            </g>
          )
        })}
        <line
          x1={x1}
          y1={(y0 + y1) / 2}
          x2={x1 + 46}
          y2={(y0 + y1) / 2}
          stroke='currentColor'
          strokeOpacity='0.6'
          strokeWidth='2'
        />
      </svg>
      <p className='text-4xl font-bold tracking-tight tabular-nums'>
        {Math.round(units)}
        <span className='ms-2 text-base font-semibold text-white/60'>units</span>
      </p>
    </div>
  )
}

export default HomeCalculator
