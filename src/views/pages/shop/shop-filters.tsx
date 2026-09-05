'use client'

import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import { formatPrice } from '@/utils/product-utils'

export type ShopFilterState = {
  category: string
  price: [number, number]
  minDiscount: number
  isNew: boolean
}

type Props = {

  /** Goal categories (Weight Management, Skin & Glow, ...). */
  goals: string[]

  /** Format categories (Pens, Vials). */
  formats: string[]

  /** Product count per category name, plus 'all'. */
  counts: Record<string, number>
  minPrice: number
  maxPrice: number
  filters: ShopFilterState
  onCategoryChange: (value: string) => void
  onPriceChange: (value: [number, number]) => void
  onMinDiscountChange: (value: number) => void
  onIsNewToggle: () => void
  onClearAll: () => void
}

const DISCOUNTS = [
  { value: 0, label: 'Any' },
  { value: 10, label: '10% and above' },
  { value: 20, label: '20% and above' },
  { value: 30, label: '30% and above' }
]

/**
 * Shop filters in the same system as the grid calculator: no box, hairline rules between
 * groups, mono uppercase group labels, options as text rows with a count on the right.
 * The active option is black with a dot; the rest are grey. Clear only appears when a
 * filter is active. Single-brand shop, no reviews: no Brand or Rating groups.
 */
const ShopFilters = ({
  goals,
  formats,
  counts,
  minPrice,
  maxPrice,
  filters,
  onCategoryChange,
  onPriceChange,
  onMinDiscountChange,
  onIsNewToggle,
  onClearAll
}: Props) => {
  const priceTouched = filters.price[0] !== minPrice || filters.price[1] !== maxPrice
  const active = filters.category !== 'all' || filters.isNew || filters.minDiscount > 0 || priceTouched

  return (
    <div className='text-sm'>
      <div className='border-foreground flex items-baseline justify-between border-b pb-2.5'>
        <p className={eyebrow}>Filter</p>
        {active ? (
          <button
            type='button'
            onClick={onClearAll}
            className='text-muted-foreground hover:text-foreground font-mono text-[10px] tracking-[0.12em] uppercase underline underline-offset-4'
          >
            Clear
          </button>
        ) : null}
      </div>

      <Group label='Shop by goal'>
        <Option
          label='All products'
          count={counts.all}
          active={filters.category === 'all'}
          onClick={() => onCategoryChange('all')}
        />
        {goals.map(name => (
          <Option
            key={name}
            label={name}
            count={counts[name]}
            active={filters.category === name}
            onClick={() => onCategoryChange(name)}
          />
        ))}
      </Group>

      {formats.length > 0 ? (
        <Group label='Format'>
          {formats.map(name => (
            <Option
              key={name}
              label={name}
              count={counts[name]}
              active={filters.category === name}
              onClick={() => onCategoryChange(name)}
            />
          ))}
        </Group>
      ) : null}

      <Group label='Latest'>
        <label htmlFor='filter-new' className='flex cursor-pointer items-center justify-between gap-3 py-1.5'>
          <span className={cn(filters.isNew ? 'text-foreground' : 'text-muted-foreground')}>New products only</span>
          <Switch id='filter-new' checked={filters.isNew} onCheckedChange={() => onIsNewToggle()} />
        </label>
      </Group>

      <Group label='Price'>
        <div className='py-2'>
          <Slider
            value={filters.price}
            onValueChange={value => {
              const range = Array.isArray(value) ? value : [value, value]

              onPriceChange([range[0] ?? minPrice, range[1] ?? maxPrice])
            }}
            min={minPrice}
            max={maxPrice}
            step={5}
            aria-label='Price range'
            className='[&_[data-slot=slider-range]]:bg-foreground [&_[data-slot=slider-thumb]]:border-foreground [&_[data-slot=slider-track]]:bg-foreground/15 [&_[data-slot=slider-thumb]]:size-3.5 [&_[data-slot=slider-thumb]]:shadow-none [&_[data-slot=slider-track]]:h-px'
          />
          <div className='text-muted-foreground mt-3 flex items-baseline justify-between font-mono text-xs tabular-nums'>
            <span className={cn(priceTouched && 'text-foreground')}>{formatPrice(filters.price[0])}</span>
            <span className={cn(priceTouched && 'text-foreground')}>{formatPrice(filters.price[1])}</span>
          </div>
        </div>
      </Group>

      <Group label='Discount'>
        {DISCOUNTS.map(option => (
          <Option
            key={option.value}
            label={option.label}
            active={filters.minDiscount === option.value}
            onClick={() => onMinDiscountChange(option.value)}
          />
        ))}
      </Group>
    </div>
  )
}

const eyebrow = 'text-muted-foreground font-mono text-[10px] tracking-[0.12em] uppercase'

const Group = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className='border-foreground/15 border-b py-4'>
    <p className={cn(eyebrow, 'mb-1.5')}>{label}</p>
    <div role='group' aria-label={label}>
      {children}
    </div>
  </div>
)

/** One selectable row: dot when active, label, count in mono on the right. */
const Option = ({
  label,
  count,
  active,
  onClick
}: {
  label: string
  count?: number
  active: boolean
  onClick: () => void
}) => (
  <button
    type='button'
    aria-pressed={active}
    onClick={onClick}
    className={cn(
      'group flex w-full items-baseline gap-2.5 py-1.5 text-left transition-colors',
      active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
    )}
  >
    <span
      aria-hidden
      className={cn(
        'bg-foreground size-1.5 shrink-0 self-center rounded-full transition-opacity',
        active ? 'opacity-100' : 'opacity-0'
      )}
    />
    <span className='flex-1'>{label}</span>
    {count !== undefined ? <span className='font-mono text-xs tabular-nums'>{count}</span> : null}
  </button>
)

export default ShopFilters
