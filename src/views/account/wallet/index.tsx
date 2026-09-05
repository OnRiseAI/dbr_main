// Third-party Imports
import { DollarSign, ReceiptText, Wallet } from 'lucide-react'

// Component Imports
import { Card, CardContent } from '@/components/ui/card'
import { MotionPreset } from '@/components/ui/motion-preset'

const benefits = [
  { icon: ReceiptText, label: 'Instant Refunds' },
  { icon: DollarSign, label: 'Easy Payments' },
  { icon: Wallet, label: 'Wallet Rewards' }
]

const steps = [
  {
    number: 1,
    title: 'Add Products to Cart',
    description: 'Shop and add your favourite items to your cart as usual.',
    active: true
  },
  {
    number: 2,
    title: 'Choose Wallet at Checkout',
    description: 'On the payment page, select Use Deep Beauty Research Wallet as your preferred option.',
    active: true
  },
  {
    number: 3,
    title: 'Pay the Balance',
    description: "If your Wallet doesn't cover the total, pay the remaining amount with any other method you like.",
    active: false
  }
]

const WalletView = () => {
  return (
    <div className='space-y-5'>
      <div className='bg-muted relative overflow-hidden rounded-sm p-6 sm:h-28 lg:h-31.25'>
        <h3 className='mb-2 text-4xl font-semibold'>$ 122</h3>
        <p className='text-muted-foreground text-lg'>Total Balance</p>
        <MotionPreset
          fade
          blur
          slide={{ direction: 'down' }}
          delay={0.3}
          transition={{ duration: 0.5 }}
          className='absolute top-0 right-0 sm:right-[15%]'
        >
          <img src='/images/account/dollar.webp' className='h-full' alt='Dollar' />
        </MotionPreset>
      </div>

      <Card className='rounded-md py-3.5 shadow-none'>
        <CardContent className='space-y-2.5 px-3.5'>
          <div>
            <h4 className='mb-1 text-lg font-medium'>Deep Beauty Research Wallet Credit</h4>
            <p className='text-muted-foreground text-sm font-medium'>Balance: $100.00</p>
          </div>
          <p className='text-muted-foreground text-base'>
            Your Deep Beauty Research Wallet balance comes from referrals, special offers, and cashback. Use it within validity on
            orders above $500.
          </p>
        </CardContent>
      </Card>

      <h3 className='mb-3.5 text-xl font-semibold'>Benefits of Deep Beauty Research Wallet</h3>
      <div className='max-sm:space-y-6 sm:grid sm:grid-cols-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {benefits.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className='hover:border-primary flex flex-col items-center gap-4 rounded-xl border px-4 py-6 transition-colors duration-300 hover:shadow-sm'
          >
            <div className='bg-muted flex size-12.5 items-center justify-center rounded-full'>
              <Icon className='size-8.25' />
            </div>
            <p className='text-center text-xl'>{label}</p>
          </div>
        ))}
      </div>

      <h3 className='text-xl font-semibold'>How to use Deep Beauty Research Wallet</h3>
      <ul className='relative flex flex-col gap-y-2'>
        {steps.map((step, index) => (
          <li key={step.number} className='group flex w-fit flex-1 shrink basis-0 flex-col'>
            <div className='flex items-center justify-center gap-2.5 text-sm'>
              <span
                className={`flex size-9.5 shrink-0 items-center justify-center rounded-full text-lg font-medium ${
                  step.active ? 'bg-primary text-primary-foreground shadow-sm' : 'text-foreground/90 bg-primary/20'
                }`}
              >
                {step.number}
              </span>
              <div className='block'>
                <p className='mb-0.5 text-base font-medium'>{step.title}</p>
                <p className='text-muted-foreground text-sm'>{step.description}</p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`ms-4.5 mt-2 h-7.5 w-0.5 justify-self-start ${index === 0 ? 'bg-primary' : 'bg-primary/20'}`}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export { WalletView }
export default WalletView
