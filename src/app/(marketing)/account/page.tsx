import { redirect } from 'next/navigation'

import ProfileForm from '@/views/pages/account/profile-form'
import { createClient } from '@/lib/supabase/server'
import type { Profile } from '@/types/account'

export const metadata = { title: 'Profile' }

const ProfilePage = async () => {
  const supabase = await createClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) redirect('/login?next=/account')

  const { data } = await supabase
    .from('profiles')
    .select('id, email, first_name, last_name, phone, locale')
    .eq('id', user.id)
    .maybeSingle<Profile>()

  const profile: Profile = data ?? {
    id: user.id,
    email: user.email ?? '',
    first_name: null,
    last_name: null,
    phone: null,
    locale: 'en'
  }

  return (
    <div className='space-y-8'>
      <div className='space-y-1'>
        <h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>Profile</h1>
        <p className='text-muted-foreground'>The details on your orders and dispatch notes.</p>
      </div>
      <ProfileForm profile={profile} />
    </div>
  )
}

export default ProfilePage
