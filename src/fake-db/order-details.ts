// Type Imports
import type { Order, OrderStatus, OrderDetailGroup } from '@/types/order'

const customer = {
  name: 'Cristofer Schleifer',
  email: 'Christine@gmail.com',
  phone: '+1 (954) 178 368',
  address: '47 W 13th St, New York, NY 10011, USA'
}

const orderSummary = { subtotal: 599, discount: 50, shipment: 22.5, grandTotal: 571.5 }

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
    orderDate: 'Jul 11, 2024',
    deliveryDate: 'Jul 16, 2024',
    orderId: '#5648945',
    paymentMethod: '/images/account/mastercard.webp',
    items: [
      buildDetailItem(
        'detail-latest-1',
        'delivered',
        'Boat',
        'This smartwatch features a large 1.83" HD display that delivers crisp visuals and a smooth user experience for everyday use. It comes with AI smart features.',
        '/images/account/order-detail-01.webp',
        225,
        249,
        'XYZ-42324234',
        '29 January 2026',
        '/product/boat-airdopes-138'
      )
    ],
    summary: orderSummary
  }
]
