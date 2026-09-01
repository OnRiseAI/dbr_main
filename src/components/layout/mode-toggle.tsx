'use client'

// Third-party Imports
import { MoonStarIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

// Component Imports
import { Button } from '@/components/ui/button'

// Hook Imports
import { useSettings } from '@/hooks/use-settings'

const ModeToggle = () => {
  const { resolvedTheme } = useTheme()
  const { updateSettings } = useSettings()

  return (
    <Button
      variant='outline'
      size='icon'
      className='relative'
      onClick={() => updateSettings({ mode: resolvedTheme === 'dark' ? 'light' : 'dark' })}
    >
      <MoonStarIcon className='scale-100 dark:scale-0' />
      <SunIcon className='absolute scale-0 dark:scale-100' />
      <span className='sr-only'>Toggle theme</span>
    </Button>
  )
}

export { ModeToggle }
