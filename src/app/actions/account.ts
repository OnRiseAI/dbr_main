'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient, createServiceClient } from '@/lib/supabase/server'

export type ActionState = { ok: boolean; message?: string }

const APP_URL = (process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000').replace(/\/$/, '')

const safeNext = (value: FormDataEntryValue | null) => {
  const next = typeof value === 'string' ? value : ''

  return next.startsWith('/') && !next.startsWith('//') ? next : '/account'
}

/** Email a magic link. Supabase sends it; the callback route finishes sign-in. */
export async function requestSignInLink(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const email = String(formData.get('email') ?? '')
    .trim()
    .toLowerCase()

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, message: 'Enter the email address you order with.' }
  }

  const next = safeNext(formData.get('next'))
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${APP_URL}/auth/callback?next=${encodeURIComponent(next)}`,
      shouldCreateUser: true
    }
  })

  if (error) {
    return { ok: false, message: 'The link could not be sent. Try again in a minute.' }
  }

  return { ok: true, message: email }
}

export async function signOut() {
  const supabase = await createClient()

  await supabase.auth.signOut()
  redirect('/')
}

export async function updateProfile(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const supabase = await createClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) return { ok: false, message: 'Sign in again to save changes.' }

  const clean = (key: string) => {
    const value = String(formData.get(key) ?? '').trim()

    return value.length > 0 ? value.slice(0, 120) : null
  }

  const { error } = await supabase
    .from('profiles')
    .update({
      first_name: clean('first_name'),
      last_name: clean('last_name'),
      phone: clean('phone'),
      updated_at: new Date().toISOString()
    })
    .eq('id', user.id)

  if (error) return { ok: false, message: 'Changes were not saved. Try again.' }

  revalidatePath('/account')

  return { ok: true, message: 'Saved.' }
}

export async function saveAddress(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const supabase = await createClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) return { ok: false, message: 'Sign in again to save changes.' }

  const field = (key: string, max = 120) => String(formData.get(key) ?? '').trim().slice(0, max)
  const required = ['first_name', 'last_name', 'address1', 'city', 'postal_code', 'country']
  const missing = required.filter(key => field(key).length === 0)

  if (missing.length > 0) return { ok: false, message: 'Name, street, city, postcode and country are required.' }

  const id = field('id')

  const payload = {
    user_id: user.id,
    first_name: field('first_name'),
    last_name: field('last_name'),
    company: field('company') || null,
    address1: field('address1'),
    address2: field('address2') || null,
    city: field('city'),
    province: field('province') || null,
    postal_code: field('postal_code', 20),
    country: field('country', 2).toUpperCase(),
    phone: field('phone', 40) || null,
    updated_at: new Date().toISOString()
  }

  const query = id
    ? supabase.from('addresses').update(payload).eq('id', id).eq('user_id', user.id)
    : supabase.from('addresses').insert(payload)

  const { error } = await query

  if (error) return { ok: false, message: 'The address was not saved. Try again.' }

  revalidatePath('/account/addresses')

  return { ok: true, message: 'Saved.' }
}

export async function deleteAddress(formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  const id = String(formData.get('id') ?? '')

  if (!user || !id) return

  await supabase.from('addresses').delete().eq('id', id).eq('user_id', user.id)
  revalidatePath('/account/addresses')
}

export async function setDefaultShipping(formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  const id = String(formData.get('id') ?? '')

  if (!user || !id) return

  await supabase.from('addresses').update({ is_default_shipping: false }).eq('user_id', user.id)
  await supabase.from('addresses').update({ is_default_shipping: true }).eq('id', id).eq('user_id', user.id)
  revalidatePath('/account/addresses')
}

/** Marketing email opt-out lives in a service-only table keyed by email. */
export async function setMarketingEmails(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const supabase = await createClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user?.email) return { ok: false, message: 'Sign in again to change this.' }

  const wantsEmails = formData.get('marketing') === 'on'
  const service = createServiceClient()
  const email = user.email.toLowerCase()

  const { error } = wantsEmails
    ? await service.from('email_marketing_unsubscribes').delete().eq('email', email)
    : await service.from('email_marketing_unsubscribes').upsert({ email, source: 'storefront-account' })

  if (error) return { ok: false, message: 'The preference was not saved. Try again.' }

  revalidatePath('/account/email')

  return { ok: true, message: wantsEmails ? 'You will receive product updates.' : 'You will not receive product updates.' }
}
