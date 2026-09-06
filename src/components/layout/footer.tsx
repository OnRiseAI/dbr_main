import Link from 'next/link'
import { ArrowRightIcon, ArrowUpRightIcon } from 'lucide-react'

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
      { title: 'Retatrutide calculator', href: '/retatrutide-calculator' },
      { title: 'How each format works', href: '/#how-it-works' },
      { title: 'Easy to use', href: '/#easy-to-use' },
      { title: 'Pen or vial', href: '/#pen-or-vial' },
      { title: 'FAQ', href: '/faq' }
    ]
  },
  {
    title: 'Company',
    links: [
      { title: 'About us', href: '/about' },
      { title: 'Contact', href: '/contact' },
      { title: 'Become a distributor', href: '/distributors' },
      { title: 'My account', href: '/account' }
    ]
  }
]

const FACTS = ['Dispatched from Germany', 'Tracked, discreet packaging', 'Every batch tested', 'Documentation in the box']

const PAYMENT = [
  { src: '/images/landing-page/visa.webp', alt: 'Visa', className: 'h-4' },
  { src: '/images/landing-page/master.webp', alt: 'Mastercard', className: 'h-5' }
]

/**
 * Footer as the closing band of the site: the same dark canvas as "The standard", one
 * line that says what we are, the routes in mono eyebrow columns, then the wordmark set
 * huge and cut off by the bottom edge, and a slim utility bar. Only true things: no
 * newsletter form, no dummy address, no placeholder social links.
 */
const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className='bg-neutral-950 text-white'>
      <ContentLayout className='pt-14 lg:pt-20'>
        {/* Statement + the two ways in */}
        <div className='grid gap-8 border-b border-white/15 pb-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16'>
          <div className='space-y-4'>
            <p className='text-xs font-semibold tracking-[0.16em] text-white/55 uppercase'>Deep Beauty Research</p>
            <h2 className='max-w-xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl'>
              Peptide pens and vials, made properly and shipped from Germany.
            </h2>
          </div>
          <div className='flex flex-col justify-end gap-3 sm:flex-row lg:flex-col lg:items-start'>
            <Link
              href='/shop'
              className='group inline-flex items-center justify-between gap-6 rounded-md bg-white px-5 py-3.5 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-200'
            >
              Shop the range
              <ArrowRightIcon className='size-4 transition-transform duration-300 group-hover:translate-x-1' />
            </Link>
            <a
              href='https://wa.me/491636444056'
              target='_blank'
              rel='noreferrer'
              className='group inline-flex items-center justify-between gap-6 rounded-md border border-white/25 px-5 py-3.5 text-sm font-semibold text-white transition hover:border-white/60'
            >
              WhatsApp +49 163 6444056
              <ArrowUpRightIcon className='size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
            </a>
          </div>
        </div>

        {/* Routes */}
        <div className='grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1.2fr] lg:gap-8'>
          {COLUMNS.map(column => (
            <div key={column.title} className='space-y-4'>
              <p className='flex items-center gap-2 text-xs font-semibold tracking-[0.16em] text-white/55 uppercase'>
                <span className='size-1.5 rounded-full bg-[#0592b3]' />
                {column.title}
              </p>
              <ul className='space-y-2.5'>
                {column.links.map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className='text-sm text-white/75 transition-colors hover:text-white'>
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className='space-y-4'>
            <p className='flex items-center gap-2 text-xs font-semibold tracking-[0.16em] text-white/55 uppercase'>
              <span className='size-1.5 rounded-full bg-[#0592b3]' />
              The standard
            </p>
            <ul className='divide-y divide-white/10 border-y border-white/10'>
              {FACTS.map(fact => (
                <li key={fact} className='py-2.5 text-sm text-white/75'>
                  {fact}
                </li>
              ))}
            </ul>
            <p className='text-xs font-semibold tracking-[0.14em] text-white/55 uppercase'>Research use only</p>
          </div>
        </div>
      </ContentLayout>

      {/* Wordmark, set huge and cut by the edge */}
      <div className='overflow-hidden border-t border-white/10' aria-hidden>
        <ContentLayout>
          <p className='-mb-[0.22em] pt-4 text-[8.6vw] leading-none font-bold tracking-[-0.04em] whitespace-nowrap text-white/[0.08] select-none xl:text-[6.55rem]'>
            DEEP BEAUTY RESEARCH
          </p>
        </ContentLayout>
      </div>

      {/* Utility bar */}
      <div className='border-t border-white/10'>
        <ContentLayout className='flex flex-col gap-4 py-5 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between'>
          <p>© {year} Deep Beauty Research. Supplied for research purposes only. Not for human or veterinary use.</p>
          <ul className='flex items-center gap-4'>
            {PAYMENT.map(item => (
              <li key={item.alt}>
                <img src={item.src} alt={item.alt} className={`${item.className} opacity-90`} />
              </li>
            ))}
          </ul>
        </ContentLayout>
      </div>
    </footer>
  )
}

export default Footer
