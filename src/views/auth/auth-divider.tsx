// Component Imports
import { Separator } from '@/components/ui/separator'

type AuthDividerProps = {
  label: string
}

const AuthDivider = ({ label }: AuthDividerProps) => {
  return (
    <div className='flex items-center gap-3'>
      <Separator className='flex-1' />
      <span className='text-muted-foreground text-sm whitespace-nowrap'>{label}</span>
      <Separator className='flex-1' />
    </div>
  )
}

export default AuthDivider
