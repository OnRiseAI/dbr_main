import type { ForwardRefExoticComponent, RefAttributes } from 'react'

import { HomeIcon, ShoppingBagIcon, Grid3x3Icon, PackageIcon, type LucideProps } from 'lucide-react'

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
    title: 'Pages',
    data: [
      {
        icon: HomeIcon,
        name: 'Main Page',
        href: '/'
      },
      {
        icon: ShoppingBagIcon,
        name: 'Product Listing With Sidebar',
        href: '/shop'
      },
      {
        icon: Grid3x3Icon,
        name: 'Category Page',
        href: '/category'
      },
      {
        icon: PackageIcon,
        name: 'Product Detail Carousel View',
        href: '/product/boat-airdopes-138'
      }
    ]
  }
]
