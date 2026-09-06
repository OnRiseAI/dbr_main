'use server'

import { headers } from 'next/headers'

import { SITE_ID, createServiceClient, hasSupabase } from '@/lib/supabase/server'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Footer newsletter. Rows go into the shop's existing signup list (the same table the
 * current site uses for back-in-stock requests), tagged `newsletter` so they are easy to
 * pull out for a mailing.
 */
export async function subscribeNewsletter(raw: string): Promise<{ ok: true } | { ok: false; error: string }> {
  const email = (raw ?? '').trim().toLowerCase()

  if (!EMAIL_RE.test(email) || email.length > 254) return { ok: false, error: 'Enter a valid email address.' }
  if (!hasSupabase) return { ok: false, error: 'Sign-up is not available right now.' }

  const h = await headers()

  const { error } = await createServiceClient()
    .from('nordic_bio_notify_signups')
    .insert({
      name: 'Newsletter',
      email,
      pen_size: 'newsletter',
      pen_slug: 'newsletter',
      site_id: SITE_ID,
      user_agent: h.get('user-agent'),
      referrer: h.get('referer')
    })

  if (error) {
    if (/duplicate|unique/i.test(error.message)) return { ok: true }

    return { ok: false, error: 'Could not save your email. Please try again.' }
  }

  return { ok: true }
}
