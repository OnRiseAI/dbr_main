import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ContentPageView } from '@/views/pages/content'
import { getPageByHandle, getPages } from '@/app/server/actions'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

type Params = {
  params: Promise<{ slug: string }>
}

export const generateStaticParams = async () => {
  const pages = await getPages()

  return pages.map(page => ({ slug: page.handle }))
}

export const generateMetadata = async ({ params }: Params): Promise<Metadata> => {
  const { slug } = await params
  const page = await getPageByHandle(slug)

  if (!page) {
    return generateSEOMetadata({ title: 'Page not found', url: `/pages/${slug}` })
  }

  return generateSEOMetadata({
    title: page.title,
    url: `/pages/${page.handle}`
  })
}

const CmsPage = async ({ params }: Params) => {
  const { slug } = await params
  const page = await getPageByHandle(slug)

  if (!page) notFound()

  return <ContentPageView page={page} />
}

export default CmsPage
