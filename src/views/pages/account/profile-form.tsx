'use client'

import { useActionState } from 'react'

import { updateProfile, type ActionState } from '@/app/actions/account'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { Profile } from '@/types/account'

const ProfileForm = ({ profile }: { profile: Profile }) => {
  const [state, action, pending] = useActionState<ActionState, FormData>(updateProfile, { ok: false })

  return (
    <form action={action} className='max-w-xl space-y-6'>
      <div className='grid gap-4 sm:grid-cols-2'>
        <div className='space-y-2'>
          <Label htmlFor='first_name'>First name</Label>
          <Input id='first_name' name='first_name' defaultValue={profile.first_name ?? ''} autoComplete='given-name' />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='last_name'>Last name</Label>
          <Input id='last_name' name='last_name' defaultValue={profile.last_name ?? ''} autoComplete='family-name' />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='email'>Email</Label>
          <Input id='email' value={profile.email} readOnly className='bg-muted' />
          <p className='text-muted-foreground text-xs'>Your sign-in address. Contact us to change it.</p>
        </div>
        <div className='space-y-2'>
          <Label htmlFor='phone'>Phone</Label>
          <Input id='phone' name='phone' defaultValue={profile.phone ?? ''} autoComplete='tel' inputMode='tel' />
          <p className='text-muted-foreground text-xs'>Used by the courier if a delivery needs a call.</p>
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <Button type='submit' disabled={pending}>
          {pending ? 'Saving' : 'Save changes'}
        </Button>
        {state.message ? (
          <p className={state.ok ? 'text-muted-foreground text-sm' : 'text-destructive text-sm'}>{state.message}</p>
        ) : null}
      </div>
    </form>
  )
}

export default ProfileForm
