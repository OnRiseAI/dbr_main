'use client'

import { useState } from 'react'

import { ChevronDownIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

export type FaqItem = { q: string; a: string }

type Props = {
  items: FaqItem[]
  defaultOpen?: number | null
}

/** Accordion list. One open at a time; the first open by default. */
const FaqList = ({ items, defaultOpen = 0 }: Props) => {
  const [open, setOpen] = useState<number | null>(defaultOpen)

  return (
    <ul className='divide-border divide-y rounded-xl border'>
      {items.map((item, index) => {
        const isOpen = open === index

        return (
          <li key={item.q}>
            <button
              type='button'
              onClick={() => setOpen(isOpen ? null : index)}
              aria-expanded={isOpen}
              className='flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold'
            >
              {item.q}
              <ChevronDownIcon
                className={cn('text-muted-foreground size-4 shrink-0 transition-transform', isOpen && 'rotate-180')}
              />
            </button>
            {isOpen ? <p className='text-muted-foreground px-5 pb-5 text-sm leading-relaxed'>{item.a}</p> : null}
          </li>
        )
      })}
    </ul>
  )
}

export default FaqList
