// Next Imports
import type { Metadata } from 'next'

// Component Imports
import { RegisterView } from '@/views/auth/register'

// Utils Imports
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Register',
  description: 'Create a new account',
  url: '/register',
  noIndex: true
})

const RegisterPage = () => {
  return <RegisterView />
}

export default RegisterPage
