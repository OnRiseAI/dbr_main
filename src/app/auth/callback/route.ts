import { NextResponse, type NextRequest } from 'next/server'
import type { EmailOtpType } from '@supabase/supabase-js'

import { createClient, createServiceClient, SITE_ID } from '@/lib/supabase/server'

const safeNext = (value: string | null) =>
  value && value.startsWith('/') && !value.startsWith('//') ? value : '/account'

/**
 * Finishes a magic-link sign-in: exchanges the code for a session cookie,
 * makes sure a profile row exists for this site, then sends the customer on.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const tokenHash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = safeNext(searchParams.get('next'))

  if (!code && !(tokenHash && type)) {
    return NextResponse.redirect(new URL('/login?error=link', origin))
  }

  const supabase = await createClient()

  const { error } = code
    ? await supabase.auth.exchangeCodeForSession(code)
    : await supabase.auth.verifyOtp({ token_hash: tokenHash!, type: type! })

  if (error) {
    return NextResponse.redirect(new URL('/login?error=expired', origin))
  }

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (user?.id && user.email) {
    const service = createServiceClient()
    const { data: existing } = await service.from('profiles').select('id').eq('id', user.id).maybeSingle()

    if (!existing) {
      await service.from('profiles').insert({ id: user.id, email: user.email, site_id: SITE_ID, locale: 'en' })
    }
  }

  return NextResponse.redirect(new URL(next, origin))
}
