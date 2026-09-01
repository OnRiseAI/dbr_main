// Third-party Imports
import { z } from 'zod'

export const checkoutSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  phone: z.string().min(6, 'Enter a valid phone number'),
  street: z.string().min(1, 'Street address is required'),
  city: z.string().min(1, 'City is required'),
  country: z.string().min(1, 'Country is required'),
  zip: z.string().min(3, 'Enter a valid zip code'),
  deliverySpeed: z.enum(['standard', 'express', 'basic']),
  paymentMethod: z.enum(['debit', 'credit', 'cod', 'gift']),
  cardNumber: z.string().optional(),
  cardName: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvv: z.string().optional()
})

export type CheckoutFormValues = z.infer<typeof checkoutSchema>

export const countryItems = [
  { label: 'United States', value: 'us' },
  { label: 'Canada', value: 'ca' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Australia', value: 'au' },
  { label: 'India', value: 'in' }
]

export const deliveryOptions = [
  { value: 'standard', title: 'Standard', subtitle: 'Get your product in 1 week', price: 'Free' },
  { value: 'express', title: 'Express', subtitle: 'Get your product in 0-1 days', price: '$20' },
  { value: 'basic', title: 'Basic', subtitle: 'Get your product in 3-4 days', price: '$10' }
] as const

export const paymentOptions = [
  { value: 'debit', title: 'Debit Card', subtitle: 'Pay securely with your debit card' },
  { value: 'credit', title: 'Credit Card', subtitle: 'Visa, Mastercard, Amex' },
  { value: 'cod', title: 'Cash on delivery', subtitle: 'Pay when you receive the order' },
  { value: 'gift', title: 'Gift card', subtitle: 'Use a Shopix gift card' }
] as const
