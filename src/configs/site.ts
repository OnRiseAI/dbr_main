export type SiteConfig = typeof siteConfig

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

export const siteConfig = {
  name: 'Deep Beauty Research',
  description:
    'Deep Beauty Research: pre-filled Retatrutide and GHK-Cu pens plus lyophilised vials, dispatched from Germany.',
  url: baseUrl,
  ogImage: `${baseUrl}/images/og-image.png`,
  links: {
    twitter: 'https://x.com/ShadcnStudio',
    github: 'https://github.com/shadcnstudio/shadcn-studio',
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    youtube: 'https://www.youtube.com/@themeselection'
  },
  creator: {
    name: 'Shadcn Studio',
    url: 'https://shadcnstudio.com/'
  }
}
