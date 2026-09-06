import 'server-only'

import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'

export { SITE_ID, hasSupabase } from '@/lib/supabase/public'

/**
 * Supabase client bound to the signed-in customer's cookies. Row security does the rest:
 * a customer only ever sees their own profile, addresses and orders.
 */
export async function createServerSupabase() {
  const cookieStore = await cookies()

  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: toSet => {
        try {
          toSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {
          // Server components cannot write cookies; the proxy refreshes the session instead.
        }
      }
    }
  })
}

/** Service-role client for the few server-only jobs that must bypass row security (account creation). */
export function createServiceClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SECRET_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false }
  })
}

/** The signed-in auth user, or null. Verified against Supabase, not just read from the cookie. */
export async function getSessionUser() {
  const supabase = await createServerSupabase()
  const { data } = await supabase.auth.getUser()

  return data.user ?? null
}
