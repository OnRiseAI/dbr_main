'use client'

// Third-party Imports
import { ChevronDownIcon, LayoutDashboardIcon, ListIcon, XIcon } from 'lucide-react'

// Type Imports
import type { ProductColor } from '@/types/product'
import type { SortKey } from '@/views/pages/shop/shop-toolbar'

// Component Imports
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { sortOptions } from '@/views/pages/shop/shop-toolbar'

// Utils Imports
import { cn } from '@/lib/utils'

export type ProductListFilterState = {
  category: string
  brands: string[]
  colors: string[]
  price: [number, number]
}

type Props = {
  categories: string[]
  brands: string[]
  colors: ProductColor[]
  minPrice: number
  maxPrice: number
  filters: ProductListFilterState
  onCategoryChange: (value: string) => void
  onBrandToggle: (brand: string) => void
  onColorToggle: (color: string) => void
  onPriceChange: (value: [number, number]) => void
  onClearAll: () => void
  sort: SortKey
  onSortChange: (value: SortKey) => void
  view: 'grid' | 'list'
  onViewChange: (value: 'grid' | 'list') => void
}

const ProductListToolbar = ({
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
  onClearAll,
  sort,
  onSortChange,
  view,
  onViewChange
}: Props) => {
  const isPriceDefault = filters.price[0] === minPrice && filters.price[1] === maxPrice

  const chips = [
    filters.category !== 'all'
      ? { key: 'category', label: filters.category, onClear: () => onCategoryChange('all') }
      : null,
    ...filters.brands.map(brand => ({ key: `brand-${brand}`, label: brand, onClear: () => onBrandToggle(brand) })),
    ...filters.colors.map(color => ({ key: `color-${color}`, label: color, onClear: () => onColorToggle(color) })),
    !isPriceDefault
      ? {
          key: 'price',
          label: `$${filters.price[0]} to $${filters.price[1]}`,
          onClear: () => onPriceChange([minPrice, maxPrice])
        }
      : null
  ].filter((chip): chip is NonNullable<typeof chip> => chip !== null)

  return (
    <div className='space-y-4'>
      <div className='flex flex-wrap items-center justify-between gap-4'>
        <div className='flex flex-wrap items-center gap-3'>
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant='outline' size='sm' />}>
              Category
              <ChevronDownIcon className='size-4' />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuRadioGroup
                value={filters.category}
                onValueChange={value => onCategoryChange((value as string) ?? 'all')}
              >
                <DropdownMenuRadioItem value='all'>All</DropdownMenuRadioItem>
                {categories.map(category => (
                  <DropdownMenuRadioItem key={category} value={category}>
                    {category}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant='outline' size='sm' />}>
              Brand
              {filters.brands.length > 0 && (
                <Badge variant='secondary' className='rounded-full'>
                  {filters.brands.length}
                </Badge>
              )}
              <ChevronDownIcon className='size-4' />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='max-h-72'>
              {brands.map(brand => (
                <DropdownMenuCheckboxItem
                  key={brand}
                  checked={filters.brands.includes(brand)}
                  onCheckedChange={() => onBrandToggle(brand)}
                >
                  {brand}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant='outline' size='sm' />}>
              Color
              {filters.colors.length > 0 && (
                <Badge variant='secondary' className='rounded-full'>
                  {filters.colors.length}
                </Badge>
              )}
              <ChevronDownIcon className='size-4' />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
              <div className='flex flex-wrap gap-3 p-1.5'>
                {colors.map(color => (
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
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant='outline' size='sm' />}>
              Price
              <ChevronDownIcon className='size-4' />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-64 p-3'>
              <p className='mb-2 text-sm font-medium'>Price Range</p>
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
              <div className='mt-2 flex items-center justify-between text-sm'>
                <span>${filters.price[0]}</span>
                <span>${filters.price[1]}</span>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className='flex flex-wrap items-center gap-3.5'>
          <div className='bg-muted flex w-fit gap-0.5 rounded-lg p-0.75'>
            <Button
              size='sm'
              variant={view === 'grid' ? 'outline' : 'ghost'}
              className={cn(
                'gap-1.5 rounded-lg text-sm font-medium active:not-aria-[haspopup]:translate-y-0',
                view !== 'grid' && 'hover:bg-transparent',
                view === 'grid' &&
                  'text-primary dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90 bg-white shadow-sm hover:bg-white/90'
              )}
              onClick={() => onViewChange('grid')}
            >
              <LayoutDashboardIcon className='size-4' />
              Grid
            </Button>
            <Button
              size='sm'
              variant={view === 'list' ? 'outline' : 'ghost'}
              className={cn(
                'gap-1.5 rounded-lg text-sm font-medium active:not-aria-[haspopup]:translate-y-0',
                view !== 'list' && 'hover:bg-transparent',
                view === 'list' &&
                  'text-primary dark:text-primary-foreground dark:bg-primary dark:hover:bg-primary/90 bg-white shadow-sm hover:bg-white/90'
              )}
              onClick={() => onViewChange('list')}
            >
              <ListIcon className='size-4' />
              List
            </Button>
          </div>

          <Select
            items={sortOptions}
            value={sort}
            onValueChange={value => onSortChange((value as SortKey) ?? 'recommended')}
          >
            <SelectTrigger className='h-8.5! px-2.5 sm:w-52'>
              <span className='text-muted-foreground'>Sort:</span>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {sortOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {chips.length > 0 && (
        <div className='flex flex-wrap items-center gap-2'>
          {chips.map(chip => (
            <Badge key={chip.key} variant='outline' className='h-7 gap-1 rounded-full px-3 py-0 text-sm'>
              {chip.label}
              <button type='button' aria-label={`Remove ${chip.label} filter`} onClick={chip.onClear}>
                <XIcon className='size-3.5' />
              </button>
            </Badge>
          ))}

          <Button
            variant='link'
            size='sm'
            className='text-destructive h-auto p-0 text-sm hover:no-underline'
            onClick={onClearAll}
          >
            Clear All
          </Button>
        </div>
      )}
    </div>
  )
}

export default ProductListToolbar
