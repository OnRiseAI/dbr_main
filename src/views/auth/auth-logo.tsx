// Next Imports
import Link from 'next/link'

// SVGs Imports
import Logo from '@/assets/svg/logo'

const AuthLogo = () => {
  return (
    <Link href='/' className='flex items-center justify-center gap-2'>
      <Logo className='text-primary size-7' />
      <span className='text-xl leading-6.5 font-semibold'>Shopix</span>
    </Link>
  )
}

export default AuthLogo
