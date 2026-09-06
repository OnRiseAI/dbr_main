import type { ForwardRefExoticComponent, RefAttributes } from 'react'

import {
  HomeIcon,
  ShoppingBagIcon,
  SyringeIcon,
  FlaskConicalIcon,
  CalculatorIcon,
  FileTextIcon,
  MailIcon,
  HandshakeIcon,
  UserIcon,
  PackageIcon,
  type LucideProps
} from 'lucide-react'

export type SearchData = {
  title: string
  data: {
    icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>
    name: string
    href: string
    keywords?: string
    shortcut?: string
    openInNewTab?: boolean
  }[]
}

/** Pages the shop actually has. Products are searched live from the catalogue. */
export const searchData: SearchData[] = [
  {
    title: 'Pages',
    data: [
      { icon: HomeIcon, name: 'Home', href: '/' },
      { icon: ShoppingBagIcon, name: 'All products', href: '/shop', keywords: 'shop catalogue' },
      { icon: SyringeIcon, name: 'Pens', href: '/shop?category=Pens', keywords: 'pre-filled pen' },
      { icon: FlaskConicalIcon, name: 'Vials', href: '/shop?category=Vials', keywords: 'lyophilised vial' },
      { icon: CalculatorIcon, name: 'Units calculator', href: '/#calculator', keywords: 'dose dosage clicks' },
      { icon: FileTextIcon, name: 'How it works', href: '/#how-it-works', keywords: 'pen cartridge inside' },
      { icon: FileTextIcon, name: 'FAQ', href: '/faq', keywords: 'questions shipping payment' },
      { icon: FileTextIcon, name: 'About us', href: '/about' },
      { icon: MailIcon, name: 'Contact', href: '/contact', keywords: 'whatsapp email' },
      { icon: HandshakeIcon, name: 'Become a distributor', href: '/distributors', keywords: 'partner wholesale' },
      { icon: UserIcon, name: 'My account', href: '/account', keywords: 'profile login' },
      { icon: PackageIcon, name: 'My orders', href: '/account/orders', keywords: 'track parcel' }
    ]
  }
]
