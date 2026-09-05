import Link from 'next/link'

import ContentLayout from '@/components/layout/content-layout'

const COLUMNS = [
  {
    title: 'Shop',
    links: [
      { title: 'All products', href: '/shop' },
      { title: 'Pens', href: '/shop?category=Pens' },
      { title: 'Vials', href: '/shop?category=Vials' },
      { title: 'Weight Management', href: '/shop?category=Weight%20Management' },
      { title: 'Skin & Glow', href: '/shop?category=Skin%20%26%20Glow' },
      { title: 'Energy & Vitality', href: '/shop?category=Energy%20%26%20Vitality' },
      { title: 'Tanning', href: '/shop?category=Tanning' },
      { title: 'Calm & Focus', href: '/shop?category=Calm%20%26%20Focus' }
    ]
  },
  {
    title: 'Learn',
    links: [
      { title: 'How each format works', href: '/#how-it-works' },
      { title: 'Units calculator', href: '/#calculator' },
      { title: 'Pen or vial', href: '/#pen-or-vial' },
      { title: 'FAQ', href: '/pages/faq' }
    ]
  },
  {
    title: 'Company',
    links: [
      { title: 'About us', href: '/pages/about-us' },
      { title: 'Contact', href: '/pages/contacts' },
      { title: 'Become a distributor', href: '/pages/become-our-distributor' }
    ]
  }
]

const PAYMENT = [
  { src: '/images/landing-page/visa.webp', alt: 'Visa', className: 'h-4' },
  { src: '/images/landing-page/master.webp', alt: 'Mastercard', className: 'h-5' }
]

/**
 * Footer. Only things that are true: the range, the routes, the research
 * notice. No dummy address, no app badges, no unwired forms.
 */
const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className='border-t'>
      <ContentLayout className='py-12 lg:py-16'>
        <div className='grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-8'>
          <div className='max-w-sm space-y-5'>
            <Link href='/' className='inline-flex' aria-label='Deep Beauty Research'>
              <img src='/images/brands/dbr-logo.svg' alt='Deep Beauty Research' className='h-6 w-auto dark:hidden' />
              <img src='/images/brands/dbr-logo-white.svg' alt='' aria-hidden className='hidden h-6 w-auto dark:block' />
            </Link>
            <p className='text-muted-foreground text-sm leading-relaxed'>
              Pre-filled peptide pens and lyophilised vials. Every batch tested for purity and documented before
              dispatch. Shipped from Germany with tracking.
            </p>
            <p className='text-xs font-semibold tracking-[0.14em] uppercase'>Research use only</p>
          </div>

          {COLUMNS.map(column => (
            <div key={column.title} className='space-y-4'>
              <p className='text-xs font-semibold tracking-[0.14em] uppercase'>{column.title}</p>
              <ul className='space-y-2.5'>
                {column.links.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className='text-muted-foreground hover:text-foreground text-sm transition-colors'
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </ContentLayout>

      <div className='border-t'>
        <ContentLayout className='flex flex-col gap-4 py-6 text-sm sm:flex-row sm:items-center sm:justify-between'>
          <p className='text-muted-foreground'>
            © {year} Deep Beauty Research. Supplied for research purposes only. Not for human or veterinary use.
          </p>
          <ul className='flex items-center gap-4'>
            {PAYMENT.map(item => (
              <li key={item.alt}>
                <img src={item.src} alt={item.alt} className={item.className} />
              </li>
            ))}
          </ul>
        </ContentLayout>
      </div>
    </footer>
  )
}

export default Footer
