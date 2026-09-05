import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * Cookie-backed Supabase client for Server Components, route handlers and
 * server actions. Uses the publishable key, so every query runs under the
 * signed-in user's row-level security.
 */
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
          } catch {
            // Server Components cannot set cookies; the proxy refreshes sessions.
          }
        }
      }
    }
  )
}

/** Service-role client. Server only. Used where RLS has no self policy (profile upsert on first sign-in, marketing opt-out). */
export function createServiceClient() {
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SECRET_KEY!, {
    cookies: {
      getAll() {
        return []
      },
      setAll() {}
    }
  })
}

export const SITE_ID = process.env.NEXT_PUBLIC_SITE_ID?.trim() || 'deep-beauty-research'
