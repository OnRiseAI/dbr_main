// Third-party Imports
import {
  PackageIcon,
  UserIcon,
  NotebookIcon,
  CircleDollarSignIcon,
  TruckIcon,
  ArrowRightLeftIcon,
  AwardIcon,
  PhoneIcon
} from 'lucide-react'

// Type Imports
import type { HelpTopic } from '@/types/help'

export const db: HelpTopic[] = [
  {
    icon: PackageIcon,
    title: 'Shipping',
    description: 'Track orders, delivery timelines & shipping rates.',
    href: '/faq?category=shipping'
  },
  {
    icon: UserIcon,
    title: 'My Account',
    description: 'Update profile details, passwords & preferences.',
    href: '/faq?category=account'
  },
  {
    icon: NotebookIcon,
    title: 'Orders',
    description: 'Check order status, history & manage returns.',
    href: '/faq?category=orders'
  },
  {
    icon: CircleDollarSignIcon,
    title: 'Payments',
    description: 'Learn about payment methods, refunds & security.',
    href: '/faq?category=payments'
  },
  {
    icon: TruckIcon,
    title: 'Tracking and Delivery',
    description: 'Get tracking info & delivery updates.',
    href: '/faq?category=tracking'
  },
  {
    icon: ArrowRightLeftIcon,
    title: 'Returns & Exchanges',
    description: 'Start a return, exchange items & read our policy.',
    href: '/faq?category=returns'
  },
  {
    icon: AwardIcon,
    title: 'Warranty & Repairs',
    description: 'Claim warranty or request product servicing.',
    href: '/faq?category=warranty'
  },
  {
    icon: PhoneIcon,
    title: 'Contact Us',
    description: 'Find ways to reach our support team directly.',
    href: '/faq?category=contact'
  }
]
