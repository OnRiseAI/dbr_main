import { ShoppingBagIcon, BoxIcon, FileIcon, BadgeDollarSignIcon } from 'lucide-react'

import type { NavigationSection } from '@/components/blocks/menu-sheet'

const iconClassName = 'size-4 shrink-0'

export const mainNavigation: NavigationSection[] = [
  {
    title: 'Pages',
    icon: <FileIcon className={iconClassName} />,
    columns: [
      {
        groups: [
          {
            title: 'Pages',
            items: [
              { title: 'Main Page', href: '/' },
              { title: 'Product Listing With Sidebar', href: '/shop' },
              { title: 'Category Page', href: '/category' },
              { title: 'Product Detail Carousel View', href: '/product/boat-airdopes-138' }
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
            title: 'Topwear',
            items: [
              { title: 'Casual Shirts', href: '/shop?category=Clothing' },
              { title: 'T-Shirts', href: '/shop?category=Clothing' },
              { title: 'Formal Shirts', href: '/shop?category=Clothing' },
              { title: 'Jackets', href: '/shop?category=Clothing' },
              { title: 'Rain Jackets', href: '/shop?category=Clothing' },
              { title: 'Blazers & Coats', href: '/shop?category=Clothing' },
              { title: 'Sweatshirts', href: '/shop?category=Clothing' },
              { title: 'Suits', href: '/shop?category=Clothing' }
            ]
          },
          {
            title: 'Festive Wear',
            items: [
              { title: 'Kurtas & Kurta Sets', href: '/shop?category=Clothing' },
              { title: 'Shervanis', href: '/shop?category=Clothing' },
              { title: 'Nehru Jackets', href: '/shop?category=Clothing' }
            ]
          }
        ]
      },
      {
        groups: [
          {
            title: 'Bottomwear',
            items: [
              { title: 'Jeans', href: '/shop?category=Clothing' },
              { title: 'Casual Trousers', href: '/shop?category=Clothing' },
              { title: 'Formal Trousers', href: '/shop?category=Clothing' },
              { title: 'Shorts', href: '/shop?category=Clothing' },
              { title: 'Track Pants', href: '/shop?category=Clothing' }
            ]
          },
          {
            title: 'Gadget',
            items: [
              { title: 'Smart Wearables', href: '/shop?category=Electronics' },
              { title: 'Headphones', href: '/shop?category=Electronics' },
              { title: 'Speakers', href: '/shop?category=Electronics' },
              { title: 'Fitness Gadgets', href: '/shop?category=Electronics' }
            ]
          },
          {
            title: 'Sunglasses & Frames',
            items: [],
            href: '/shop?category=Watches'
          },
          {
            title: 'Watches',
            items: [],
            href: '/shop?category=Watches'
          }
        ]
      },
      {
        groups: [
          {
            title: 'Personal Care',
            items: [
              { title: 'Cleansers', href: '/shop?category=Beauty+%26+Skincare' },
              { title: 'Sunscreen', href: '/shop?category=Beauty+%26+Skincare' },
              { title: 'Shampoo', href: '/shop?category=Beauty+%26+Skincare' },
              { title: 'Face Masks', href: '/shop?category=Beauty+%26+Skincare' },
              { title: 'Perfume/Cologne', href: '/shop?category=Beauty+%26+Skincare' },
              { title: 'Makeup Remover', href: '/shop?category=Beauty+%26+Skincare' }
            ]
          },
          {
            title: 'Toys & Games',
            items: [
              { title: 'Action Figures', href: '/shop?category=Toys+%26+Games' },
              { title: 'Board Games', href: '/shop?category=Toys+%26+Games' },
              { title: 'Outdoor Toys', href: '/shop?category=Toys+%26+Games' }
            ]
          }
        ]
      }
    ]
  },
  {
    title: "Today's Deal",
    icon: <BadgeDollarSignIcon className={iconClassName} />,
    columns: [
      {
        groups: [
          {
            title: 'Topwear',
            items: [
              { title: 'Casual Shirts', href: '/shop?category=Clothing' },
              { title: 'T-Shirts', href: '/shop?category=Clothing' },
              { title: 'Formal Shirts', href: '/shop?category=Clothing' },
              { title: 'Jackets', href: '/shop?category=Clothing' },
              { title: 'Rain Jackets', href: '/shop?category=Clothing' },
              { title: 'Blazers & Coats', href: '/shop?category=Clothing' },
              { title: 'Sweatshirts', href: '/shop?category=Clothing' },
              { title: 'Suits', href: '/shop?category=Clothing' }
            ]
          },
          {
            title: 'Festive Wear',
            items: [
              { title: 'Kurtas & Kurta Sets', href: '/shop?category=Clothing' },
              { title: 'Shervanis', href: '/shop?category=Clothing' },
              { title: 'Nehru Jackets', href: '/shop?category=Clothing' }
            ]
          }
        ]
      },
      {
        groups: [
          {
            title: 'Bottomwear',
            items: [
              { title: 'Jeans', href: '/shop?category=Clothing' },
              { title: 'Casual Trousers', href: '/shop?category=Clothing' },
              { title: 'Formal Trousers', href: '/shop?category=Clothing' },
              { title: 'Shorts', href: '/shop?category=Clothing' },
              { title: 'Track Pants', href: '/shop?category=Clothing' }
            ]
          },
          {
            title: 'Gadget',
            items: [
              { title: 'Smart Wearables', href: '/shop?category=Electronics' },
              { title: 'Headphones', href: '/shop?category=Electronics' },
              { title: 'Speakers', href: '/shop?category=Electronics' },
              { title: 'Fitness Gadgets', href: '/shop?category=Electronics' }
            ]
          },
          {
            title: 'Sunglasses & Frames',
            items: [],
            href: '/shop?category=Watches'
          },
          {
            title: 'Watches',
            items: [],
            href: '/shop?category=Watches'
          }
        ]
      },
      {
        groups: [
          {
            title: 'Personal Care',
            items: [
              { title: 'Cleansers', href: '/shop?category=Beauty+%26+Skincare' },
              { title: 'Sunscreen', href: '/shop?category=Beauty+%26+Skincare' },
              { title: 'Shampoo', href: '/shop?category=Beauty+%26+Skincare' },
              { title: 'Face Masks', href: '/shop?category=Beauty+%26+Skincare' },
              { title: 'Perfume/Cologne', href: '/shop?category=Beauty+%26+Skincare' },
              { title: 'Makeup Remover', href: '/shop?category=Beauty+%26+Skincare' }
            ]
          },
          {
            title: 'Toys & Games',
            items: [
              { title: 'Action Figures', href: '/shop?category=Toys+%26+Games' },
              { title: 'Board Games', href: '/shop?category=Toys+%26+Games' },
              { title: 'Outdoor Toys', href: '/shop?category=Toys+%26+Games' }
            ]
          }
        ]
      }
    ]
  },
  {
    title: 'New Arrivals',
    icon: <BoxIcon className={iconClassName} />,
    columns: [
      {
        groups: [
          {
            title: 'Topwear',
            items: [
              { title: 'Casual Shirts', href: '/shop?category=Clothing' },
              { title: 'T-Shirts', href: '/shop?category=Clothing' },
              { title: 'Formal Shirts', href: '/shop?category=Clothing' },
              { title: 'Jackets', href: '/shop?category=Clothing' },
              { title: 'Rain Jackets', href: '/shop?category=Clothing' },
              { title: 'Blazers & Coats', href: '/shop?category=Clothing' },
              { title: 'Sweatshirts', href: '/shop?category=Clothing' },
              { title: 'Suits', href: '/shop?category=Clothing' }
            ]
          },
          {
            title: 'Festive Wear',
            items: [
              { title: 'Kurtas & Kurta Sets', href: '/shop?category=Clothing' },
              { title: 'Shervanis', href: '/shop?category=Clothing' },
              { title: 'Nehru Jackets', href: '/shop?category=Clothing' }
            ]
          }
        ]
      },
      {
        groups: [
          {
            title: 'Bottomwear',
            items: [
              { title: 'Jeans', href: '/shop?category=Clothing' },
              { title: 'Casual Trousers', href: '/shop?category=Clothing' },
              { title: 'Formal Trousers', href: '/shop?category=Clothing' },
              { title: 'Shorts', href: '/shop?category=Clothing' },
              { title: 'Track Pants', href: '/shop?category=Clothing' }
            ]
          },
          {
            title: 'Gadget',
            items: [
              { title: 'Smart Wearables', href: '/shop?category=Electronics' },
              { title: 'Headphones', href: '/shop?category=Electronics' },
              { title: 'Speakers', href: '/shop?category=Electronics' },
              { title: 'Fitness Gadgets', href: '/shop?category=Electronics' }
            ]
          },
          {
            title: 'Sunglasses & Frames',
            items: [],
            href: '/shop?category=Watches'
          },
          {
            title: 'Watches',
            items: [],
            href: '/shop?category=Watches'
          }
        ]
      },
      {
        groups: [
          {
            title: 'Personal Care',
            items: [
              { title: 'Cleansers', href: '/shop?category=Beauty+%26+Skincare' },
              { title: 'Sunscreen', href: '/shop?category=Beauty+%26+Skincare' },
              { title: 'Shampoo', href: '/shop?category=Beauty+%26+Skincare' },
              { title: 'Face Masks', href: '/shop?category=Beauty+%26+Skincare' },
              { title: 'Perfume/Cologne', href: '/shop?category=Beauty+%26+Skincare' },
              { title: 'Makeup Remover', href: '/shop?category=Beauty+%26+Skincare' }
            ]
          },
          {
            title: 'Toys & Games',
            items: [
              { title: 'Action Figures', href: '/shop?category=Toys+%26+Games' },
              { title: 'Board Games', href: '/shop?category=Toys+%26+Games' },
              { title: 'Outdoor Toys', href: '/shop?category=Toys+%26+Games' }
            ]
          }
        ]
      }
    ]
  }
]
