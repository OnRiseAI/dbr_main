import WishlistView from '@/views/pages/account/wishlist-view'

export const metadata = { title: 'Wishlist' }

const WishlistPage = () => {
  return (
    <div className='space-y-8'>
      <div className='space-y-1'>
        <h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>Wishlist</h1>
        <p className='text-muted-foreground'>Saved on this device. Sign in on another and it starts empty.</p>
      </div>
      <WishlistView />
    </div>
  )
}

export default WishlistPage
