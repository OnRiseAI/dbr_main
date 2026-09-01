'use client'

// React Imports
import { useEffect, useState, type ReactElement } from 'react'

// Third-party Imports
import { z } from 'zod'
import Cards from 'react-19-credit-card'
import { usePaymentInputs } from 'react-payment-inputs'
import { CreditCardIcon } from 'lucide-react'

// Component Imports
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

// Utils Imports
import { cn } from '@/lib/utils'

// Styles Imports
import 'react-19-credit-card/dist/es/index.css'

const cardSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  number: z.string().min(13, 'Card number is invalid'),
  expiry: z.string().min(1, 'Expiry date is required'),
  cvc: z.string().min(1, 'CVC is required')
})

type CardFormData = z.infer<typeof cardSchema>

type Props = {
  trigger: ReactElement
  defaultOpen?: boolean
  className?: string
  editingCard?: {
    id: string
    number?: string
    expiry?: string
    cvc?: string
    name?: string
  }
  onSave?: (card: any) => void
  onOpenChange?: (open: boolean) => void
}

const AddCardForm = ({ defaultOpen = false, trigger, className, editingCard, onSave, onOpenChange }: Props) => {
  const [open, setOpen] = useState(defaultOpen || !!editingCard)

  const [state, setState] = useState({
    number: editingCard?.number || '',
    expiry: editingCard?.expiry || '',
    cvc: editingCard?.cvc || '',
    name: editingCard?.name || '',
    focus: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = (): boolean => {
    try {
      cardSchema.parse({
        name: state.name,
        number: state.number.replace(/\s/g, ''),
        expiry: state.expiry,
        cvc: state.cvc
      } as CardFormData)
      setErrors({})

      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {}

        error.errors.forEach(err => {
          const path = err.path[0] as string

          newErrors[path] = err.message
        })
        setErrors(newErrors)
      }

      return false
    }
  }

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    onOpenChange?.(newOpen)

    if (!newOpen) {
      setErrors({})
      setState({
        number: '',
        expiry: '',
        cvc: '',
        name: '',
        focus: ''
      })
    }
  }

  useEffect(() => {
    if (editingCard?.id) {
      // Opening dialog when edit is clicked - setState in effect is intentional here
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpen(true)
      setState({
        number: editingCard.number || '',
        expiry: editingCard.expiry || '',
        cvc: editingCard.cvc || '',
        name: editingCard.name || '',
        focus: ''
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingCard?.id])

  //@ts-expect-error untyped event from payment input
  const handleInputChange = evt => {
    const { name, value } = evt.target

    setState(prev => ({ ...prev, [name]: value }))

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }

        delete newErrors[name]

        return newErrors
      })
    }
  }

  //@ts-expect-error untyped event from payment input
  const handleInputFocus = evt => {
    setState(prev => ({ ...prev, focus: evt.target.name }))
  }

  const { getCardNumberProps, getExpiryDateProps, getCVCProps } = usePaymentInputs()

  const getFormattedExpiry = (expiry: string) => {
    const cleanExpiry = expiry.replace(/\s/g, '')

    return cleanExpiry
  }

  const handleSubmit = () => {
    if (validateForm()) {
      onSave?.(state)
      handleOpenChange(false)
    }
  }

  const isEditMode = !!editingCard

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={trigger} onClick={() => setOpen(true)} nativeButton={false} />
      <DialogContent className={cn('sm:max-w-155 [&>[data-slot=dialog-close]>svg]:size-5', className)}>
        <DialogHeader className='flex-row items-center gap-4 text-left'>
          <Avatar className='size-11 shrink-0 rounded-md after:rounded-md'>
            <AvatarFallback className='text-foreground rounded-md border bg-transparent'>
              <CreditCardIcon className='size-6' />
            </AvatarFallback>
          </Avatar>
          <div className='space-y-2'>
            <DialogTitle className='m-0 text-lg'>
              {isEditMode ? 'Edit Payment Method' : 'Add Payment Method'}
            </DialogTitle>
            <DialogDescription className='text-sm'>
              {isEditMode ? 'Update your payment method details' : 'Add a payment method to active plan'}
            </DialogDescription>
          </div>
        </DialogHeader>

        {/* Credit card */}
        <div className='bg-muted flex items-center justify-center rounded-lg p-6 max-[420px]:p-2 sm:min-h-82.5 max-[420px]:[&>div]:w-full! max-[420px]:[&>div>div]:w-full!'>
          <Cards
            number={state.number}
            expiry={getFormattedExpiry(state.expiry)}
            cvc={state.cvc}
            name={state.name}
            focused={state.focus as 'name' | 'number' | 'expiry' | 'cvc' | undefined}
          />
        </div>

        <div className='grid grid-cols-4 gap-4'>
          <div className='col-span-3 space-y-2 max-sm:col-span-4'>
            <Label htmlFor='username'>Name on card</Label>
            <Input
              id='username'
              type='text'
              name='name'
              placeholder='John Doe'
              value={state.name}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              className={errors.name ? 'border-destructive' : ''}
            />
            {errors.name && <p className='text-destructive text-sm'>{errors.name}</p>}
          </div>

          <div className='space-y-2 max-sm:col-span-4'>
            <Label htmlFor='expiry-date'>Expiry</Label>
            <Input
              {...getExpiryDateProps({ onChange: handleInputChange, onFocus: handleInputFocus })}
              id='expiry-date'
              name='expiry'
              value={state.expiry}
              placeholder='MM/YY'
              className={errors.expiry ? 'border-destructive' : ''}
            />
            {errors.expiry && <p className='text-destructive text-sm'>{errors.expiry}</p>}
          </div>

          <div className='col-span-3 space-y-2 max-sm:col-span-4'>
            <Label htmlFor='card-number'>Card number</Label>
            <Input
              {...getCardNumberProps()}
              id='card-number'
              name='number'
              value={state.number}
              placeholder='1234 5678 9012 3456'
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              className={errors.number ? 'border-destructive' : ''}
            />
            {errors.number && <p className='text-destructive text-sm'>{errors.number}</p>}
          </div>

          <div className='space-y-2 max-sm:col-span-4'>
            <Label htmlFor='cvc'>CVC</Label>
            <Input
              {...getCVCProps()}
              id='cvc'
              name='cvc'
              placeholder='CVC'
              value={state.cvc}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              className={errors.cvc ? 'border-destructive' : ''}
            />
            {errors.cvc && <p className='text-destructive text-sm'>{errors.cvc}</p>}
          </div>
        </div>

        <div className='flex flex-col-reverse gap-4 sm:flex-row sm:justify-end'>
          <DialogClose render={<Button variant='outline' size='lg' />}>Cancel</DialogClose>
          <Button size='lg' onClick={handleSubmit}>
            {isEditMode ? 'Update card details' : 'Add card details'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddCardForm
