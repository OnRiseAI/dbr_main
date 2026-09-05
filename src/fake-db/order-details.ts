// Type Imports
import type { Order, OrderStatus, OrderDetailGroup } from '@/types/order'

// Demo customer until the account database is wired in. Mustermann is the German placeholder surname.
const customer = {
  name: 'Anna Mustermann',
  email: 'anna.mustermann@example.com',
  phone: '+49 30 000000',
  address: 'Musterstrasse 12, 10115 Berlin, Germany'
}

const orderSummary = { subtotal: 152.95, discount: 0, shipment: 0, grandTotal: 152.95 }

const buildDetailItem = (
  id: string,
  status: OrderStatus,
  title: string,
  description: string,
  image: string,
  price: number,
  originalPrice: number,
  orderId: string,
  date: string,
  href: string
): Order => ({
  id,
  orderId,
  status,
  date,
  title,
  description,
  image,
  price,
  originalPrice,
  href
})

export const db: OrderDetailGroup[] = [
  {
    id: 'latest',
    label: 'Latest Order',
    customer,
    orderDate: '2 September 2026',
    deliveryDate: '5 September 2026',
    orderId: 'DBR-240611',
    paymentMethod: '/images/account/mastercard.webp',
    items: [
      buildDetailItem(
        'detail-latest-1',
        'in-progress',
        'Retatrutide pen | 15 mg',
        'Pre-filled pen, 3 ml, 5 mg/ml. Ready to use straight from the fridge, no reconstitution. Batch documentation in the box.',
        '/images/products/dbr-reta-pen-15mg-upright.png',
        152.95,
        218.5,
        'DBR-240611',
        '2 September 2026',
        '/product/retatrutide-pen-15mg'
      )
    ],
    summary: orderSummary
  }
]
