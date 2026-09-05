import type { Metadata } from 'next'

import LoginView from '@/views/pages/auth/login-view'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Sign in',
  description: 'Sign in to Deep Beauty Research with a link sent to your email.',
  url: '/login'
})

type Props = {
  searchParams: Promise<{ next?: string; error?: string }>
}

const LoginPage = async ({ searchParams }: Props) => {
  const { next, error } = await searchParams

  return <LoginView next={next} error={error} />
}

export default LoginPage
