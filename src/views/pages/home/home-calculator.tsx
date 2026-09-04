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
  { value: 'retatrutide-pen-15mg', label: 'Retatrutide pen 15 mg', mg: 15, ml: 3 },
  { value: 'retatrutide-pen-40mg', label: 'Retatrutide pen 40 mg', mg: 40, ml: 4 },
  { value: 'ghk-cu-pen-100mg', label: 'GHK-Cu pen 100 mg', mg: 100, ml: 3 }
]

const VIALS = [
  { value: 'retatrutide-vial-10mg', label: 'Retatrutide vial 10 mg', mg: 10 },
  { value: 'retatrutide-vial-20mg', label: 'Retatrutide vial 20 mg', mg: 20 },
  { value: 'ghk-cu-vial-100mg', label: 'GHK-Cu vial 100 mg', mg: 100 },
  { value: 'mt1-vial-10mg', label: 'Melanotan I (MT1) vial 10 mg', mg: 10 },
  { value: 'mt2-vial-10mg', label: 'Melanotan II (MT2) vial 10 mg', mg: 10 },
  { value: 'selank-vial-10mg', label: 'Selank vial 10 mg', mg: 10 }
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
  const [dose, setDose] = useState('')
  const [perWeek, setPerWeek] = useState('')

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

    return { mgPerMl, unitsPerDose, dosesPerUnit, weeks, hasDose, name: product.label }
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

          <div className='grid content-start gap-4 sm:grid-cols-2'>
            <Stat label='Concentration' value={result ? `${fmt(result.mgPerMl, 2)} mg/ml` : EMPTY} />
            <Stat label='Units per use' value={result?.hasDose ? fmt(result.unitsPerDose, 0) : EMPTY} />
            <Stat
              label={format === 'pen' ? 'Uses per pen' : 'Uses per vial'}
              value={result?.hasDose ? fmt(result.dosesPerUnit, 1) : EMPTY}
            />
            <Stat
              label={format === 'pen' ? 'One pen lasts' : 'One vial lasts'}
              value={result && Number.isFinite(result.weeks) ? `${fmt(result.weeks, 1)} weeks` : EMPTY}
            />
            <p className='text-muted-foreground text-sm sm:col-span-2'>
              {result?.hasDose
                ? `${result.name}: ${fmt(result.unitsPerDose, 0)} units per use.`
                : 'Enter an amount per use to see the numbers.'}
            </p>
          </div>
        </div>
      </ContentLayout>
    </section>
  )
}

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className='ring-border space-y-1 rounded-lg bg-white p-5 ring-1'>
    <p className='text-muted-foreground text-xs font-medium tracking-wide uppercase'>{label}</p>
    <p className='text-2xl font-bold'>{value}</p>
  </div>
)

export default HomeCalculator
