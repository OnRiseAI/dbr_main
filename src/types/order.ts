export type OrderStatus = 'in-progress' | 'delivered' | 'cancelled' | 'returned'

export type Order = {
  id: string
  orderId: string
  status: OrderStatus
  date: string
  title: string
  description: string
  image: string
  price: number
  originalPrice: number
  href: string
}

export type CustomerInfo = {
  name: string
  email: string
  phone: string
  address: string
}

export type OrderSummary = {
  subtotal: number
  discount: number
  shipment: number
  grandTotal: number
}

export type OrderDetailGroup = {
  id: string
  label: string
  customer: CustomerInfo
  orderDate: string
  deliveryDate: string
  orderId: string
  paymentMethod: string
  items: Order[]
  summary: OrderSummary
}
