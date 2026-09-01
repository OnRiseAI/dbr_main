'use client'

// Third-party Imports
import { SearchIcon } from 'lucide-react'

// Component Imports
import { Button } from '@/components/ui/button'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import ContentLayout from '@/components/layout/content-layout'

const HelpHero = () => {
  return (
    <section className='bg-muted py-14 sm:py-20 lg:py-31.75'>
      <ContentLayout>
        <div className='flex flex-col items-center justify-center rounded-xl text-center'>
          <h2 className='mb-2 text-2xl font-bold md:text-4xl'>How can we help you today?</h2>
          <p className='mb-6 text-lg'>Find styles, features, and colors that match your everyday life.</p>
          <div className='flex w-full sm:max-w-86'>
            <InputGroup className='input-lg bg-white'>
              <InputGroupInput placeholder='Ask your Query' />
              <InputGroupAddon align='inline-end'>
                <Button
                  variant='ghost'
                  size='icon'
                  className='text-muted-foreground focus-visible:ring-ring/50 rounded-l-none hover:bg-transparent'
                >
                  <SearchIcon />
                  <span className='sr-only'>Subscribe</span>
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>
      </ContentLayout>
    </section>
  )
}

export default HelpHero
