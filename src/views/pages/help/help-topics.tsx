// Next Imports
import Link from 'next/link'

// Type Imports
import type { HelpTopic } from '@/types/help'

// Component Imports
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import ContentLayout from '@/components/layout/content-layout'

type HelpTopicsProps = {
  helpTopics: HelpTopic[]
}

const HelpTopics = ({ helpTopics }: HelpTopicsProps) => {
  return (
    <section className='py-8 sm:py-14 lg:py-24'>
      <ContentLayout>
        <h2 className='mb-6 text-center text-2xl font-bold sm:mb-8 lg:text-3xl'>Your Support Hub Find What You Need</h2>
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {helpTopics.map(topic => {
            const Icon = topic.icon

            return (
              <Button
                key={topic.title}
                variant='outline'
                render={<Link href={topic.href} />}
                nativeButton={false}
                className='hover:border-primary dark:hover:border-primary h-auto rounded-xl p-0 whitespace-normal hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent'
              >
                <div className='flex flex-col items-center justify-center px-6 py-6 text-center'>
                  <Avatar className='mb-4 size-9 after:border-0'>
                    <AvatarFallback className='text-foreground'>
                      <Icon className='size-6' />
                    </AvatarFallback>
                  </Avatar>
                  <p className='mb-2 text-xl font-semibold'>{topic.title}</p>
                  <p className='text-muted-foreground text-lg font-normal'>{topic.description}</p>
                </div>
              </Button>
            )
          })}
        </div>
      </ContentLayout>
    </section>
  )
}

export default HelpTopics
