import Link from 'next/link'

const AuthLogo = () => (
  <Link href='/' className='flex items-center justify-center' aria-label='Deep Beauty Research'>
    <img src='/images/brands/dbr-logo.svg' alt='Deep Beauty Research' className='h-6 w-auto dark:invert' />
  </Link>
)

export default AuthLogo
