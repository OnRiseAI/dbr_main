'use client'

// React Imports
import { useState } from 'react'
import type { ReactNode, ReactElement } from 'react'

// Next Imports
import Link from 'next/link'

// Third-party Imports
import { useMedia } from 'react-use'
import { ChevronRightIcon, CircleSmallIcon } from 'lucide-react'

// Component Imports
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet'

// SVGs Imports
import LogoSvg from '@/assets/svg/logo'

export type NavigationItem = {
  title: string
  href: string
  icon?: ReactNode
}

export type NavigationGroup = {
  title?: string
  items: NavigationItem[]
  href?: string
}

export type NavigationColumn = {
  groups: NavigationGroup[]
}

export type NavigationSection = {
  title: string
  icon?: ReactNode
  href?: string
  items?: NavigationItem[]
  groups?: NavigationGroup[]
  columns?: NavigationColumn[]
}

type Props = {
  trigger: ReactElement
  logoName: string
  navigationData: NavigationSection[]
  logo?: ReactNode
  footer?: ReactNode
}

const MenuSheet = ({ trigger, logoName, navigationData, logo, footer }: Props) => {
  const [open, setOpen] = useState(false)
  const isMobile = useMedia('(max-width: 1279px)', false)

  // Keep the sheet closed once the viewport reaches the desktop breakpoint
  const sheetOpen = open && isMobile

  const handleLinkClick = () => {
    setOpen(false)
  }

  return (
    <Sheet open={sheetOpen} onOpenChange={setOpen}>
      <SheetTrigger render={trigger} />
      <SheetContent side='left' className='flex w-75 flex-col gap-0 p-0'>
        <SheetHeader className='p-4'>
          <SheetTitle hidden />
          <SheetDescription hidden />
          <Link href='/' onClick={handleLinkClick} className='self-start'>
            <div className='flex items-center gap-2.5'>
              {logo ?? <LogoSvg className='size-8.5' />}
              {logoName ? <span className='text-xl font-semibold'>{logoName}</span> : null}
            </div>
          </Link>
        </SheetHeader>
        <div className='flex-1 overflow-y-auto py-2'>
          {navigationData

            // Add more titles here (or drop the filter) to show other mega-menus on mobile
            .filter(item => item.title === 'Pages')
            .map(navItem => {
              if (navItem.href) {
                return (
                  <Link
                    key={navItem.title}
                    href={navItem.href}
                    className='hover:bg-accent flex items-center gap-2 px-4 py-2 text-sm'
                    onClick={handleLinkClick}
                  >
                    {navItem.icon}
                    {navItem.title}
                  </Link>
                )
              }

              if (navItem.columns) {
                return (
                  <div key={navItem.title}>
                    {navItem.columns
                      .flatMap(column => column.groups)
                      .map((group, index) =>
                        group.href && !group.items.length ? (
                          <Link
                            key={group.title ?? index}
                            href={group.href}
                            className='hover:bg-accent flex items-center gap-2 px-4 py-2 text-sm font-semibold'
                            onClick={handleLinkClick}
                          >
                            {group.title}
                          </Link>
                        ) : group.title ? (
                          <Collapsible key={group.title ?? index} className='w-full'>
                            <CollapsibleTrigger className='hover:bg-accent group flex w-full items-center justify-between px-4 py-2 text-sm font-semibold'>
                              {group.title}
                              <ChevronRightIcon className='size-4 shrink-0 transition-transform duration-300 group-data-panel-open:rotate-90' />
                            </CollapsibleTrigger>
                            <CollapsibleContent className='h-(--collapsible-panel-height) overflow-hidden transition-all duration-300 data-ending-style:h-0 data-starting-style:h-0'>
                              {group.items.map(item => (
                                <Link
                                  key={item.title}
                                  href={item.href}
                                  className='text-muted-foreground hover:text-foreground flex items-center gap-2 px-4 py-2 text-sm'
                                  onClick={handleLinkClick}
                                >
                                  <CircleSmallIcon className='ml-2 size-4' />
                                  {item.title}
                                </Link>
                              ))}
                            </CollapsibleContent>
                          </Collapsible>
                        ) : (
                          <div key={index} className='py-1'>
                            {group.items.map(item => (
                              <Link
                                key={item.title}
                                href={item.href}
                                className='text-muted-foreground hover:text-foreground flex items-center gap-2 px-4 py-2 text-sm'
                                onClick={handleLinkClick}
                              >
                                <CircleSmallIcon className='ml-2 size-4' />
                                {item.title}
                              </Link>
                            ))}
                          </div>
                        )
                      )}
                  </div>
                )
              }

              return (
                <Collapsible key={navItem.title} className='w-full'>
                  <CollapsibleTrigger className='hover:bg-accent group flex w-full items-center justify-between px-4 py-2 text-sm'>
                    <div className='flex items-center gap-2'>
                      {navItem.icon}
                      {navItem.title}
                    </div>
                    <ChevronRightIcon className='size-4 shrink-0 transition-transform duration-300 group-data-panel-open:rotate-90' />
                  </CollapsibleTrigger>
                  <CollapsibleContent className='h-(--collapsible-panel-height) overflow-hidden transition-all duration-300 data-ending-style:h-0 data-starting-style:h-0'>
                    {navItem.groups
                      ? navItem.groups.map((group, index) => (
                          <div key={group.title ?? index} className='py-1'>
                            {group.title && (
                              <p className='text-muted-foreground px-6 py-1.5 text-xs font-medium'>{group.title}</p>
                            )}
                            {group.items.map(item => (
                              <Link
                                key={item.title}
                                href={item.href}
                                className='hover:bg-accent flex items-center gap-2 px-4 py-2 text-sm'
                                onClick={handleLinkClick}
                              >
                                <CircleSmallIcon className='ml-2 size-4' />
                                {item.title}
                              </Link>
                            ))}
                          </div>
                        ))
                      : navItem.items?.map(item => (
                          <Link
                            key={item.title}
                            href={item.href}
                            className='hover:bg-accent flex items-center gap-2 px-4 py-2 text-sm'
                            onClick={handleLinkClick}
                          >
                            <CircleSmallIcon className='ml-2 size-4' />
                            {item.title}
                          </Link>
                        ))}
                  </CollapsibleContent>
                </Collapsible>
              )
            })}
        </div>
        {footer && <div className='border-t p-4'>{footer}</div>}
      </SheetContent>
    </Sheet>
  )
}

export default MenuSheet
