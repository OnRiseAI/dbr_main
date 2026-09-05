// Type Imports
import type { Order } from '@/types/order'

/**
 * Demo orders for the client area until the account database is wired in. Each order
 * stores a snapshot of the line item (title, price, image), independent of the catalogue.
 */
export const db: Order[] = [
  {
    id: 'order-1',
    orderId: 'DBR-240611',
    status: 'in-progress',
    date: '2 September 2026',
    title: 'Retatrutide pen | 15 mg',
    description: 'Pre-filled pen, 3 ml, 5 mg/ml. Ready to use straight from the fridge, no reconstitution.',
    image: '/images/products/dbr-reta-pen-15mg-upright.png',
    price: 152.95,
    originalPrice: 218.5,
    href: '/product/retatrutide-pen-15mg'
  },
  {
    id: 'order-2',
    orderId: 'DBR-240587',
    status: 'delivered',
    date: '18 August 2026',
    title: 'GHK-Cu pen | 100 mg',
    description: 'Pre-filled pen, 3 ml, 33.3 mg/ml. Copper peptide for skin, tone and collagen support.',
    image: '/images/products/dbr-ghk-cu-pen-100mg-upright.png',
    price: 109.25,
    originalPrice: 109.25,
    href: '/product/ghk-cu-pen-100mg'
  },
  {
    id: 'order-3',
    orderId: 'DBR-240512',
    status: 'delivered',
    date: '30 July 2026',
    title: 'Retatrutide vial | 10 mg',
    description: 'Lyophilised vial, reconstitute with bacteriostatic water and draw with an insulin syringe.',
    image: '/images/products/dbr-reta-vial-10mg.png',
    price: 74.75,
    originalPrice: 74.75,
    href: '/product/retatrutide-vial-10mg'
  },
  {
    id: 'order-4',
    orderId: 'DBR-240433',
    status: 'cancelled',
    date: '12 July 2026',
    title: 'Selank vial | 10 mg',
    description: 'Lyophilised vial for calm and focus routines. Reconstitute before use.',
    image: '/images/products/dbr-selank-vial-10mg.png',
    price: 52.95,
    originalPrice: 52.95,
    href: '/product/selank-vial-10mg'
  }
]
