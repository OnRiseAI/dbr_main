'use client'

// React Imports
import type { ComponentProps } from 'react'
import { useState } from 'react'

// Third-party Imports
import { EyeIcon, EyeOffIcon } from 'lucide-react'

// Component Imports
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group'

const PasswordInput = ({ className, ...props }: ComponentProps<typeof InputGroupInput>) => {
  const [show, setShow] = useState(false)

  return (
    <InputGroup className={className}>
      <InputGroupInput type={show ? 'text' : 'password'} {...props} />
      <InputGroupAddon align='inline-end'>
        <InputGroupButton onClick={() => setShow(!show)} aria-label={show ? 'Hide password' : 'Show password'}>
          {show ? <EyeOffIcon /> : <EyeIcon />}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}

export default PasswordInput
