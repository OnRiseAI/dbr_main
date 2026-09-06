import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

const PROTECTED = ['/account', '/checkout']
const AUTH_ONLY_WHEN_SIGNED_OUT = ['/login', '/register']

/**
 * Keeps the customer session fresh on every request and guards the client area:
 * signed-out visitors to /account go to /login (and come back afterwards); signed-in
 * visitors to /login or /register go to their account.
 */
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request })

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

  if (!url || !key) return response

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: toSet => {
        toSet.forEach(({ name, value }) => request.cookies.set(name, value))
        response = NextResponse.next({ request })
        toSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
      }
    }
  })

  const {
    data: { user }
  } = await supabase.auth.getUser()

  const { pathname, search } = request.nextUrl

  if (!user && PROTECTED.some(p => pathname === p || pathname.startsWith(`${p}/`))) {
    const login = request.nextUrl.clone()

    login.pathname = '/login'
    login.search = `?next=${encodeURIComponent(pathname + search)}`

    return NextResponse.redirect(login)
  }

  if (user && AUTH_ONLY_WHEN_SIGNED_OUT.includes(pathname)) {
    const account = request.nextUrl.clone()

    account.pathname = '/account'
    account.search = ''

    return NextResponse.redirect(account)
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images/|api/|.*\\.(?:svg|png|jpg|jpeg|webp|gif|ico|txt|xml)$).*)']
}
