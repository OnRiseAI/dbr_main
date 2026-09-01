// Third-party Imports
import { z } from 'zod'

export const writeReviewSchema = z.object({
  rating: z.number().min(1, 'Please select a rating').max(5, 'Rating must be between 1 and 5'),
  title: z.string().min(1, 'Please enter a review title'),
  description: z.string().min(1, 'Please enter a review description'),
  recommend: z.enum(['yes', 'no']),
  terms: z.boolean().refine(value => value, {
    message: 'You must agree to the terms and conditions'
  })
})

export type WriteReviewValues = z.infer<typeof writeReviewSchema>
