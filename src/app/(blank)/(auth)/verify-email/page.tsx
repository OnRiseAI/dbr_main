// Next Imports
import type { Metadata } from 'next'

// Component Imports
import { VerifyEmailView } from '@/views/auth/verify-email'

// Utils Imports
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Verify Email',
  description: 'Verify your email address to activate your account',
  url: '/verify-email',
  noIndex: true
})

const VerifyEmailPage = () => {
  return <VerifyEmailView />
}

export default VerifyEmailPage
