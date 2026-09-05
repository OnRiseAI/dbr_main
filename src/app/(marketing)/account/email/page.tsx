import { redirect } from 'next/navigation'

import EmailPreferences from '@/views/pages/account/email-preferences'
import { createClient, createServiceClient } from '@/lib/supabase/server'

export const metadata = { title: 'Email preferences' }

const EmailPage = async () => {
  const supabase = await createClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user?.email) redirect('/login?next=/account/email')

  const service = createServiceClient()

  const { data } = await service
    .from('email_marketing_unsubscribes')
    .select('email')
    .eq('email', user.email.toLowerCase())
    .maybeSingle()

  return (
    <div className='space-y-8'>
      <div className='space-y-1'>
        <h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>Email preferences</h1>
        <p className='text-muted-foreground'>What we send, and what you can switch off.</p>
      </div>
      <EmailPreferences email={user.email} subscribed={!data} />
    </div>
  )
}

export default EmailPage
