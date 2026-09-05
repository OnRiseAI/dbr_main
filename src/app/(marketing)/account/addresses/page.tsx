import { redirect } from 'next/navigation'

import AddressesManager from '@/views/pages/account/addresses-manager'
import { createClient } from '@/lib/supabase/server'
import type { Address } from '@/types/account'

export const metadata = { title: 'Addresses' }

const AddressesPage = async () => {
  const supabase = await createClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) redirect('/login?next=/account/addresses')

  const { data } = await supabase
    .from('addresses')
    .select('*')
    .eq('user_id', user.id)
    .order('is_default_shipping', { ascending: false })
    .order('created_at', { ascending: true })

  return (
    <div className='space-y-8'>
      <div className='space-y-1'>
        <h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>Addresses</h1>
        <p className='text-muted-foreground'>Where orders ship. The default is offered first at checkout.</p>
      </div>
      <AddressesManager addresses={(data ?? []) as Address[]} />
    </div>
  )
}

export default AddressesPage
