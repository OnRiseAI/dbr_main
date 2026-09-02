import ContentLayout from '@/components/layout/content-layout'
import type { ContentPage } from '@/types/product'

type Props = {
  page: ContentPage
}

const ContentPageView = ({ page }: Props) => {
  return (
    <section className='py-10 lg:py-14'>
      <ContentLayout className='max-w-3xl space-y-6'>
        <h1 className='text-4xl font-bold text-balance lg:text-5xl'>{page.title}</h1>
        <article
          className='prose prose-neutral dark:prose-invert max-w-none'
          dangerouslySetInnerHTML={{ __html: page.html }}
        />
      </ContentLayout>
    </section>
  )
}

export { ContentPageView }
export default ContentPageView
