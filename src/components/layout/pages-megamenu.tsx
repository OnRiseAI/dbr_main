'use client'

// React Imports
import type { ReactNode } from 'react'

// Next Imports
import Link from 'next/link'

// Component Imports
import { NavigationMenuLink } from '@/components/ui/navigation-menu'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MegamenuPromotionalCard4 } from '@/components/layout/megamenu-promotional-card-4'

interface MegamenuGroup {
  title?: string
  items: Array<{ title: string; href: string }>
  href?: string
}

interface MegamenuColumn {
  groups: MegamenuGroup[]
}

interface PagesMegamenuProps {
  columns: MegamenuColumn[]
  promotionalCard?: ReactNode
  columnCount?: 3 | 4
  onNavigate?: () => void
}

export const PagesMegamenu = ({ columns, promotionalCard, columnCount = 4, onNavigate }: PagesMegamenuProps) => {
  const gridClass = columnCount === 3 ? 'grid-cols-2 lg:grid-cols-3' : 'grid-cols-2 lg:grid-cols-4'

  return (
    <ScrollArea className='max-h-113 w-full max-w-265 overflow-hidden'>
      <div className='flex flex-col gap-4 p-4 lg:flex-row'>
        {/* Grid columns */}
        <div className={`grid gap-8 ${gridClass}`}>
          {columns.map((column, colIndex) => (
            <div key={colIndex} className='space-y-2'>
              {column.groups.map((group, index) => (
                <div key={group.title ?? index} className='space-y-2 p-2'>
                  {group.title &&
                    (group.href && !group.items.length ? (
                      <NavigationMenuLink
                        render={<Link href={group.href} onClick={onNavigate} />}
                        className='text-foreground hover:text-primary p-0 text-sm font-medium transition-colors hover:bg-transparent focus:bg-transparent'
                      >
                        {group.title}
                      </NavigationMenuLink>
                    ) : (
                      <p className='text-foreground text-sm font-medium'>{group.title}</p>
                    ))}
                  {group.items.length > 0 && (
                    <ul className='grid gap-2'>
                      {group.items.map(item => (
                        <li key={item.title}>
                          <NavigationMenuLink
                            render={<Link href={item.href} onClick={onNavigate} />}
                            className='text-muted-foreground hover:text-foreground p-0 text-sm leading-5 transition-colors hover:bg-transparent focus:bg-transparent'
                          >
                            {item.title}
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Right side - promotional card */}
        {promotionalCard || <MegamenuPromotionalCard4 />}
      </div>
    </ScrollArea>
  )
}
