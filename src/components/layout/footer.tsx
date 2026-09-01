'use client'

// React Imports
import { Fragment } from 'react'

// Next Imports
import Link from 'next/link'

// Third-party Imports
import { MapPinIcon, PhoneIcon, MailIcon, ShieldCheckIcon, ArrowRightIcon } from 'lucide-react'

// Component Imports
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import ContentLayout from '@/components/layout/content-layout'

// SVGs Imports
import EcommerceLogo from '@/assets/svg/logo'
import YoutubeIcon from '@/assets/svg/youtube-icon'
import FacebookIcon from '@/assets/svg/facebook-icon'
import InstagramIcon from '@/assets/svg/instagram-icon'

const footerLinks = [
  {
    title: 'Explore',
    links: [
      { title: 'Product Listing', href: '/shop' },
      { title: 'My Profile', href: '/account' },
      { title: 'Order Tracking', href: '/account/track-order' },
      { title: 'Category Listing', href: '/category' }
    ]
  },
  {
    title: 'Terms & Policies',
    links: [
      { title: 'Returns & Exchanges', href: '/account/exchange-return' },
      { title: 'Privacy Policy', href: '/privacy-policy' },
      { title: 'Purchase Protection', href: '/return-policy' },
      { title: 'Help', href: '/help' }
    ]
  }
]

const paymentLogos = [
  {
    src: '/images/landing-page/lemon-squeezy.webp',
    darkSrc: '/images/landing-page/lemon-squeezy-dark.webp',
    alt: 'Lemon Squeezy',
    className: 'h-6'
  },
  { src: '/images/landing-page/visa.webp', alt: 'Visa', className: 'h-5' },
  {
    src: '/images/landing-page/paypal.webp',
    alt: 'Paypal',
    className: 'h-5'
  },
  {
    src: '/images/landing-page/master.webp',
    alt: 'Mastercard',
    className: 'h-5'
  }
]

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='bg-background border-t'>
      {/* Main footer content */}
      <ContentLayout className='py-6 md:py-8 lg:py-14'>
        <div className='grid max-xl:gap-8 md:grid-cols-2 lg:grid-cols-4'>
          {/* Company info */}
          <div className='space-y-8'>
            <Link href='/#hero-section' className='flex items-center gap-1.5 text-xl font-semibold'>
              <EcommerceLogo className='text-primary size-8' />
              <span>Shopix</span>
            </Link>
            <ul className='space-y-3'>
              <li className='flex gap-2'>
                <MapPinIcon className='size-5 shrink-0' />
                <span>
                  Shop 009A, Level 4, Block A <br /> Demo Park, Ottawa
                </span>
              </li>
              <li className='flex gap-2'>
                <PhoneIcon className='size-5 shrink-0' />
                <Link href='tel:+16135986981' className='hover:text-primary transition-colors'>
                  +1-613-598-6981
                </Link>
              </li>
              <li className='flex gap-2'>
                <MailIcon className='size-5 shrink-0' />
                <Link href='mailto:shopix@gmail.com' className='hover:text-primary transition-colors'>
                  shopix@gmail.com
                </Link>
              </li>
            </ul>
          </div>

          {/* Link columns */}
          <div className='col-span-2 grid grid-cols-1 gap-8 sm:grid-cols-2 md:max-lg:order-1'>
            {footerLinks.map(column => (
              <div key={column.title}>
                <h4 className='mb-4 text-xl font-semibold'>{column.title}</h4>
                <ul className='space-y-3'>
                  {column.links.map(link => (
                    <li key={link.title}>
                      <Link href={link.href} className='text-muted-foreground hover:text-primary transition-colors'>
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter subscription */}
          <div className='flex flex-col gap-6'>
            <div className='space-y-2.5'>
              <h4 className='text-lg font-semibold'>Get the Latest Offers & Discounts</h4>
              <form className='flex gap-2' onSubmit={e => e.preventDefault()}>
                <Input type='email' placeholder='Your email address' className='input-lg' />
                <Button
                  type='submit'
                  size='icon-lg'
                  className='bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                >
                  <ArrowRightIcon />
                </Button>
              </form>
            </div>
            <div className='flex flex-col gap-2.5'>
              <p className='text-lg font-semibold'>Download App</p>
              <div className='flex flex-wrap items-center justify-start gap-4 gap-y-2'>
                <Button
                  render={<a href='#' className='flex h-10.5 items-center gap-4' />}
                  nativeButton={false}
                  className='dark:bg-primary dark:hover:bg-primary! w-full max-w-33 rounded-sm bg-black px-2.5 py-1.25 hover:bg-black!'
                >
                  <img
                    src='/images/landing-page/apple-icon.webp'
                    className='block size-6 invert dark:hidden'
                    alt='App Store'
                  />
                  <img
                    src='/images/landing-page/apple-white.webp'
                    className='hidden size-6 invert dark:block'
                    alt='App Store'
                  />
                  <div>
                    <div className='dark:text-primary-foreground text-[10px] font-normal text-white'>
                      Download on the
                    </div>
                    <div className='dark:text-primary-foreground text-xs font-medium text-white'>App Store</div>
                  </div>
                </Button>
                <Button
                  render={<a href='#' className='flex h-10.5 items-center gap-4' />}
                  nativeButton={false}
                  className='dark:bg-primary dark:hover:bg-primary! w-full max-w-33 rounded-sm bg-black px-2.5 py-1.25 hover:bg-black!'
                >
                  <img
                    src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/google-play-icon.png'
                    className='size-6'
                    alt='Google Play Store'
                  />
                  <div>
                    <div className='dark:text-primary-foreground text-[10px] font-normal text-white'>
                      Download on the
                    </div>
                    <div className='dark:text-primary-foreground text-xs font-medium text-white'>Google Play</div>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </ContentLayout>

      {/* divider */}
      <Separator />

      <div className='py-6 max-sm:px-4'>
        <div className='flex flex-wrap items-center justify-center gap-4'>
          <span className='border-border inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-base'>
            <ShieldCheckIcon className='size-5 shrink-0 text-green-600 dark:text-green-400' />
            Secure Payment
          </span>
          {paymentLogos.map(logo =>
            logo.darkSrc ? (
              <Fragment key={logo.alt}>
                <img src={logo.src} alt={logo.alt} className={`${logo.className} dark:hidden`} />
                <img src={logo.darkSrc} alt={logo.alt} className={`${logo.className} hidden dark:block`} />
              </Fragment>
            ) : (
              <img key={logo.alt} src={logo.src} alt={logo.alt} className={logo.className} />
            )
          )}
        </div>
      </div>

      {/* divider */}
      <Separator />

      {/* Bottom bar */}
      <ContentLayout className='py-6'>
        <div className='flex flex-col items-center justify-between gap-4 md:flex-row'>
          <p className='text-center text-base font-medium md:text-left'>
            &copy; {currentYear}{' '}
            <Link href='/' className='text-primary font-bold hover:underline'>
              Shopix
            </Link>
            , Made with ❤️ for a better web.
          </p>

          <div className='flex items-center gap-6'>
            <a href='#'>
              <YoutubeIcon className='text-primary/70 hover:text-primary size-5.5' />
            </a>
            <a href='#'>
              <FacebookIcon className='text-primary/70 hover:text-primary size-5.5' />
            </a>
            <a href='#'>
              <InstagramIcon className='text-primary/70 hover:text-primary size-5.5' />
            </a>
          </div>
        </div>
      </ContentLayout>
    </footer>
  )
}

export default Footer
