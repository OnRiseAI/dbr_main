// Next Imports
import Link from 'next/link'

// Component Imports
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
            <CardTitle className='mb-2 text-2xl font-semibold'>Welcome back</CardTitle>
            <CardDescription className='text-base'>Sign in to your Deep Beauty Research account.</CardDescription>
          </div>
        </CardHeader>

        <CardContent className='px-4 sm:px-6'>

          {/* Login Form */}
          <div className='space-y-4'>
            <LoginForm />

            <p className='text-muted-foreground text-center text-base'>
              First order with us?{' '}
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
