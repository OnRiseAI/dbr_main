'use client'

// React Imports
import type { ReactNode } from 'react'
import { createContext, useEffect, useMemo, useRef } from 'react'

// Third-party Imports
import { useTheme } from 'next-themes'

// Hook Imports
import { useObjectCookie } from '@/hooks/use-object-cookie'

// Config Imports
import themeConfig from '@/configs/themeConfig'
import {
  initialSettings,
  RADIUS_VALUES,
  type FontKey,
  type Layout,
  type Mode,
  type Radius,
  type Scale,
  type Settings,
  type ThemePresetKey
} from '@/configs/theme-settings'

// Util Imports
import { FONT_CONFIG } from '@/utils/fonts'
import { themePresets } from '@/utils/theme-presets'

// Re-export so existing client consumers keep importing settings types/values from here
export { initialSettings, RADIUS_VALUES }
export type { FontKey, Layout, Mode, Radius, Scale, Settings, ThemePresetKey }

const PRESET_CSS_VARS = [
  'background',
  'foreground',
  'card',
  'card-foreground',
  'popover',
  'popover-foreground',
  'primary',
  'primary-foreground',
  'secondary',
  'secondary-foreground',
  'muted',
  'muted-foreground',
  'accent',
  'accent-foreground',
  'destructive',
  'border',
  'input',
  'ring',
  'chart-1',
  'chart-2',
  'chart-3',
  'chart-4',
  'chart-5',
  'sidebar',
  'sidebar-foreground',
  'sidebar-primary',
  'sidebar-primary-foreground',
  'sidebar-accent',
  'sidebar-accent-foreground',
  'sidebar-border',
  'sidebar-ring',
  'shadow-color',
  'shadow-opacity',
  'shadow-blur',
  'shadow-spread',
  'shadow-offset-x',
  'shadow-offset-y'
] as const

// Message type for BroadcastChannel
type BroadcastMessage = {
  type: 'SETTINGS_UPDATED'
  payload: Settings
}

// SettingsContextProps type
type SettingsContextProps = {
  settings: Settings
  updateSettings: (settings: Partial<Settings>) => void
}

// Props type
type Props = {
  children: ReactNode
  settingsCookie?: Settings
}

// Ignore the mode hotkey while the user is typing in a field
const isTypingTarget = (target: EventTarget | null) => {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  return (
    target.isContentEditable ||
    target.tagName === 'INPUT' ||
    target.tagName === 'TEXTAREA' ||
    target.tagName === 'SELECT'
  )
}

// Initial Settings Context
export const SettingsContext = createContext<SettingsContextProps | null>(null)

// Settings Provider
export const SettingsProvider = (props: Props) => {
  // Props
  const { children } = props

  // Hooks
  const { setTheme, resolvedTheme } = useTheme()

  const broadcastChannelRef = useRef<BroadcastChannel | null>(null)

  const [cookie, updateCookie] = useObjectCookie<Settings>(themeConfig.settingsCookieName, {
    ...initialSettings,
    ...props.settingsCookie
  })

  const settings: Settings = useMemo(() => ({ ...initialSettings, ...cookie }), [cookie])

  useEffect(() => {
    if (!props.settingsCookie) {
      updateCookie(initialSettings)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Handle BroadcastChannel for cross-tab communication
  useEffect(() => {
    // Only run in browser environment and check if BroadcastChannel is supported
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      try {
        // Create a new channel if it doesn't exist
        if (!broadcastChannelRef.current) {
          broadcastChannelRef.current = new BroadcastChannel(themeConfig.settingsCookieName)
        }

        // Listen for settings changes from other tabs
        const handleMessage = (event: MessageEvent<BroadcastMessage>) => {
          const { type, payload } = event.data

          if (type === 'SETTINGS_UPDATED') {
            // Update cookie with complete settings from other tab
            updateCookie(payload)
          }
        }

        broadcastChannelRef.current.onmessage = handleMessage

        return () => {
          broadcastChannelRef.current?.close()
          broadcastChannelRef.current = null
        }
      } catch (error) {
        console.error('BroadcastChannel error:', error)

        // Clean up in case of error
        if (broadcastChannelRef.current) {
          try {
            broadcastChannelRef.current.close()
          } catch {
            // Ignore close errors
          }

          broadcastChannelRef.current = null
        }
      }
    }
  }, [updateCookie])

  // Handle settings update
  const broadcastSettingsUpdate = (updatedSettings: Settings) => {
    if (typeof window === 'undefined' || !('BroadcastChannel' in window)) {
      return // Exit early if not in browser or BroadcastChannel not supported
    }

    // Check if we need to create the channel
    if (!broadcastChannelRef.current) {
      try {
        broadcastChannelRef.current = new BroadcastChannel(themeConfig.settingsCookieName)
      } catch (error) {
        console.error('Failed to create BroadcastChannel', error)

        return
      }
    }

    // Now try to send the message
    try {
      broadcastChannelRef.current.postMessage({
        type: 'SETTINGS_UPDATED',
        payload: updatedSettings
      })
    } catch (error) {
      console.error('Failed to broadcast settings update', error)

      // If posting fails, try to recreate the channel for next time
      try {
        broadcastChannelRef.current.close()
      } catch {
        // Ignore close errors
      }

      broadcastChannelRef.current = null
    }
  }

  const updateSettings = (newSettings: Partial<Settings>) => {
    const updatedSettings = { ...settings, ...newSettings }

    updateCookie(updatedSettings)

    // Update next-themes when mode changes
    if (newSettings.mode) {
      setTheme(newSettings.mode)
    }

    // Broadcast the complete updated settings to other tabs
    broadcastSettingsUpdate(updatedSettings)
  }

  // Handle mode change
  useEffect(() => {
    setTheme(settings.mode)
  }, [settings.mode, setTheme])

  // Press "d" to toggle light/dark (routed through settings so the cookie stays in sync)
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.repeat || event.metaKey || event.ctrlKey || event.altKey) {
        return
      }

      if (event.key.toLowerCase() !== 'd' || isTypingTarget(event.target)) {
        return
      }

      updateSettings({ mode: resolvedTheme === 'dark' ? 'light' : 'dark' })
    }

    window.addEventListener('keydown', onKeyDown)

    return () => window.removeEventListener('keydown', onKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedTheme])

  // Handle theme preset change
  useEffect(() => {
    const root = document.documentElement

    if (settings.themePreset === 'default') {
      PRESET_CSS_VARS.forEach(key => root.style.removeProperty(`--${key}`))

      return
    }

    const preset = themePresets[settings.themePreset]

    if (!preset) return

    const mode = resolvedTheme === 'dark' ? 'dark' : 'light'

    Object.entries(preset.styles[mode]).forEach(([key, value]) => {
      if (value !== undefined) root.style.setProperty(`--${key}`, value as string)
    })
  }, [settings.themePreset, resolvedTheme])

  // Handle radius change
  useEffect(() => {
    document.documentElement.style.setProperty('--radius', RADIUS_VALUES[settings.radius])
  }, [settings.radius])

  // Handle scale change
  useEffect(() => {
    if (settings.scale === 'md') {
      document.documentElement.removeAttribute('data-theme-scale')
    } else {
      document.documentElement.setAttribute('data-theme-scale', settings.scale)
    }
  }, [settings.scale])

  // Handle font changes - body drives --font-sans (and the base font-family),
  // heading drives --font-heading (used by h1–h6), mono drives --font-mono.
  useEffect(() => {
    const root = document.documentElement
    const bodyVar = FONT_CONFIG[settings.bodyFont]?.variable ?? '--font-geist-sans'
    const headingVar = FONT_CONFIG[settings.headingFont]?.variable ?? '--font-geist-sans'
    const monoVar = FONT_CONFIG[settings.monoFont]?.variable ?? '--font-geist-mono'

    root.style.setProperty('font-family', `var(${bodyVar})`)
    root.style.setProperty('--font-sans', `var(${bodyVar})`)
    root.style.setProperty('--font-heading', `var(${headingVar})`)
    root.style.setProperty('--font-mono', `var(${monoVar})`)
  }, [settings.bodyFont, settings.headingFont, settings.monoFont])

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSettings
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}
