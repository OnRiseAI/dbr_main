'use client'

// React Imports
import { useState } from 'react'

// Third-party Imports
import { SearchIcon, XIcon } from 'lucide-react'

// Type Imports
import type { ProductColor } from '@/types/product'

// Component Imports
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { Slider } from '@/components/ui/slider'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

// Utils Imports
import { cn } from '@/lib/utils'

export type ShopFilterState = {
  category: string
  brands: string[]
  colors: string[]
  price: [number, number]
  minRating: number
  minDiscount: number
  isNew: boolean
  isPopular: boolean
}

type Props = {
  categories: string[]
  brands: string[]
  colors: ProductColor[]
  minPrice: number
  maxPrice: number
  filters: ShopFilterState
  onCategoryChange: (value: string) => void
  onBrandToggle: (brand: string) => void
  onColorToggle: (color: string) => void
  onPriceChange: (value: [number, number]) => void
  onMinRatingChange: (value: number) => void
  onMinDiscountChange: (value: number) => void
  onIsNewToggle: () => void
  onIsPopularToggle: () => void
  onClearAll: () => void
}

const SHOW_MORE_THRESHOLD = 7

const ShopFilters = ({
  categories,
  brands,
  colors,
  minPrice,
  maxPrice,
  filters,
  onCategoryChange,
  onBrandToggle,
  onColorToggle,
  onPriceChange,
  onMinRatingChange,
  onMinDiscountChange,
  onIsNewToggle,
  onClearAll
}: Props) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())
  const [searchOpenSections, setSearchOpenSections] = useState<Set<string>>(new Set())
  const [brandQuery, setBrandQuery] = useState('')
  const [colorQuery, setColorQuery] = useState('')
  const [hoveredPriceThumb, setHoveredPriceThumb] = useState<number | null>(null)

  const toggleSection = (section: string) => {
    const updated = new Set(expandedSections)

    if (updated.has(section)) {
      updated.delete(section)
    } else {
      updated.add(section)
    }

    setExpandedSections(updated)
  }

  const isSectionExpanded = (section: string) => expandedSections.has(section)

  const toggleSectionSearch = (section: string) => {
    const updated = new Set(searchOpenSections)

    if (updated.has(section)) {
      updated.delete(section)
      if (section === 'brands') setBrandQuery('')
      if (section === 'colors') setColorQuery('')
    } else {
      updated.add(section)
    }

    setSearchOpenSections(updated)
  }

  const isSectionSearchOpen = (section: string) => searchOpenSections.has(section)

  const filteredBrands = brands.filter(brand => brand.toLowerCase().includes(brandQuery.trim().toLowerCase()))
  const filteredColors = colors.filter(color => color.name.toLowerCase().includes(colorQuery.trim().toLowerCase()))

  return (
    <div className='space-y-6'>
      <div className='mb-4 flex items-center justify-between'>
        <h4 className='text-2xl font-semibold'>Filter</h4>
        <Button
          variant='link'
          size='sm'
          className='text-destructive h-auto p-0 text-base font-normal hover:no-underline'
          onClick={onClearAll}
        >
          Clear All
        </Button>
      </div>

      <Separator />

      <div>
        <RadioGroup
          value={filters.category}
          onValueChange={value => onCategoryChange(value ?? 'all')}
          className='gap-2.5'
        >
          <div className='flex items-center gap-2.5'>
            <RadioGroupItem
              value='all'
              id='cat-all'
              className='size-6 [&_[data-slot=radio-group-indicator]>span]:size-2.5'
            />
            <Label htmlFor='cat-all' className='leading-5 font-normal'>
              All
            </Label>
          </div>
          {categories.map(category => (
            <div key={category} className='flex items-center gap-2.5'>
              <RadioGroupItem
                value={category}
                id={`cat-${category}`}
                className='size-6 [&_[data-slot=radio-group-indicator]>span]:size-2.5'
              />
              <Label htmlFor={`cat-${category}`} className='leading-5 font-normal'>
                {category}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <Separator />

      <div className='space-y-4'>
        {isSectionSearchOpen('brands') ? (
          <InputGroup>
            <InputGroupInput
              autoFocus
              placeholder='Search for Brand'
              value={brandQuery}
              onChange={e => setBrandQuery(e.target.value)}
            />
            <InputGroupAddon align='inline-end'>
              <InputGroupButton
                size='icon-xs'
                aria-label='Close brand search'
                onClick={() => toggleSectionSearch('brands')}
              >
                <XIcon />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        ) : (
          <div className='flex h-8 items-center justify-between'>
            <h4 className='text-xl font-medium'>Brand</h4>
            <Button
              variant='ghost'
              size='icon-xs'
              aria-label='Search brands'
              onClick={() => toggleSectionSearch('brands')}
            >
              <SearchIcon className='size-5' />
            </Button>
          </div>
        )}
        {filteredBrands
          .slice(0, isSectionExpanded('brands') ? filteredBrands.length : SHOW_MORE_THRESHOLD)
          .map(brand => (
            <div key={brand} className='flex items-center gap-2'>
              <Checkbox
                id={`brand-${brand}`}
                checked={filters.brands.includes(brand)}
                onCheckedChange={() => onBrandToggle(brand)}
                className='size-5'
              />
              <Label htmlFor={`brand-${brand}`} className='leading-5 font-normal'>
                {brand}
              </Label>
            </div>
          ))}
        {filteredBrands.length === 0 && <p className='text-muted-foreground text-sm'>No brands found.</p>}
        {filteredBrands.length > SHOW_MORE_THRESHOLD && (
          <Button
            variant='link'
            size='sm'
            className='h-auto p-0 text-base leading-5 font-medium'
            onClick={() => toggleSection('brands')}
          >
            {isSectionExpanded('brands') ? 'Show Less' : `Show More (${filteredBrands.length - SHOW_MORE_THRESHOLD})`}
          </Button>
        )}
      </div>

      <Separator />

      <div className='space-y-3'>
        <h4 className='text-xl font-medium'>Latest Products</h4>
        <div className='flex items-center gap-2'>
          <Checkbox
            id='filter-new'
            checked={filters.isNew}
            onCheckedChange={() => onIsNewToggle()}
            className='size-5'
          />
          <Label htmlFor='filter-new' className='leading-5 font-normal'>
            New Products Only
          </Label>
        </div>
      </div>

      <Separator />

      <div className='space-y-4'>
        <h4 className='text-xl font-medium'>Price Range</h4>
        <TooltipProvider>
          <div
            className='relative px-0.5'
            onMouseMove={e => {
              const rect = e.currentTarget.getBoundingClientRect()
              const pointerPercentage = ((e.clientX - rect.left) / rect.width) * 100

              const closestIndex = filters.price.reduce((closest, price, index) => {
                const percentage = ((price - minPrice) / (maxPrice - minPrice)) * 100
                const closestPercentage = ((filters.price[closest] - minPrice) / (maxPrice - minPrice)) * 100

                return Math.abs(percentage - pointerPercentage) < Math.abs(closestPercentage - pointerPercentage)
                  ? index
                  : closest
              }, 0)

              setHoveredPriceThumb(closestIndex)
            }}
            onMouseLeave={() => setHoveredPriceThumb(null)}
          >
            {filters.price.map((price, index) => {
              const percentage = ((price - minPrice) / (maxPrice - minPrice)) * 100

              return (
                <Tooltip key={index} open={hoveredPriceThumb === index}>
                  <TooltipTrigger
                    render={
                      <div
                        className='pointer-events-none absolute top-[50%] h-px w-px'
                        style={{ left: `calc(${percentage}% + ${10 - percentage * 0.2}px)` }}
                      />
                    }
                  />
                  <TooltipContent side='top' className='text-primary-foreground font-medium' sideOffset={20}>
                    <span className='tabular-nums'>${price}</span>
                  </TooltipContent>
                </Tooltip>
              )
            })}

            <Slider
              value={filters.price}
              onValueChange={value => {
                const range = Array.isArray(value) ? value : [value, value]

                onPriceChange([range[0] ?? minPrice, range[1] ?? maxPrice])
              }}
              min={minPrice}
              max={maxPrice}
              step={5}
            />
          </div>
        </TooltipProvider>
        <div className='flex items-center justify-between text-sm'>
          <span>${filters.price[0]}</span>
          <span>${filters.price[1]}</span>
        </div>
      </div>

      <Separator />

      <div className='space-y-3'>
        <h4 className='text-xl font-medium'>Discount</h4>
        <RadioGroup value={String(filters.minDiscount)} onValueChange={value => onMinDiscountChange(Number(value))}>
          {[
            { value: 10, label: '10% and above' },
            { value: 20, label: '20% and above' },
            { value: 30, label: '30% and above' }
          ].map(option => (
            <div key={option.value} className='flex items-center gap-2.5'>
              <RadioGroupItem
                value={String(option.value)}
                id={`discount-${option.value}`}
                className='size-6 [&_[data-slot=radio-group-indicator]>span]:size-2.5'
              />
              <Label htmlFor={`discount-${option.value}`} className='font-normal'>
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <Separator />

      <div className='space-y-4'>
        {isSectionSearchOpen('colors') ? (
          <InputGroup>
            <InputGroupInput
              autoFocus
              placeholder='Search for Color'
              value={colorQuery}
              onChange={e => setColorQuery(e.target.value)}
            />
            <InputGroupAddon align='inline-end'>
              <InputGroupButton
                size='icon-xs'
                aria-label='Close color search'
                onClick={() => toggleSectionSearch('colors')}
              >
                <XIcon />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        ) : (
          <div className='flex h-8 items-center justify-between'>
            <h4 className='text-xl font-medium'>Color</h4>
            <Button
              variant='ghost'
              size='icon-xs'
              aria-label='Search colors'
              onClick={() => toggleSectionSearch('colors')}
            >
              <SearchIcon className='size-5' />
            </Button>
          </div>
        )}
        <div className='flex flex-wrap gap-3'>
          {filteredColors
            .slice(0, isSectionExpanded('colors') ? filteredColors.length : SHOW_MORE_THRESHOLD)
            .map(color => (
              <Button
                key={color.name}
                size='icon-xs'
                variant='outline'
                aria-label={`Filter by ${color.name}`}
                title={color.name}
                style={{ backgroundColor: color.value }}
                onClick={() => onColorToggle(color.name)}
                className={cn(
                  'border-border size-6 rounded-full p-0 hover:opacity-90',
                  filters.colors.includes(color.name) && 'ring-primary ring-2 ring-offset-2'
                )}
              >
                <span className='sr-only'>{color.name}</span>
              </Button>
            ))}
        </div>
        {filteredColors.length === 0 && <p className='text-muted-foreground text-sm'>No colors found.</p>}
        {filteredColors.length > SHOW_MORE_THRESHOLD && (
          <Button
            variant='link'
            size='sm'
            className='h-auto p-0 text-sm font-normal'
            onClick={() => toggleSection('colors')}
          >
            {isSectionExpanded('colors') ? 'Show Less' : `${filteredColors.length - SHOW_MORE_THRESHOLD}+ more`}
          </Button>
        )}
      </div>

      <Separator />

      <div className='space-y-3'>
        <h4 className='text-xl font-medium'>Rating</h4>
        <RadioGroup value={String(filters.minRating)} onValueChange={value => onMinRatingChange(Number(value))}>
          {[
            { value: 0, label: 'All Ratings' },
            { value: 3, label: '3+ Stars' },
            { value: 4, label: '4+ Stars' },
            { value: 4.5, label: '4.5+ Stars' }
          ].map(option => (
            <div key={option.value} className='flex items-center gap-2.5'>
              <RadioGroupItem
                value={String(option.value)}
                id={`rating-${option.value}`}
                className='size-6 [&_[data-slot=radio-group-indicator]>span]:size-2.5'
              />
              <Label htmlFor={`rating-${option.value}`} className='font-normal'>
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  )
}

export default ShopFilters
