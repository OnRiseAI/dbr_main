'use client'

// React Imports
import { useState } from 'react'

// Third-party Imports
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

// Type Imports
import type { ForgotPasswordFormValues } from '@/views/auth/forgot-password/forgot-password-schema'

// Component Imports
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { forgotPasswordSchema } from '@/views/auth/forgot-password/forgot-password-schema'

// Lib Imports
import { createClient } from '@/lib/supabase/client'

/** Emails a reset link; the link lands on /auth/callback and continues to /reset-password. */
const ForgotPasswordForm = () => {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' }
  })

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    setError(null)
    setBusy(true)

    const { error: resetError } = await createClient().auth.resetPasswordForEmail(values.email.trim().toLowerCase(), {
      redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`
    })

    setBusy(false)

    if (resetError) setError(resetError.message)
    else setSent(true)
  }

  if (sent) {
    return (
      <p className='mb-3 rounded-md border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm text-emerald-900 dark:border-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-200'>
        If that address has an account, a reset link is on its way. Open it on this device to choose a new password.
      </p>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='mb-3 space-y-6'>
        {error ? <p className='text-destructive border-destructive/30 rounded-md border px-3 py-2 text-sm'>{error}</p> : null}
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='gap-0'>
                Email<span className='top-0 text-base'>*</span>
              </FormLabel>
              <FormControl>
                <Input type='email' autoComplete='email' placeholder='Enter your email address' className='input-lg' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' size='lg' className='w-full' disabled={busy}>
          {busy ? 'Sending…' : 'Send reset link'}
        </Button>
      </form>
    </Form>
  )
}

export { ForgotPasswordForm }
export default ForgotPasswordForm
