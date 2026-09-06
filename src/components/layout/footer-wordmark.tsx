'use client'

// React Imports
import { useRef, type MouseEvent } from 'react'

const WORD = 'DEEP BEAUTY RESEARCH'

/**
 * The faint wordmark in the footer, alive on hover: the whole word drifts a little with the
 * cursor, and each letter under the pointer lifts and takes the teal accent. Pure CSS
 * transitions plus one transform, so it costs nothing when idle.
 */
const FooterWordmark = () => {
  const ref = useRef<HTMLParagraphElement>(null)

  const onMove = (e: MouseEvent<HTMLParagraphElement>) => {
    const el = ref.current

    if (!el) return

    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    el.style.transform = `translate(${x * 24}px, ${y * 10}px)`
  }

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  return (
    <p
      ref={ref}
      aria-hidden
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className='group mb-10 flex justify-center text-[7.4vw] leading-none font-bold tracking-[-0.04em] whitespace-pre transition-[transform,letter-spacing] duration-500 ease-out select-none hover:tracking-[-0.01em] max-md:hidden xl:text-[6.6rem]'
    >
      {WORD.split('').map((letter, index) => (
        <span
          key={index}
          className='text-foreground/[0.06] inline-block transition-[transform,color] duration-300 ease-out group-hover:text-foreground/[0.12] hover:-translate-y-3 hover:text-[#0592b3]!'
          style={{ transitionDelay: `${index * 12}ms` }}
        >
          {letter}
        </span>
      ))}
    </p>
  )
}

export default FooterWordmark
