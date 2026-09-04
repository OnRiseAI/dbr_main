import { ShoppingBagIcon, BoxIcon, FileIcon, BadgeDollarSignIcon } from 'lucide-react'

import type { NavigationSection } from '@/components/blocks/menu-sheet'
import { db as categories } from '@/fake-db/categories'

const iconClassName = 'size-4 shrink-0'

const collectionItems = categories.map(category => ({
  title: category.name,
  href: category.href
}))

export const mainNavigation: NavigationSection[] = [
  {
    title: 'Pages',
    icon: <FileIcon className={iconClassName} />,
    columns: [
      {
        groups: [
          {
            title: 'Store',
            items: [
              { title: 'Home', href: '/' },
              { title: 'All products', href: '/shop' },
              { title: 'Collections', href: '/category' }
            ]
          },
          {
            title: 'Info',
            items: [
              { title: 'About us', href: '/pages/about-us' },
              { title: 'FAQ', href: '/pages/faq' },
              { title: 'Contacts', href: '/pages/contacts' },
              { title: 'Become a distributor', href: '/pages/become-our-distributor' },
              { title: 'MSSPT technology', href: '/pages/molecular-structure-stabilization-process-technology-msspt' }
            ]
          }
        ]
      }
    ]
  },
  {
    title: 'Shops',
    icon: <ShoppingBagIcon className={iconClassName} />,
    columns: [
      {
        groups: [
          {
            title: 'Collections',
            items: collectionItems
          }
        ]
      }
    ]
  },
  {
    title: "Today's Deal",
    icon: <BadgeDollarSignIcon className={iconClassName} />,
    href: '/shop?category=Weight%20Management'
  },
  {
    title: 'New Arrivals',
    icon: <BoxIcon className={iconClassName} />,
    href: '/shop?category=Vials'
  }
]
