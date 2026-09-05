'use client'

import { useActionState } from 'react'

import { setMarketingEmails, type ActionState } from '@/app/actions/account'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'

type Props = {
  email: string
  subscribed: boolean
}

/** One real toggle. Order and dispatch emails always send. */
const EmailPreferences = ({ email, subscribed }: Props) => {
  const [state, action, pending] = useActionState<ActionState, FormData>(setMarketingEmails, { ok: false })

  return (
    <form action={action} className='max-w-xl space-y-6'>
      <div className='divide-y rounded-xl border'>
        <div className='flex items-start justify-between gap-6 p-5'>
          <div className='space-y-1'>
            <p className='font-semibold'>Order and dispatch emails</p>
            <p className='text-muted-foreground text-sm'>
              Confirmation, payment and tracking for every order, sent to {email}. These always send.
            </p>
          </div>
          <Switch checked disabled aria-label='Order emails, always on' />
        </div>
        <div className='flex items-start justify-between gap-6 p-5'>
          <div className='space-y-1'>
            <p className='font-semibold'>Product updates</p>
            <p className='text-muted-foreground text-sm'>New products, strengths and formats. Occasional, never daily.</p>
          </div>
          <Switch name='marketing' defaultChecked={subscribed} aria-label='Product update emails' />
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <Button type='submit' disabled={pending}>
          {pending ? 'Saving' : 'Save preference'}
        </Button>
        {state.message ? (
          <p className={state.ok ? 'text-muted-foreground text-sm' : 'text-destructive text-sm'}>{state.message}</p>
        ) : null}
      </div>
    </form>
  )
}

export default EmailPreferences
