'use client'

import { createBrowserClient } from '@supabase/ssr'

/** Browser Supabase client; the session lives in cookies so server components see it too. */
export function createClient() {
  return createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!)
}
