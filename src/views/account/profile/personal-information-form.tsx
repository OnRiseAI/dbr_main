'use client'

// Third-party Imports
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Component Imports
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const genderItems = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' }
]

const personalInformationSchema = z.object({
  firstName: z.string().min(1, 'Please enter your First name.'),
  lastName: z.string().min(1, 'Please enter your Last name.'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(1, 'Please enter your Phone Number.'),
  birthday: z.string().min(1, 'Please select your DOB'),
  gender: z.string().min(1, 'Please select your gender')
})

type PersonalInformationValues = z.infer<typeof personalInformationSchema>

const PersonalInformationForm = () => {
  const form = useForm<PersonalInformationValues>({
    resolver: zodResolver(personalInformationSchema),
    defaultValues: { firstName: '', lastName: '', email: '', phone: '', birthday: '', gender: 'male' }
  })

  const onSubmit = () => {
    // TODO: persist personal information
  }

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
                    <Input placeholder='John' {...field} className='input-lg' />
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
                    <Input placeholder='Doe' {...field} className='input-lg' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='gap-3.5'>
                  <FormLabel className='gap-0 leading-5'>
                    Email Address <span className='text-destructive'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type='email' placeholder='John@gmail.com' {...field} className='input-lg' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem className='gap-3.5'>
                  <FormLabel className='gap-0 leading-5'>
                    Phone Number <span className='text-destructive'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type='tel' placeholder='123-456-7890' {...field} className='input-lg' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='birthday'
              render={({ field }) => (
                <FormItem className='gap-3.5'>
                  <FormLabel className='gap-0 leading-5'>
                    Birthday <span className='text-destructive'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder='DD-MM-YYYY' {...field} className='input-lg' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='gender'
              render={({ field }) => (
                <FormItem className='gap-3.5'>
                  <FormLabel className='gap-0 leading-5'>
                    Gender <span className='text-destructive'>*</span>
                  </FormLabel>
                  <Select items={genderItems} value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className='input-lg w-full'>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {genderItems.map(item => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
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

export default PersonalInformationForm
