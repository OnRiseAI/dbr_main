// Next Imports
import type { Metadata } from 'next'

// Component Imports
import { ResetPasswordView } from '@/views/auth/reset-password'

// Utils Imports
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Reset Password',
  description: 'Set a new password for your account',
  url: '/reset-password',
  noIndex: true
})

const ResetPasswordPage = () => {
  return <ResetPasswordView />
}

export default ResetPasswordPage
