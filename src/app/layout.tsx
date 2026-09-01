// React Imports
import type { ReactNode } from 'react'

// Next Imports
import type { Metadata } from 'next'
import { cookies } from 'next/headers'

// Third-party Imports
import { NuqsAdapter } from 'nuqs/adapters/next/app'

// Context Imports
import { SettingsProvider, type Settings } from '@/contexts/settingsContext'

// Component Imports
import { TooltipProvider } from '@/components/ui/tooltip'
import { ThemeProvider } from '@/components/theme-provider'

// Config Imports
import themeConfig from '@/configs/themeConfig'
import { siteConfig } from '@/configs/site'

// Utils Imports
import { cn } from '@/lib/utils'
import { allFonts } from '@/utils/fonts'
import { getThemeInitAttributes, getThemeInitScript } from '@/utils/theme-script'

// Styles Imports
import './globals.css'

// Register every selectable font's CSS variable on <html> so the Theme Customizer can switch between them
const fontVariables = allFonts.map(font => font.variable)

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    template: `%s - ${siteConfig.name}`,
    default: siteConfig.name
  },
  description: siteConfig.description,
  robots: 'index,follow',
  keywords: ['nextjs', 'shadcn', 'shadcn-ui', 'base-ui', 'template', 'vega'],
  authors: [
    {
      name: siteConfig.creator.name,
      url: siteConfig.creator.url
    }
  ],
  creator: siteConfig.creator.name,
  icons: {
    icon: [
      {
        url: '/favicon/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png'
      },
      {
        url: '/favicon/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png'
      },
      {
        url: '/favicon/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon'
      }
    ],
    apple: [
      {
        url: '/favicon/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png'
      }
    ],
    other: [
      {
        url: '/favicon/android-chrome-192x192.png',
        rel: 'icon',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        url: '/favicon/android-chrome-512x512.png',
        rel: 'icon',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@yourusername'
  }
}

const RootLayout = async ({ children }: Readonly<{ children: ReactNode }>) => {
  // Seed the settings provider from the cookie so SSR renders the saved theme (no flash of defaults)
  const cookieStore = await cookies()
  const rawSettings = cookieStore.get(themeConfig.settingsCookieName)?.value

  let settingsCookie: Settings | undefined

  try {
    settingsCookie = rawSettings ? (JSON.parse(rawSettings) as Settings) : undefined
  } catch {
    settingsCookie = undefined
  }

  // Render radius/font/scale onto <html> server-side so they're correct on first paint (no flash)
  const themeAttributes = getThemeInitAttributes(settingsCookie)

  return (
    <html
      lang='en'
      className={cn(...fontVariables, 'flex min-h-full w-full font-sans antialiased')}
      suppressHydrationWarning
      {...themeAttributes}
    >
      <body className='flex min-h-full w-full flex-auto flex-col'>
        {/* Applies the saved theme before first paint to prevent a flash of the default theme */}
        <script dangerouslySetInnerHTML={{ __html: getThemeInitScript(settingsCookie) }} />
        <NuqsAdapter>
          <ThemeProvider>
            <SettingsProvider settingsCookie={settingsCookie}>
              <TooltipProvider>{children}</TooltipProvider>
            </SettingsProvider>
          </ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  )
}

export default RootLayout
