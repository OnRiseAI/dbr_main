// Type Imports
import type { PaymentCard } from '@/store/payments-store'

export const paymentCards: PaymentCard[] = [
  {
    id: 'payment-1',
    brand: 'Mastercard',
    image: '/images/account/mastercard-2.webp',
    last4: '7830',
    expiry: '06/24',
    status: 'expired',
    number: '5555555555557830',
    name: 'Anna Mustermann',
    cvc: '123'
  },
  {
    id: 'payment-2',
    brand: 'Mastercard',
    image: '/images/account/mastercard-2.webp',
    last4: '4962',
    expiry: '02/25',
    status: 'default',
    isDefault: true,
    number: '5555555555554962',
    name: 'Anna Mustermann',
    cvc: '456'
  },
  {
    id: 'payment-3',
    brand: 'Visa',
    image: '/images/account/visa-card.webp',
    last4: '5775',
    expiry: '06/24',
    number: '4532015112830366',
    name: 'Jane Smith',
    cvc: '789'
  },
  {
    id: 'payment-4',
    brand: 'Visa',
    image: '/images/account/visa-card.webp',
    last4: '7830',
    expiry: '02/25',
    number: '4556737586899855',
    name: 'Jane Smith',
    cvc: '321'
  }
]
