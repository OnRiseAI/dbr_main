// Config Imports
import themeConfig from '@/configs/themeConfig'

// Util Imports
import type { FontKey } from '@/utils/fonts'
import type { ThemePresetKey } from '@/utils/theme-presets'

/*
 * Framework-agnostic theme settings shape + defaults.
 *
 * This file intentionally has NO 'use client' directive so it can be imported from
 * BOTH server code (root layout, theme-script) and client code (SettingsProvider,
 * customizer). Keeping RADIUS_VALUES / initialSettings here - rather than in the
 * 'use client' settings context - ensures server components read the real values
 * instead of client-reference proxies (which would resolve to `undefined`).
 */

export type Mode = 'light' | 'dark' | 'system'
export type Radius = 'none' | 'sm' | 'md' | 'lg'
export type Layout = 'compact' | 'full'
export type Scale = 'sm' | 'md' | 'lg'
export type { FontKey, ThemePresetKey }

export type Settings = {
  mode: Mode
  themePreset: ThemePresetKey
  radius: Radius
  layout: Layout
  scale: Scale
  headingFont: FontKey
  bodyFont: FontKey
  monoFont: FontKey
}

// Radius values
export const RADIUS_VALUES: Record<Radius, string> = {
  none: '0rem',
  sm: '0.45rem',
  md: '0.625rem',
  lg: '0.875rem'
}

// Initial Settings – derived from themeConfig so users only need to edit one file
export const initialSettings: Settings = {
  mode: themeConfig.mode,
  themePreset: themeConfig.themePreset as ThemePresetKey,
  headingFont: themeConfig.headingFont as FontKey,
  bodyFont: themeConfig.bodyFont as FontKey,
  monoFont: themeConfig.monoFont as FontKey,
  radius: themeConfig.radius,
  scale: themeConfig.scale,
  layout: themeConfig.layout
}
