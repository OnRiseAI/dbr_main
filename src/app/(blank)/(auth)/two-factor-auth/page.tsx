// Next Imports
import type { Metadata } from 'next'

// Component Imports
import { TwoFactorAuthView } from '@/views/auth/two-factor-auth'

// Utils Imports
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Two Factor Authentication',
  description: 'Verify your identity with a security code',
  url: '/two-factor-auth',
  noIndex: true
})

const TwoFactorAuthPage = () => {
  return <TwoFactorAuthView />
}

export default TwoFactorAuthPage
