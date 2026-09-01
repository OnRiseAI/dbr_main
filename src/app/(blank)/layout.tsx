// React Imports
import type { ReactNode } from 'react'

/**
 * Blank Layout
 * This layout is used for pages that don't need header/footer
 * Examples: Authentication pages, onboarding flows, error pages, etc.
 */
const BlankLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return <>{children}</>
}

export default BlankLayout
