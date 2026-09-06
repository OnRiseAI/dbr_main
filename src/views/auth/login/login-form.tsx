'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

// Third-party Imports
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

// Type Imports
import type { LoginFormValues } from '@/views/auth/login/login-schema'

// Component Imports
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import PasswordInput from '@/views/account/profile/password-input'
import { loginSchema } from '@/views/auth/login/login-schema'

// Lib Imports
import { createClient } from '@/lib/supabase/client'

const AUTH_ERRORS: Record<string, string> = {
  link_expired: 'That sign-in link has expired. Sign in below or request a new one.',
  link_invalid: 'That sign-in link is not valid any more. Sign in below or request a new one.',
  missing_code: 'That link was incomplete. Sign in below.',
  no_user: 'We could not finish signing you in. Please try again.'
}

const safeNext = (value: string | null) => (value && value.startsWith('/') && !value.startsWith('//') ? value : '/account')

/**
 * Email and password, the same accounts as the existing shop. A customer who signed up
 * before passwords existed sets one here on their first visit; after that the password
 * is required. "Email me a sign-in link" covers anyone who would rather not type one.
 */
const LoginForm = () => {
  const router = useRouter()
  const params = useSearchParams()
  const next = safeNext(params.get('next'))
  const [error, setError] = useState<string | null>(AUTH_ERRORS[params.get('auth_error') ?? ''] ?? null)
  const [linkSent, setLinkSent] = useState(false)
  const [busy, setBusy] = useState<'password' | 'link' | null>(null)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' }
  })

  const onSubmit = async (values: LoginFormValues) => {
    setError(null)
    setBusy('password')

    const supabase = createClient()
    const email = values.email.trim().toLowerCase()

    try {
      const first = await supabase.auth.signInWithPassword({ email, password: values.password })

      if (!first.error) {
        router.replace(next)
        router.refresh()

        return
      }

      // Older accounts were created with a sign-in link and have no password yet.
      const ensured = await fetch('/api/auth/ensure-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: values.password })
      })

      if (!ensured.ok) {
        const body = (await ensured.json().catch(() => ({}))) as { error?: string; code?: string }

        setError(body.code === 'password_already_set' ? 'Wrong email or password.' : (body.error ?? 'Could not sign you in.'))

        return
      }

      const again = await supabase.auth.signInWithPassword({ email, password: values.password })

      if (again.error) {
        setError(again.error.message)

        return
      }

      router.replace(next)
      router.refresh()
    } finally {
      setBusy(null)
    }
  }

  const sendLink = async () => {
    const email = form.getValues('email').trim().toLowerCase()

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      form.setError('email', { message: 'Enter your email address first' })

      return
    }

    setError(null)
    setBusy('link')

    const { error: otpError } = await createClient().auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`, shouldCreateUser: true }
    })

    setBusy(null)

    if (otpError) setError(otpError.message)
    else setLinkSent(true)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        {error ? <p className='text-destructive rounded-md border border-destructive/30 px-3 py-2 text-sm'>{error}</p> : null}
        {linkSent ? (
          <p className='rounded-md border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm text-emerald-900 dark:border-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-200'>
            Check your inbox. The sign-in link is valid for a short while.
          </p>
        ) : null}
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
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='gap-0'>
                Password<span className='top-0 text-base'>*</span>
              </FormLabel>
              <FormControl>
                <PasswordInput placeholder='············' autoComplete='current-password' {...field} className='input-lg' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex items-center justify-between gap-2'>
          <p className='text-muted-foreground text-sm'>First time here? The password you type becomes yours.</p>
          <Link href='/forgot-password' className='text-primary shrink-0 text-base font-normal'>
            Forgot Password?
          </Link>
        </div>
        <Button type='submit' size='lg' className='w-full' disabled={busy !== null}>
          {busy === 'password' ? 'Signing in…' : 'Sign in'}
        </Button>
        <Button type='button' variant='outline' size='lg' className='w-full' disabled={busy !== null} onClick={sendLink}>
          {busy === 'link' ? 'Sending…' : 'Email me a sign-in link instead'}
        </Button>
      </form>
    </Form>
  )
}

export default LoginForm
