// Next Imports
import type { Metadata } from 'next'

// Component Imports
import { LoginView } from '@/views/auth/login'

// Utils Imports
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Login',
  description: 'Login to your account',
  url: '/login',
  noIndex: true
})

const LoginPage = () => {
  return <LoginView />
}

export default LoginPage
