'use client'

import Link from 'next/link'
import { ArrowRightIcon } from 'lucide-react'

import type { Category } from '@/types/product'
import { NavigationMenuLink } from '@/components/ui/navigation-menu'
import { MegamenuPromotionalCard2 } from '@/components/layout/megamenu-promotional-card-2'

const GOALS = ['weight-management', 'skin-glow', 'tanning', 'calm-focus']
const FORMATS = ['pens', 'vials']

interface ShopMegamenuProps {
  categories: Category[]
  onNavigate?: () => void
}

const pick = (categories: Category[], handles: string[]) =>
  handles
    .map(handle => categories.find(category => category.handle === handle))
    .filter((category): category is Category => Boolean(category))

/**
 * Shop menu: goal tiles with the people photography, format tiles with the
 * product renders, the offer slot on the right. Same visual language as the
 * homepage categories.
 */
export const ShopMegamenu = ({ categories, onNavigate }: ShopMegamenuProps) => {
  const goals = pick(categories, GOALS)
  const formats = pick(categories, FORMATS)

  return (
    <div className='flex gap-6 p-6'>
      <div className='flex flex-col gap-5'>
        <div className='flex gap-6'>
          <div className='space-y-3'>
            <p className='text-muted-foreground text-xs font-semibold tracking-wide uppercase'>By goal</p>
            <div className='grid grid-cols-2 gap-3'>
              {goals.map(category => (
                <NavigationMenuLink
                  key={category.handle}
                  render={<Link href={category.href} onClick={onNavigate} />}
                  className='group block w-44 space-y-2 rounded-lg p-0 hover:bg-transparent'
                >
                  <span className='bg-muted block aspect-[4/3] overflow-hidden rounded-lg'>
                    <img
                      src={category.image}
                      alt=''
                      className='size-full object-cover transition-transform duration-500 group-hover:scale-105'
                    />
                  </span>
                  <span className='flex items-center justify-between text-sm font-semibold'>
                    {category.name}
                    <ArrowRightIcon className='text-muted-foreground size-3.5 transition-transform duration-300 group-hover:translate-x-1' />
                  </span>
                </NavigationMenuLink>
              ))}
            </div>
          </div>

          <div className='space-y-3'>
            <p className='text-muted-foreground text-xs font-semibold tracking-wide uppercase'>By format</p>
            <div className='grid gap-3'>
              {formats.map(category => (
                <NavigationMenuLink
                  key={category.handle}
                  render={<Link href={category.href} onClick={onNavigate} />}
                  className='group block w-36 space-y-2 rounded-lg p-0 hover:bg-transparent'
                >
                  <span className='ring-border flex aspect-[4/3] items-center justify-center overflow-hidden rounded-lg bg-white ring-1'>
                    <img
                      src={category.image}
                      alt=''
                      className='max-h-[80%] max-w-[70%] object-contain transition-transform duration-500 group-hover:scale-105'
                    />
                  </span>
                  <span className='flex items-center justify-between text-sm font-semibold'>
                    {category.name}
                    <ArrowRightIcon className='text-muted-foreground size-3.5 transition-transform duration-300 group-hover:translate-x-1' />
                  </span>
                </NavigationMenuLink>
              ))}
            </div>
          </div>
        </div>

        <div className='border-border flex items-center gap-5 border-t pt-4 text-sm'>
          <NavigationMenuLink
            render={<Link href='/shop' onClick={onNavigate} />}
            className='p-0 font-semibold hover:bg-transparent'
          >
            All products
          </NavigationMenuLink>
          <NavigationMenuLink
            render={<Link href='/category' onClick={onNavigate} />}
            className='p-0 font-semibold hover:bg-transparent'
          >
            All collections
          </NavigationMenuLink>
          <span className='text-muted-foreground ms-auto text-xs'>Dispatched from Germany. Batch documentation with every order.</span>
        </div>
      </div>

      <MegamenuPromotionalCard2 />
    </div>
  )
}
