// Type Imports
import type { Order } from '@/types/order'

/**
 * Orders store a snapshot of each line item at purchase time (title, price, image),
 * which is intentionally independent of the live product catalog - historical orders
 * should not change when a catalog product is later edited.
 */
export const db: Order[] = [
  {
    id: 'order-1',
    orderId: 'XYZ-42324568',
    status: 'in-progress',
    date: '24 April 2022',
    title: 'Running Shoes',
    description:
      'Lightweight breathable mesh running shoes with extra cushioned sole for maximum comfort and support during athletic activities. Features advanced moisture-wicking technology.',
    image: '/images/account/watch.webp',
    price: 100,
    originalPrice: 249,
    href: '/product/nike-drifit-tshirt'
  },
  {
    id: 'order-2',
    orderId: 'XYZ-42324569',
    status: 'delivered',
    date: '24 April 2022',
    title: 'AirPods Max',
    description:
      'Premium over-ear headphones with high-fidelity audio and active noise cancellation technology. Includes spatial audio support and seamless Apple ecosystem integration with up to 20 hours battery life.',
    image: '/images/account/headphone.webp',
    price: 100,
    originalPrice: 249,
    href: '/product/apple-airpods-max'
  },
  {
    id: 'order-3',
    orderId: 'XYZ-42324570',
    status: 'cancelled',
    date: '24 April 2022',
    title: 'Casual Shirt',
    description:
      'Premium quality soft cotton blend casual shirt perfect for everyday wear and semi-formal occasions. Features comfortable fit, breathable fabric, and classic design that works with any outfit.',
    image: '/images/account/shirt.webp',
    price: 100,
    originalPrice: 249,
    href: '/product/tagdo-casual-shirt'
  },
  {
    id: 'order-4',
    orderId: 'XYZ-42324572',
    status: 'returned',
    date: '15 March 2022',
    title: 'Smart Watch',
    description:
      'Advanced smartwatch with fitness tracking, heart rate monitor, and GPS navigation. Features waterproof design, long battery life, and seamless smartphone integration for calls, messages, and notifications.',
    image: '/images/product-listing/list-product-1.webp',
    price: 85,
    originalPrice: 199,
    href: '/product/apple-smartwatch'
  }
]
