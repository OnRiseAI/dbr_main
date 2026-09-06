'use client'

// Next Imports
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Third-party Imports
import { UserIcon, HeartIcon, BoxIcon, MapPinIcon, LogOutIcon } from 'lucide-react'

// Component Imports
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import SignOutButton from '@/components/blocks/sign-out-button'

// Store Imports
import { useUserStore } from '@/store/user-store'

// Hook Imports
import { useFileUpload } from '@/hooks/use-file-upload'

// Utils Imports
import { cn } from '@/lib/utils'

const links = [
  { title: 'Profile', href: '/account', icon: UserIcon },
  { title: 'My Orders', href: '/account/orders', icon: BoxIcon },
  { title: 'My Addresses', href: '/account/addresses', icon: MapPinIcon },
  { title: 'My Wishlist', href: '/account/wishlist', icon: HeartIcon }
]

const AccountSidebar = () => {
  const pathname = usePathname()
  const user = useUserStore(state => state.user)
  const avatarUrl = useUserStore(state => state.avatarUrl)
  const setAvatarUrl = useUserStore(state => state.setAvatarUrl)

  const [, { openFileDialog, getInputProps }] = useFileUpload({
    accept: 'image/*',
    multiple: false,
    onFilesChange: files => setAvatarUrl(files[0]?.preview ?? null)
  })

  return (
    <div className='border-border rounded-xl border p-4'>
      <div className='mb-4 space-y-2'>
        <button type='button' onClick={openFileDialog} className='block cursor-pointer rounded-lg' aria-label='Change profile photo'>
          <Avatar className='size-12 rounded-lg border after:border-0'>
            {avatarUrl ? <AvatarImage src={avatarUrl} alt={user?.name ?? ''} className='rounded-lg' /> : null}
            <AvatarFallback className='rounded-lg font-semibold'>{user?.initials ?? '?'}</AvatarFallback>
          </Avatar>
        </button>
        <input {...getInputProps()} className='hidden' />
        <Button variant='link' size='sm' className='h-auto border-0 p-0 text-xs font-medium hover:no-underline' onClick={openFileDialog}>
          Edit Profile Photo
        </Button>
      </div>
      <h4 className='mb-0.5 truncate text-lg font-semibold'>{user?.name ?? ''}</h4>
      <p className='text-muted-foreground truncate text-base font-light'>{user?.email ?? ''}</p>

      <Separator className='my-4' />

      <div className='space-y-0.5'>
        {links.map(({ title, href, icon: Icon }) => {
          const isActive = pathname === href || (href !== '/account' && pathname.startsWith(`${href}/`))

          return (
            <Link
              key={title}
              href={href}
              className={cn('flex items-center gap-2 rounded-sm px-3 py-2.5 transition-colors', {
                'bg-muted text-primary': isActive,
                'hover:bg-muted': !isActive
              })}
            >
              <Icon className='size-5 shrink-0' />
              <span className='text-base font-medium'>{title}</span>
            </Link>
          )
        })}
        <Separator className='my-4' />
        <SignOutButton className='hover:bg-muted flex w-full items-center gap-2 rounded-sm px-3 py-2.5 text-left transition-colors'>
          <LogOutIcon className='size-5 shrink-0' />
          <span className='text-base font-medium'>Log out</span>
        </SignOutButton>
      </div>
    </div>
  )
}

export default AccountSidebar
