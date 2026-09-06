'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createServerSupabase, getSessionUser } from '@/lib/supabase/server'

type Result = { ok: true } | { ok: false; error: string }

export async function signOut() {
  const supabase = await createServerSupabase()

  await supabase.auth.signOut()
  redirect('/')
}

export async function updateProfile(input: { firstName: string; lastName: string; phone: string }): Promise<Result> {
  const user = await getSessionUser()

  if (!user) return { ok: false, error: 'Please sign in again.' }

  const supabase = await createServerSupabase()

  const { error } = await supabase
    .from('profiles')
    .update({
      first_name: input.firstName.trim().slice(0, 80) || null,
      last_name: input.lastName.trim().slice(0, 80) || null,
      phone: input.phone.trim().slice(0, 40) || null,
      updated_at: new Date().toISOString()
    })
    .eq('id', user.id)

  if (error) return { ok: false, error: error.message }

  revalidatePath('/account')
  revalidatePath('/', 'layout')

  return { ok: true }
}

export type AddressInput = {
  firstName: string
  lastName: string
  company: string
  address1: string
  address2: string
  city: string
  province: string
  postalCode: string
  country: string
  phone: string
  isDefaultShipping: boolean
  isDefaultBilling: boolean
}

export async function saveAddress(input: AddressInput, id?: string): Promise<Result> {
  const user = await getSessionUser()

  if (!user) return { ok: false, error: 'Please sign in again.' }

  const supabase = await createServerSupabase()

  const row = {
    user_id: user.id,
    first_name: input.firstName.trim(),
    last_name: input.lastName.trim(),
    company: input.company.trim() || null,
    address1: input.address1.trim(),
    address2: input.address2.trim() || null,
    city: input.city.trim(),
    province: input.province.trim() || null,
    postal_code: input.postalCode.trim(),
    country: input.country.trim().toUpperCase().slice(0, 2),
    phone: input.phone.trim() || null,
    is_default_shipping: input.isDefaultShipping,
    is_default_billing: input.isDefaultBilling,
    updated_at: new Date().toISOString()
  }

  // Only one default of each kind.
  if (row.is_default_shipping) await supabase.from('addresses').update({ is_default_shipping: false }).eq('user_id', user.id)
  if (row.is_default_billing) await supabase.from('addresses').update({ is_default_billing: false }).eq('user_id', user.id)

  const { error } = id
    ? await supabase.from('addresses').update(row).eq('id', id).eq('user_id', user.id)
    : await supabase.from('addresses').insert(row)

  if (error) return { ok: false, error: error.message }

  revalidatePath('/account/addresses')

  return { ok: true }
}

export async function deleteAddress(id: string): Promise<Result> {
  const user = await getSessionUser()

  if (!user) return { ok: false, error: 'Please sign in again.' }

  const supabase = await createServerSupabase()
  const { error } = await supabase.from('addresses').delete().eq('id', id).eq('user_id', user.id)

  if (error) return { ok: false, error: error.message }

  revalidatePath('/account/addresses')

  return { ok: true }
}

export async function setDefaultAddress(id: string, kind: 'shipping' | 'billing'): Promise<Result> {
  const user = await getSessionUser()

  if (!user) return { ok: false, error: 'Please sign in again.' }

  const supabase = await createServerSupabase()
  const column = kind === 'shipping' ? 'is_default_shipping' : 'is_default_billing'

  await supabase.from('addresses').update({ [column]: false }).eq('user_id', user.id)

  const { error } = await supabase.from('addresses').update({ [column]: true }).eq('id', id).eq('user_id', user.id)

  if (error) return { ok: false, error: error.message }

  revalidatePath('/account/addresses')

  return { ok: true }
}
