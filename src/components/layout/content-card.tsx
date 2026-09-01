// React Imports
import type { ReactNode } from 'react'

// Component Imports
import ContentLayout from '@/components/layout/content-layout'

// Utils Imports
import { cn } from '@/lib/utils'

type Props = {
  children: ReactNode
  className?: string
}

/**
 * Standard storefront content container - the consistent vertical rhythm + centered,
 * max-width gutter used by content pages. Pages wrap their view in this so the spacing
 * lives in one place. Full-bleed pages (home/category hero) and pages that own their
 * layout (account grid, product gallery) render their view directly instead.
 */
const ContentCard = ({ children, className }: Props) => {
  return (
    <section className={cn('py-8 sm:py-10 lg:py-14', className)}>
      <ContentLayout>{children}</ContentLayout>
    </section>
  )
}

export default ContentCard
