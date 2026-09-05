'use client'

// React Imports
import { useEffect, useState } from 'react'

// Type Imports
import type { FaqGroup } from '@/views/pages/faq/faq-data'

// Utils Imports
import { cn } from '@/lib/utils'

type Props = {
  groups: FaqGroup[]
}

const eyebrow = 'text-muted-foreground font-mono text-[10px] tracking-[0.12em] uppercase'

/**
 * Sticky group index for the FAQ, in the same system as the shop filters: no box,
 * a mono uppercase label over a primary rule, rows as text links with a dot on the
 * active one and the question count in mono on the right. Anchor links do the work;
 * the highlight is a convenience that follows the scroll.
 */
const FaqGroupIndex = ({ groups }: Props) => {
  const [active, setActive] = useState(groups[0]?.id ?? '')

  useEffect(() => {
    const sections = groups
      .map(group => document.getElementById(group.id))
      .filter((section): section is HTMLElement => section !== null)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]

        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    )

    sections.forEach(section => observer.observe(section))

    return () => observer.disconnect()
  }, [groups])

  return (
    <nav aria-label='FAQ sections' className='text-sm'>
      <p className={cn(eyebrow, 'border-foreground border-b pb-2.5')}>On this page</p>
      <ul className='pt-2'>
        {groups.map(group => {
          const isActive = active === group.id

          return (
            <li key={group.id}>
              <a
                href={`#${group.id}`}
                aria-current={isActive ? 'true' : undefined}
                className={cn(
                  'flex w-full items-baseline gap-2.5 py-1.5 text-left transition-colors',
                  isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    'bg-foreground size-1.5 shrink-0 self-center rounded-full transition-opacity',
                    isActive ? 'opacity-100' : 'opacity-0'
                  )}
                />
                <span className='flex-1'>{group.label}</span>
                <span className='font-mono text-xs tabular-nums'>{group.items.length}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default FaqGroupIndex
