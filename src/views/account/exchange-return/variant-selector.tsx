'use client'

// React Imports
import { useState } from 'react'

// Third-party Imports
import { ChevronRightIcon, MinusIcon, PlusIcon } from 'lucide-react'

// Component Imports
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

// Utils Imports
import { cn } from '@/lib/utils'

const sizes = [
  { label: 'XS', value: 'xs', note: '1 left', noteClass: 'text-destructive' },
  { label: 'S', value: 's' },
  { label: 'M', value: 'm' },
  { label: 'L', value: 'l', note: '2 left', noteClass: 'text-destructive' },
  { label: 'XL', value: 'xl', disabled: true }
]

const colors = [
  { value: 'indigo', className: 'bg-indigo-700' },
  { value: 'lime', className: 'bg-lime-200' },
  { value: 'fuchsia', className: 'bg-fuchsia-200' },
  { value: 'neutral', className: 'bg-neutral-200' },
  { value: 'rose', className: 'bg-rose-200' },
  { value: 'green', className: 'bg-green-200' }
]

const VariantSelector = () => {
  const [size, setSize] = useState('l')
  const [color, setColor] = useState('purple')
  const [quantity, setQuantity] = useState(0)

  return (
    <>
      <div>
        <div className='mb-4 flex items-center justify-between'>
          <h4 className='text-xl font-semibold'>Available sizes</h4>
          <Button
            variant='link'
            size='sm'
            className='flex items-center text-sky-600 hover:no-underline dark:text-sky-400'
          >
            <p className='text-base font-medium'>Size Guide</p>
            <ChevronRightIcon className='size-4' />
          </Button>
        </div>
        <div className='flex flex-wrap items-start gap-4'>
          {sizes.map(s => {
            const checked = size === s.value

            return (
              <div key={s.value} className='flex flex-col items-center gap-2.5'>
                <Button
                  type='button'
                  variant='outline'
                  disabled={s.disabled}
                  onClick={() => !s.disabled && setSize(s.value)}
                  className={cn(
                    'w-15 rounded-lg text-sm font-medium',
                    s.disabled && 'line-through disabled:opacity-100',
                    checked &&
                      'border-primary bg-primary hover:bg-primary hover:text-primary-foreground text-primary-foreground dark:text-primary-foreground dark:bg-primary dark:hover:bg-primary'
                  )}
                >
                  {s.label}
                </Button>
                {s.note && <span className={cn('text-sm font-medium', s.noteClass)}>{s.note}</span>}
              </div>
            )
          })}
        </div>
      </div>

      <div className='flex flex-wrap items-start justify-between gap-6'>
        <div>
          <h4 className='mb-5 text-xl font-semibold'>Available Color</h4>
          <div className='flex items-center gap-3'>
            {colors.map(c => {
              const checked = color === c.value

              return (
                <div
                  key={c.value}
                  role='radio'
                  aria-label={`Color ${c.value}`}
                  aria-checked={checked}
                  tabIndex={0}
                  onClick={() => setColor(c.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setColor(c.value)
                    }
                  }}
                  className={cn(
                    'size-7 cursor-pointer rounded-full transition-all',
                    c.className,
                    checked && 'ring-foreground ring-[1.5px] ring-offset-2'
                  )}
                />
              )
            })}
          </div>
        </div>
        <div className='flex flex-col items-end gap-5 md:w-82'>
          <Label htmlFor='exchange-quantity' className='text-xl font-semibold'>
            Choose the quantity
          </Label>
          <div className='border-input flex h-8 w-48 items-center gap-2 rounded-md border px-3'>
            <Button
              type='button'
              variant='secondary'
              size='icon-xs'
              className='size-5.5 rounded-sm'
              aria-label='Decrement button'
              onClick={() => setQuantity(q => Math.max(0, q - 1))}
            >
              <MinusIcon className='size-3.5 shrink-0' />
            </Button>
            <Input
              id='exchange-quantity'
              value={quantity}
              onChange={e => setQuantity(Number(e.target.value.replace(/\D/g, '')) || 0)}
              className='h-auto border-0 bg-transparent text-center shadow-none focus-visible:ring-0 dark:bg-transparent'
              aria-label='Quantity'
            />
            <Button
              type='button'
              variant='secondary'
              size='icon-xs'
              className='size-5.5 rounded-sm'
              aria-label='Increment button'
              onClick={() => setQuantity(q => q + 1)}
            >
              <PlusIcon className='size-3.5 shrink-0' />
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default VariantSelector
