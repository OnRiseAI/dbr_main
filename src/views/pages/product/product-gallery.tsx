// Component Imports
import ImageZoom from '@/components/ui/image-zoom'

type Props = {
  images: string[]
  alt: string
}

const ProductGallery = ({ images, alt }: Props) => {
  return (
    <div className='grid grid-cols-2 gap-3 sm:gap-4'>
      {images.map((src, index) => (
        <ImageZoom key={index} src={src} alt={alt} className='w-full rounded-md' />
      ))}
    </div>
  )
}

export default ProductGallery
