// Component Imports
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from '@/components/ui/avatar'

type AuthPromoPanelProps = {
  title: string
  description: string
  cardTitle: string
  cardText: string
}

const avatars = [
  'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png',
  'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png',
  'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png'
]

const AuthPromoPanel = ({ title, description, cardTitle, cardText }: AuthPromoPanelProps) => {
  return (
    <div className='bg-muted p-5 max-lg:hidden'>
      <div className='from-primary to-primary/80 flex h-full flex-col justify-between rounded-2xl bg-linear-to-br p-8'>
        <div>
          <h1 className='mb-6 text-4xl font-bold text-white'>{title}</h1>
          <p className='text-xl text-white/80'>{description}</p>
        </div>
        <div className='bg-background space-y-6 rounded-2xl p-8'>
          <p className='text-2xl font-bold'>{cardTitle}</p>
          <p className='text-muted-foreground text-lg'>{cardText}</p>
          <AvatarGroup className='justify-start'>
            {avatars.map((src, index) => (
              <Avatar key={src} size='lg'>
                <AvatarImage src={src} alt={`Member ${index + 1}`} />
                <AvatarFallback>U{index + 1}</AvatarFallback>
              </Avatar>
            ))}
            <AvatarGroupCount>+3.9k</AvatarGroupCount>
          </AvatarGroup>
        </div>
      </div>
    </div>
  )
}

export default AuthPromoPanel
