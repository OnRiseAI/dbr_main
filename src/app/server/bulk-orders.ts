'use server'

import { headers } from 'next/headers'

import { SITE_ID, createServiceClient, hasSupabase } from '@/lib/supabase/server'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type BulkLine = { id: string; name: string; qty: number; unitPrice: number }

export type BulkRequestInput = {
  fullName: string
  company: string
  email: string
  phone: string
  country: string
  message: string
  lines: BulkLine[]
}

/**
 * A bulk order request becomes a wholesale lead in the same table the admin already lists
 * under Partners > Applications, so nothing new has to be watched. The product lines go in
 * the message, the unit count in monthly_volume, the channel is "bulk-order".
 */
export async function submitBulkRequest(input: BulkRequestInput): Promise<{ ok: true; reference: string } | { ok: false; error: string }> {
  const fullName = input.fullName?.trim().slice(0, 160) ?? ''
  const email = input.email?.trim().toLowerCase() ?? ''
  const country = input.country?.trim().slice(0, 100) ?? ''
  const company = input.company?.trim().slice(0, 200) ?? ''
  const phone = input.phone?.trim().slice(0, 40) ?? ''
  const message = input.message?.trim().slice(0, 3000) ?? ''
  const lines = (input.lines ?? []).filter(l => l && l.qty > 0).slice(0, 40)

  if (fullName.length < 2) return { ok: false, error: 'Enter your name.' }
  if (!EMAIL_RE.test(email) || email.length > 320) return { ok: false, error: 'Enter a valid email address.' }
  if (country.length < 2) return { ok: false, error: 'Enter the delivery country.' }
  if (lines.length === 0) return { ok: false, error: 'Add at least one product to the request.' }
  if (!hasSupabase) return { ok: false, error: 'Requests are not available right now.' }

  const units = lines.reduce((n, l) => n + l.qty, 0)
  const listTotal = lines.reduce((n, l) => n + l.qty * l.unitPrice, 0)
  const h = await headers()

  const productList = lines.map(l => `${l.qty} × ${l.name} (list ${l.unitPrice.toFixed(2)} EUR)`).join('\n')

  const body = [
    'BULK ORDER REQUEST',
    productList,
    `Units: ${units}. List total: ${listTotal.toFixed(2)} EUR (before volume pricing).`,
    phone ? `Phone: ${phone}` : null,
    message ? `Notes: ${message}` : null
  ]
    .filter(Boolean)
    .join('\n')

  const { data, error } = await createServiceClient()
    .from('partner_leads')
    .insert({
      site_id: SITE_ID,
      full_name: fullName,
      email,
      country,
      partner_type: 'wholesale',
      company: company || null,
      website: null,
      audience: 'Bulk order request from the storefront',
      channels: 'bulk-order',
      monthly_volume: `${units} units`,
      message: body,
      status: 'new',
      user_agent: h.get('user-agent'),
      referrer: h.get('referer')
    })
    .select('id')
    .single()

  if (error || !data) return { ok: false, error: 'Could not send your request. Please try again or write to us on WhatsApp.' }

  return { ok: true, reference: `BULK-${String((data as { id: string }).id).slice(0, 8).toUpperCase()}` }
}
