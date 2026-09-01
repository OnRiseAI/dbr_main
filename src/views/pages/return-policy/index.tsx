'use client'

// Next Imports
import Link from 'next/link'

// Third-party Imports
import { CircleCheck } from 'lucide-react'

// Component Imports
import { Button } from '@/components/ui/button'
import ContentLayout from '@/components/layout/content-layout'

const ReturnPolicyView = () => {
  return (
    <ContentLayout className='py-8 sm:py-10 lg:py-14'>
      <div className='space-y-6'>
        <div className='bg-muted/50 space-y-3.5 rounded-md border-2 p-3'>
          <h2 className='text-xl font-semibold'>Our 100% Purchase Protection Promise</h2>
          <p className='text-muted-foreground text-lg'>
            We&apos;re committed to giving you a worry-free shopping experience. Every order you place with us is
            protected by genuine products, secure payments, and easy returns - guaranteed.
          </p>
        </div>

        <div className='space-y-2'>
          <h2 className='text-xl font-semibold'>Genuine Products</h2>
          <p className='text-muted-foreground text-lg'>
            Our sellers and partners agree to list only authentic, original products. We take strict action against
            counterfeit listings and ensure your orders are always genuine.
          </p>
        </div>

        <div className='space-y-2'>
          <h2 className='text-xl font-semibold'>Secure Payments &amp; Safe Ordering</h2>
          <p className='text-muted-foreground text-lg'>
            Your trust and privacy matter. We use trusted, encrypted payment gateways and strict security measures to
            keep your information safe.
          </p>
        </div>

        <div className='space-y-3.5'>
          <h3 className='text-lg font-medium'>How do we protect your data?</h3>
          <ul className='space-y-3.5'>
            <li className='text-muted-foreground flex items-start gap-1 text-lg'>
              <CircleCheck className='mt-0.5 size-4.5 shrink-0 text-green-600 dark:text-green-400' />
              We use advanced SSL encryption to protect your payment details during checkout.
            </li>
            <li className='text-muted-foreground flex items-start gap-1 text-lg'>
              <CircleCheck className='mt-0.5 size-4.5 shrink-0 text-green-600 dark:text-green-400' />
              Only the last few digits of your card are shown when you confirm an order.
            </li>
            <li className='text-muted-foreground flex items-start gap-1 text-lg'>
              <CircleCheck className='mt-0.5 size-4.5 shrink-0 text-green-600 dark:text-green-400' />
              We comply with industry-leading security standards (like ISO/IEC 27001) to handle your data safely.
            </li>
            <li className='text-muted-foreground flex items-start gap-1 text-lg'>
              <CircleCheck className='mt-0.5 size-4.5 shrink-0 text-green-600 dark:text-green-400' />
              We have physical, electronic, and procedural safeguards in place - and we may verify your identity if
              needed to protect your account.
            </li>
          </ul>
        </div>

        <p className='text-base font-medium'>
          Want more?{' '}
          <Button
            variant='link'
            nativeButton={false}
            className='h-auto p-0 text-base font-medium text-sky-600 dark:text-sky-400'
            render={<Link href='/privacy-policy' />}
          >
            Read our Privacy &amp; Security Policy
          </Button>
        </p>

        <p className='text-base font-medium'>💡always sign out from your account when using a shared computer!</p>

        <div className='space-y-6'>
          <div className='space-y-2'>
            <h2 className='text-xl font-semibold'>Easy Returns &amp; Hassle-Free Replacements</h2>
            <p className='text-muted-foreground mb-4 text-lg leading-relaxed'>
              Changed your mind? Received the wrong item? No worries - you can return or replace eligible items quickly
              through our Returns Center.
            </p>
            <ul className='space-y-4'>
              <li className='text-muted-foreground flex items-start gap-1 text-lg'>
                <CircleCheck className='mt-0.5 size-4.5 shrink-0 text-green-600 dark:text-green-400' />
                Most items can be returned within 10 days of delivery.
              </li>
              <li className='text-muted-foreground flex items-start gap-1 text-lg'>
                <CircleCheck className='mt-0.5 size-4.5 shrink-0 text-green-600 dark:text-green-400' />
                Return or exchange requests can be initiated online in a few clicks.
              </li>
              <li className='text-muted-foreground text-lg'>
                Some products may have specific return rules - please check our Returns Policy for full details.
              </li>
            </ul>
          </div>

          <div className='space-y-3.5'>
            <h3 className='text-lg font-semibold'>How to return an item:</h3>
            <ol className='text-muted-foreground space-y-3.5 text-lg'>
              <li>1. Open My Orders.</li>
              <li>2. Select the item you&apos;d like to return.</li>
              <li>3. Click Return or Replace.</li>
            </ol>
            <p className='text-muted-foreground text-lg'>
              For items sold by independent sellers, please follow the return address and instructions provided by the
              seller directly.
            </p>
          </div>

          <div className='bg-muted space-y-4 rounded-md p-4'>
            <p className='text-lg font-semibold'>Was this information helpful?</p>
            <div className='flex gap-1.5'>
              <Button size='xs' className='min-w-12.5'>
                Yes
              </Button>
              <Button variant='outline' size='xs' className='hover:bg-card min-w-12.5'>
                NO
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ContentLayout>
  )
}

export { ReturnPolicyView }

export default ReturnPolicyView
