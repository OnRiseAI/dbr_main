'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { signOut } from '@/app/actions/account'
import { cn } from '@/lib/utils'

const LINKS = [
  { title: 'Profile', href: '/account' },
  { title: 'Orders', href: '/account/orders' },
  { title: 'Addresses', href: '/account/addresses' },
  { title: 'Wishlist', href: '/account/wishlist' },
  { title: 'Email preferences', href: '/account/email' }
]

type Props = {
  name: string
  email: string
}

/** Six things, all real. Nothing that lacks a backend. */
const AccountNav = ({ name, email }: Props) => {
  const pathname = usePathname()

  return (
    <aside className='space-y-6 lg:sticky lg:top-(--header-height)'>
      <div className='space-y-0.5 border-b pb-6'>
        <p className='text-xs font-semibold tracking-[0.14em] uppercase'>Signed in as</p>
        <p className='truncate font-semibold'>{name || email}</p>
        {name ? <p className='text-muted-foreground truncate text-sm'>{email}</p> : null}
      </div>
      <nav className='flex gap-1 overflow-x-auto lg:flex-col'>
        {LINKS.map(link => {
          const active = link.href === '/account' ? pathname === '/account' : pathname.startsWith(link.href)

          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'shrink-0 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                active ? 'bg-muted' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {link.title}
            </Link>
          )
        })}
      </nav>
      <form action={signOut} className='border-t pt-6'>
        <button type='submit' className='text-muted-foreground hover:text-foreground px-3 text-sm font-medium'>
          Sign out
        </button>
      </form>
    </aside>
  )
}

export default AccountNav
