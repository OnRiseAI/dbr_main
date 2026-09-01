'use client'

// React Imports
import * as React from 'react'

// Third-party Imports
import { ThemeProvider as NextThemesProvider } from 'next-themes'

// `system` is enabled so the Theme Customizer's "System" mode works. The actual
// mode value (light/dark/system) is owned by SettingsProvider, which calls
// next-themes' setTheme - see src/contexts/settingsContext.tsx.
function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange {...props}>
      {children}
    </NextThemesProvider>
  )
}

export { ThemeProvider }
