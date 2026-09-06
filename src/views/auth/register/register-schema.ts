// Third-party Imports
import { z } from 'zod'

export const registerSchema = z
  .object({
    firstName: z.string().trim().min(1, 'Enter your first name').max(80),
    lastName: z.string().trim().min(1, 'Enter your last name').max(80),
    email: z.string().email('Enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(8, 'Password must be at least 8 characters'),
    agree: z.boolean().refine(value => value, { message: 'You must accept the Privacy Policy' })
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  })

export type RegisterFormValues = z.infer<typeof registerSchema>
