import type { ForwardRefExoticComponent, RefAttributes } from 'react'

import {
  HomeIcon,
  ShoppingCartIcon,
  UserIcon,
  StarIcon,
  ClipboardListIcon,
  SettingsIcon,
  ShoppingBagIcon,
  Grid3x3Icon,
  PackageIcon,
  CreditCardIcon,
  GiftIcon,
  MapPinIcon,
  BellIcon,
  RotateCcwIcon,
  HelpCircleIcon,
  FileTextIcon,
  PhoneIcon,
  MessageSquareIcon,
  CheckCircleIcon,
  BarChart3Icon,
  LogInIcon,
  UserPlusIcon,
  KeyRoundIcon,
  type LucideProps
} from 'lucide-react'

export type SearchData = {
  title: string
  data: {
    icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>
    name: string
    href: string
    shortcut?: string
    openInNewTab?: boolean
  }[]
}

export const searchData: SearchData[] = [
  {
    title: 'Shopping',
    data: [
      {
        icon: HomeIcon,
        name: 'Home',
        href: '/'
      },
      {
        icon: ShoppingBagIcon,
        name: 'Shop',
        href: '/shop'
      },
      {
        icon: Grid3x3Icon,
        name: 'Categories',
        href: '/category'
      },
      {
        icon: ShoppingCartIcon,
        name: 'Cart',
        href: '/checkout'
      },
      {
        icon: CreditCardIcon,
        name: 'Checkout',
        href: '/checkout'
      },
      {
        icon: BarChart3Icon,
        name: 'Compare Products',
        href: '/compare'
      }
    ]
  },
  {
    title: 'Account',
    data: [
      {
        icon: UserIcon,
        name: 'Account',
        href: '/account'
      },
      {
        icon: ClipboardListIcon,
        name: 'Orders',
        href: '/account/orders'
      },
      {
        icon: PackageIcon,
        name: 'Order Details',
        href: '/account/orders/details'
      },
      {
        icon: StarIcon,
        name: 'Wishlist',
        href: '/account/wishlist'
      },
      {
        icon: MapPinIcon,
        name: 'Addresses',
        href: '/account/addresses'
      },
      {
        icon: CreditCardIcon,
        name: 'Payments',
        href: '/account/payments'
      },
      {
        icon: GiftIcon,
        name: 'Gift Cards',
        href: '/account/gift-cards'
      },
      {
        icon: RotateCcwIcon,
        name: 'Returns & Exchanges',
        href: '/account/exchange-return'
      },
      {
        icon: CheckCircleIcon,
        name: 'Return Refunds',
        href: '/account/return-refunds'
      },
      {
        icon: BellIcon,
        name: 'Newsletter',
        href: '/account/email-newsletter'
      },
      {
        icon: HelpCircleIcon,
        name: 'Support Tickets',
        href: '/account/support-ticket'
      },
      {
        icon: PackageIcon,
        name: 'Track Order',
        href: '/account/track-order'
      },
      {
        icon: CreditCardIcon,
        name: 'Wallet',
        href: '/account/wallet'
      }
    ]
  },
  {
    title: 'Content & Info',
    data: [
      {
        icon: HelpCircleIcon,
        name: 'FAQ',
        href: '/faq'
      },
      {
        icon: SettingsIcon,
        name: 'Help Center',
        href: '/help'
      },
      {
        icon: FileTextIcon,
        name: 'Privacy Policy',
        href: '/privacy-policy'
      },
      {
        icon: FileTextIcon,
        name: 'Return Policy',
        href: '/return-policy'
      },
      {
        icon: PhoneIcon,
        name: 'Contact Us',
        href: '/contact'
      }
    ]
  },
  {
    title: 'Product & Review',
    data: [
      {
        icon: MessageSquareIcon,
        name: 'Write Review',
        href: '/write-review'
      }
    ]
  },
  {
    title: 'Authentication',
    data: [
      {
        icon: LogInIcon,
        name: 'Login',
        href: '/login'
      },
      {
        icon: UserPlusIcon,
        name: 'Register',
        href: '/register'
      },
      {
        icon: KeyRoundIcon,
        name: 'Forgot Password',
        href: '/forgot-password'
      },
      {
        icon: KeyRoundIcon,
        name: 'Reset Password',
        href: '/reset-password'
      },
      {
        icon: KeyRoundIcon,
        name: 'Two Factor Authentication',
        href: '/two-factor-auth'
      },
      {
        icon: FileTextIcon,
        name: 'Verify Email',
        href: '/verify-email'
      }
    ]
  }
]
