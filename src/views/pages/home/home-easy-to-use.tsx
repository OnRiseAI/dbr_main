'use client'

// React Imports
import { useRef, useState } from 'react'

// Third-party Imports
import { PauseIcon, PlayIcon, PlusIcon, MinusIcon, ShieldCheckIcon, FileCheckIcon } from 'lucide-react'

// Component Imports
import ContentLayout from '@/components/layout/content-layout'

// Utils Imports
import { cn } from '@/lib/utils'

const STEPS = [
  {
    title: 'Open the box',
    body: 'The pen arrives pre-filled and sealed, with its batch documentation. Keep it in the fridge until you need it.'
  },
  {
    title: 'Attach the needle',
    body: 'Remove the cap and screw a standard pen needle onto the front. A fresh needle each time.'
  },
  {
    title: 'Set the dose',
    body: 'Turn the dial to the number of clicks from the calculator. Each click is 0.0125 ml. Inject, hold, done.'
  }
]

/**
 * Easy to use: three steps that open one at a time beside the pen video. The video plays
 * muted on loop; the button in its corner pauses it.
 */
const HomeEasyToUse = () => {
  const [openStep, setOpenStep] = useState(0)
  const [playing, setPlaying] = useState(true)
  const video = useRef<HTMLVideoElement>(null)

  const toggle = () => {
    const el = video.current

    if (!el) return

    if (el.paused) {
      void el.play()
      setPlaying(true)
    } else {
      el.pause()
      setPlaying(false)
    }
  }

  return (
    <section id='easy-to-use' className='scroll-mt-(--header-height) pt-8 sm:pt-16 lg:pt-24'>
      <ContentLayout>
        <div className='grid items-center gap-10 lg:grid-cols-2 lg:gap-16'>
          <div className='space-y-6'>
            <div className='space-y-3'>
              <h3 className='text-2xl font-bold sm:text-3xl'>Easy to use</h3>
              <p className='text-muted-foreground max-w-md text-base'>
                Our pre-filled pens are built for precision and convenience. The whole process is three simple steps.
              </p>
            </div>

            <ol className='divide-y border-y'>
              {STEPS.map((step, index) => {
                const open = openStep === index

                return (
                  <li key={step.title}>
                    <button
                      type='button'
                      onClick={() => setOpenStep(open ? -1 : index)}
                      aria-expanded={open}
                      className='flex w-full items-center gap-3 py-4 text-left'
                    >
                      <span className='bg-primary text-primary-foreground flex size-6 shrink-0 items-center justify-center rounded-sm text-xs font-bold'>
                        {index + 1}
                      </span>
                      <span className='flex-1 text-lg font-medium sm:text-xl'>{step.title}</span>
                      {open ? <MinusIcon className='text-muted-foreground size-5' /> : <PlusIcon className='text-muted-foreground size-5' />}
                    </button>
                    <div className={cn('grid transition-[grid-template-rows] duration-300', open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
                      <p className='text-muted-foreground overflow-hidden pl-9 text-sm leading-relaxed'>
                        <span className='block pb-4'>{step.body}</span>
                      </p>
                    </div>
                  </li>
                )
              })}
            </ol>

            <div className='flex flex-wrap gap-2'>
              <span className='inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200'>
                <ShieldCheckIcon className='size-4' /> Sterile packaging
              </span>
              <span className='inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200'>
                <FileCheckIcon className='size-4' /> Batch documentation included
              </span>
            </div>
          </div>

          <div className='relative overflow-hidden rounded-xl bg-neutral-100'>
            <video
              ref={video}
              src='/videos/pen-easy-to-use.mp4'
              poster='/videos/pen-easy-to-use-poster.jpg'
              autoPlay
              muted
              loop
              playsInline
              preload='metadata'
              className='aspect-square w-full object-cover'
            />
            <button
              type='button'
              onClick={toggle}
              aria-label={playing ? 'Pause video' : 'Play video'}
              className='absolute top-4 left-4 flex size-10 items-center justify-center rounded-full bg-white/95 text-neutral-900 shadow-md transition hover:bg-white'
            >
              {playing ? <PauseIcon className='size-4' /> : <PlayIcon className='ml-0.5 size-4' />}
            </button>
          </div>
        </div>
      </ContentLayout>
    </section>
  )
}

export default HomeEasyToUse
