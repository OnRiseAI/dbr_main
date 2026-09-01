// Next Imports
import type { Metadata } from 'next'

// Utils Imports
import {
  generateMetadata as generateSEOMetadata,
  combineSchemas,
  generateWebsiteSchema,
  generateWebPageSchema
} from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Contact Us',
  description: "Get in touch with us. We're here to help and answer any questions you may have.",
  url: '/contact',
  keywords: ['contact', 'support', 'help', 'get in touch']
})

const ContactUsPage = () => {
  const jsonLd = combineSchemas(
    generateWebsiteSchema(),
    generateWebPageSchema({
      name: 'Contact Us',
      description: "Get in touch with us. We're here to help and answer any questions you may have.",
      url: '/contact'
    })
  )

  return (
    <>
      <div className='py-12'>
        <h1 className='mb-6 text-4xl font-bold'>Contact Us</h1>
        <p className='text-muted-foreground text-lg'>
          Get in touch with us. We&apos;re here to help and answer any questions you may have.
        </p>
      </div>

      {/* Add JSON-LD to your page */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')
        }}
      />
    </>
  )
}

export default ContactUsPage
