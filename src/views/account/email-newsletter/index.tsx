// Component Imports
import NewsletterActions from '@/views/account/email-newsletter/newsletter-actions'
import NewsletterBanner from '@/views/account/email-newsletter/newsletter-banner'
import NewsletterPerks from '@/views/account/email-newsletter/newsletter-perks'

const EmailNewsletterView = () => {
  return (
    <div className='space-y-4'>
      <NewsletterBanner />
      <NewsletterPerks />
      <NewsletterActions />
    </div>
  )
}

export { EmailNewsletterView }
