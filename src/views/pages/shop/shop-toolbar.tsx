'use client'

// Third-party Imports
import { LayoutDashboardIcon, ListIcon, SlidersHorizontalIcon } from 'lucide-react'

// Component Imports
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

// Utils Imports
import { cn } from '@/lib/utils'

export type SortKey = 'recommended' | 'price-asc' | 'price-desc' | 'newest'

export const sortOptions: { label: string; value: SortKey }[] = [
  { label: 'Recommended', value: 'recommended' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Newest First', value: 'newest' }
]

type Props = {
  count: number
  total: number
  sort: SortKey
  onSortChange: (value: SortKey) => void
  view: 'grid' | 'list'
  onViewChange: (value: 'grid' | 'list') => void
  onOpenFilters?: () => void
}

const ShopToolbar = ({ count, sort, onSortChange, view, onViewChange, onOpenFilters }: Props) => {
  return (
    <div className='flex flex-wrap items-center justify-between gap-4'>
      <div className='flex items-center gap-3'>
        {onOpenFilters && (
          <Button variant='outline' size='sm' className='lg:hidden' onClick={onOpenFilters}>
            <SlidersHorizontalIcon className='size-4' />
            Filters
          </Button>
        )}
        <p className='text-xl font-semibold'>All Products ({count})</p>
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
  )
}

export default ShopToolbar
