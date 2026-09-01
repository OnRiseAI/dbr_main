// Next Imports
import Link from 'next/link'

// Third-party Imports
import { CircleCheck } from 'lucide-react'

// Component Imports
import ContentLayout from '@/components/layout/content-layout'

const collectItems = [
  'Name, contact, phone number, email, date of birth',
  'Payment details (such as card and other payment methods)',
  'Identity & address proof documents',
  'Purchase and transaction history, recent data, and location'
]

const useItems = [
  'Process and fulfill your orders.',
  'Enable payments, refunds, and customer support.',
  'Improve your shopping experience',
  'Communicate offers, products, and updates.'
]

const cookieItems = [
  'Analyze traffic and improve your experience.',
  'Keep you signed in.',
  'Remember your preferences.',
  'Show you relevant offers.'
]

const sharingItems = [
  'Show you relevant offers.',
  'With payment providers, logistics partners, and other vendors involved in your transaction',
  'With government authorities or law enforcement if required by law',
  'In case of mergers, acquisitions, or reorganization of our business - your information may be shared with the new entity under this Privacy Policy'
]

const CheckList = ({ items }: { items: string[] }) => (
  <ul className='space-y-2'>
    {items.map((item, index) => (
      <li key={index} className='text-muted-foreground flex items-start gap-1 text-lg'>
        <CircleCheck className='mt-1.25 size-4.5 shrink-0 text-green-600 dark:text-green-400' />
        {item}
      </li>
    ))}
  </ul>
)

const PrivacyPolicyView = () => {
  return (
    <ContentLayout className='py-8 sm:py-10 lg:py-14'>
      <div className='space-y-7'>
        <div className='bg-muted rounded-md border p-3'>
          <h2 className='mb-3.5 text-xl font-semibold'>Privacy Policy</h2>
          <p className='text-muted-foreground mb-5 text-lg'>
            At Shopix, your trust is our top priority. We understand the importance of secure transactions and privacy.
            This Privacy Policy explains how Shopix and its affiliates (&ldquo;we&rdquo;, &ldquo;our&rdquo;,
            &ldquo;us&rdquo;) collect, use, share, and protect your personal information through our website{' '}
            <Link
              href='https://www.shopix.com'
              target='_blank'
              className='text-primary font-medium underline-offset-2 hover:underline'
            >
              https://www.shopix.com
            </Link>{' '}
            (&ldquo;Platform&rdquo;).
          </p>
          <p className='text-muted-foreground text-lg'>
            By using our Platform, providing your information, or purchasing any products/services, you agree to the
            terms in this Privacy Policy, our Terms of Use, and any related policies. If you do not agree, please do not
            access or use our Platform.
          </p>
        </div>

        <div className='space-y-2'>
          <h2 className='text-xl font-semibold'>Collection of Information</h2>
          <p className='text-muted-foreground text-lg'>
            We may collect personal information when you visit our Platform, make purchases, contact us, or interact
            with us Platform. This may include:
          </p>
          <CheckList items={collectItems} />
          <div className='space-y-5 pt-5'>
            <p className='text-muted-foreground text-lg'>
              You can browse many parts of our Platform without sharing your identity. However, some features may need
              you to provide personal data. You can choose not to provide information, but that may limit your ability
              to use certain services.
            </p>
            <p className='text-muted-foreground text-lg'>
              We may track your preferences and behavior to better personalize your experience and improve our products
              and services. This may include where you came from, what pages you visit, and your device details. We may
              combine this data for analysis and service improvement.
            </p>
            <p className='text-muted-foreground text-lg'>
              If you participate in loyalty programs or promotions with us or our partners, we may collect details like
              your name, contact info, lifestyle preferences, and transaction history. Please note that our partners may
              have their own privacy policies - we are not responsible for their practices.
            </p>
            <p className='text-muted-foreground text-lg'>
              If you post reviews, messages, or photos publicly, please use caution - these may be visible to other
              users.
            </p>
          </div>
        </div>

        <div className='space-y-2'>
          <h2 className='text-xl font-semibold'>Use of Your Information</h2>
          <p className='text-muted-foreground text-lg'>We use your information to:</p>
          <CheckList items={useItems} />
          <p className='text-muted-foreground pt-2.5 text-lg'>
            We may ask for permission to access your SMS, contacts, camera, gallery, or location - for example, to help
            you complete transactions or use advanced shopping features. You can choose to decline, but this may limit
            some features.
          </p>
        </div>

        <div className='space-y-2'>
          <h2 className='text-xl font-semibold'>Cookies</h2>
          <p className='text-muted-foreground text-lg leading-relaxed'>
            We use cookies and similar technologies, which may include:
          </p>
          <CheckList items={cookieItems} />
          <p className='text-muted-foreground text-lg leading-relaxed'>
            You can clear or block cookies in your browser settings, but doing so may affect certain features. We may
            also use trusted third-party cookies (e.g., Google Analytics) for insights and marketing. You can opt out of
            Google Analytics tracking if you wish.
          </p>
        </div>

        <div className='space-y-2'>
          <h2 className='text-xl font-semibold'>Sharing Your Information</h2>
          <p className='text-muted-foreground text-lg'>We may share your data:</p>
          <CheckList items={sharingItems} />
          <p className='text-muted-foreground text-lg'>We do not sell your personal information for profit.</p>
        </div>

        <div className='space-y-2'>
          <h3 className='text-xl font-semibold'>Your Rights</h3>
          <p className='text-muted-foreground text-lg'>
            You can access, update, or correct your personal data anytime in your account settings. To withdraw consent
            or request deletion, contact us using the details below. Please mention “Withdrawal of consent” in your
            request. Note: withdrawing consent may limit your access to some services.
          </p>
        </div>

        <div className='space-y-2'>
          <h2 className='text-xl font-semibold'>Your Choices</h2>
          <p className='text-muted-foreground text-lg'>
            <span className='font-medium'>Marketing:</span> You can opt out of promotional messages anytime by clicking
            &ldquo;unsubscribe&rdquo; in our emails or adjusting your account settings.
          </p>
          <p className='text-muted-foreground text-lg'>
            <span className='font-medium'>Advertising:</span> You can opt out of personalized ads through your device
            settings.
          </p>
          <p className='text-muted-foreground text-lg'>
            <span className='font-medium'>Account Deletion:</span> You can delete your account anytime in your profile
            settings or by contacting us. Deleting your account removes access to your order history, loyalty points,
            and saved details. Some data may be retained as needed by law or for fraud prevention.
          </p>
        </div>

        <div className='space-y-2'>
          <h2 className='text-xl font-semibold'>Your Rights</h2>
          <p className='text-muted-foreground text-lg'>
            You can access, update, or correct your personal data anytime in your account settings. To withdraw consent
            or request deletion, contact us using the details below. Please mention &ldquo;Withdrawal of consent&rdquo;
            in your request. Note: withdrawing consent may limit your access to some services.
          </p>
        </div>

        <div className='space-y-2'>
          <h2 className='text-xl font-semibold'>Consent</h2>
          <p className='text-muted-foreground text-lg'>
            By using our Platform or providing your data, you agree to this Privacy Policy. If you share data of others,
            you confirm you have their consent to do so.
          </p>
        </div>

        <div className='space-y-2'>
          <h2 className='text-xl font-semibold'>Policy Updates</h2>
          <p className='text-muted-foreground text-lg'>
            We may update this Privacy Policy from time to time. Changes will be posted on this page. Please check back
            regularly.
          </p>
        </div>

        <div className='space-y-2'>
          <h2 className='text-xl font-semibold'>Contact &amp; Grievance Officer</h2>
          <div className='text-muted-foreground space-y-2 text-lg'>
            <p>
              <span>Mr. Mahendra Parmar</span>
              <br />
              <span className='text-foreground'>Designation:</span> Privacy &amp; Compliance Officer
            </p>
            <p>Shopix Ecommerce Pvt Ltd.</p>
            <p>
              <span className='text-foreground'>Address:</span>
              <br />
              Carlyle Hall, 25 Union Square W,
              <br />
              New York, NY 10003, USA
            </p>
            <p>
              <span className='text-foreground'>Email:</span> privacy@flyonui.com
              <br />
              <span className='text-foreground'>Phone:</span> 123-456-7890
            </p>
            <p>
              <span className='text-foreground'>Support Hours:</span> Monday-Friday (9:00 AM - 6:00 PM)
            </p>
            <p>For any questions or concerns about this Privacy Policy, please reach out to us at the contact above.</p>
            <p>
              <span className='text-foreground'>Last Updated:</span> July 7, 2025
              <br />
              <span className='text-foreground'>Version:</span> 1.0
            </p>
          </div>
        </div>
      </div>
    </ContentLayout>
  )
}

export { PrivacyPolicyView }

export default PrivacyPolicyView
