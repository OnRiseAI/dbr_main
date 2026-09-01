'use client'

// Component Imports
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from '@/components/ui/select'

// Utils Imports
import { FONT_CONFIG, FONT_GROUPS, type FontKey } from '@/utils/fonts'

type FontSelectProps = {
  id: string
  label: string
  value: FontKey
  onValueChange: (value: FontKey) => void
}

/**
 * A single font picker (grouped by Sans / Mono / Serif). Reused by the Theme
 * Customizer for the heading, body, and monospace font settings.
 */
const FontSelect = ({ id, label, value, onValueChange }: FontSelectProps) => {
  return (
    <div className='flex flex-col gap-1 px-3'>
      <Label htmlFor={id}>{label}</Label>
      <Select id={id} value={value} onValueChange={v => onValueChange(v as FontKey)}>
        <SelectTrigger className='input-sm w-full'>
          <span
            className='flex-1 text-left'
            style={{ fontFamily: `var(${FONT_CONFIG[value]?.variable ?? '--font-geist-sans'})` }}
          >
            {FONT_CONFIG[value]?.label ?? 'Geist'}
          </span>
        </SelectTrigger>
        <SelectContent alignItemWithTrigger={false} className='p-1'>
          {FONT_GROUPS.map(({ key: groupKey, label: groupLabel }) => {
            const fonts = (Object.entries(FONT_CONFIG) as [FontKey, (typeof FONT_CONFIG)[FontKey]][]).filter(
              ([, config]) => config.group === groupKey
            )

            if (fonts.length === 0) return null

            return (
              <SelectGroup key={groupKey}>
                <SelectLabel>{groupLabel}</SelectLabel>
                {fonts.map(([key, config]) => (
                  <SelectItem key={key} value={key} className='[&>div]:items-center'>
                    <span style={{ fontFamily: `var(${config.variable})` }}>{config.label}</span>
                  </SelectItem>
                ))}
              </SelectGroup>
            )
          })}
        </SelectContent>
      </Select>
    </div>
  )
}

export default FontSelect
