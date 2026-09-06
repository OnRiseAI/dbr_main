import Link from 'next/link'

// Component Imports
import { Separator } from '@/components/ui/separator'
import NewsletterForm from '@/components/layout/newsletter-form'

// SVG Imports
import InstagramIcon from '@/assets/svg/instagram-icon'
import FacebookIcon from '@/assets/svg/facebook-icon'

// Config Imports
import { siteConfig } from '@/configs/site'

const SHOP = [
  { title: 'All products', href: '/shop' },
  { title: 'Pens', href: '/shop?category=Pens' },
  { title: 'Vials', href: '/shop?category=Vials' },
  { title: 'Retatrutide calculator', href: '/retatrutide-calculator' },
  { title: 'My account', href: '/account' }
]

const COMPANY = [
  { title: 'About us', href: '/about' },
  { title: 'FAQ', href: '/faq' },
  { title: 'Contact', href: '/contact' },
  { title: 'Become a distributor', href: '/distributors' },
  { title: 'WhatsApp', href: 'https://wa.me/491636444056' }
]

const PAYMENT = [
  { src: '/images/landing-page/visa.webp', alt: 'Visa', className: 'h-4' },
  { src: '/images/landing-page/master.webp', alt: 'Mastercard', className: 'h-5' }
]

/**
 * Footer: shadcn studio footer block 10, rebranded. Rounded muted panel, the wordmark set
 * faint and wide across the top, logo and blurb with social links, two link columns, the
 * newsletter (saved to the shop's signup list), and the card marks.
 */
const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className='bg-card p-4 sm:p-6'>
      <div className='dark:bg-background bg-muted rounded-4xl py-8 sm:py-12'>
        <div className='mx-auto flex max-w-7xl flex-col gap-16 px-4 sm:px-6 lg:px-8'>
          <div>
            <p
              aria-hidden
              className='text-foreground/[0.06] mb-10 text-center text-[7.4vw] leading-none font-bold tracking-[-0.04em] whitespace-nowrap select-none max-md:hidden xl:text-[6.6rem]'
            >
              DEEP BEAUTY RESEARCH
            </p>
            <div className='grid grid-cols-6 gap-6'>
              <div className='col-span-full flex flex-col items-start gap-4 lg:col-span-2'>
                <Link href='/' aria-label='Deep Beauty Research'>
                  <img src='/images/brands/dbr-logo.svg' alt='Deep Beauty Research' className='h-7 w-auto dark:hidden' />
                  <img src='/images/brands/dbr-logo-white.svg' alt='' aria-hidden className='hidden h-7 w-auto dark:block' />
                </Link>
                <p className='text-muted-foreground'>
                  Pre-filled peptide pens and lyophilised vials. Every batch tested for purity and documented before
                  dispatch. Shipped from Germany with tracking.
                </p>
                <div className='flex items-center gap-4'>
                  <a href={siteConfig.links.instagram} target='_blank' rel='noopener noreferrer' aria-label='Instagram'>
                    <InstagramIcon className='text-foreground size-5' />
                  </a>
                  <a href={siteConfig.links.facebook} target='_blank' rel='noopener noreferrer' aria-label='Facebook'>
                    <FacebookIcon className='text-foreground size-5' />
                  </a>
                </div>
                <p className='text-xs font-semibold tracking-[0.14em] uppercase'>Research use only</p>
              </div>
              <div className='col-span-full grid grid-cols-2 gap-6 sm:grid-cols-4 lg:col-span-4 lg:gap-8'>
                <div className='flex flex-col gap-5'>
                  <div className='text-lg font-medium'>Shop</div>
                  <ul className='text-muted-foreground space-y-3'>
                    {SHOP.map(link => (
                      <li key={link.href}>
                        <Link href={link.href} className='hover:text-foreground transition-colors duration-300'>
                          {link.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className='flex flex-col gap-5'>
                  <div className='text-lg font-medium'>Company</div>
                  <ul className='text-muted-foreground space-y-3'>
                    {COMPANY.map(link => (
                      <li key={link.href}>
                        {link.href.startsWith('http') ? (
                          <a href={link.href} target='_blank' rel='noopener noreferrer' className='hover:text-foreground transition-colors duration-300'>
                            {link.title}
                          </a>
                        ) : (
                          <Link href={link.href} className='hover:text-foreground transition-colors duration-300'>
                            {link.title}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className='col-span-full flex flex-col gap-5 sm:col-span-2'>
                  <div>
                    <p className='mb-3 text-lg font-medium'>Subscribe to newsletter</p>
                    <NewsletterForm />
                  </div>
                  <Separator />
                  <div className='flex flex-wrap items-center gap-4'>
                    {PAYMENT.map(item => (
                      <img key={item.alt} src={item.src} alt={item.alt} className={item.className} />
                    ))}
                    <p className='text-muted-foreground text-xs'>
                      © {year} Deep Beauty Research. Supplied for research purposes only. Not for human or veterinary use.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
