// Third-party Imports
import { z } from 'zod'

export const twoFactorAuthSchema = z.object({
  code: z.string().length(6, 'Enter the 6 digit code').regex(/^\d+$/, 'Code must contain only digits')
})

export type TwoFactorAuthFormValues = z.infer<typeof twoFactorAuthSchema>
