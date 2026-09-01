export interface HeroProduct {
  id: string
  title: string
  description: string
  buttonText: string
  buttonLink: string
  mainImage: string
  variantImages: string[]
  mainImages?: string[]
  bgClass: string
  imgClass: string
}

export interface HeroProductVariant {
  image: string
  price?: number
  discount?: number
}

export interface HeroProduct02 {
  id: string
  title: string
  description: string
  buttonText: string
  buttonLink: string
  variants: HeroProductVariant[]
  bgClass: string
  imgClass: string
}

export const db: HeroProduct[] = [
  {
    id: 'hero-1',
    title: 'Premium Wireless Headphones for Everyday Listening',
    description:
      'Whether for calls, music, or media, these headphones combine comfort, durability, and high-quality sound in a refined design.',
    buttonText: 'Shop Now',
    buttonLink: '/shop',
    mainImage: '/images/landing-page/hero-layout/image-01.webp',
    variantImages: [
      '/images/landing-page/hero-layout/image-01.webp',
      '/images/landing-page/hero-layout/image-02.webp',
      '/images/landing-page/hero-layout/image-03.webp'
    ],
    bgClass: 'bg-linear-to-t from-[#C5DFDF] to-[#E4F0F0]',
    imgClass:
      'xl:max-w-70 max-lg:h-60 max-lg:w-60 max-sm:h-50 max-sm:w-50 lg:mt-10 xl:max-h-87.75 max-sm:mb-35 max-sm:mt-10 max-lg:mb-40'
  },
  {
    id: 'hero-2',
    title: 'Premium Nike Shoes Designed for Comfort and Performance',
    description:
      'Experience thoughtfully engineered footwear that supports movement while maintaining a refined athletic aesthetic.',
    buttonText: 'Shop Now',
    buttonLink: '/shop',
    mainImage: '/images/landing-page/hero-layout/image-04.webp',
    variantImages: [
      '/images/landing-page/hero-layout/image-04.webp',
      '/images/landing-page/hero-layout/image-05.webp',
      '/images/landing-page/hero-layout/image-06.webp'
    ],
    mainImages: [
      '/images/landing-page/hero-layout/mini-image-04.webp',
      '/images/landing-page/hero-layout/mini-image-05.webp',
      '/images/landing-page/hero-layout/mini-image-06.webp'
    ],
    bgClass: 'bg-linear-to-t from-[#FFFAE9] to-[#FFFEFA] from-[11.2%] to-[105%]',
    imgClass:
      'xl:max-w-100 xl:mt-[25%] lg:max-xl:mt-[20%] max-lg:h-90 max-lg:w-95 max-lg:object-contain max-sm:mb-15 max-lg:mb-10 -rotate-15 lg:ml-[-20%]'
  },
  {
    id: 'hero-3',
    title: 'A Smarter Way to Track Time, Health, and Everyday Moments',
    description:
      'Combining refined design with intelligent features, this smart watch delivers seamless performance and all-day comfort.',
    buttonText: 'Explore More',
    buttonLink: '/shop',
    mainImage: '/images/landing-page/hero-layout/image-07.webp',
    variantImages: [
      '/images/landing-page/hero-layout/image-07.webp',
      '/images/landing-page/hero-layout/image-08.webp',
      '/images/landing-page/hero-layout/image-09.webp'
    ],
    bgClass: 'bg-gradient-to-tr from-[#E8EDFF] to-[#F9FAFF] from-[20.69%] to-[100%]',
    imgClass:
      'xl:max-w-94 lg:max-xl:mt-10 xl:-mb-25 max-lg:max-h-90 max-lg:max-w-90 max-lg:mb-20 max-lg:-mt-10 max-sm:max-h-75'
  }
]

export const heroLayout02: HeroProduct02 = {
  id: 'hero-layout-02',
  title: 'Refined Backpacks Crafted for Modern Work',
  description: 'Blending durability with a polished design, these backpacks offer practical storage solutions.',
  buttonText: 'Shop Bags',
  buttonLink: '/shop',
  variants: [
    {
      image: '/images/landing-page/hero-layout/image-10.webp',
      price: 110
    },
    {
      image: '/images/landing-page/hero-layout/image-11.webp',
      price: 239,
      discount: 50
    },
    {
      image: '/images/landing-page/hero-layout/image-12.webp',
      price: 156,
      discount: 20
    },
    {
      image: '/images/landing-page/hero-layout/image-13.webp',
      price: 290
    },
    {
      image: '/images/landing-page/hero-layout/image-14.webp',
      price: 145
    }
  ],
  bgClass: 'bg-gradient-to-t from-[#f6f1d6] to-[#f9f9f7]',
  imgClass: 'xl:max-w-91 sm:max-lg:max-h-80 sm:max-lg:max-w-80 lg:max-xl:mt-10 xl:max-h-92.5'
}
