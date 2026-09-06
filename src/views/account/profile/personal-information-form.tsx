'use client'

// React Imports
import { useState, useTransition } from 'react'

// Next Imports
import { useRouter } from 'next/navigation'

// Third-party Imports
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Type Imports
import type { Profile } from '@/lib/account/data'

// Component Imports
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

// Server Actions
import { updateProfile } from '@/lib/account/actions'

const schema = z.object({
  firstName: z.string().trim().min(1, 'Please enter your first name.').max(80),
  lastName: z.string().trim().min(1, 'Please enter your last name.').max(80),
  phone: z.string().trim().max(40)
})

type Values = z.infer<typeof schema>

const PersonalInformationForm = ({ profile }: { profile: Profile }) => {
  const router = useRouter()
  const [pending, start] = useTransition()
  const [note, setNote] = useState<{ ok: boolean; text: string } | null>(null)

  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { firstName: profile.firstName, lastName: profile.lastName, phone: profile.phone }
  })

  const onSubmit = (values: Values) =>
    start(async () => {
      const result = await updateProfile(values)

      setNote(result.ok ? { ok: true, text: 'Saved.' } : { ok: false, text: result.error })
      if (result.ok) router.refresh()
    })

  return (
    <div>
      <h3 className='mb-3.5 text-xl font-semibold'>Personal Information</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='mb-4 grid items-start gap-x-5 gap-y-4 sm:grid-cols-2'>
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem className='gap-3.5'>
                  <FormLabel className='gap-0 leading-5'>
                    First name <span className='text-destructive'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input autoComplete='given-name' {...field} className='input-lg' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => (
                <FormItem className='gap-3.5'>
                  <FormLabel className='gap-0 leading-5'>
                    Last name <span className='text-destructive'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input autoComplete='family-name' {...field} className='input-lg' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem className='gap-3.5'>
              <FormLabel className='leading-5'>Email address</FormLabel>
              <Input value={profile.email} readOnly className='input-lg' />
              <FormDescription>Your email is your sign-in. Contact us if it needs to change.</FormDescription>
            </FormItem>
            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem className='gap-3.5'>
                  <FormLabel className='leading-5'>Phone number</FormLabel>
                  <FormControl>
                    <Input type='tel' autoComplete='tel' placeholder='+49 …' {...field} className='input-lg' />
                  </FormControl>
                  <FormDescription>Used by the courier if a delivery needs arranging.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex items-center justify-end gap-4'>
            {note ? <p className={note.ok ? 'text-sm text-emerald-700' : 'text-destructive text-sm'}>{note.text}</p> : null}
            <Button type='submit' size='lg' disabled={pending}>
              {pending ? 'Saving…' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default PersonalInformationForm
