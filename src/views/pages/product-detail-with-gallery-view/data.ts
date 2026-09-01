// Type Imports
import type { Product } from '@/types/product'

/**
 * Fully static payload for the gallery-only product detail page - not looked up
 * by id/slug, unlike the dynamic `/product/[slug]` route which reads from fake-db.
 */
export const staticProduct: Product = {
  id: 'womens-blue-lazy-garfield-oversized-tee',
  brand: 'UrbanDrip',
  name: "Women's Blue Lazy Garfield Graphic Printed Oversized T-shirt",
  image: '/images/product-details/gallery-1.webp',
  price: 49,
  originalPrice: 199,
  discount: 20,
  showDiscountBadge: true,
  href: '/product-detail-with-gallery-view',
  rating: 4.5,
  reviewCount: 210,
  category: 'Everyday Wear',
  description:
    'Stay effortlessly cool and comfortable with our blue oversized t-shirt. Crafted from soft, breathable cotton.',
  images: [
    '/images/product-details/gallery-1.webp',
    '/images/product-details/gallery-2.webp',
    '/images/product-details/gallery-3.webp',
    '/images/product-details/gallery-4.webp',
    '/images/product-details/gallery-5.webp',
    '/images/product-details/gallery-6.webp',
    '/images/product-details/gallery-7.webp',
    '/images/product-details/gallery-8.webp'
  ],
  colors: [
    { name: 'Surf the Web', value: '#3b5bdb' },
    { name: 'Rustic Clay', value: '#c2540f' },
    { name: 'Forest Green', value: '#2f9e44' }
  ],
  sizes: [
    { label: 'XS', note: '1 left' },
    { label: 'S' },
    { label: 'M' },
    { label: 'L', note: '2 left' },
    { label: 'XL' }
  ],
  highlights: [
    {
      category: 'Everyday Wear',
      manufacture: 'UrbanDrip',
      material: '100% Cotton',
      compatibility: 'Regular Fit (All Sizes)',
      features: ['Lightweight', 'Skin-friendly']
    },
    {
      category: 'Designer Tees',
      manufacture: 'UrbanDrip',
      material: 'Cotton + Polyester Blend',
      compatibility: 'Unisex Fit',
      features: ['Eco-friendly', 'Premium feel']
    }
  ],
  reviews: [
    {
      rating: 4.5,
      date: 'November 18, 2023 at 15:08',
      text: 'Fits true to size and the print quality held up after several washes. The oversized cut is comfortable without feeling baggy.',
      photos: [
        '/images/product-details/review-01.webp',
        '/images/product-details/review-02.webp',
        '/images/product-details/review-03.webp'
      ],
      author: 'Cristofer Torff',
      avatar: '/images/product-details/review-avatar-01.webp'
    },
    {
      rating: 4.5,
      date: 'June 12, 2023 at 02:08',
      text: 'Soft cotton feel and the color matches the photos exactly. Ordered a size up for the relaxed oversized fit and it worked well.',
      photos: ['/images/product-details/review-02.webp', '/images/product-details/review-04.webp'],
      author: 'Cris Baptista',
      avatar: '/images/product-details/review-avatar-02.webp'
    },
    {
      rating: 4,
      date: 'May 3, 2023 at 11:42',
      text: 'Good everyday tee, the graphic print is vibrant and hasn’t cracked after multiple washes. Sizing runs a touch large.',
      author: 'Priya Malhotra',
      avatar: '/images/product-details/review-avatar-02.webp'
    },
    {
      rating: 5,
      date: 'April 21, 2023 at 09:15',
      text: 'Exactly what I wanted for a lazy-day fit. Fabric is thick enough to not be see-through and the color hasn’t faded.',
      photos: ['/images/product-details/review-01.webp'],
      author: 'Daniel Reyes',
      avatar: '/images/product-details/review-avatar-01.webp'
    }
  ]
}

/** Fixed "You may also like" set - not derived from the selected product. */
export const staticRelatedProducts: Product[] = [
  {
    id: 'urban-drip-graphic-tee',
    brand: 'Urban Drip',
    name: 'Graphic Print Relaxed Fit Tee',
    image: '/images/product-details/t-shirt-2.webp',
    price: 225,
    originalPrice: 249,
    discount: 10,
    href: '/product/urban-drip-graphic-tee',
    rating: 4.2,
    reviewCount: 54,
    category: 'Everyday Wear',
    description: 'Relaxed-fit graphic tee in soft cotton jersey.',
    images: [],
    colors: [],
    highlights: [],
    reviews: []
  },
  {
    id: 'thread-syndicate-graphic-tee',
    brand: 'Thread Syndicate',
    name: 'Signature Graphic Jersey Tee',
    image: '/images/product-details/t-shirt-3.webp',
    price: 225,
    originalPrice: 249,
    discount: 10,
    href: '/product/thread-syndicate-graphic-tee',
    rating: 4.3,
    reviewCount: 61,
    category: 'Everyday Wear',
    description: 'Relaxed-fit graphic tee in soft cotton jersey.',
    images: [],
    colors: [],
    highlights: [],
    reviews: []
  },
  {
    id: 'ink-theory-graphic-tee',
    brand: 'Ink Theory',
    name: 'Ink Print Relaxed Fit Tee',
    image: '/images/product-details/t-shirt-4.webp',
    price: 225,
    originalPrice: 249,
    discount: 10,
    href: '/product/ink-theory-graphic-tee',
    rating: 4.1,
    reviewCount: 47,
    category: 'Everyday Wear',
    description: 'Relaxed-fit graphic tee in soft cotton jersey.',
    images: [],
    colors: [],
    highlights: [],
    reviews: []
  },
  {
    id: 'street-pulse-graphic-tee',
    brand: 'Street Pulse',
    name: 'Street Pulse Graphic Tee',
    image: '/images/product-details/t-shirt-1.webp',
    price: 225,
    originalPrice: 249,
    discount: 10,
    href: '/product/street-pulse-graphic-tee',
    rating: 4.4,
    reviewCount: 39,
    category: 'Everyday Wear',
    description: 'Relaxed-fit graphic tee in soft cotton jersey.',
    images: [],
    colors: [],
    highlights: [],
    reviews: []
  },
  {
    id: 'vintage-vibe-oversized-tee',
    brand: 'Vintage Vibe',
    name: 'Retro Print Oversized T-Shirt',
    image: '/images/product-details/t-shirt-2.webp',
    price: 189,
    originalPrice: 219,
    discount: 14,
    href: '/product/vintage-vibe-oversized-tee',
    rating: 4.3,
    reviewCount: 72,
    category: 'Casual',
    description: 'Vintage-inspired oversized tee with retro print design.',
    images: [],
    colors: [],
    highlights: [],
    reviews: []
  },
  {
    id: 'cotton-comfort-classic',
    brand: 'Cotton Comfort',
    name: 'Premium Cotton Classic Tee',
    image: '/images/product-details/t-shirt-3.webp',
    price: 159,
    originalPrice: 189,
    discount: 16,
    href: '/product/cotton-comfort-classic',
    rating: 4.5,
    reviewCount: 156,
    category: 'Basics',
    description: 'Premium quality 100% cotton tee with perfect fit.',
    images: [],
    colors: [],
    highlights: [],
    reviews: []
  },
  {
    id: 'modern-minimal-tee',
    brand: 'Modern Minimal',
    name: 'Minimalist Design T-Shirt',
    image: '/images/product-details/t-shirt-4.webp',
    price: 145,
    originalPrice: 179,
    discount: 19,
    href: '/product/modern-minimal-tee',
    rating: 4.2,
    reviewCount: 93,
    category: 'Contemporary',
    description: 'Sleek minimalist design for everyday sophistication.',
    images: [],
    colors: [],
    highlights: [],
    reviews: []
  },
  {
    id: 'urban-style-graphic',
    brand: 'Urban Style',
    name: 'Bold Graphic Urban Tee',
    image: '/images/product-details/t-shirt-1.webp',
    price: 199,
    originalPrice: 239,
    discount: 17,
    href: '/product/urban-style-graphic',
    rating: 4.4,
    reviewCount: 118,
    category: 'Street Wear',
    description: 'Bold graphic design urban tee for the modern style.',
    images: [],
    colors: [],
    highlights: [],
    reviews: []
  }
]
