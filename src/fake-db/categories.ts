// Type Imports
import type { Category } from '@/types/product'

/**
 * Storefront category taxonomy. Each `name` must exactly match the `Product.category`
 * value products are tagged with in `products.ts` - the shop page category filter and
 * these category cards both key off that exact string.
 *
 * The first six are ordered and imaged to match the reference design exactly
 * (earbuds/cosmetics/watch/vase/mixer/scooter icons); Clothing and Mobile are
 * appended after so every existing category is still browsable.
 */
export const db: Category[] = [
  { name: 'Electronics', image: '/images/landing-page/category-01.webp', href: '/shop?category=Electronics' },
  {
    name: 'Beauty & Skincare',
    image: '/images/landing-page/category-02.webp',
    href: '/shop?category=Beauty+%26+Skincare'
  },
  { name: 'Watches', image: '/images/landing-page/category-03.webp', href: '/shop?category=Watches' },
  { name: 'Home Decor', image: '/images/landing-page/category-04.webp', href: '/shop?category=Home+Decor' },
  {
    name: 'Kitchen Appliances',
    image: '/images/landing-page/category-05.webp',
    href: '/shop?category=Kitchen+Appliances'
  },
  { name: 'Toys & Games', image: '/images/landing-page/category-06.webp', href: '/shop?category=Toys+%26+Games' },
  { name: 'Clothing', image: '/images/category-listing/t-shirt.webp', href: '/shop?category=Clothing' },
  { name: 'Mobile', image: '/images/product-details/small-side-3.webp', href: '/shop?category=Mobile' }
]
