'use client'

import { useActionState } from 'react'

import Link from 'next/link'
import { ArrowRightIcon } from 'lucide-react'

import { requestSignInLink, type ActionState } from '@/app/actions/account'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import ContentLayout from '@/components/layout/content-layout'

type Props = {
  next?: string
  error?: string
}

const ERRORS: Record<string, string> = {
  expired: 'That link has expired or was already used. Request a new one.',
  link: 'That link was not valid. Request a new one.'
}

/** Magic link sign-in. No password to remember, no password to leak. */
const LoginView = ({ next = '/account', error }: Props) => {
  const [state, action, pending] = useActionState<ActionState, FormData>(requestSignInLink, { ok: false })

  return (
    <section className='py-12 sm:py-20'>
      <ContentLayout className='flex justify-center'>
        <div className='w-full max-w-md space-y-8'>
          <div className='space-y-2'>
            <p className='text-muted-foreground text-xs font-semibold tracking-[0.14em] uppercase'>Your account</p>
            <h1 className='text-3xl font-semibold tracking-tight'>Sign in with your email</h1>
            <p className='text-muted-foreground text-base'>
              We send a link, you click it. Same account as app.deepbeautyresearch.com, so your orders are already
              here.
            </p>
          </div>

          {state.ok ? (
            <div className='rounded-xl border p-6'>
              <p className='font-semibold'>Check your inbox</p>
              <p className='text-muted-foreground mt-1 text-sm'>
                A sign-in link is on its way to <span className='text-foreground font-medium'>{state.message}</span>. It
                works once and expires after a short while.
              </p>
            </div>
          ) : (
            <form action={action} className='space-y-4'>
              <input type='hidden' name='next' value={next} />
              <div className='space-y-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  required
                  placeholder='you@example.com'
                  className='h-11'
                />
              </div>
              {error && !state.message ? <p className='text-destructive text-sm'>{ERRORS[error] ?? ERRORS.link}</p> : null}
              {state.message ? <p className='text-destructive text-sm'>{state.message}</p> : null}
              <Button type='submit' size='lg' className='group h-11 w-full' disabled={pending}>
                {pending ? 'Sending' : 'Email me a sign-in link'}
                <ArrowRightIcon className='size-4 transition-transform duration-300 group-hover:translate-x-1' />
              </Button>
              <p className='text-muted-foreground text-xs'>
                First time here? The same link creates your account. By continuing you confirm the products are for
                research use only.
              </p>
            </form>
          )}

          <p className='text-muted-foreground text-sm'>
            <Link href='/' className='hover:text-foreground underline underline-offset-4'>
              Back to the shop
            </Link>
          </p>
        </div>
      </ContentLayout>
    </section>
  )
}

export default LoginView
