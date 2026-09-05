'use client'

// React Imports
import type { KeyboardEvent } from 'react'
import { useRef } from 'react'

// Next Imports
import { useRouter } from 'next/navigation'

// Third-party Imports
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

// Type Imports
import type { TwoFactorAuthFormValues } from '@/views/auth/two-factor-auth/two-factor-auth-schema'

// Component Imports
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { twoFactorAuthSchema } from '@/views/auth/two-factor-auth/two-factor-auth-schema'

const CODE_LENGTH = 6

const TwoFactorAuthForm = () => {
  const router = useRouter()
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const form = useForm<TwoFactorAuthFormValues>({
    resolver: zodResolver(twoFactorAuthSchema),
    defaultValues: { code: '' }
  })

  const onSubmit = () => {
    router.push('/account')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='code'
          render={({ field }) => {
            const digits = field.value.split('')

            const handleChange = (index: number, rawValue: string) => {
              const digit = rawValue.replace(/\D/g, '').slice(-1)
              const nextDigits = [...digits]

              nextDigits[index] = digit

              const nextValue = nextDigits.join('').slice(0, CODE_LENGTH)

              field.onChange(nextValue)

              if (digit && index < CODE_LENGTH - 1) {
                inputRefs.current[index + 1]?.focus()
              }
            }

            const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
              if (event.key === 'Backspace' && !digits[index] && index > 0) {
                inputRefs.current[index - 1]?.focus()
              }
            }

            return (
              <FormItem className='mb-4 gap-4'>
                <FormLabel className='text-muted-foreground justify-center text-base font-normal'>
                  Type your 6 digit security code
                </FormLabel>
                <FormControl>
                  <div className='flex items-center justify-center gap-2 sm:gap-3'>
                    {Array.from({ length: CODE_LENGTH }).map((_, index) => (
                      <Input
                        key={index}
                        ref={el => {
                          inputRefs.current[index] = el
                        }}
                        value={digits[index] ?? ''}
                        onChange={e => handleChange(index, e.target.value)}
                        onKeyDown={e => handleKeyDown(index, e)}
                        inputMode='numeric'
                        maxLength={1}
                        className='size-8 rounded-lg text-center sm:size-9'
                      />
                    ))}
                  </div>
                </FormControl>
                <FormMessage className='justify-center text-center' />
              </FormItem>
            )
          }}
        />
        <Button type='submit' size='lg' className='w-full'>
          Verify My Account
        </Button>
      </form>
    </Form>
  )
}

export { TwoFactorAuthForm }
export default TwoFactorAuthForm
