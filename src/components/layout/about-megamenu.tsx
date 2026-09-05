'use client'

import Link from 'next/link'
import { ArrowRightIcon } from 'lucide-react'

import { NavigationMenuLink } from '@/components/ui/navigation-menu'

const LINKS = [
  {
    title: 'About us',
    body: 'Who is behind Deep Beauty Research and how the range is made.',
    href: '/about'
  },
  {
    title: 'FAQ',
    body: 'Shipping, what arrives in the box, documentation, pens versus vials.',
    href: '/faq'
  },
  {
    title: 'Contact',
    body: 'Questions about an order or a product. We answer the same day.',
    href: '/contact'
  },
  {
    title: 'Become a distributor',
    body: 'Wholesale and partner terms for clinics, shops and resellers.',
    href: '/distributors'
  }
]

interface AboutMegamenuProps {
  onNavigate?: () => void
}

/** About menu: brand panel on the left, four link cards with context on the right. */
export const AboutMegamenu = ({ onNavigate }: AboutMegamenuProps) => {
  return (
    <div className='flex gap-6 p-6'>
      <div className='bg-muted flex w-72 shrink-0 flex-col justify-between overflow-hidden rounded-lg p-6'>
        <div className='space-y-3'>
          <img src='/images/brands/dbr-logo.svg' alt='Deep Beauty Research' className='h-6 w-auto dark:invert' />
          <p className='text-muted-foreground text-sm'>
            Pre-filled peptide pens and lyophilised vials. Every batch tested and documented, dispatched from Germany
            with tracking.
          </p>
        </div>
        <div className='flex h-40 items-end justify-center'>
          <img src='/images/products/dbr-reta-pen-15mg-upright.png' alt='' className='h-full object-contain' />
        </div>
      </div>

      <div className='grid w-[30rem] grid-cols-2 gap-3'>
        {LINKS.map(link => (
          <NavigationMenuLink
            key={link.href}
            render={<Link href={link.href} onClick={onNavigate} />}
            className='group hover:bg-muted flex h-full flex-col justify-between rounded-lg border p-4 transition-colors'
          >
            <span className='space-y-1'>
              <span className='block text-sm font-semibold'>{link.title}</span>
              <span className='text-muted-foreground block text-xs leading-relaxed'>{link.body}</span>
            </span>
            <ArrowRightIcon className='text-muted-foreground mt-3 size-4 self-start transition-transform duration-300 group-hover:translate-x-1' />
          </NavigationMenuLink>
        ))}
      </div>
    </div>
  )
}
