'use client'

// React Imports
import type { ReactElement } from 'react'
import { useState } from 'react'

// Next Imports
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// Third-party Imports
import { zodResolver } from '@hookform/resolvers/zod'
import {
  DollarSignIcon,
  ChevronRightIcon,
  MapPinIcon,
  PhoneIcon,
  ShoppingCartIcon,
  XIcon,
  PlusIcon
} from 'lucide-react'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { usePaymentInputs } from 'react-payment-inputs'

// Component Imports
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Stepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperSeparator,
  StepperTitle,
  StepperTrigger
} from '@/components/ui/stepper'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import AddressForm from '@/views/account/addresses/address-form'
import OrderSummary from '@/views/pages/checkout/order-summary'

// Store Imports
import { useOrdersStore } from '@/store/orders-store'
import { useCart, useCartItems, useIsHydrated } from '@/store/use-products-store'

// Utils Imports
import { cn } from '@/lib/utils'
import { formatPrice } from '@/utils/product-utils'

// Data Imports
import {
  checkoutSchema,
  deliveryOptions,
  paymentOptions,
  type CheckoutFormValues
} from '@/views/pages/checkout/checkout-schema'
import { db as staticOrders } from '@/fake-db/orders'

type CheckoutStep = 'cart' | 'address' | 'payment'

const CHECKOUT_STEPS: {
  id: CheckoutStep
  title: string
  icon: ReactElement
}[] = [
  {
    id: 'cart',
    title: 'Cart',
    icon: <ShoppingCartIcon />
  },
  {
    id: 'address',
    title: 'Address',
    icon: <MapPinIcon />
  },
  {
    id: 'payment',
    title: 'Payment',
    icon: <DollarSignIcon />
  }
]

const generateOrderNumber = (existingOrderIds: Set<string>) => {
  let orderId: string

  do {
    orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`
  } while (existingOrderIds.has(orderId))

  return orderId
}

const getInitialOrderDate = () =>
  new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

const CheckoutView = () => {
  const router = useRouter()
  const items = useCartItems()
  const isHydrated = useIsHydrated()
  const { clearCart, removeFromCart } = useCart()
  const addOrderItems = useOrdersStore(state => state.addOrderItems)
  const userOrders = useOrdersStore(state => state.orders)

  const [currentStep, setCurrentStep] = useState<CheckoutStep>('cart')
  const [deselectedItemIds, setDeselectedItemIds] = useState<string[]>([])
  const [isRedirectingToOrders, setIsRedirectingToOrders] = useState(false)
  const [addAddressDialogOpen, setAddAddressDialogOpen] = useState(false)
  
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: 'John Doe',
      phone: '123 456 0789',
      street: '25 Union Square W',
      city: 'New York',
      country: 'us',
      zip: '10003',
      deliverySpeed: 'standard',
      paymentMethod: 'debit',
      cardNumber: '12314 4562 251',
      cardName: 'John Doe',
      cardExpiry: '',
      cardCvv: '652'
    }
  })

  const [fullName, phone, street, city, zip] = useWatch({
    control: form.control,
    name: ['fullName', 'phone', 'street', 'city', 'zip']
  })

  const watchedPaymentMethod = useWatch({
    control: form.control,
    name: 'paymentMethod'
  })

  const selectedDeliveryValue = useWatch({
    control: form.control,
    name: 'deliverySpeed'
  })

  const { getExpiryDateProps } = usePaymentInputs()

  const currentIndex = CHECKOUT_STEPS.findIndex(step => step.id === currentStep)
  const selectedItems = items.filter(item => !deselectedItemIds.includes(item.product.id))
  const selectedItemCount = selectedItems.length

  const toggleSelectedItem = (productId: string, checked: boolean) => {
    setDeselectedItemIds(current =>
      checked ? current.filter(currentId => currentId !== productId) : [...new Set([...current, productId])]
    )
  }

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId)
    setDeselectedItemIds(current => current.filter(currentId => currentId !== productId))
  }

  const goToStep = (step: CheckoutStep) => {
    const nextIndex = CHECKOUT_STEPS.findIndex(current => current.id === step)

    if (nextIndex <= currentIndex + 1) setCurrentStep(step)
  }

  const handleContinue = async () => {
    if (currentStep === 'cart') {
      setCurrentStep('address')

      return
    }

    if (currentStep === 'address') {
      const isValid = await form.trigger(['fullName', 'phone', 'street', 'city', 'country', 'zip', 'deliverySpeed'])

      if (isValid) setCurrentStep('payment')

      return
    }

    await handlePlaceOrder()
  }

  const handlePlaceOrder = form.handleSubmit(() => {
    const existingOrderIds = new Set([...userOrders, ...staticOrders].map(order => order.orderId))
    const orderId = generateOrderNumber(existingOrderIds)

    const orderItems = selectedItems.map(item => ({
      orderId,
      status: 'in-progress' as const,
      date: getInitialOrderDate(),
      title: item.product.name,
      description: item.product.name,
      image: item.product.image,
      price: item.product.price * item.quantity,
      originalPrice: item.product.originalPrice * item.quantity,
      href: item.product.href
    }))

    addOrderItems(orderItems)

    setIsRedirectingToOrders(true)
    clearCart()
    router.push('/account/orders')
  })

  if (isRedirectingToOrders) {
    return null
  }

  if (!isHydrated) {
    return (
      <div className='bg-muted mx-auto flex max-w-xl flex-col items-center rounded-xl px-8 py-16 text-center'>
        <p className='text-muted-foreground text-sm'>Loading cart...</p>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className='bg-muted flex h-128 flex-col items-center justify-center rounded-sm px-4 text-center sm:px-8'>
        <img src='/images/checkout-page/empty-bag.webp' alt='Empty cart' className='mb-6 max-w-72' />
        <h4 className='mb-2 text-xl font-semibold md:text-2xl lg:text-3xl'>Your cart is currently empty</h4>
        <p className='text-muted-foreground text-sm'>
          Start filling it with great finds, hot deals, and everyday essentials.{' '}
          <Link href='/shop' className='text-primary underline underline-offset-4'>
            Continue Shopping
          </Link>
        </p>
      </div>
    )
  }

  return (
    <Stepper
      steps={CHECKOUT_STEPS}
      value={currentStep}
      onValueChange={value => goToStep(value as CheckoutStep)}
      className='flex flex-col gap-4'
      orientation='horizontal'
    >
      <div className='bg-muted rounded-md px-4 py-8 lg:px-8'>
        <StepperNav>
          {CHECKOUT_STEPS.map((step, index) => (
            <StepperItem key={step.id} stepId={step.id} className='relative flex-1'>
              <StepperTrigger className='flex flex-col gap-2'>
                <StepperIndicator className='dark:bg-primary/10 dark:data-[state=completed]:bg-primary dark:data-[state=active]:bg-primary size-9.5 rounded-full bg-white ring-0! ring-offset-0! **:[svg]:size-5.5'>
                  {step.icon}
                </StepperIndicator>
                <StepperTitle className='text-base font-medium'>{step.title}</StepperTitle>
              </StepperTrigger>
              {CHECKOUT_STEPS.length > index + 1 && (
                <StepperSeparator className='bg-border absolute inset-x-0 top-4.5 right-[calc(-50%+24px)] left-[calc(50%+24px)] m-0' />
              )}
            </StepperItem>
          ))}
        </StepperNav>
      </div>

      <div className='grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(320px,380px)] xl:grid-cols-[minmax(0,1fr)_minmax(320px,522px)]'>
        <StepperPanel>
          <StepperContent value='cart'>
            <div className='flex flex-col gap-4'>
              <Button
                variant='outline'
                className='h-13 w-full justify-between rounded-md px-4 text-xl font-medium lg:px-6'
                render={<Link href='/account/wishlist' />}
                nativeButton={false}
              >
                Add more from Wishlist
                <ChevronRightIcon className='size-6.75' />
              </Button>

              {items.map(item => (
                <div
                  key={item.product.id}
                  className='border-border relative grid w-auto overflow-hidden rounded-xl border sm:grid-cols-[240px_minmax(0,1fr)]'
                >
                  <div className='absolute top-3 left-3 z-10'>
                    <Checkbox
                      checked={!deselectedItemIds.includes(item.product.id)}
                      onCheckedChange={checked => toggleSelectedItem(item.product.id, checked === true)}
                      aria-label={`Select ${item.product.name}`}
                      className='size-5 bg-white'
                    />
                  </div>
                  <div className='bg-muted flex h-48 items-end justify-center overflow-hidden sm:h-auto'>
                    <img src={item.product.image} alt={item.product.name} className='h-full max-h-52 object-cover' />
                  </div>
                  <div className='flex min-w-0 flex-col gap-3 p-4'>
                    <Badge
                      variant='outline'
                      className='h-6 w-fit border-green-600 py-0 text-xs font-medium text-green-600 dark:border-green-400 dark:text-green-400'
                    >
                      Delivery by 24 January 2026
                    </Badge>
                    <p className='text-sm font-medium'>Order ID: XYZ-42324234</p>
                    <div>
                      <h5 className='mb-1 text-lg font-semibold'>{item.product.brand}</h5>
                      <p className='text-muted-foreground line-clamp-2 text-sm'>{item.product.description}</p>
                    </div>
                    <p className='text-sm'>
                      Size: <span className='text-muted-foreground'>M</span> <span className='px-2'>|</span> Qty:{' '}
                      <span className='text-muted-foreground'>{item.quantity}</span> <span className='px-2'>|</span>{' '}
                      Color: <span className='text-muted-foreground'>{item.product.colors[0]?.name ?? 'Default'}</span>
                    </p>
                    <div className='flex items-center gap-1.5'>
                      <span className='text-sm font-semibold'>{formatPrice(item.product.price * item.quantity)}</span>
                      <span className='text-muted-foreground text-sm line-through'>
                        {formatPrice(item.product.originalPrice * item.quantity)}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='absolute top-4 right-4 size-5.5 hover:bg-transparent'
                    onClick={() => handleRemoveItem(item.product.id)}
                    aria-label={`Remove ${item.product.name}`}
                  >
                    <XIcon className='size-5.5' />
                  </Button>
                </div>
              ))}
            </div>
          </StepperContent>

          <StepperContent value='address'>
            <div className='flex flex-col gap-4'>
              <h5 className='text-xl font-semibold'>Select Delivery Address</h5>
              <div className='border-border rounded-lg border p-3'>
                <div className='mb-3.5 flex items-start justify-between gap-4'>
                  <div className='flex gap-2.5'>
                    <RadioGroup value='default' className='w-auto'>
                      <RadioGroupItem
                        value='default'
                        aria-label='Default address'
                        className='mt-0.5 size-5 [&_[data-slot=radio-group-indicator]>span]:size-3'
                      />
                    </RadioGroup>
                    <div>
                      <p className='text-base font-medium'>{fullName} (Default)</p>
                      <div className='text-muted-foreground mt-3.5 flex flex-col gap-0.5 text-sm'>
                        <span>Carlyle Hall</span>
                        <span>{street}</span>
                        <span>
                          {city}, NY {zip}, USA
                        </span>
                      </div>
                      <p className='text-muted-foreground mt-2 flex items-center gap-2 text-sm'>
                        <PhoneIcon className='size-3.5' /> {phone}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant='secondary'
                    className='rounded-md bg-green-600/10 text-green-600 dark:bg-green-400/10 dark:text-green-400'
                  >
                    Home
                  </Badge>
                </div>
                <div className='border-border ml-6 flex gap-4 border-t pt-3.5'>
                  <Button variant='link' size='sm' className='h-auto border-0 p-0 text-base hover:no-underline'>
                    Edit
                  </Button>
                  <Button variant='link' size='sm' className='h-auto border-0 p-0 text-base hover:no-underline'>
                    Remove
                  </Button>
                </div>
              </div>

              <h5 className='text-xl font-semibold'>Choose a delivery speed</h5>
              <RadioGroup
                value={selectedDeliveryValue}
                onValueChange={value => form.setValue('deliverySpeed', value as CheckoutFormValues['deliverySpeed'])}
                className='grid gap-3 sm:grid-cols-3'
              >
                {deliveryOptions.map((option, index) => (
                  <Label key={option.value} htmlFor={`delivery-${option.value}`} className='flex items-start gap-2'>
                    <RadioGroupItem id={`delivery-${option.value}`} value={option.value} className='mt-0.5' />
                    <span className='flex min-w-0 flex-col gap-0.5'>
                      <span className='flex items-center gap-0.5 text-sm font-medium'>
                        {option.title}
                        <Badge
                          variant='secondary'
                          className={cn(
                            'h-5 rounded-md py-0',
                            index === 0
                              ? 'bg-green-600/10 text-green-600 dark:bg-green-400/10 dark:text-green-400'
                              : 'bg-sky-600/10 text-sky-600 dark:bg-sky-400/10 dark:text-sky-400'
                          )}
                        >
                          {option.price}
                        </Badge>
                      </span>
                      <span className='text-muted-foreground text-sm font-normal'>{option.subtitle}</span>
                    </span>
                  </Label>
                ))}
              </RadioGroup>

              <Dialog open={addAddressDialogOpen} onOpenChange={setAddAddressDialogOpen}>
                <DialogTrigger
                  render={
                    <Button
                      variant='link'
                      className='bg-muted border-border flex h-13 items-center justify-start gap-1 rounded-md px-4! py-3! text-xl font-medium hover:no-underline'
                    />
                  }
                >
                  <PlusIcon className='size-6.75' />
                  Add new Address
                </DialogTrigger>
                <AddressForm open={addAddressDialogOpen} onSaved={() => setAddAddressDialogOpen(false)} />
              </Dialog>
            </div>
          </StepperContent>

          <StepperContent value='payment'>
            <div className='border-border flex flex-col gap-6 rounded-xl border p-4'>
              <h5 className='text-xl font-semibold'>Select Payment Mode</h5>
              <Tabs
                value={watchedPaymentMethod}
                className='gap-6'
                onValueChange={value => form.setValue('paymentMethod', value as CheckoutFormValues['paymentMethod'])}
              >
                <TabsList className='flex w-full justify-start gap-2 overflow-x-auto overflow-y-hidden group-data-horizontal/tabs:h-fit md:group-data-horizontal/tabs:h-9.5'>
                  {paymentOptions.map(option => (
                    <TabsTrigger
                      key={option.value}
                      value={option.value}
                      className='shrink-0 grow rounded-lg max-sm:px-4'
                    >
                      {option.title}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value='debit'>
                  <div className='item grid gap-6 sm:grid-cols-4'>
                    <div className='flex flex-col gap-3.5 sm:col-span-4'>
                      <Label htmlFor='checkout-card-number'>Card Number</Label>
                      <Input id='checkout-card-number' {...form.register('cardNumber')} />
                    </div>
                    <div className='flex flex-col gap-3.5 sm:col-span-2'>
                      <Label htmlFor='checkout-card-name'>Card Name</Label>
                      <Input id='checkout-card-name' {...form.register('cardName')} />
                    </div>
                    <div className='flex flex-col gap-3.5'>
                      <Label htmlFor='checkout-card-expiry'>Exp. Date</Label>
                      <Controller
                        control={form.control}
                        name='cardExpiry'
                        render={({ field }) => (
                          <Input
                            {...getExpiryDateProps({ onChange: field.onChange, onBlur: field.onBlur })}
                            id='checkout-card-expiry'
                            value={field.value}
                            placeholder='MM/YY'
                          />
                        )}
                      />
                    </div>
                    <div className='flex flex-col gap-3.5'>
                      <Label htmlFor='checkout-card-cvv'>CVV Code</Label>
                      <Input id='checkout-card-cvv' {...form.register('cardCvv')} />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value='credit'>
                  <div className='grid gap-6 sm:grid-cols-4'>
                    <div className='flex flex-col gap-3.5 sm:col-span-4'>
                      <Label htmlFor='checkout-credit-number'>Card Number</Label>
                      <Input id='checkout-credit-number' {...form.register('cardNumber')} />
                    </div>
                    <div className='flex flex-col gap-3.5 sm:col-span-2'>
                      <Label htmlFor='checkout-credit-name'>Card Name</Label>
                      <Input id='checkout-credit-name' {...form.register('cardName')} />
                    </div>
                    <div className='flex flex-col gap-3.5'>
                      <Label htmlFor='checkout-credit-expiry'>Exp. Date</Label>
                      <Input id='checkout-credit-expiry' placeholder='MM/YY' {...form.register('cardExpiry')} />
                    </div>
                    <div className='flex flex-col gap-3.5'>
                      <Label htmlFor='checkout-credit-cvv'>CVV Code</Label>
                      <Input id='checkout-credit-cvv' {...form.register('cardCvv')} />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value='cod' className='text-muted-foreground text-sm'>
                  Pay in cash when your order reaches the selected address.
                </TabsContent>

                <TabsContent value='gift'>
                  <div className='flex flex-col gap-3.5'>
                    <Label htmlFor='checkout-gift-card'>Gift Card Number</Label>
                    <Input id='checkout-gift-card' placeholder='Enter gift card Number' />
                  </div>
                </TabsContent>
              </Tabs>
              <div className='flex items-center gap-4'>
                <Button size='lg' onClick={() => form.trigger(['paymentMethod', 'cardNumber', 'cardName'])}>
                  Save Changes
                </Button>
                <Button size='lg' variant='secondary' onClick={() => form.resetField('cardNumber')}>
                  Reset
                </Button>
              </div>
            </div>
          </StepperContent>
        </StepperPanel>

        <div className='lg:sticky lg:top-40 lg:self-start'>
          <OrderSummary
            items={selectedItems}
            variant={currentStep === 'cart' ? 'cart' : 'compact'}
            footer={
              <Button
                className={cn('w-full', selectedItemCount === 0 && currentStep === 'cart' && 'opacity-60')}
                onClick={handleContinue}
                size='lg'
                disabled={selectedItemCount === 0 && currentStep === 'cart'}
              >
                {currentStep === 'cart' && 'Continue'}
                {currentStep === 'address' && 'Continue Payment'}
                {currentStep === 'payment' && 'Place Order'}
              </Button>
            }
          />
        </div>
      </div>
    </Stepper>
  )
}

export { CheckoutView }
