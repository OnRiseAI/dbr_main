// React Imports
import type { ReactElement } from 'react'

// Next Imports
import Link from 'next/link'

import { UserIcon, HeartIcon, PackageIcon, GiftIcon, RefreshCwIcon, LogOutIcon } from 'lucide-react'

import { demoUser } from '@/fake-db/user'

// Third-party Imports

// Component Imports
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

type Props = {
  trigger: ReactElement
  defaultOpen?: boolean
  align?: 'start' | 'center' | 'end'
}

const menuItems = [
  { title: 'My Profile', href: '/account', icon: UserIcon },
  { title: 'My Wishlist', href: '/account/wishlist', icon: HeartIcon },
  { title: 'My Orders', href: '/account/orders', icon: PackageIcon }
]

const secondaryItems = [
  { title: 'Gift Cards', href: '/account/gift-cards', icon: GiftIcon },
  { title: 'Return & Refunds', href: '/account/return-refunds', icon: RefreshCwIcon }
]

const AccountDropdown = ({ trigger, defaultOpen, align = 'end' }: Props) => {
  return (
    <DropdownMenu defaultOpen={defaultOpen}>
      <DropdownMenuTrigger render={trigger} />
      <DropdownMenuContent className='w-72' align={align || 'end'}>
        <DropdownMenuGroup>
          <DropdownMenuLabel
            className='flex items-center gap-3 px-3 py-2.5 font-normal'
            render={<Link href='/account' />}
          >
            <Avatar size='lg' className='rounded-lg'>
              <AvatarImage src={demoUser.avatar} alt={demoUser.name} className='rounded-lg' />
              <AvatarFallback>{demoUser.initials}</AvatarFallback>
            </Avatar>
            <div className='flex flex-1 flex-col items-start'>
              <span className='text-foreground font-semibold'>{demoUser.name}</span>
              <span className='text-muted-foreground text-sm'>{demoUser.email}</span>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {menuItems.map(item => (
            <DropdownMenuItem
              key={item.title}
              render={<Link href={item.href} />}
              className='gap-2 px-3 py-2.5 text-base'
            >
              <item.icon className='text-foreground size-5' />
              <span>{item.title}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {secondaryItems.map(item => (
            <DropdownMenuItem
              key={item.title}
              render={<Link href={item.href} />}
              className='gap-2 px-3 py-2.5 text-base'
            >
              <item.icon className='text-foreground size-5' />
              <span>{item.title}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem
            variant='destructive'
            render={<Link href='/login' />}
            className='gap-2 px-3 py-2.5 text-base'
          >
            <LogOutIcon className='size-5' />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AccountDropdown
