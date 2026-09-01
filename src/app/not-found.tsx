// Next Imports
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='flex min-h-screen items-center justify-center px-6'>
      <div className='text-center'>
        <h1 className='mb-4 text-6xl font-bold'>404</h1>
        <h2 className='mb-4 text-2xl font-semibold'>Page Not Found</h2>
        <p className='text-muted-foreground mb-8 text-lg'>
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <Link
          href='/'
          className='bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center rounded-md px-8 text-sm font-medium transition-colors'
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}
