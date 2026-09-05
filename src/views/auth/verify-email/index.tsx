// Next Imports
import Link from 'next/link'

// Component Imports
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import AuthLogo from '@/views/auth/auth-logo'

const VerifyEmailView = () => {
  return (
    <div className='relative flex h-auto min-h-screen items-center justify-center overflow-x-hidden px-4 py-10 sm:px-6 lg:px-8'>
      <Card className='z-1 w-full gap-6 py-6 sm:max-w-md'>
        <CardHeader className='justify-center gap-6 px-6'>
          <AuthLogo />

          <div className='text-center'>
            <CardTitle className='mb-2 text-2xl font-semibold'>Verify your email</CardTitle>
            <CardDescription className='text-base'>
              An activation link has been sent to your email address: hello@example.com. Please check your inbox and
              click on the link to complete the activation process.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className='space-y-4 px-6'>
          <Button size='lg' className='w-full' render={<Link href='/' />} nativeButton={false}>
            Skip for now
          </Button>

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

export { VerifyEmailView }
export default VerifyEmailView
