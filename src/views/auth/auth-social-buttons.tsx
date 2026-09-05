// Component Imports
import { Button } from '@/components/ui/button'

type AuthSocialButtonsProps = {
  layout?: 'row' | 'column'
  googleOnly?: boolean
}

const AuthSocialButtons = ({ layout = 'row', googleOnly = false }: AuthSocialButtonsProps) => {
  return (
    <div className={layout === 'row' ? 'flex w-full gap-3 max-sm:flex-col' : 'flex w-full flex-col gap-3'}>
      <Button variant='outline' className='grow'>
        <img src='/images/auth-pages/google.webp' alt='Google' className='size-5 object-contain' />
        Login with Google
      </Button>
      {!googleOnly && (
        <Button variant='outline' className='grow'>
          <img src='/images/auth-pages/facebook.webp' alt='Facebook' className='size-5 object-contain' />
          Login with Facebook
        </Button>
      )}
    </div>
  )
}

export default AuthSocialButtons
