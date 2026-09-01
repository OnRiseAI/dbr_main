// React Imports
import type { CSSProperties } from 'react'

// Config Imports
import { initialSettings, RADIUS_VALUES, type Scale, type Settings } from '@/configs/theme-settings'

// Util Imports
import { FONT_CONFIG } from '@/utils/fonts'
import { themePresets } from '@/utils/theme-presets'

/**
 * Mode-INDEPENDENT theme values (radius, fonts) applied directly to the SSR <html>
 * `style` attribute, plus the scale `data-theme-scale` attribute. Rendering these
 * server-side means they're correct in the first byte of HTML - no flash, no reliance
 * on a client script. Spread onto <html> in the root layout.
 */
export const getThemeInitAttributes = (
  settingsCookie?: Settings
): { style: CSSProperties; 'data-theme-scale'?: Scale } => {
  const settings: Settings = { ...initialSettings, ...settingsCookie }

  const bodyVar = FONT_CONFIG[settings.bodyFont]?.variable ?? '--font-geist-sans'
  const headingVar = FONT_CONFIG[settings.headingFont]?.variable ?? '--font-geist-sans'
  const monoVar = FONT_CONFIG[settings.monoFont]?.variable ?? '--font-geist-mono'

  return {
    style: {
      '--radius': RADIUS_VALUES[settings.radius],
      '--font-sans': `var(${bodyVar})`,
      '--font-heading': `var(${headingVar})`,
      '--font-mono': `var(${monoVar})`
    } as CSSProperties,

    // Only 'sm'/'lg' need the attribute; 'md' is the default (no attribute)
    'data-theme-scale': settings.scale === 'md' ? undefined : settings.scale
  }
}

/**
 * Mode-DEPENDENT theme values (preset colors) that can't be resolved server-side for
 * `system` mode. Returns a synchronous, blocking script that applies the active preset's
 * colors for the resolved light/dark mode BEFORE first paint. next-themes handles the
 * light/dark class itself. Inject the returned string into a <script> at the top of <body>.
 */
export const getThemeInitScript = (settingsCookie?: Settings): string => {
  const settings: Settings = { ...initialSettings, ...settingsCookie }

  const activePreset =
    settings.themePreset !== 'default' ? themePresets[settings.themePreset as keyof typeof themePresets] : null

  const payload = {
    mode: settings.mode,
    styles: activePreset ? activePreset.styles : null
  }

  // Escape `<` so the JSON can't break out of the <script> tag
  const json = JSON.stringify(payload).replace(/</g, '\\u003c')

  return `(function(){try{var s=${json};if(!s.styles)return;var d=document.documentElement;var dark=s.mode==='dark'||(s.mode==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);var v=s.styles[dark?'dark':'light'];for(var k in v){if(v[k]!=null)d.style.setProperty('--'+k,v[k]);}}catch(e){}})();`
}
