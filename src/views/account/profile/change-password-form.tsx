'use client'

// React Imports
import { useState } from 'react'

// Third-party Imports
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Component Imports
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import PasswordInput from '@/views/account/profile/password-input'

// Lib Imports
import { createClient } from '@/lib/supabase/client'

const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, 'Enter your current password'),
    newPassword: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password')
  })
  .refine(data => data.newPassword === data.confirmPassword, { message: 'Passwords do not match', path: ['confirmPassword'] })

type ChangePasswordValues = z.infer<typeof changePasswordSchema>

/** Checks the current password by signing in with it, then sets the new one. */
const ChangePasswordForm = ({ email }: { email: string }) => {
  const [busy, setBusy] = useState(false)
  const [note, setNote] = useState<{ ok: boolean; text: string } | null>(null)

  const form = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { oldPassword: '', newPassword: '', confirmPassword: '' }
  })

  const onSubmit = async (values: ChangePasswordValues) => {
    setBusy(true)
    setNote(null)

    const supabase = createClient()
    const check = await supabase.auth.signInWithPassword({ email, password: values.oldPassword })

    if (check.error) {
      setBusy(false)
      form.setError('oldPassword', { message: 'That is not your current password.' })

      return
    }

    const { error } = await supabase.auth.updateUser({ password: values.newPassword, data: { password_set: true, password_set_at: new Date().toISOString() } })

    setBusy(false)

    if (error) setNote({ ok: false, text: error.message })
    else {
      setNote({ ok: true, text: 'Password changed.' })
      form.reset()
    }
  }

  return (
    <div>
      <h3 className='mb-3.5 text-xl font-semibold'>Change Password</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='mb-4 grid items-start gap-x-5 gap-y-4 sm:grid-cols-2'>
            <FormField
              control={form.control}
              name='oldPassword'
              render={({ field }) => (
                <FormItem className='gap-3.5'>
                  <FormLabel className='gap-0 leading-5'>
                    Current password <span className='text-destructive'>*</span>
                  </FormLabel>
                  <FormControl>
                    <PasswordInput placeholder='Enter password' autoComplete='current-password' {...field} className='input-lg' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='newPassword'
              render={({ field }) => (
                <FormItem className='gap-3.5'>
                  <FormLabel className='gap-0 leading-5'>
                    New password <span className='text-destructive'>*</span>
                  </FormLabel>
                  <FormControl>
                    <PasswordInput placeholder='Enter password' autoComplete='new-password' {...field} className='input-lg' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem className='gap-3.5 sm:col-span-2'>
                  <FormLabel className='gap-0 leading-5'>
                    Confirm new password <span className='text-destructive'>*</span>
                  </FormLabel>
                  <FormControl>
                    <PasswordInput placeholder='Enter password' autoComplete='new-password' {...field} className='input-lg' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex items-center justify-end gap-4'>
            {note ? <p className={note.ok ? 'text-sm text-emerald-700' : 'text-destructive text-sm'}>{note.text}</p> : null}
            <Button type='submit' size='lg' disabled={busy}>
              {busy ? 'Saving…' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default ChangePasswordForm
