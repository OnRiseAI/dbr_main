// Third-party Imports
import { z } from 'zod'

export const addressFormSchema = z.object({
  firstName: z.string().trim().min(1, 'Enter the first name'),
  lastName: z.string().trim().min(1, 'Enter the last name'),
  company: z.string().trim().max(120),
  address1: z.string().trim().min(1, 'Enter the street and number'),
  address2: z.string().trim().max(120),
  postalCode: z.string().trim().min(1, 'Enter the postal code'),
  city: z.string().trim().min(1, 'Enter the city'),
  province: z.string().trim().max(80),
  country: z.string().length(2, 'Choose a country'),
  phone: z.string().trim().max(40),
  isDefaultShipping: z.boolean(),
  isDefaultBilling: z.boolean()
})

export type AddressFormValues = z.infer<typeof addressFormSchema>

/** Where the shop ships. ISO codes, the value stored on the address. */
export const COUNTRIES: { value: string; label: string }[] = [
  { value: 'DE', label: 'Germany' },
  { value: 'AT', label: 'Austria' },
  { value: 'NL', label: 'Netherlands' },
  { value: 'BE', label: 'Belgium' },
  { value: 'LU', label: 'Luxembourg' },
  { value: 'FR', label: 'France' },
  { value: 'ES', label: 'Spain' },
  { value: 'PT', label: 'Portugal' },
  { value: 'IT', label: 'Italy' },
  { value: 'CH', label: 'Switzerland' },
  { value: 'PL', label: 'Poland' },
  { value: 'CZ', label: 'Czechia' },
  { value: 'SK', label: 'Slovakia' },
  { value: 'HU', label: 'Hungary' },
  { value: 'RO', label: 'Romania' },
  { value: 'BG', label: 'Bulgaria' },
  { value: 'GR', label: 'Greece' },
  { value: 'HR', label: 'Croatia' },
  { value: 'SI', label: 'Slovenia' },
  { value: 'DK', label: 'Denmark' },
  { value: 'SE', label: 'Sweden' },
  { value: 'NO', label: 'Norway' },
  { value: 'FI', label: 'Finland' },
  { value: 'IE', label: 'Ireland' },
  { value: 'EE', label: 'Estonia' },
  { value: 'LV', label: 'Latvia' },
  { value: 'LT', label: 'Lithuania' }
]

export const countryName = (code: string) => COUNTRIES.find(c => c.value === code.toUpperCase())?.label ?? code
