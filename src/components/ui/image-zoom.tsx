'use client'

import { useState, useRef } from 'react'

import { cn } from '@/lib/utils'

type Props = {
  src: string
  alt: string
  className?: string
  zoomLevel?: number
}

const ImageZoom = ({ src, alt, className, zoomLevel = 2 }: Props) => {
  const [isHovering, setIsHovering] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const xPercent = (x / rect.width) * 100
    const yPercent = (y / rect.height) * 100

    setMousePosition({ x: xPercent, y: yPercent })
  }

  return (
    <div
      ref={containerRef}
      className={cn('bg-muted/40 relative cursor-zoom-in overflow-visible rounded-md', className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Base image */}
      <img src={src} alt={alt} className='h-full w-full rounded-md object-cover' />

      {/* Floating zoom window */}
      {isHovering && (
        <div
          className='bg-muted/40 border-border pointer-events-none absolute top-0 left-full z-40 ml-2 overflow-hidden rounded-xl border shadow-lg'
          style={{
            width: '350px',
            height: `350px`
          }}
        >
          <div
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: `${100 * zoomLevel}% ${100 * zoomLevel}%`,
              backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
              backgroundRepeat: 'no-repeat',
              width: '100%',
              height: '100%'
            }}
          />
        </div>
      )}
    </div>
  )
}

export default ImageZoom
