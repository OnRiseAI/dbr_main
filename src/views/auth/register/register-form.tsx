'use client'

// Next Imports
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// Third-party Imports
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

// Type Imports
import type { RegisterFormValues } from '@/views/auth/register/register-schema'

// Component Imports
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import PasswordInput from '@/views/account/profile/password-input'
import { registerSchema } from '@/views/auth/register/register-schema'

// Utils Imports
import { cn } from '@/lib/utils'

const RegisterForm = () => {
  const router = useRouter()

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: '', password: '', confirmPassword: '', agree: false }
  })

  const onSubmit = () => {
    // TODO: wire up account creation
    router.push('/verify-email')
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
                <Input type='email' placeholder='Enter your email address' {...field} className='input-lg' />
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
        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='gap-0'>
                Confirm Password<span className='top-0 text-base'>*</span>
              </FormLabel>
              <FormControl>
                <PasswordInput placeholder='············' {...field} className='input-lg' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='agree'
          render={({ field, fieldState }) => (
            <FormItem className='flex flex-row items-start gap-2'>
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} className='mt-0.5 size-6' />
              </FormControl>
              <div className='flex flex-col gap-1'>
                <FormLabel className='text-muted-foreground gap-1 font-medium'>
                  I agree to
                  <Button
                    variant='link'
                    size='sm'
                    className={cn('h-auto p-0 text-sm font-medium', fieldState.error && 'text-destructive')}
                    render={<Link href='/privacy-policy' />}
                    nativeButton={false}
                  >
                    privacy policy & terms
                  </Button>
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <Button type='submit' size='lg' className='w-full'>
          Sign Up
        </Button>
      </form>
    </Form>
  )
}

export { RegisterForm }
export default RegisterForm
