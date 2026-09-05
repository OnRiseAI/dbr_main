// Next Imports
import Link from 'next/link'

// Third-party Imports
import { ChevronLeft } from 'lucide-react'

const AuthBackToLogin = () => {
  return (
    <Link href='/login' className='text-primary group flex items-center justify-center gap-2 font-normal'>
      <ChevronLeft className='size-5 transition-transform group-hover:-translate-x-1' />
      Back to login
    </Link>
  )
}

export default AuthBackToLogin
