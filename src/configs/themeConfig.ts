/*
 * Default theme settings for the Theme Customizer.
 *
 * These are the fallback values used when no settings cookie exists. The cookie takes
 * priority, so changing a value here only takes effect after the cookie is reset
 * (use the reset button in the customizer, or clear the `settingsCookieName` cookie).
 */

const themeConfig = {
  settingsCookieName: 'shadcn-template-settings',
  mode: 'system', // 'system' | 'light' | 'dark'
  themePreset: 'default', // 'default' | any key from src/utils/theme-presets.ts
  headingFont: 'geist', // any key from FONT_CONFIG in src/utils/fonts.ts
  bodyFont: 'geist', // any key from FONT_CONFIG in src/utils/fonts.ts
  monoFont: 'geist-mono', // any key from FONT_CONFIG in src/utils/fonts.ts
  radius: 'md', // 'none' | 'sm' | 'md' | 'lg'
  scale: 'md', // 'sm' | 'md' | 'lg'
  layout: 'compact' // 'compact' | 'full'
} as const

export default themeConfig
