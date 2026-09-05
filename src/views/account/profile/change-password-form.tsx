'use client'

// Third-party Imports
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Component Imports
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import PasswordInput from '@/views/account/profile/password-input'

const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, 'Please enter a valid password'),
    newPassword: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password')
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  })

type ChangePasswordValues = z.infer<typeof changePasswordSchema>

const ChangePasswordForm = () => {
  const form = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { oldPassword: '', newPassword: '', confirmPassword: '' }
  })

  const onSubmit = () => {
    // TODO: update password
  }

  return (
    <div>
      <h3 className='mb-3.5 text-xl font-semibold'>Change Password</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='mb-4 grid items-start gap-x-5 gap-y-4 sm:grid-cols-2'>
            <FormField
              control={form.control}
              name='oldPassword'
              render={({ field }) => (
                <FormItem className='gap-3.5'>
                  <FormLabel className='gap-0 leading-5'>
                    Old Password <span className='text-destructive'>*</span>
                  </FormLabel>
                  <FormControl>
                    <PasswordInput placeholder='Enter password' {...field} className='input-lg' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='newPassword'
              render={({ field }) => (
                <FormItem className='gap-3.5'>
                  <FormLabel className='gap-0 leading-5'>
                    New Password <span className='text-destructive'>*</span>
                  </FormLabel>
                  <FormControl>
                    <PasswordInput placeholder='Enter password' {...field} className='input-lg' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem className='gap-3.5 sm:col-span-2'>
                  <FormLabel className='gap-0 leading-5'>
                    Confirm Password <span className='text-destructive'>*</span>
                  </FormLabel>
                  <FormControl>
                    <PasswordInput placeholder='Enter password' {...field} className='input-lg' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex justify-end'>
            <Button type='submit' size='lg'>
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default ChangePasswordForm
