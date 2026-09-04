'use client'

// React Imports
import { useEffect, useRef, useState } from 'react'

// Next Imports
import Link from 'next/link'

// Third-party Imports
import { MenuIcon, ChevronDownIcon } from 'lucide-react'

// Component Imports
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'
import WishlistButton from '@/components/layout/wishlist-button'
import CartButton from '@/components/layout/cart-button'
import AnnouncementBanner from '@/components/layout/announcement-banner'
import ContentLayout from '@/components/layout/content-layout'
import CommandMenu from '@/components/layout/command-menu'
import LanguageDropdown from '@/components/blocks/dropdown-language'
import CurrencyDropdown from '@/components/blocks/dropdown-currency'
import MenuSheet from '@/components/blocks/menu-sheet'
import { ShopMegamenu } from '@/components/layout/shop-megamenu'
import { AboutMegamenu } from '@/components/layout/about-megamenu'
import ThemeCustomizer from './ThemeCustomizer'

// Config Imports
import { mainNavigation } from '@/configs/navigation'
import { db as categories } from '@/fake-db/categories'

// Utils Imports
import { cn } from '@/lib/utils'

// SVGs Imports
import InstagramIcon from '@/assets/svg/instagram-icon'
import FacebookIcon from '@/assets/svg/facebook-icon'

// Shared styling for items rendered on the dark menu bar
const darkBarItemClass =
  'bg-transparent hover:bg-muted focus:bg-muted data-popup-open:bg-muted data-popup-open:text-foreground data-popup-open:hover:bg-muted data-open:bg-muted data-open:text-foreground data-open:hover:bg-muted'

const darkBarButtonClass = 'gap-2 bg-transparent p-0 font-normal h-5 text-foreground hover:bg-transparent'

const Header = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const header = headerRef.current

    if (!header) return

    const setHeaderHeight = () =>
      document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`)

    setHeaderHeight()

    const observer = new ResizeObserver(setHeaderHeight)

    observer.observe(header)

    return () => observer.disconnect()
  }, [])

  return (
    <header ref={headerRef} className='sticky top-0 z-50'>
      {/* Announcement banner - animated scrolling deals */}
      <AnnouncementBanner />

      {/* Menu bar - primary navigation (desktop only) */}
      <div className='bg-muted hidden lg:block'>
        <ContentLayout className='flex items-center justify-between gap-4 py-2'>
          <div className='flex items-center gap-4 text-sm font-medium whitespace-nowrap'>
            <Link href='#' className='opacity-80 transition-opacity duration-300 hover:opacity-100'>
              Shipping & Returns
            </Link>
            <Link href='#' className='opacity-80 transition-opacity duration-300 hover:opacity-100'>
              Payment
            </Link>
            <Link href='#' className='opacity-80 transition-opacity duration-300 hover:opacity-100'>
              Warranty
            </Link>
            <Link href='#' className='opacity-80 transition-opacity duration-300 hover:opacity-100'>
              Location
            </Link>
            <Link href='#' className='opacity-80 transition-opacity duration-300 hover:opacity-100'>
              Contact
            </Link>
          </div>

          <div className='flex items-center gap-1.5'>
            <LanguageDropdown
              trigger={
                <Button className={darkBarButtonClass}>
                  <span>English</span>
                  <ChevronDownIcon className='size-4' />
                </Button>
              }
            />
            <CurrencyDropdown
              trigger={
                <Button className={darkBarButtonClass}>
                  <span>USD</span>
                  <ChevronDownIcon className='size-4' />
                </Button>
              }
            />
            <a
              href='#'
              className='dark:text-primary-foreground flex size-5 items-center justify-center rounded-sm bg-white'
            >
              <InstagramIcon className='size-3.5' />
            </a>
            <a
              href='#'
              className='dark:text-primary-foreground flex size-5 items-center justify-center rounded-sm bg-white'
            >
              <FacebookIcon className='size-3.5' />
            </a>
          </div>
        </ContentLayout>
      </div>

      {/* Top bar - logo, search & account actions */}
      <div className='bg-card border-b'>
        <ContentLayout className='flex items-center justify-between gap-10 py-4'>
          <div className='flex items-center gap-10'>
            <div className='flex items-center gap-2'>
              <MenuSheet
                logoName=''
                logo={
                  <img src='/images/brands/dbr-logo.svg' alt='Deep Beauty Research' className='h-6 w-auto dark:invert' />
                }
                navigationData={mainNavigation}
                trigger={
                  <Button variant='outline' size='icon-lg' className='rounded-md xl:hidden'>
                    <MenuIcon />
                    <span className='sr-only'>Menu</span>
                  </Button>
                }
              />
              <Link href='/' className='flex items-center' aria-label='Deep Beauty Research'>
                <img src='/images/brands/dbr-logo.svg' alt='Deep Beauty Research' className='h-6 w-auto sm:h-7 dark:hidden' />
                <img src='/images/brands/dbr-logo-white.svg' alt='' aria-hidden className='hidden h-6 w-auto sm:h-7 dark:block' />
              </Link>
            </div>

            <div className='flex items-center justify-between gap-4 max-xl:hidden'>
              <NavigationMenu
                className='max-w-full'
                value={openMenu}
                onValueChange={setOpenMenu}
                align='start'
              >
                <NavigationMenuList className='flex-nowrap justify-start gap-1'>
                  {mainNavigation.map(section => {
                    if (section.href) {
                      return (
                        <NavigationMenuItem key={section.title}>
                          <NavigationMenuLink
                            render={<Link href={section.href} />}
                            className={cn(
                              navigationMenuTriggerStyle(),
                              darkBarItemClass,
                              'flex-row items-center gap-1.5'
                            )}
                          >
                            {section.icon}
                            {section.title}
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      )
                    }

                    return (
                      <NavigationMenuItem key={section.title} value={section.title}>
                        <NavigationMenuTrigger
                          className={cn(darkBarItemClass, 'gap-2.5 rounded-md py-2 [&>svg]:ml-0 [&>svg]:size-4')}
                        >
                          {section.icon}
                          {section.title}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className='w-auto p-0'>
                          {section.title === 'About' ? (
                            <AboutMegamenu onNavigate={() => setOpenMenu(null)} />
                          ) : section.title === 'Shop' ? (
                            <ShopMegamenu categories={categories} onNavigate={() => setOpenMenu(null)} />
                          ) : section.groups ? (
                            <div
                              className='grid gap-4 p-4'
                              style={{
                                gridTemplateColumns: `repeat(${Math.min(section.groups.length, 5)}, minmax(200px, 1fr))`
                              }}
                            >
                              {section.groups.map((group, index) => (
                                <div key={group.title ?? index}>
                                  {group.title && (
                                    <p className='text-foreground mb-2.5 text-sm font-semibold'>{group.title}</p>
                                  )}
                                  <ul className='grid gap-1'>
                                    {group.items.map(item => (
                                      <li key={item.title}>
                                        <NavigationMenuLink
                                          render={<Link href={item.href} onClick={() => setOpenMenu(null)} />}
                                          className='text-muted-foreground hover:text-foreground text-sm leading-5 transition-colors'
                                        >
                                          {item.title}
                                        </NavigationMenuLink>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <ul
                              className={cn(
                                'grid gap-1 p-4',
                                (section.items?.length ?? 0) > 6 ? 'w-96 grid-cols-2' : 'w-48'
                              )}
                            >
                              {section.items?.map(item => (
                                <li key={item.title}>
                                  <NavigationMenuLink
                                    render={<Link href={item.href} onClick={() => setOpenMenu(null)} />}
                                    className='text-muted-foreground hover:text-foreground text-sm leading-5 transition-colors'
                                  >
                                    {item.title}
                                  </NavigationMenuLink>
                                </li>
                              ))}
                            </ul>
                          )}
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    )
                  })}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          <div className='flex items-center gap-4'>
            <CommandMenu />
            <div className='flex items-center gap-2'>
              <WishlistButton />
              <CartButton />
              <ThemeCustomizer />
            </div>
          </div>
        </ContentLayout>
      </div>
    </header>
  )
}

export default Header
