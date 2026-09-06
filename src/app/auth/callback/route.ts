import { NextResponse, type NextRequest } from 'next/server'
import type { EmailOtpType } from '@supabase/supabase-js'

import { SITE_ID, createServerSupabase, createServiceClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

const OTP_TYPES: EmailOtpType[] = ['email', 'magiclink', 'signup', 'invite', 'recovery', 'email_change']

function safeNext(value: string | null) {
  if (!value || !value.startsWith('/') || value.startsWith('//')) return null

  return value
}

/**
 * Where sign-in links, password reset links and email confirmations land. Turns the code or
 * token in the URL into a session cookie, makes sure the profile row carries this shop's
 * site id, then sends the customer on: password resets to the reset form, everything else
 * to `next` or the account.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl
  const code = searchParams.get('code')
  const tokenHash = searchParams.get('token_hash')
  const rawType = searchParams.get('type')
  const type = OTP_TYPES.includes(rawType as EmailOtpType) ? (rawType as EmailOtpType) : null
  const next = safeNext(searchParams.get('next'))

  const fail = (reason: string) => NextResponse.redirect(new URL(`/login?auth_error=${reason}`, origin))

  if (!code && !(tokenHash && type)) return fail('missing_code')

  const supabase = await createServerSupabase()

  const { error } = code
    ? await supabase.auth.exchangeCodeForSession(code)
    : await supabase.auth.verifyOtp({ token_hash: tokenHash!, type: type! })

  if (error) return fail(code ? 'link_expired' : 'link_invalid')

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user?.email) return fail('no_user')

  await createServiceClient()
    .from('profiles')
    .upsert({ id: user.id, email: user.email, site_id: SITE_ID, updated_at: new Date().toISOString() }, { onConflict: 'id' })

  if (type === 'recovery') return NextResponse.redirect(new URL('/reset-password', origin))

  return NextResponse.redirect(new URL(next ?? '/account', origin))
}
