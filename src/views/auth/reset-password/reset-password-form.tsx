'use client'

// React Imports
import { useEffect, useState } from 'react'

// Next Imports
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// Third-party Imports
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

// Type Imports
import type { ResetPasswordFormValues } from '@/views/auth/reset-password/reset-password-schema'

// Component Imports
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import PasswordInput from '@/views/account/profile/password-input'
import { resetPasswordSchema } from '@/views/auth/reset-password/reset-password-schema'

// Lib Imports
import { createClient } from '@/lib/supabase/client'

/** Sets a new password for the session opened by the reset link. */
const ResetPasswordForm = () => {
  const router = useRouter()
  const [hasSession, setHasSession] = useState<boolean | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { newPassword: '', confirmPassword: '' }
  })

  useEffect(() => {
    createClient()
      .auth.getUser()
      .then(({ data }) => setHasSession(Boolean(data.user)))
  }, [])

  const onSubmit = async (values: ResetPasswordFormValues) => {
    setError(null)
    setBusy(true)

    const supabase = createClient()

    const { data, error: updateError } = await supabase.auth.updateUser({
      password: values.newPassword,
      data: { password_set: true, password_set_at: new Date().toISOString() }
    })

    setBusy(false)

    if (updateError || !data.user) {
      setError(updateError?.message ?? 'Could not save the new password.')

      return
    }

    router.replace('/account')
    router.refresh()
  }

  if (hasSession === false) {
    return (
      <p className='text-muted-foreground text-sm'>
        This page only works from a password reset link.{' '}
        <Link href='/forgot-password' className='text-primary underline underline-offset-2'>
          Request a new one
        </Link>
        .
      </p>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        {error ? <p className='text-destructive border-destructive/30 rounded-md border px-3 py-2 text-sm'>{error}</p> : null}
        <FormField
          control={form.control}
          name='newPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='gap-0'>
                New Password<span className='top-0 text-base'>*</span>
              </FormLabel>
              <FormControl>
                <PasswordInput placeholder='············' autoComplete='new-password' {...field} className='input-lg' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='gap-0'>
                Confirm Password<span className='top-0 text-base'>*</span>
              </FormLabel>
              <FormControl>
                <PasswordInput placeholder='············' autoComplete='new-password' {...field} className='input-lg' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' size='lg' className='w-full' disabled={busy || hasSession === null}>
          {busy ? 'Saving…' : 'Save new password'}
        </Button>
      </form>
    </Form>
  )
}

export { ResetPasswordForm }
export default ResetPasswordForm
