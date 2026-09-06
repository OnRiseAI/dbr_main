import { NextResponse, type NextRequest } from 'next/server'

import { SITE_ID, createServiceClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Same contract as the existing shop (app.deepbeautyresearch.com), so the customers who
 * already have accounts keep working here:
 *  - unknown email: create the account with this password (registration)
 *  - known email whose password was never set (older sign-in-link accounts): set it once
 *  - known email with a password already: refuse, the caller shows "wrong password"
 * Never overwrites a password that is already set.
 */
export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as {
    email?: unknown
    password?: unknown
    firstName?: unknown
    lastName?: unknown
  } | null

  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : ''
  const password = typeof body?.password === 'string' ? body.password : ''
  const firstName = typeof body?.firstName === 'string' ? body.firstName.trim().slice(0, 80) : ''
  const lastName = typeof body?.lastName === 'string' ? body.lastName.trim().slice(0, 80) : ''

  if (!EMAIL.test(email)) return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 })
  if (password.length < 8) return NextResponse.json({ error: 'Use at least 8 characters for your password.' }, { status: 400 })

  const service = createServiceClient()
  const now = new Date().toISOString()

  const { data: existingProfile } = await service.from('profiles').select('id').ilike('email', email).maybeSingle()
  const existingId = (existingProfile as { id: string } | null)?.id
  const existing = existingId ? (await service.auth.admin.getUserById(existingId)).data.user : null

  const names = {
    ...(firstName ? { first_name: firstName } : {}),
    ...(lastName ? { last_name: lastName } : {})
  }

  if (!existing) {
    const created = await service.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { site_id: SITE_ID, source: 'storefront_register', password_set: true, password_set_at: now }
    })

    if (created.error || !created.data.user) {
      const msg = created.error?.message.toLowerCase() ?? ''

      if (/already|registered|exists/.test(msg)) {
        return NextResponse.json({ error: 'Wrong email or password.', code: 'password_already_set' }, { status: 401 })
      }

      return NextResponse.json({ error: 'Could not create your account.' }, { status: 500 })
    }

    await service
      .from('profiles')
      .upsert({ id: created.data.user.id, email, site_id: SITE_ID, updated_at: now, ...names }, { onConflict: 'id' })

    return NextResponse.json({ ok: true, mode: 'created' })
  }

  const meta = (existing.user_metadata ?? {}) as Record<string, unknown>

  if (meta.password_set === true) {
    return NextResponse.json({ error: 'Wrong email or password.', code: 'password_already_set' }, { status: 401 })
  }

  const { error } = await service.auth.admin.updateUserById(existing.id, {
    password,
    email_confirm: true,
    user_metadata: { ...meta, password_set: true, password_set_at: now, site_id: meta.site_id ?? SITE_ID }
  })

  if (error) return NextResponse.json({ error: 'Could not set a password for this account.' }, { status: 500 })

  await service.from('profiles').upsert({ id: existing.id, email, site_id: SITE_ID, updated_at: now, ...names }, { onConflict: 'id' })

  return NextResponse.json({ ok: true, mode: 'password_set' })
}
