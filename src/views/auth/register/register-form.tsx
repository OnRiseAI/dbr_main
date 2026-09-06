'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// Third-party Imports
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

// Type Imports
import type { RegisterFormValues } from '@/views/auth/register/register-schema'

// Component Imports
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import PasswordInput from '@/views/account/profile/password-input'
import { registerSchema } from '@/views/auth/register/register-schema'

// Lib Imports
import { createClient } from '@/lib/supabase/client'

// Utils Imports
import { cn } from '@/lib/utils'

/** Creates the shop account and signs straight in. No confirmation email step. */
const RegisterForm = () => {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { firstName: '', lastName: '', email: '', password: '', confirmPassword: '', agree: false }
  })

  const onSubmit = async (values: RegisterFormValues) => {
    setError(null)
    setBusy(true)

    try {
      const email = values.email.trim().toLowerCase()

      const res = await fetch('/api/auth/ensure-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: values.password, firstName: values.firstName, lastName: values.lastName })
      })

      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string; code?: string }

        setError(
          body.code === 'password_already_set'
            ? 'There is already an account for this email. Sign in instead, or use Forgot password.'
            : (body.error ?? 'Could not create your account.')
        )

        return
      }

      const { error: signInError } = await createClient().auth.signInWithPassword({ email, password: values.password })

      if (signInError) {
        setError(signInError.message)

        return
      }

      router.replace('/account')
      router.refresh()
    } finally {
      setBusy(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        {error ? <p className='text-destructive border-destructive/30 rounded-md border px-3 py-2 text-sm'>{error}</p> : null}
        <div className='grid gap-4 sm:grid-cols-2'>
          <FormField
            control={form.control}
            name='firstName'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='gap-0'>
                  First name<span className='top-0 text-base'>*</span>
                </FormLabel>
                <FormControl>
                  <Input autoComplete='given-name' placeholder='Anna' {...field} className='input-lg' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='lastName'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='gap-0'>
                  Last name<span className='top-0 text-base'>*</span>
                </FormLabel>
                <FormControl>
                  <Input autoComplete='family-name' placeholder='Schmidt' {...field} className='input-lg' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='gap-0'>
                Email<span className='top-0 text-base'>*</span>
              </FormLabel>
              <FormControl>
                <Input type='email' autoComplete='email' placeholder='Enter your email address' {...field} className='input-lg' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='gap-0'>
                Password<span className='top-0 text-base'>*</span>
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
        <FormField
          control={form.control}
          name='agree'
          render={({ field, fieldState }) => (
            <FormItem className='flex flex-row items-start gap-2'>
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} className='mt-0.5 size-6' />
              </FormControl>
              <div className='flex flex-col gap-1'>
                <FormLabel className='text-muted-foreground gap-1 font-medium'>
                  I agree to
                  <Button
                    variant='link'
                    size='sm'
                    className={cn('h-auto p-0 text-sm font-medium', fieldState.error && 'text-destructive')}
                    render={<Link href='/privacy-policy' />}
                    nativeButton={false}
                  >
                    privacy policy & terms
                  </Button>
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <Button type='submit' size='lg' className='w-full' disabled={busy}>
          {busy ? 'Creating your account…' : 'Create account'}
        </Button>
      </form>
    </Form>
  )
}

export { RegisterForm }
export default RegisterForm
