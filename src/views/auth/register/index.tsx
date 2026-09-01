// Next Imports
import Link from 'next/link'

// Component Imports
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import AuthLogo from '@/views/auth/auth-logo'
import RegisterForm from '@/views/auth/register/register-form'

const RegisterView = () => {
  return (
    <div className='relative flex h-auto min-h-screen items-center justify-center overflow-x-hidden px-4 py-10 sm:px-6 lg:px-8'>
      <Card className='z-1 w-full gap-6 py-6 sm:max-w-lg'>
        <CardHeader className='justify-center gap-6 px-6'>
          <AuthLogo />

          <div className='text-center'>
            <CardTitle className='mb-2 text-2xl font-semibold'>Sign Up to Shopix</CardTitle>
            <CardDescription className='text-base'>Please enter your details to sign in</CardDescription>
          </div>
        </CardHeader>

        <CardContent className='px-6'>
          {/* Quick Register Buttons */}
          <div className='mb-4 flex flex-wrap gap-4 sm:mb-6 sm:gap-2.5'>
            <Button variant='outline' className='grow' render={<a href='#' />} nativeButton={false}>
              <img src='/images/brands/auth-google.webp' alt='Google logo' />
            </Button>
            <Button variant='outline' className='grow' render={<a href='#' />} nativeButton={false}>
              <img src='/images/brands/auth-facebook.webp' alt='Facebook logo' />
            </Button>
          </div>

          <div className='mb-4 flex items-center gap-4 sm:mb-6'>
            <Separator className='flex-1' />
            <p className='text-base'>or</p>
            <Separator className='flex-1' />
          </div>

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
