'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'
import { UserIcon } from 'lucide-react'

import { signOut } from '@/app/actions/account'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { createClient } from '@/lib/supabase/client'

const LINKS = [
  { title: 'Profile', href: '/account' },
  { title: 'Orders', href: '/account/orders' },
  { title: 'Addresses', href: '/account/addresses' },
  { title: 'Wishlist', href: '/account/wishlist' },
  { title: 'Email preferences', href: '/account/email' }
]

/** Header account control. Signed out: a link to sign in. Signed in: the account menu. */
const AccountButton = () => {
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null))

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => setEmail(session?.user?.email ?? null))

    return () => subscription.unsubscribe()
  }, [])

  if (!email) {
    return (
      <Button variant='ghost' size='icon-lg' render={<Link href='/login' />} nativeButton={false}>
        <UserIcon className='size-5.5' />
        <span className='sr-only'>Sign in</span>
      </Button>
    )
  }

  const initial = email.charAt(0).toUpperCase()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant='ghost' size='icon-lg' className='bg-foreground text-background hover:bg-foreground/90 hover:text-background rounded-full text-sm font-semibold' />
        }
      >
        {initial}
        <span className='sr-only'>Account</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='min-w-56'>
        <div className='px-2 py-1.5'>
          <p className='text-muted-foreground text-xs font-semibold tracking-[0.14em] uppercase'>Signed in</p>
          <p className='truncate text-sm font-medium'>{email}</p>
        </div>
        <DropdownMenuSeparator />
        {LINKS.map(link => (
          <DropdownMenuItem key={link.href} render={<Link href={link.href} />}>
            {link.title}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AccountButton
