'use client'

import { useMemo, useState } from 'react'

import ContentLayout from '@/components/layout/content-layout'
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

const WATER = [
  { value: '1', label: '1 ml' },
  { value: '2', label: '2 ml' },
  { value: '3', label: '3 ml' }
]

const EMPTY = '–'

const fmt = (n: number, digits = 1) =>
  Number.isFinite(n) ? n.toLocaleString('en-GB', { maximumFractionDigits: digits }) : EMPTY

/**
 * Units calculator. 1 unit on an insulin syringe or pen dial = 0.01 ml.
 * Pure arithmetic from the label values; no guidance on amounts.
 */
const HomeCalculator = () => {
  const [format, setFormat] = useState<Format>('pen')
  const [pen, setPen] = useState(PENS[0].value)
  const [vial, setVial] = useState(VIALS[0].value)
  const [water, setWater] = useState('2')
  const [dose, setDose] = useState('1')
  const [perWeek, setPerWeek] = useState('1')

  const result = useMemo(() => {
    const doseMg = Number.parseFloat(dose.replace(',', '.'))
    const times = Number.parseFloat(perWeek)
    const product = format === 'pen' ? PENS.find(p => p.value === pen) : VIALS.find(v => v.value === vial)

    if (!product) return null

    const totalMg = product.mg
    const volumeMl = format === 'pen' ? (product as (typeof PENS)[number]).ml : Number.parseFloat(water)
    const mgPerMl = totalMg / volumeMl
    const hasDose = Number.isFinite(doseMg) && doseMg > 0
    const unitsPerDose = hasDose ? (doseMg / mgPerMl) * 100 : NaN
    const dosesPerUnit = hasDose ? totalMg / doseMg : NaN
    const weeks = hasDose && Number.isFinite(times) && times > 0 ? dosesPerUnit / times : NaN

    return { mgPerMl, unitsPerDose, dosesPerUnit, weeks, hasDose, name: product.label, image: product.image }
  }, [format, pen, vial, water, dose, perWeek])

  const items = format === 'pen' ? PENS : VIALS

  return (
    <section className='pt-8 sm:pt-16 lg:pt-24'>
      <ContentLayout>
        <div className='bg-muted grid gap-8 rounded-xl p-6 sm:p-8 lg:grid-cols-2 lg:gap-12'>
          <div className='space-y-6'>
            <div className='space-y-1'>
              <h3 className='text-2xl font-bold sm:text-3xl'>Units calculator</h3>
              <p className='text-muted-foreground text-base'>
                Enter the amount you work with and see the units on the pen dial or syringe, plus how long one pen or
                vial lasts.
              </p>
            </div>

            <Tabs value={format} onValueChange={value => setFormat(value as Format)}>
              <TabsList>
                <TabsTrigger value='pen'>Pen</TabsTrigger>
                <TabsTrigger value='vial'>Vial</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className='grid gap-4 sm:grid-cols-2'>
              <div className='space-y-2 sm:col-span-2'>
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
                  <Label htmlFor='calc-water'>Bacteriostatic water added</Label>
                  <Select items={WATER} value={water} onValueChange={value => value && setWater(value)}>
                    <SelectTrigger id='calc-water' className='w-full bg-white'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent alignItemWithTrigger={false}>
                      <SelectGroup>
                        {WATER.map(item => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              ) : null}

              <div className='space-y-2'>
                <Label htmlFor='calc-dose'>Amount per use (mg)</Label>
                <Input
                  id='calc-dose'
                  inputMode='decimal'
                  placeholder='e.g. 2'
                  value={dose}
                  onChange={event => setDose(event.target.value)}
                  className='bg-white'
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='calc-week'>Uses per week</Label>
                <Input
                  id='calc-week'
                  inputMode='numeric'
                  placeholder='e.g. 1'
                  value={perWeek}
                  onChange={event => setPerWeek(event.target.value)}
                  className='bg-white'
                />
              </div>
            </div>

            <p className='text-muted-foreground text-xs'>
              Arithmetic from the label values only. 1 unit = 0.01 ml. Research use only, not guidance on how much to
              use.
            </p>
          </div>

          <div className='flex flex-col gap-5'>
            <div className='ring-border grid gap-6 rounded-xl bg-white p-6 ring-1 sm:grid-cols-[140px_1fr] sm:items-center'>
              <div className='flex h-48 items-center justify-center sm:h-56'>
                {result ? <img src={result.image} alt={result.name} className='max-h-full object-contain' /> : null}
              </div>
              <div className='space-y-4'>
                <div>
                  <p className='text-muted-foreground text-xs font-medium tracking-wide uppercase'>
                    {format === 'pen' ? 'Dial to' : 'Draw to'}
                  </p>
                  <p className='text-5xl font-bold tracking-tight sm:text-6xl'>
                    {result?.hasDose ? fmt(result.unitsPerDose, 0) : '0'}
                    <span className='text-muted-foreground ms-2 text-xl font-semibold'>units</span>
                  </p>
                  <p className='text-muted-foreground mt-1 text-sm'>
                    {result?.hasDose
                      ? `${fmt(result.unitsPerDose / 100, 2)} ml of ${result.name}`
                      : 'Enter an amount per use.'}
                  </p>
                </div>
                <UnitScale units={result?.hasDose ? result.unitsPerDose : 0} />
              </div>
            </div>

            <div className='grid gap-4 sm:grid-cols-3'>
              <Stat label='Concentration' value={result ? `${fmt(result.mgPerMl, 2)} mg/ml` : EMPTY} />
              <Stat
                label={format === 'pen' ? 'Uses per pen' : 'Uses per vial'}
                value={result?.hasDose ? fmt(result.dosesPerUnit, 1) : EMPTY}
              />
              <Stat
                label={format === 'pen' ? 'One pen lasts' : 'One vial lasts'}
                value={result && Number.isFinite(result.weeks) ? `${fmt(result.weeks, 1)} weeks` : EMPTY}
              />
            </div>
          </div>
        </div>
      </ContentLayout>
    </section>
  )
}

/** 0 to 100 unit scale, the span of an insulin syringe or one full pen dial. */
const UnitScale = ({ units }: { units: number }) => {
  const clamped = Math.max(0, Math.min(100, units))
  const over = units > 100

  return (
    <div className='space-y-1.5'>
      <div className='bg-muted relative h-3 overflow-hidden rounded-full'>
        <div
          className='bg-foreground h-full rounded-full transition-[width] duration-300'
          style={{ width: `${clamped}%` }}
        />
        <div className='pointer-events-none absolute inset-0 flex justify-between px-[1px]'>
          {Array.from({ length: 11 }).map((_, index) => (
            <span key={index} className='bg-background/70 h-full w-px' />
          ))}
        </div>
      </div>
      <div className='text-muted-foreground flex justify-between text-[11px] font-medium'>
        <span>0</span>
        <span>50</span>
        <span>100 units</span>
      </div>
      {over ? <p className='text-muted-foreground text-xs'>More than one full draw. Split it into two.</p> : null}
    </div>
  )
}

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className='ring-border space-y-1 rounded-lg bg-white p-4 ring-1'>
    <p className='text-muted-foreground text-xs font-medium tracking-wide uppercase'>{label}</p>
    <p className='text-xl font-bold'>{value}</p>
  </div>
)

export default HomeCalculator
