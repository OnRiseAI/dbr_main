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
            title: 'Main Page',
            items: [{ title: 'Home Page', href: '/' }]
          },
          {
            title: 'Hero layout',
            items: [
              { title: 'Hero layout 1', href: '/home/hero-layout-01' },
              { title: 'Hero layout 2', href: '/home/hero-layout-02' }
            ]
          },
          {
            title: 'Product Listing',
            items: [
              { title: 'Product Listing With Sidebar', href: '/shop' },
              { title: 'Product Listing With Banner', href: '/product-list-with-banner' }
            ]
          },
          {
            title: 'Category Page',
            items: [{ title: 'Category Listing', href: '/category' }]
          }
        ]
      },
      {
        groups: [
          {
            title: 'Authentication',
            items: [
              { title: 'Login', href: '/login' },
              { title: 'Register', href: '/register' },
              { title: 'Forgot Password', href: '/forgot-password' },
              { title: 'Reset Password', href: '/reset-password' },
              { title: 'Two Factor Authentication', href: '/two-factor-auth' },
              { title: 'Verify Email', href: '/verify-email' }
            ]
          },
          {
            title: 'Product Details',
            items: [
              { title: 'Product Detail Carousel view', href: '/product/boat-airdopes-138' },
              { title: 'Product Detail Gallery View', href: '/product-detail-with-gallery-view' }
            ]
          }
        ]
      },
      {
        groups: [
          {
            title: 'Profile Pages',
            items: [
              { title: 'My Account', href: '/account' },
              { title: 'My Wishlist', href: '/account/wishlist' },
              { title: 'My Orders', href: '/account/orders' },
              { title: 'Order Details', href: '/account/orders/details' },
              { title: 'Track Order', href: '/account/track-order' },
              { title: 'My Addresses', href: '/account/addresses' },
              { title: 'Payment', href: '/account/payments' },
              { title: 'Wallet', href: '/account/wallet' },
              { title: 'Giftcards', href: '/account/gift-cards' },
              { title: 'Return & Refunds', href: '/account/return-refunds' },
              { title: 'Exchange & Returns', href: '/account/exchange-return' },
              { title: 'Email Newsletter', href: '/account/email-newsletter' },
              { title: 'Support Ticket', href: '/account/support-ticket' }
            ]
          }
        ]
      },
      {
        groups: [
          {
            title: 'Checkout Pages',
            items: [
              { title: 'Cart Page', href: '/checkout' },
              { title: 'Address Page', href: '/checkout' },
              { title: 'Payment Page', href: '/checkout' },
              { title: 'Empty Cart', href: '/checkout' }
            ]
          },
          {
            title: 'Other Pages',
            items: [{ title: 'Compare Products', href: '/compare' }]
          },
          {
            title: 'Miscellaneous',
            items: [
              { title: 'FAQ', href: '/faq' },
              { title: 'Help', href: '/help' },
              { title: 'Write Review', href: '/write-review' },
              { title: 'Privacy Policy', href: '/privacy-policy' },
              { title: 'Return Policy', href: '/return-policy' }
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
