// Next Imports
import type { Metadata } from 'next'

// Component Imports
import { ForgotPasswordView } from '@/views/auth/forgot-password'

// Utils Imports
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Forgot Password',
  description: 'Reset your account password',
  url: '/forgot-password',
  noIndex: true
})

const ForgotPasswordPage = () => {
  return <ForgotPasswordView />
}

export default ForgotPasswordPage
