// Third-party Imports
import { z } from 'zod'

export const pickupFormSchema = z.object({
  country: z.string().min(1, 'Please enter your Country.'),
  streetAddress: z.string().min(1, 'Please enter your Street Address.'),
  city: z.string().min(1, 'Please enter your City.'),
  zipCode: z.string().min(1, 'Please enter your Zip-code.')
})

export type PickupFormValues = z.infer<typeof pickupFormSchema>
