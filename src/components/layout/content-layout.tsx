'use client'

// React Imports
import type { ReactNode } from 'react'

// Hook Imports
import { useSettings } from '@/hooks/use-settings'

// Utils Imports
import { cn } from '@/lib/utils'

/**
 * The single horizontal-width authority for the app shell. Applies the Theme
 * Customizer's "Content Layout" setting:
 * - `compact` → centered, max-width content
 * - `full`    → spans the available width
 *
 * Owns `mx-auto` + horizontal padding so the header, footer, and main content all
 * line up. Wrap it around the inner content of each (border/background stays on the
 * full-width outer element). Vertical padding is left to the consumer via `className`.
 *
 * Reads the cookie-seeded SettingsProvider, so SSR renders the correct width (no flash).
 */
const ContentLayout = ({ children, className }: { children: ReactNode; className?: string }) => {
  const { settings } = useSettings()

  return (
    <div className={cn('mx-auto w-full px-4 sm:px-6 lg:px-8', settings.layout === 'compact' && 'max-w-7xl', className)}>
      {children}
    </div>
  )
}

export default ContentLayout
