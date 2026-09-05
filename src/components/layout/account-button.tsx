'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import AccountDropdown from '@/components/blocks/dropdown-account'
import { demoUser } from '@/fake-db/user'
import { useUserStore } from '@/store/user-store'

/** Header account control: avatar that opens the account menu. Runs on the demo user until auth is wired. */
const AccountButton = () => {
  const avatarUrl = useUserStore(state => state.avatarUrl)

  return (
    <AccountDropdown
      trigger={
        <Button variant='ghost' size='icon-lg' className='rounded-lg p-0' aria-label='Your account'>
          <Avatar className='size-9 after:rounded-lg'>
            <AvatarImage src={avatarUrl ?? demoUser.avatar} alt={demoUser.name} className='rounded-lg' />
            <AvatarFallback>{demoUser.initials}</AvatarFallback>
          </Avatar>
        </Button>
      }
    />
  )
}

export default AccountButton
