import type { NavigationSection } from '@/components/blocks/menu-sheet'
import { db as categories } from '@/fake-db/categories'

const byHandle = (handles: string[]) =>
  handles
    .map(handle => categories.find(category => category.handle === handle))
    .filter((category): category is NonNullable<typeof category> => Boolean(category))
    .map(category => ({ title: category.name, href: category.href }))

/** Five short items so the bar stays on one line beside the wordmark. No icons. */
export const mainNavigation: NavigationSection[] = [
  {
    title: 'Shop',
    columns: [
      {
        groups: [
          {
            title: 'By goal',
            items: byHandle(['weight-management', 'skin-glow', 'tanning', 'calm-focus'])
          }
        ]
      },
      {
        groups: [
          {
            title: 'By format',
            items: byHandle(['pens', 'vials'])
          },
          {
            title: 'Everything',
            items: [
              { title: 'All products', href: '/shop' },
              { title: 'All collections', href: '/category' }
            ]
          }
        ]
      }
    ]
  },
  {
    title: 'Pens',
    href: '/shop?category=Pens'
  },
  {
    title: 'Vials',
    href: '/shop?category=Vials'
  },
  {
    title: 'How it works',
    href: '/#how-it-works'
  },
  {
    title: 'Calculator',
    href: '/retatrutide-calculator'
  },
  {
    title: 'About',
    groups: [
      {
        items: [
          { title: 'About us', href: '/pages/about-us' },
          { title: 'FAQ', href: '/pages/faq' },
          { title: 'Contact', href: '/pages/contacts' },
          { title: 'Become a distributor', href: '/pages/become-our-distributor' }
        ]
      }
    ]
  }
]
