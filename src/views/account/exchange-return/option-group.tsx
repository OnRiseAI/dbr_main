'use client'

// Component Imports
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

type Option = { label: string; value: string }

type OptionGroupProps = {
  options: Option[]
  value: string
  onChange: (value: string) => void
  name: string
}

const OptionGroup = ({ options, value, onChange, name }: OptionGroupProps) => {
  return (
    <RadioGroup value={value} onValueChange={onChange} aria-label={name} className='flex flex-wrap gap-4'>
      {options.map(option => (
        <div key={option.value} className='flex cursor-pointer items-center gap-2.5'>
          <RadioGroupItem
            value={option.value}
            id={`${name}-${option.value}`}
            className='size-6 [&_[data-slot=radio-group-indicator]>span]:size-3.5'
          />
          <Label htmlFor={`${name}-${option.value}`} className='cursor-pointer text-sm font-normal'>
            {option.label}
          </Label>
        </div>
      ))}
    </RadioGroup>
  )
}

export default OptionGroup
