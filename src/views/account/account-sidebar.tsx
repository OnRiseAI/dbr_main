'use client'

// Next Imports
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Third-party Imports
import {
  UserIcon,
  HeartIcon,
  BoxIcon,
  ListTodoIcon,
  MapPinIcon,
  WalletIcon,
  MailsIcon,
  DollarSignIcon,
  GiftIcon,
  ArrowRightLeftIcon,
  TicketIcon,
  LogOutIcon
} from 'lucide-react'

// Component Imports
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

// Store Imports
import { useUserStore } from '@/store/user-store'

// Hook Imports
import { useFileUpload } from '@/hooks/use-file-upload'

// Utils Imports
import { cn } from '@/lib/utils'

const mainLinks = [
  { title: 'Profile', href: '/account', icon: UserIcon },
  { title: 'My Wishlist', href: '/account/wishlist', icon: HeartIcon },
  { title: 'My Orders', href: '/account/orders', icon: BoxIcon },
  { title: 'Order Details', href: '/account/orders/details', icon: ListTodoIcon },
  { title: 'My Addresses', href: '/account/addresses', icon: MapPinIcon },
  { title: 'My Wallet', href: '/account/wallet', icon: WalletIcon }
]

const secondaryLinks = [
  { title: 'Payment', href: '/account/payments', icon: DollarSignIcon },
  { title: 'Gift Cards', href: '/account/gift-cards', icon: GiftIcon },
  { title: 'Returns & Refund', href: '/account/return-refunds', icon: ArrowRightLeftIcon },
  { title: 'Email Newsletter', href: '/account/email-newsletter', icon: MailsIcon },
  { title: 'Support Tickets', href: '/account/support-ticket', icon: TicketIcon }
]

const AccountSidebar = () => {
  const pathname = usePathname()

  const avatarUrl = useUserStore(state => state.avatarUrl)
  const setAvatarUrl = useUserStore(state => state.setAvatarUrl)

  const [, { openFileDialog, getInputProps }] = useFileUpload({
    accept: 'image/*',
    multiple: false,
    onFilesChange: files => setAvatarUrl(files[0]?.preview ?? null)
  })

  const renderLink = ({ title, href, icon: Icon }: (typeof mainLinks)[number]) => {
    const isActive = pathname === href

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
  }

  return (
    <div className='border-border rounded-xl border p-4'>
      <div className='mb-4 space-y-2'>
        <button
          type='button'
          onClick={openFileDialog}
          className='block cursor-pointer rounded-lg'
          aria-label='Change profile photo'
        >
          <Avatar className='size-12 rounded-lg border after:border-0'>
            <AvatarImage
              src={avatarUrl ?? '/images/account/avatar.webp'}
              alt='Cristofer Torff'
              className='rounded-lg'
            />
            <AvatarFallback>MJ</AvatarFallback>
          </Avatar>
        </button>
        <input {...getInputProps()} className='hidden' />
        <Button
          variant='link'
          size='sm'
          className='h-auto border-0 p-0 text-xs font-medium hover:no-underline'
          onClick={openFileDialog}
        >
          Edit Profile Photo
        </Button>
      </div>
      <h4 className='mb-0.5 text-lg font-semibold'>Cristofer Torff</h4>
      <p className='text-muted-foreground text-base font-light'>Cri@example.com</p>

      <Separator className='my-4' />

      <div className='space-y-0.5'>
        {mainLinks.map(renderLink)}
        <Separator className='my-2' />
        {secondaryLinks.map(renderLink)}
        <Separator className='my-4' />
        <Link href='/login' className='hover:bg-muted flex items-center gap-2 rounded-sm px-3 py-2.5 transition-colors'>
          <LogOutIcon className='size-5 shrink-0' />
          <span className='text-base font-medium'>Logout</span>
        </Link>
      </div>
    </div>
  )
}

export default AccountSidebar
