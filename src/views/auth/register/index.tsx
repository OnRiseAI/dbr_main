// Next Imports
import Link from 'next/link'

// Component Imports
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import AuthLogo from '@/views/auth/auth-logo'
import RegisterForm from '@/views/auth/register/register-form'

const RegisterView = () => {
  return (
    <div className='relative flex h-auto min-h-screen items-center justify-center overflow-x-hidden px-4 py-10 sm:px-6 lg:px-8'>
      <Card className='z-1 w-full gap-6 py-6 sm:max-w-lg'>
        <CardHeader className='justify-center gap-6 px-6'>
          <AuthLogo />

          <div className='text-center'>
            <CardTitle className='mb-2 text-2xl font-semibold'>Create your account</CardTitle>
            <CardDescription className='text-base'>Orders, addresses and saved products in one place.</CardDescription>
          </div>
        </CardHeader>

        <CardContent className='px-6'>

          {/* Register Form */}
          <div className='space-y-4'>
            <RegisterForm />

            <p className='text-muted-foreground text-center text-base'>
              Already have an account?{' '}
              <Link href='/login' className='text-card-foreground hover:underline'>
                Log in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export { RegisterView }
export default RegisterView
