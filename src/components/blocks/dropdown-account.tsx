// React Imports
import type { ReactElement } from 'react'

// Next Imports
import Link from 'next/link'

// Third-party Imports
import { UserIcon, HeartIcon, PackageIcon, MapPinIcon, GiftIcon, RefreshCwIcon, LogOutIcon } from 'lucide-react'

// Component Imports
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import SignOutButton from '@/components/blocks/sign-out-button'

// Store Imports
import { useUserStore } from '@/store/user-store'

type Props = {
  trigger: ReactElement
  defaultOpen?: boolean
  align?: 'start' | 'center' | 'end'
}

const menuItems = [
  { title: 'My Profile', href: '/account', icon: UserIcon },
  { title: 'My Wishlist', href: '/account/wishlist', icon: HeartIcon },
  { title: 'My Orders', href: '/account/orders', icon: PackageIcon },
  { title: 'My Addresses', href: '/account/addresses', icon: MapPinIcon }
]

const secondaryItems = [
  { title: 'Gift Cards', href: '/account/gift-cards', icon: GiftIcon },
  { title: 'Return & Refunds', href: '/account/return-refunds', icon: RefreshCwIcon }
]

const AccountDropdown = ({ trigger, defaultOpen, align = 'end' }: Props) => {
  const user = useUserStore(state => state.user)

  return (
    <DropdownMenu defaultOpen={defaultOpen}>
      <DropdownMenuTrigger render={trigger} />
      <DropdownMenuContent className='w-72' align={align || 'end'}>
        <DropdownMenuGroup>
          <DropdownMenuLabel className='flex items-center gap-3 px-3 py-2.5 font-normal' render={<Link href='/account' />}>
            <Avatar size='lg' className='rounded-lg'>
              <AvatarFallback className='rounded-lg font-semibold'>{user?.initials ?? '?'}</AvatarFallback>
            </Avatar>
            <div className='flex min-w-0 flex-1 flex-col items-start'>
              <span className='text-foreground truncate font-semibold'>{user?.name ?? 'Your account'}</span>
              <span className='text-muted-foreground truncate text-sm'>{user?.email}</span>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {menuItems.map(item => (
            <DropdownMenuItem key={item.title} render={<Link href={item.href} />} className='gap-2 px-3 py-2.5 text-base'>
              <item.icon className='text-foreground size-5' />
              <span>{item.title}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {secondaryItems.map(item => (
            <DropdownMenuItem key={item.title} render={<Link href={item.href} />} className='gap-2 px-3 py-2.5 text-base'>
              <item.icon className='text-foreground size-5' />
              <span>{item.title}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem
            variant='destructive'
            render={<SignOutButton className='w-full' />}
            className='gap-2 px-3 py-2.5 text-base'
          >
            <LogOutIcon className='size-5' />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AccountDropdown
