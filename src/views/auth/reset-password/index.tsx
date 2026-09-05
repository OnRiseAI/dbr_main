// Next Imports
import Link from 'next/link'

// Component Imports
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import AuthLogo from '@/views/auth/auth-logo'
import ResetPasswordForm from '@/views/auth/reset-password/reset-password-form'

const ResetPasswordView = () => {
  return (
    <div className='relative flex h-auto min-h-screen items-center justify-center overflow-x-hidden px-4 py-10 sm:px-6 lg:px-8'>
      <Card className='z-1 w-full gap-6 py-6 sm:max-w-md'>
        <CardHeader className='justify-center gap-6 px-6'>
          <AuthLogo />

          <div className='text-center'>
            <CardTitle className='mb-2 text-2xl font-semibold'>Reset Password</CardTitle>
            <CardDescription className='text-base'>
              Time for a fresh start! Go ahead and set a new password.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className='space-y-4 px-6'>
          {/* ResetPassword Form */}
          <ResetPasswordForm />

          <Button
            variant='outline'
            size='lg'
            className='group w-full'
            render={<Link href='/login' />}
            nativeButton={false}
          >
            Back to login
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export { ResetPasswordView }
export default ResetPasswordView
