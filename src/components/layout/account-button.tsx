'use client'

// Next Imports
import Link from 'next/link'

// Third-party Imports
import { UserIcon } from 'lucide-react'

// Component Imports
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import AccountDropdown from '@/components/blocks/dropdown-account'

// Store Imports
import { useUserStore } from '@/store/user-store'

/** Header account control: the account menu when signed in, a link to sign in otherwise. */
const AccountButton = () => {
  const user = useUserStore(state => state.user)
  const avatarUrl = useUserStore(state => state.avatarUrl)

  if (!user) {
    return (
      <Button variant='ghost' size='icon-lg' className='rounded-lg' render={<Link href='/login' />} nativeButton={false}>
        <UserIcon className='size-5' />
        <span className='sr-only'>Sign in</span>
      </Button>
    )
  }

  return (
    <AccountDropdown
      trigger={
        <Button variant='ghost' size='icon-lg' className='rounded-lg p-0' aria-label='Your account'>
          <Avatar className='size-9 after:rounded-lg'>
            {avatarUrl ? <AvatarImage src={avatarUrl} alt={user.name} className='rounded-lg' /> : null}
            <AvatarFallback className='rounded-lg text-xs font-semibold'>{user.initials}</AvatarFallback>
          </Avatar>
        </Button>
      }
    />
  )
}

export default AccountButton
