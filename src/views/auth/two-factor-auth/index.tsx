// Component Imports
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import AuthLogo from '@/views/auth/auth-logo'
import TwoFactorAuthForm from '@/views/auth/two-factor-auth/two-factor-auth-form'

const TwoFactorAuthView = () => {
  return (
    <div className='relative flex h-auto min-h-screen items-center justify-center overflow-x-hidden px-4 py-10 sm:px-6 lg:px-8'>
      <Card className='z-1 w-full gap-6 py-6 sm:max-w-md'>
        <CardHeader className='justify-center gap-6 px-6'>
          <AuthLogo />

          <div className='text-center'>
            <CardTitle className='mb-2 text-2xl font-semibold'>Two Factor Authentication</CardTitle>
            <CardDescription className='text-base'>
              We sent a verification code to your inbox. Enter the code from the inbox in the field below.{' '}
              <span className='font-semibold'>******1234</span>
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className='space-y-4 px-6'>
          {/* Two Factor Auth Form */}
          <TwoFactorAuthForm />

          <p className='text-muted-foreground text-center text-base'>
            Didn&apos;t get the mail?{' '}
            <Button variant='link' size='sm' className='h-auto p-0 text-base hover:no-underline'>
              Resend
            </Button>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export { TwoFactorAuthView }
export default TwoFactorAuthView
