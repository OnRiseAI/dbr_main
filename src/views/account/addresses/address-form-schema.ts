// Third-party Imports
import { z } from 'zod'

export const addressFormSchema = z.object({
  deliveryType: z.string().min(1, 'Please select a delivery type.'),
  firstName: z.string().min(1, 'Please enter your First Name.'),
  lastName: z.string().min(1, 'Please enter your Last Name.'),
  country: z.string().min(1, 'Please select a Country.'),
  addressLine1: z.string().min(1, 'Please enter Address Line 1.'),
  addressLine2: z.string().optional(),
  landmark: z.string().optional(),
  city: z.string().min(1, 'Please enter your City.'),
  state: z.string().min(1, 'Please select a State.'),
  zipCode: z.string().min(1, 'Please enter your Zip Code.'),
  billingAddress: z.boolean().optional()
})

export type AddressFormValues = z.infer<typeof addressFormSchema>
