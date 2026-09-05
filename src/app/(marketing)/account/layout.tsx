import type { ReactNode } from 'react'

import { redirect } from 'next/navigation'

import ContentLayout from '@/components/layout/content-layout'
import AccountNav from '@/views/pages/account/account-nav'
import { createClient } from '@/lib/supabase/server'
import type { Profile } from '@/types/account'

export const dynamic = 'force-dynamic'

const AccountLayout = async ({ children }: { children: ReactNode }) => {
  const supabase = await createClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) redirect('/login?next=/account')

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, email, first_name, last_name, phone, locale')
    .eq('id', user.id)
    .maybeSingle<Profile>()

  const name = [profile?.first_name, profile?.last_name].filter(Boolean).join(' ')

  return (
    <section className='py-8 lg:py-12'>
      <ContentLayout className='grid gap-8 lg:grid-cols-[240px_1fr] lg:gap-14'>
        <AccountNav name={name} email={profile?.email ?? user.email ?? ''} />
        <div className='min-w-0'>{children}</div>
      </ContentLayout>
    </section>
  )
}

export default AccountLayout
