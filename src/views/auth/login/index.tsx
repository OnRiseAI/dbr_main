// Next Imports
import Link from 'next/link'

// Component Imports
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import AuthLogo from '@/views/auth/auth-logo'
import LoginForm from '@/views/auth/login/login-form'

const LoginView = () => {
  return (
    <div className='relative flex h-auto min-h-screen items-center justify-center overflow-x-hidden px-4 py-10 sm:px-6 lg:px-8'>
      <Card className='z-1 w-full gap-6 py-4 sm:max-w-lg sm:py-6'>
        <CardHeader className='justify-center gap-6 px-6'>
          <AuthLogo />

          <div className='text-center'>
            <CardTitle className='mb-2 text-2xl font-semibold'>Welcome Back</CardTitle>
            <CardDescription className='text-base'>Ship Faster and Focus on Growth.</CardDescription>
          </div>
        </CardHeader>

        <CardContent className='px-4 sm:px-6'>
          {/* Quick Login Buttons */}
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

          {/* Login Form */}
          <div className='space-y-4'>
            <LoginForm />

            <p className='text-muted-foreground text-center text-base'>
              New on our platform?{' '}
              <Link href='/register' className='text-card-foreground hover:underline'>
                Create an account
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export { LoginView }
