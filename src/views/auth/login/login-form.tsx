'use client'

// Next Imports
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// Third-party Imports
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

// Type Imports
import type { LoginFormValues } from '@/views/auth/login/login-schema'

// Component Imports
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import PasswordInput from '@/views/account/profile/password-input'
import { loginSchema } from '@/views/auth/login/login-schema'

const LoginForm = () => {
  const router = useRouter()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', rememberMe: false }
  })

  const onSubmit = () => {
    // Auth is not wired yet: the client area runs on demo data.
    router.push('/account')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='gap-0'>
                Email<span className='top-0 text-base'>*</span>
              </FormLabel>
              <FormControl>
                <Input type='email' placeholder='Enter your email address' className='input-lg' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='gap-0'>
                Password<span className='top-0 text-base'>*</span>
              </FormLabel>
              <FormControl>
                <PasswordInput placeholder='············' {...field} className='input-lg' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex items-center justify-between gap-2'>
          <FormField
            control={form.control}
            name='rememberMe'
            render={({ field }) => (
              <FormItem className='flex flex-row items-center gap-2'>
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} className='size-6' />
                </FormControl>
                <FormLabel className='text-muted-foreground text-sm leading-6'>Remember Me</FormLabel>
              </FormItem>
            )}
          />
          <Link href='/forgot-password' className='text-primary text-base font-normal'>
            Forgot Password?
          </Link>
        </div>
        <Button type='submit' size='lg' className='w-full'>
          Sign in
        </Button>
      </form>
    </Form>
  )
}

export default LoginForm
