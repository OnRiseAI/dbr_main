'use client'

import { useState } from 'react'

import Link from 'next/link'

import type { Product } from '@/types/product'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

const WATER = [1, 2, 3]

const fmt = (n: number, digits = 1) =>
  Number.isFinite(n) ? n.toLocaleString('en-GB', { maximumFractionDigits: digits }) : '0'

type Props = {

  /** The products currently shown in the grid. The select is scoped to them. */
  products: Product[]
}

/**
 * Compact units calculator that closes a short last grid row so the catalogue never
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
 * Same arithmetic as the homepage calculator: 1 unit = 0.01 ml, label values only.
 */
const ProductGridCalculator = ({ products }: Props) => {
  const options = products.filter(product => product.specs)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [water, setWater] = useState(2)
  const [doseText, setDoseText] = useState('1')

  const product = options.find(item => item.id === selectedId) ?? options[0]
  const specs = product?.specs

  if (!product || !specs) return null

  const dose = Number.parseFloat(doseText.replace(',', '.'))
  const hasDose = Number.isFinite(dose) && dose > 0
  const volumeMl = specs.form === 'pen' ? specs.fillMl : water
  const mgPerMl = volumeMl ? specs.strengthMg / volumeMl : null
  const units = hasDose && mgPerMl ? (dose / mgPerMl) * 100 : 0
  const uses = hasDose ? specs.strengthMg / dose : 0
  const noun = specs.form === 'pen' ? 'pen' : 'vial'

  return (
    <div className='max-sm:hidden sm:max-xl:nth-[2n]:col-[2/-1] sm:max-xl:nth-[2n+1]:hidden xl:nth-[3n+2]:col-[2/-1] xl:nth-[3n]:col-[3/-1] xl:nth-[3n+1]:hidden'>
      <Card className='bg-muted h-full gap-0 border py-0 ring-0'>
        <div className='flex flex-1 flex-col gap-4 p-4'>
          <div className='space-y-0.5'>
            <h5 className='text-lg font-semibold'>Units calculator</h5>
            <p className='text-muted-foreground text-xs'>Read the units off the dial or the syringe.</p>
          </div>

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

          {specs.form === 'vial' ? (
            <div className='space-y-1.5'>
              <Label className='text-xs'>Bacteriostatic water added</Label>
              <div className='grid grid-cols-3 gap-1.5'>
                {WATER.map(ml => (
                  <button
                    key={ml}
                    type='button'
                    onClick={() => setWater(ml)}
                    aria-pressed={water === ml}
                    className={cn(
                      'h-8 rounded-md border text-sm font-medium tabular-nums transition-colors',
                      water === ml
                        ? 'border-foreground bg-foreground text-background'
                        : 'hover:border-foreground/40 border-border bg-white'
                    )}
                  >
                    {ml} ml
                  </button>
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
              {specs.form === 'pen' ? 'On the dial' : 'On the syringe'}
            </p>
            <p className='mt-1 text-4xl font-bold tracking-tight tabular-nums'>
              {Math.round(units)}
              <span className='ms-2 text-base font-semibold text-white/60'>units</span>
            </p>
            <p className='mt-2 text-xs text-white/70'>
              {hasDose && mgPerMl
                ? `${fmt(dose, 2)} mg is ${fmt(units / 100, 2)} ml at ${fmt(mgPerMl, 2)} mg/ml. ${fmt(uses, 1)} uses per ${noun}.`
                : mgPerMl
                  ? 'Enter an amount to read the units.'
                  : 'Fill volume not on file for this pen.'}
            </p>
            {units > 100 ? (
              <p className='mt-1 text-xs font-semibold text-[#0592b3]'>Over one full draw. Split it.</p>
            ) : null}
          </div>

          <div className='flex items-center justify-between gap-3 text-xs'>
            <span className='text-muted-foreground'>1 unit = 0.01 ml. Research use only.</span>
            <Link href='/#calculator' className='shrink-0 font-medium underline underline-offset-4'>
              Full calculator
            </Link>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default ProductGridCalculator
