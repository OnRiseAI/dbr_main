import { createClient } from '@supabase/supabase-js'

/**
 * Anonymous, server-side Supabase client for public reads (the products table has a
 * public-read policy). No cookies, no session: this is for catalogue data only.
 * Customer and admin access go through their own clients when auth is wired.
 */
export const SITE_ID = process.env.NEXT_PUBLIC_SITE_ID?.trim() || 'deep-beauty-research'

export const hasSupabase = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
)

export function createPublicClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false }
  })
}
