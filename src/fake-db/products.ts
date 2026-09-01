// Type Imports
import type { Product, ProductColor } from '@/types/product'

/**
 * Central product catalog - the single source of truth for every product shown
 * across the storefront (home, shop, wishlist, product details, compare, etc.).
 *
 * Each product owns ALL of its own data: basics shown on cards plus the full
 * detail payload (images, colours, sizes, specs, reviews). Nothing is shared
 * between products, so every product renders its own information.
 *
 * `category` must exactly match one of the five names in `categories.ts`
 * (Electronics, Beauty & Skincare, Clothing, Watches, Mobile) - the shop page
 * filter and the home page category cards both key off that exact string.
 * Every category keeps at least 5 products so a product's "related products"
 * (same category, self excluded) always has at least 4 to show.
 *
 * Images use existing project assets as placeholders - swap them for real
 * per-product imagery without touching any component. When a backend is
 * connected, only `src/app/server/*` changes; the `Product` shape stays the same.
 */

const AVATARS = [
  '/images/product-details/avatar-1.webp',
  '/images/product-details/avatar-2.webp',
  '/images/product-details/avatar-3.webp'
]

/** Shared colour palette (name + swatch value). Products pick from it; the shop colour filter matches on `name`. */
const COLOR = {
  black: { name: 'Black', value: '#1f2937' },
  white: { name: 'White', value: '#e5e7eb' },
  silver: { name: 'Silver', value: '#9ca3af' },
  slate: { name: 'Slate', value: '#475569' },
  blue: { name: 'Blue', value: '#3b82f6' },
  navy: { name: 'Navy', value: '#1e3a8a' },
  red: { name: 'Red', value: '#ef4444' },
  green: { name: 'Green', value: '#22c55e' },
  amber: { name: 'Amber', value: '#f59e0b' },
  purple: { name: 'Purple', value: '#a855f7' },
  rose: { name: 'Rose', value: '#f43f5e' },
  beige: { name: 'Beige', value: '#d6c7a1' }
} satisfies Record<string, ProductColor>

export const db: Product[] = [
  // Electronics
  {
    id: 'noise-buds-x-prime',
    brand: 'Noise',
    name: 'Buds X Prime Truly Wireless Earbuds',
    image: '/images/product-card/image-02.webp',
    price: 99.99,
    originalPrice: 99.99,
    discount: 0,
    href: '/product/noise-buds-x-prime',
    isNew: true,
    rating: 4.1,
    reviewCount: 215,
    category: 'Electronics',
    description:
      'Truly wireless earbuds with 13mm drivers, environmental noise cancellation for calls, low-latency gaming mode, and a 40-hour case.',
    images: [
      '/images/product-details/product-detail-01.webp',
      '/images/product-details/product-detail-02.webp',
      '/images/product-details/product-detail-03.webp',
      '/images/product-details/product-detail-04.webp'
    ],
    colors: [COLOR.white, COLOR.black, COLOR.green],
    highlights: [
      {
        category: 'Wireless Earbuds',
        manufacture: 'Noise',
        material: 'Polycarbonate Shell',
        compatibility: 'Bluetooth 5.3',
        features: ['ENC Calls', 'Low-Latency Mode']
      },
      {
        category: 'Audio Quality',
        manufacture: 'Noise',
        material: '13mm Drivers',
        compatibility: 'iOS / Android',
        features: ['Rich Bass', '40Hr Case Battery']
      }
    ],
    reviews: [
      {
        rating: 5,
        date: 'March 11 2024 at 16:40',
        text: 'Crisp sound and the gaming mode really cuts down lag. Case charges fast too.',
        author: 'Leah P.',
        avatar: AVATARS[0]
      },
      {
        rating: 4,
        date: 'February 25 2024 at 10:05',
        text: 'Great fit for the price. Call clarity is better than I expected.',
        author: 'Omar S.',
        avatar: AVATARS[1]
      },
      {
        rating: 3,
        date: 'January 30 2024 at 08:20',
        text: 'Decent earbuds, but the case feels a bit flimsy. Works well overall.',
        author: 'Kwame B.',
        avatar: AVATARS[2]
      }
    ]
  },
  {
    id: 'powera-fusion-pro',
    brand: 'PowerA',
    name: 'Fusion Pro Wireless Gaming Controller',
    image: '/images/product-card/image-03.webp',
    price: 84.99,
    originalPrice: 84.99,
    discount: 0,
    href: '/product/powera-fusion-pro',
    isNew: true,
    isPopular: true,
    rating: 4.2,
    reviewCount: 174,
    category: 'Electronics',
    description:
      'Pro-grade wireless controller with mappable advanced buttons, hair-trigger locks, anti-friction rings, and a comfort-grip body.',
    images: [
      '/images/product-details/product-detail-01.webp',
      '/images/product-details/product-detail-02.webp',
      '/images/product-details/product-detail-03.webp',
      '/images/product-details/product-detail-04.webp'
    ],
    colors: [COLOR.black, COLOR.white, COLOR.blue],
    highlights: [
      {
        category: 'Game Controllers',
        manufacture: 'PowerA',
        material: 'Soft-Touch Polymer',
        compatibility: 'Console / PC (USB-C)',
        features: ['Mappable Buttons', 'Hair-Trigger Locks']
      },
      {
        category: 'Pro Gaming',
        manufacture: 'PowerA',
        material: 'Advanced Grip Design',
        compatibility: 'Full Wireless Range',
        features: ['Anti-Friction Rings', 'Premium Build Quality']
      }
    ],
    reviews: [
      {
        rating: 5,
        date: 'March 5 2024 at 19:55',
        text: 'The mappable paddles are a game changer. Build quality feels premium.',
        photos: ['/images/product-details/product-detail-02.webp'],
        author: 'Chris D.',
        avatar: AVATARS[1]
      },
      {
        rating: 5,
        date: 'February 18 2024 at 12:25',
        text: 'Comfortable grip for long sessions and the triggers are super responsive.',
        author: 'Nina V.',
        avatar: AVATARS[2]
      },
      {
        rating: 3,
        date: 'January 20 2024 at 16:50',
        text: 'Good controller but connection drops occasionally. Needs better software updates.',
        author: 'Tyler M.',
        avatar: AVATARS[0]
      }
    ]
  },
  {
    id: 'apple-airpods-max',
    brand: 'Apple',
    name: 'AirPods Max Over-Ear Wireless Headphone',
    image: '/images/product-card/image-04.webp',
    price: 549.99,
    originalPrice: 699.99,
    discount: 15,
    showDiscountBadge: true,
    href: '/product/apple-airpods-max',
    rating: 5.0,
    reviewCount: 299,
    category: 'Electronics',
    description:
      'High-fidelity over-ear headphones with computational audio, active noise cancellation, spatial audio, and a knit-mesh canopy for comfort.',
    images: [
      '/images/product-details/product-detail-01.webp',
      '/images/product-details/product-detail-02.webp',
      '/images/product-details/product-detail-03.webp',
      '/images/product-details/product-detail-04.webp'
    ],
    colors: [COLOR.silver, COLOR.slate, COLOR.green, COLOR.rose],
    highlights: [
      {
        category: 'Over-Ear Headphones',
        manufacture: 'Apple Inc.',
        material: 'Anodised Aluminium + Knit Mesh',
        compatibility: 'Bluetooth 5.0 - Spatial Audio',
        features: ['Active Noise Cancellation', 'Computational Audio']
      },
      {
        category: 'Premium Audio',
        manufacture: 'Apple Inc.',
        material: 'Stainless Steel Headband',
        compatibility: 'iOS / macOS Seamless Pairing',
        features: ['Adaptive EQ', 'Digital Crown Control']
      }
    ],
    reviews: [
      {
        rating: 5,
        date: 'March 4 2024 at 17:50',
        text: 'The sound stage is incredible and ANC is best in class. Worth every penny.',
        photos: ['/images/product-details/product-detail-01.webp'],
        author: 'Isabella M.',
        avatar: AVATARS[1]
      },
      {
        rating: 5,
        date: 'February 13 2024 at 22:05',
        text: 'Build quality is superb and spatial audio is magical for movies.',
        author: 'Noah C.',
        avatar: AVATARS[2]
      },
      {
        rating: 3,
        date: 'December 30 2023 at 16:10',
        text: 'Headphones sound excellent but can feel heavy after extended wear. Still recommend.',
        author: 'Iris X.',
        avatar: AVATARS[0]
      }
    ]
  },
  {
    id: 'noise-buds-earbuds',
    brand: 'Noise',
    name: 'Buds VS104 Truly Wireless Earbuds',
    image: '/images/product-card/image-05.webp',
    price: 79.99,
    originalPrice: 109.99,
    discount: 27,
    href: '/product/noise-buds-earbuds',
    rating: 2.9,
    reviewCount: 132,
    category: 'Electronics',
    description:
      'Compact wireless earbuds with deep bass tuning, quad-mic ENC, instant pairing, and up to 40 hours of total playback.',
    images: [
      '/images/product-details/product-detail-01.webp',
      '/images/product-details/product-detail-02.webp',
      '/images/product-details/product-detail-03.webp',
      '/images/product-details/product-detail-04.webp'
    ],
    colors: [COLOR.black, COLOR.white, COLOR.purple],
    highlights: [
      {
        category: 'Wireless Earbuds',
        manufacture: 'Noise',
        material: 'Matte Polycarbonate',
        compatibility: 'Bluetooth 5.3',
        features: ['Quad-Mic ENC', '40Hr Playback']
      },
      {
        category: 'Sound & Call Quality',
        manufacture: 'Noise',
        material: 'Deep Bass Tuning',
        compatibility: 'iOS / Android',
        features: ['Instant Pairing', 'Comfort Fit']
      }
    ],
    reviews: [
      {
        rating: 5,
        date: 'February 27 2024 at 13:15',
        text: 'Bass is deep and the mics make calls really clear even outdoors.',
        author: 'Felix B.',
        avatar: AVATARS[0]
      },
      {
        rating: 4,
        date: 'February 6 2024 at 11:48',
        text: 'Comfortable and reliable pairing. Battery life is excellent.',
        author: 'Grace W.',
        avatar: AVATARS[1]
      },
      {
        rating: 3,
        date: 'December 5 2023 at 13:30',
        text: 'Earbuds work well overall but bass can be overpowering in EQ settings.',
        author: 'Zara N.',
        avatar: AVATARS[2]
      }
    ]
  },

  // Kitchen Appliances
  {
    id: 'warmeo-micro-matic-lunchbox',
    brand: 'Warmeo',
    name: 'Micro Matic Insulated Lunch Box with Spoon Set',
    image: '/images/landing-page/product-deal-03.webp',
    showDiscountBadge: true,
    price: 34.99,
    originalPrice: 44.99,
    discount: 22,
    href: '/product/warmeo-micro-matic-lunchbox',
    rating: 3.9,
    reviewCount: 96,
    category: 'Kitchen Appliances',
    description:
      'A leak-proof stainless-steel lunch box with a 2-compartment main tray, a snap-lock lid, and a bonus mini container - with a matching spoon and fork set for on-the-go meals.',
    images: [
      '/images/product-details/lunch-box-01.webp',
      '/images/product-details/lunch-box-02.webp',
      '/images/product-details/lunch-box-03.webp',
      '/images/product-details/lunch-box-04.webp'
    ],
    colors: [COLOR.beige, COLOR.rose],
    highlights: [
      {
        category: 'Lunch Boxes',
        manufacture: 'Warmeo',
        material: 'Stainless Steel + BPA-Free Plastic Lid',
        compatibility: 'Microwave & Dishwasher Safe (excl. lid)',
        features: ['Leak-Proof Snap Lock', '2-Compartment Tray']
      },
      {
        category: 'Kitchen Storage',
        manufacture: 'Warmeo',
        material: 'Food-Grade Silicone Seal',
        compatibility: 'Includes Mini Container + Cutlery Set',
        features: ['Vacuum Insulated Walls', 'Leak-Proof Design']
      }
    ],
    reviews: [
      {
        rating: 4,
        date: 'February 20 2024 at 08:30',
        text: 'Keeps food warm till lunchtime and the extra small container is great for sauces.',
        author: 'Aisha R.',
        avatar: AVATARS[2]
      },
      {
        rating: 4,
        date: 'February 1 2024 at 21:15',
        text: 'Good build quality, no leaks so far even with curries. Easy to clean too.',
        author: 'Marcus T.',
        avatar: AVATARS[0]
      },
      {
        rating: 3,
        date: 'January 15 2024 at 19:45',
        text: 'Nice compact design but the compartments are a bit small for a full meal.',
        author: 'Sophie K.',
        avatar: AVATARS[1]
      }
    ]
  },
  {
    id: 'apple-smartwatch',
    brand: 'Apple',
    name: 'Watch Series 9 with Bluetooth Calling',
    image: '/images/account/watch.webp',
    price: 349.99,
    originalPrice: 449.99,
    discount: 18,
    href: '/product/apple-smartwatch',
    rating: 3.5,
    reviewCount: 256,
    category: 'Watches',
    description:
      'A premium smartwatch with an always-on Retina display, Bluetooth calling, ECG and blood-oxygen sensors, and all-day battery life.',
    images: [
      '/images/product-details/product-detail-01.webp',
      '/images/product-details/product-detail-02.webp',
      '/images/product-details/product-detail-03.webp',
      '/images/product-details/product-detail-04.webp'
    ],
    colors: [COLOR.silver, COLOR.black, COLOR.navy],
    highlights: [
      {
        category: 'Smartwatches',
        manufacture: 'Apple Inc.',
        material: 'Aluminium + Ion-X Glass',
        compatibility: 'iOS 16+',
        features: ['Always-On Display', 'ECG + SpO2']
      },
      {
        category: 'Health & Communication',
        manufacture: 'Apple Inc.',
        material: 'Premium Build',
        compatibility: 'Bluetooth Calling',
        features: ['Health Sensors', 'All-Day Battery']
      }
    ],
    reviews: [
      {
        rating: 5,
        date: 'March 7 2024 at 12:00',
        text: 'Seamless with my iPhone, the health tracking is genuinely useful and accurate.',
        author: 'Patrick E.',
        avatar: AVATARS[2]
      },
      {
        rating: 4,
        date: 'February 11 2024 at 09:35',
        text: 'Beautiful display and calls are crystal clear. Battery makes it to bedtime.',
        author: 'Yara D.',
        avatar: AVATARS[0]
      },
      {
        rating: 3,
        date: 'January 2 2024 at 17:50',
        text: 'Watch is nice but syncing can be unreliable sometimes. Still worth it overall.',
        author: 'Quinn E.',
        avatar: AVATARS[1]
      }
    ]
  },
  {
    id: 'titan-neo-smartwatch',
    brand: 'Titan',
    name: 'Neo AMOLED Smartwatch with GPS',
    image: '/images/product-card/image-06.webp',
    price: 129.99,
    originalPrice: 159.99,
    discount: 19,
    href: '/product/titan-neo-smartwatch',
    isNew: true,
    rating: 4.3,
    reviewCount: 118,
    category: 'Watches',
    description:
      'A sleek round-dial AMOLED smartwatch with built-in GPS, 24/7 heart-rate monitoring, and up to 10 days of battery life on a single charge.',
    images: [
      '/images/product-details/product-detail-01.webp',
      '/images/product-details/product-detail-02.webp',
      '/images/product-details/product-detail-03.webp',
      '/images/product-details/product-detail-04.webp'
    ],
    colors: [COLOR.black, COLOR.silver, COLOR.blue],
    highlights: [
      {
        category: 'Smartwatches',
        manufacture: 'Titan Company',
        material: 'Stainless Steel Case + Silicone Strap',
        compatibility: 'Android 8.0+ / iOS 13+',
        features: ['Built-in GPS', '24/7 Heart Rate']
      },
      {
        category: 'Battery & Display',
        manufacture: 'Titan Company',
        material: 'AMOLED Always-On Display',
        compatibility: 'IP68 Water Resistant',
        features: ['10-Day Battery', '100+ Watch Faces']
      }
    ],
    reviews: [
      {
        rating: 5,
        date: 'March 9 2024 at 10:15',
        text: 'GPS lock is fast and accurate on runs. The always-on display looks premium.',
        author: 'Ethan V.',
        avatar: AVATARS[0]
      },
      {
        rating: 4,
        date: 'February 22 2024 at 15:40',
        text: 'Great battery life, easily hits 9-10 days for me with the display on.',
        author: 'Nora K.',
        avatar: AVATARS[1]
      },
      {
        rating: 3,
        date: 'January 18 2024 at 09:05',
        text: 'Solid watch but the companion app could use some polish.',
        author: 'Liam D.',
        avatar: AVATARS[2]
      }
    ]
  },
  {
    id: 'fastrack-fitness-band',
    brand: 'Fastrack',
    name: 'Reflex Fitness Band with Heart Rate Monitor',
    image: '/images/product-card/image-07.webp',
    price: 39.99,
    originalPrice: 49.99,
    discount: 20,
    href: '/product/fastrack-fitness-band',
    isNew: true,
    rating: 4.0,
    reviewCount: 76,
    category: 'Watches',
    description:
      'A slim fitness band with continuous heart-rate tracking, SpO2 monitoring, 14 sport modes, and a vivid color touch display in a lightweight strap.',
    images: [
      '/images/product-details/product-detail-01.webp',
      '/images/product-details/product-detail-02.webp',
      '/images/product-details/product-detail-03.webp',
      '/images/product-details/product-detail-04.webp'
    ],
    colors: [COLOR.black, COLOR.rose, COLOR.green],
    highlights: [
      {
        category: 'Fitness Bands',
        manufacture: 'Fastrack',
        material: 'TPU Strap + Polycarbonate Body',
        compatibility: 'Android 6.0+ / iOS 10+',
        features: ['SpO2 Monitor', '14 Sport Modes']
      },
      {
        category: 'Everyday Fitness',
        manufacture: 'Fastrack',
        material: 'Color Touch Display',
        compatibility: '5 ATM Water Resistance',
        features: ['7-Day Battery', 'Sleep Tracking']
      }
    ],
    reviews: [
      {
        rating: 4,
        date: 'February 28 2024 at 18:20',
        text: 'Light on the wrist and the sleep tracking is more accurate than I expected.',
        author: 'Simran K.',
        avatar: AVATARS[1]
      },
      {
        rating: 4,
        date: 'February 4 2024 at 12:10',
        text: 'Great budget band. Battery really does last a full week.',
        author: 'Owen T.',
        avatar: AVATARS[2]
      },
      {
        rating: 3,
        date: 'January 11 2024 at 08:45',
        text: 'Does the basics well but the touch display can be a bit unresponsive in cold.',
        author: 'Priya D.',
        avatar: AVATARS[0]
      }
    ]
  },
  {
    id: 'garmin-vivo-active',
    brand: 'Garmin',
    name: 'Vivo Active GPS Sports Watch',
    image: '/images/product-card/image-08.webp',
    price: 249.99,
    originalPrice: 299.99,
    discount: 17,
    showDiscountBadge: true,
    href: '/product/garmin-vivo-active',
    isPopular: true,
    rating: 4.6,
    reviewCount: 203,
    category: 'Watches',
    description:
      'A rugged multi-sport GPS watch with preloaded activity profiles, Garmin Pay contactless payments, and up to 8 days of smartwatch battery life.',
    images: [
      '/images/product-details/product-detail-01.webp',
      '/images/product-details/product-detail-02.webp',
      '/images/product-details/product-detail-03.webp',
      '/images/product-details/product-detail-04.webp'
    ],
    colors: [COLOR.slate, COLOR.black, COLOR.navy],
    highlights: [
      {
        category: 'Sports Watches',
        manufacture: 'Garmin Ltd.',
        material: 'Fiber-Reinforced Polymer Case',
        compatibility: 'Android / iOS',
        features: ['Built-in GPS/GLONASS', '20+ Sport Apps']
      },
      {
        category: 'Payments & Battery',
        manufacture: 'Garmin Ltd.',
        material: 'Corning Gorilla Glass',
        compatibility: 'Garmin Pay Enabled',
        features: ['8-Day Battery', '5 ATM Water Rating']
      }
    ],
    reviews: [
      {
        rating: 5,
        date: 'March 6 2024 at 07:30',
        text: 'Best sports watch I have owned. GPS tracking is spot on for trail runs.',
        author: 'Caleb R.',
        avatar: AVATARS[2]
      },
      {
        rating: 5,
        date: 'February 15 2024 at 19:05',
        text: 'Garmin Pay is genuinely convenient and the battery easily lasts a full week of training.',
        author: 'Freya S.',
        avatar: AVATARS[0]
      },
      {
        rating: 4,
        date: 'January 23 2024 at 11:50',
        text: 'Excellent build quality, though the menus take a little getting used to.',
        author: 'Mateo L.',
        avatar: AVATARS[1]
      }
    ]
  },
  {
    id: 'amazfit-gts-smartwatch',
    brand: 'Amazfit',
    name: 'GTS Mini Chronograph Smartwatch',
    image: '/images/landing-page/product-deal-02.webp',
    price: 89.99,
    originalPrice: 119.99,
    discount: 25,
    showDiscountBadge: true,
    href: '/product/amazfit-gts-smartwatch',
    rating: 3.2,
    reviewCount: 342,
    category: 'Watches',
    description:
      'A square-dial AMOLED smartwatch with a classic chronograph watch face, 24/7 heart-rate and SpO2 tracking, and up to 14 days of battery life.',
    images: [
      '/images/product-details/apple-watch-02.webp',
      '/images/product-details/apple-watch-03.webp',
      '/images/product-details/apple-watch-01.webp',
      '/images/product-details/apple-watch-04.webp'
    ],
    colors: [COLOR.white, COLOR.black, COLOR.silver],
    highlights: [
      {
        category: 'Smartwatches',
        manufacture: 'Zepp Health (Amazfit)',
        material: 'Aluminium Alloy + Silicone Strap',
        compatibility: 'Android 7.0+ / iOS 12+',
        features: ['Always-On AMOLED Display', '14-Day Battery']
      },
      {
        category: 'Health & Fitness',
        manufacture: 'Zepp Health (Amazfit)',
        material: '1.75" HD Display',
        compatibility: '5ATM Water Resistant',
        features: ['SpO2 & Heart Rate Sensor', '120+ Sports Modes']
      }
    ],
    reviews: [
      {
        rating: 5,
        date: 'January 28 2024 at 18:45',
        text: 'Battery genuinely lasts for weeks and the chronograph watch face looks premium.',
        photos: ['/images/product-details/product-detail-01.webp'],
        author: 'Daniel K.',
        avatar: AVATARS[1]
      },
      {
        rating: 5,
        date: 'January 9 2024 at 14:10',
        text: 'Comfortable strap for daily wear and the heart-rate readings feel accurate.',
        author: 'Sofia L.',
        avatar: AVATARS[2]
      },
      {
        rating: 3,
        date: 'December 30 2023 at 10:22',
        text: 'Good display but the companion app could use some polish.',
        author: 'Jason T.',
        avatar: AVATARS[0]
      }
    ]
  },

  // Mobile
  {
    id: 'spigen-iphone-case',
    brand: 'Apple',
    name: 'iPhone 16 Series - Back Case Cover',
    image: '/images/product-details/cover-1.webp',
    price: 29.99,
    originalPrice: 29.99,
    discount: 0,
    href: '/product/spigen-iphone-case',
    isNew: true,
    rating: 4.5,
    reviewCount: 210,
    category: 'Mobile',
    description:
      'A slim liquid-air back case for the iPhone 16 series with raised camera guards, precise cutouts, and a grippy anti-slip texture.',
    images: [
      '/images/product-details/product-detail-01.webp',
      '/images/product-details/product-detail-02.webp',
      '/images/product-details/product-detail-03.webp',
      '/images/product-details/product-detail-04.webp'
    ],
    colors: [COLOR.rose, COLOR.slate, COLOR.navy, COLOR.green],
    highlights: [
      {
        category: 'Phone Cases',
        manufacture: 'Spigen Korea Co. Ltd.',
        material: 'Thermoplastic Polyurethane',
        compatibility: 'iPhone 16 Series',
        features: ['Raised Camera Guard', 'Anti-Slip Grip']
      },
      {
        category: 'Slim & Grip Cases',
        manufacture: 'Spigen Korea Co. Ltd.',
        material: 'Polycarbonate + TPU Blend',
        compatibility: 'iPhone 15 / 16 Series',
        features: ['Precise Cutouts', 'Pocket-Friendly']
      }
    ],
    reviews: [
      {
        rating: 5,
        date: 'March 8 2024 at 11:11',
        text: 'Perfect fit and the camera lip actually protects the lenses. Feels great in hand.',
        photos: ['/images/product-details/product-detail-01.webp', '/images/product-details/product-detail-02.webp'],
        author: 'Michael G.',
        avatar: AVATARS[2]
      },
      {
        rating: 4,
        date: 'February 19 2024 at 20:30',
        text: 'Good grip and slim profile. Buttons stay clicky through the case.',
        author: 'Elena F.',
        avatar: AVATARS[0]
      },
      {
        rating: 3,
        date: 'January 8 2024 at 11:05',
        text: 'Case is decent but the yellowing started after a few weeks. Quality could be better.',
        author: 'Lucas R.',
        avatar: AVATARS[1]
      }
    ]
  },
  {
    id: 'vivo-v29-pro',
    brand: 'Vivo',
    name: 'V29 Pro 5G Stealth Black',
    image: '/images/product-card/image-01.webp',
    price: 449.99,
    originalPrice: 449.99,
    discount: 0,
    href: '/product/vivo-v29-pro',
    isNew: true,
    rating: 4.6,
    reviewCount: 153,
    category: 'Mobile',
    description:
      'A 6.7" AMOLED smartphone with a 50MP triple camera, 5000mAh battery, 67W fast charge, and a sleek stealth-black glass finish.',
    images: [
      '/images/product-details/product-detail-01.webp',
      '/images/product-details/product-detail-02.webp',
      '/images/product-details/product-detail-03.webp',
      '/images/product-details/product-detail-04.webp'
    ],
    colors: [COLOR.black, COLOR.blue, COLOR.green],
    highlights: [
      {
        category: 'Smartphones',
        manufacture: 'Vivo Mobile',
        material: 'Gorilla Glass + Metal Frame',
        compatibility: 'Dual SIM 5G',
        features: ['50MP Triple Camera', '67W Fast Charge']
      },
      {
        category: 'Display & Performance',
        manufacture: 'Vivo Mobile',
        material: '6.7" AMOLED Screen',
        compatibility: 'Latest Processor',
        features: ['5000mAh Battery', 'Sleek Design']
      }
    ],
    reviews: [
      {
        rating: 5,
        date: 'March 1 2024 at 09:25',
        text: 'Display is stunning and the battery easily lasts a full day of heavy use.',
        author: 'Tariq H.',
        avatar: AVATARS[1]
      },
      {
        rating: 4,
        date: 'February 9 2024 at 18:00',
        text: 'Cameras are great in daylight and charging is seriously fast.',
        author: 'Bianca R.',
        avatar: AVATARS[2]
      },
      {
        rating: 3,
        date: 'December 22 2023 at 15:40',
        text: 'Phone is good but gets warm during gaming. Otherwise solid for the price.',
        author: 'Ahmed H.',
        avatar: AVATARS[0]
      }
    ]
  },
  {
    id: 'samsung-galaxy-m14',
    brand: 'Samsung',
    name: 'Galaxy M14 5G Smartphone',
    image: '/images/landing-page/mobile.webp',
    price: 199.99,
    originalPrice: 229.99,
    discount: 13,
    showDiscountBadge: true,
    href: '/product/samsung-galaxy-m14',
    rating: 4.2,
    reviewCount: 341,
    category: 'Mobile',
    description:
      'A 5G-ready smartphone with a 6.6" FHD+ display, 50MP triple camera, 6000mAh battery, and Samsung Knox security built in.',
    images: [
      '/images/product-details/product-detail-01.webp',
      '/images/product-details/product-detail-02.webp',
      '/images/product-details/product-detail-03.webp',
      '/images/product-details/product-detail-04.webp'
    ],
    colors: [COLOR.green, COLOR.black, COLOR.blue],
    highlights: [
      {
        category: 'Smartphones',
        manufacture: 'Samsung Electronics',
        material: 'Polycarbonate Back + Gorilla Glass',
        compatibility: 'Dual SIM 5G',
        features: ['50MP Triple Camera', '6000mAh Battery']
      },
      {
        category: 'Performance',
        manufacture: 'Samsung Electronics',
        material: '6.6" FHD+ Display',
        compatibility: 'Octa-Core Processor',
        features: ['Samsung Knox Security', '25W Fast Charging']
      }
    ],
    reviews: [
      {
        rating: 4,
        date: 'March 3 2024 at 14:00',
        text: 'The 6000mAh battery is a beast, easily lasts two days on light use.',
        author: 'Wanjiru M.',
        avatar: AVATARS[0]
      },
      {
        rating: 4,
        date: 'February 12 2024 at 09:20',
        text: 'Great value phone. Camera does well in daylight, average at night.',
        author: 'Diego P.',
        avatar: AVATARS[1]
      },
      {
        rating: 4,
        date: 'January 21 2024 at 16:35',
        text: 'Smooth performance for everyday apps. Knox security gives peace of mind.',
        author: 'Anaya S.',
        avatar: AVATARS[2]
      }
    ]
  },
  {
    id: 'redmi-note-13-pro',
    brand: 'Redmi',
    name: 'Note 13 Pro 5G',
    image: '/images/product-card/image-09.webp',
    price: 279.99,
    originalPrice: 329.99,
    discount: 15,
    showDiscountBadge: true,
    href: '/product/redmi-note-13-pro',
    rating: 4.5,
    reviewCount: 512,
    category: 'Mobile',
    description:
      'A flagship-grade mid-ranger with a 200MP OIS camera, curved AMOLED display, and 67W turbo charging that tops up the battery in under an hour.',
    images: [
      '/images/product-details/product-detail-01.webp',
      '/images/product-details/product-detail-02.webp',
      '/images/product-details/product-detail-03.webp',
      '/images/product-details/product-detail-04.webp'
    ],
    colors: [COLOR.black, COLOR.purple, COLOR.white],
    highlights: [
      {
        category: 'Smartphones',
        manufacture: 'Xiaomi Redmi',
        material: 'Curved AMOLED Display',
        compatibility: 'Dual SIM 5G',
        features: ['200MP OIS Camera', '67W Turbo Charging']
      },
      {
        category: 'Design',
        manufacture: 'Xiaomi Redmi',
        material: 'Glass Back Panel',
        compatibility: 'IP54 Splash Resistant',
        features: ['120Hz Refresh Rate', 'Stereo Speakers']
      }
    ],
    reviews: [
      {
        rating: 5,
        date: 'March 12 2024 at 10:45',
        text: 'The camera punches way above its price. 200MP shots are genuinely detailed.',
        author: 'Farhan I.',
        avatar: AVATARS[1]
      },
      {
        rating: 5,
        date: 'February 24 2024 at 13:30',
        text: 'Turbo charging is no joke, full charge in about 45 minutes. Display looks gorgeous.',
        author: 'Camille R.',
        avatar: AVATARS[2]
      },
      {
        rating: 4,
        date: 'January 29 2024 at 08:10',
        text: 'Great all-rounder. MIUI has some bloatware but easy enough to remove.',
        author: 'Booker A.',
        avatar: AVATARS[0]
      }
    ]
  },
  {
    id: 'iphone-15-pro-max',
    brand: 'Apple',
    name: 'iPhone 15 Pro Max',
    image: '/images/landing-page/cta-iphone.webp',
    price: 1199.99,
    originalPrice: 1199.99,
    discount: 0,
    href: '/product/iphone-15-pro-max',
    isPopular: true,
    rating: 4.9,
    reviewCount: 674,
    category: 'Mobile',
    description:
      "Apple's flagship smartphone with a titanium frame, A17 Pro chip, a 48MP Pro camera system, and the Action Button for one-tap shortcuts.",
    images: [
      '/images/product-details/product-detail-01.webp',
      '/images/product-details/product-detail-02.webp',
      '/images/product-details/product-detail-03.webp',
      '/images/product-details/product-detail-04.webp'
    ],
    colors: [COLOR.black, COLOR.silver, COLOR.navy],
    highlights: [
      {
        category: 'Smartphones',
        manufacture: 'Apple Inc.',
        material: 'Titanium Frame + Ceramic Shield',
        compatibility: 'Dual eSIM 5G',
        features: ['A17 Pro Chip', '48MP Pro Camera']
      },
      {
        category: 'Pro Features',
        manufacture: 'Apple Inc.',
        material: 'Textured Matte Glass Back',
        compatibility: 'iOS 17+',
        features: ['Action Button', 'USB-C 3']
      }
    ],
    reviews: [
      {
        rating: 5,
        date: 'March 14 2024 at 12:20',
        text: 'The titanium build feels premium and noticeably lighter than the steel model.',
        author: 'Julian F.',
        avatar: AVATARS[2]
      },
      {
        rating: 5,
        date: 'February 26 2024 at 18:55',
        text: 'A17 Pro handles everything I throw at it without breaking a sweat. Camera is superb.',
        author: 'Amara O.',
        avatar: AVATARS[0]
      },
      {
        rating: 5,
        date: 'January 31 2024 at 09:40',
        text: 'The Action Button is more useful than I expected. Battery easily gets me through the day.',
        author: 'Theo N.',
        avatar: AVATARS[1]
      }
    ]
  },

  // Clothing
  {
    id: 'tagdo-casual-shirt',
    brand: 'Tagdo Apparel',
    name: 'Regular Fit Casual Cotton Shirt',
    image: '/images/category-listing/men-with-red-shirt.webp',
    price: 59.99,
    originalPrice: 59.99,
    discount: 0,
    href: '/product/tagdo-casual-shirt',
    isNew: true,
    isPopular: true,
    rating: 4.7,
    reviewCount: 210,
    category: 'Clothing',
    description:
      'A breathable regular-fit casual shirt in soft cotton with a button-down collar - easy to pair with jeans or chinos for any occasion.',
    images: [
      '/images/product-details/product-detail-01.webp',
      '/images/product-details/product-detail-02.webp',
      '/images/product-details/product-detail-03.webp',
      '/images/product-details/product-detail-04.webp'
    ],
    colors: [COLOR.navy, COLOR.white, COLOR.beige, COLOR.green],
    sizes: [
      { label: 'XS' },
      { label: 'S' },
      { label: 'M', note: '2 left' },
      { label: 'L' },
      { label: 'XL', disabled: true }
    ],
    highlights: [
      {
        category: 'Casual Shirts',
        manufacture: 'Tagdo Apparel',
        material: '100% Cotton',
        compatibility: 'Regular Fit - All Seasons',
        features: ['Breathable Fabric', 'Button-Down Collar']
      },
      {
        category: 'Comfort & Style',
        manufacture: 'Tagdo Apparel',
        material: 'Premium Cotton Blend',
        compatibility: 'XS - XL Sizes',
        features: ['Easy Care', 'Versatile Colors']
      }
    ],
    reviews: [
      {
        rating: 4,
        date: 'February 16 2024 at 10:45',
        text: 'Fabric is soft and the fit is true to size. Holds up well after washing.',
        photos: ['/images/product-details/product-detail-02.webp'],
        author: 'Haylie Press',
        avatar: AVATARS[2]
      },
      {
        rating: 4,
        date: 'January 27 2024 at 14:30',
        text: 'Great everyday shirt. Colour matches the photos and stitching is neat.',
        author: 'Tiana Baptista',
        avatar: AVATARS[0]
      },
      {
        rating: 3,
        date: 'January 5 2024 at 09:45',
        text: 'Shirt is okay but shrinks a bit after washing. Follow care instructions carefully.',
        author: 'Devon C.',
        avatar: AVATARS[1]
      }
    ]
  },
  {
    id: 'nike-drifit-tshirt',
    brand: 'Nike',
    name: 'Dri-FIT Performance Training T-Shirt',
    image: '/images/product-card/image-10.webp',
    price: 44.99,
    originalPrice: 59.99,
    discount: 25,
    href: '/product/nike-drifit-tshirt',
    isNew: true,
    rating: 4.9,
    reviewCount: 388,
    category: 'Clothing',
    description:
      'A lightweight Dri-FIT training t-shirt with moisture-wicking fabric, a breathable mesh back panel, and a relaxed athletic fit for everyday workouts.',
    images: [
      '/images/product-details/product-detail-01.webp',
      '/images/product-details/product-detail-02.webp',
      '/images/product-details/product-detail-03.webp',
      '/images/product-details/product-detail-04.webp'
    ],
    colors: [COLOR.black, COLOR.white, COLOR.red, COLOR.green],
    sizes: [
      { label: 'S' },
      { label: 'M' },
      { label: 'L', note: 'Popular' },
      { label: 'XL' },
      { label: 'XXL', disabled: true }
    ],
    highlights: [
      {
        category: 'Activewear',
        manufacture: 'Nike',
        material: 'Dri-FIT Polyester Blend',
        compatibility: 'Unisex - All-Season Training',
        features: ['Moisture-Wicking', 'Breathable Mesh Panel']
      },
      {
        category: 'Performance Fit',
        manufacture: 'Nike',
        material: 'Lightweight 4-Way Stretch',
        compatibility: 'S - XXL',
        features: ['Relaxed Athletic Fit', 'Odor Control']
      }
    ],
    reviews: [
      {
        rating: 5,
        date: 'March 10 2024 at 06:40',
        text: "Incredibly light and breathable, doesn't cling even during hot summer runs.",
        photos: ['/images/product-details/product-detail-03.webp'],
        author: 'Jordan A.',
        avatar: AVATARS[0]
      },
      {
        rating: 5,
        date: 'February 21 2024 at 19:12',
        text: 'True to size and the mesh back really does help with airflow. My new go-to.',
        author: 'Camila S.',
        avatar: AVATARS[1]
      },
      {
        rating: 3,
        date: 'December 10 2023 at 14:25',
        text: 'Comfortable shirt but the color faded a bit faster than I expected.',
        author: 'Rowan P.',
        avatar: AVATARS[2]
      }
    ]
  },
  {
    id: 'zara-cotton-hoodie',
    brand: 'Zara',
    name: 'Oversized Cotton Hoodie',
    image: '/images/product-card/image-11.webp',
    price: 54.99,
    originalPrice: 69.99,
    discount: 21,
    href: '/product/zara-cotton-hoodie',
    rating: 4.4,
    reviewCount: 156,
    category: 'Clothing',
    description:
      'An oversized fleece-lined cotton hoodie with a relaxed drop-shoulder fit, ribbed cuffs, and a soft brushed interior for everyday layering.',
    images: [
      '/images/product-details/product-detail-01.webp',
      '/images/product-details/product-detail-02.webp',
      '/images/product-details/product-detail-03.webp',
      '/images/product-details/product-detail-04.webp'
    ],
    colors: [COLOR.black, COLOR.beige, COLOR.slate],
    sizes: [
      { label: 'S' },
      { label: 'M' },
      { label: 'L', note: 'Popular' },
      { label: 'XL' },
      { label: 'XXL', disabled: true }
    ],
    highlights: [
      {
        category: 'Hoodies & Sweatshirts',
        manufacture: 'Zara',
        material: '100% Brushed Cotton Fleece',
        compatibility: 'Unisex - All Seasons',
        features: ['Drop-Shoulder Fit', 'Ribbed Cuffs']
      },
      {
        category: 'Everyday Comfort',
        manufacture: 'Zara',
        material: 'Soft Fleece Lining',
        compatibility: 'S - XXL',
        features: ['Kangaroo Pocket', 'Machine Washable']
      }
    ],
    reviews: [
      {
        rating: 5,
        date: 'March 6 2024 at 15:30',
        text: 'So cozy and the oversized fit is exactly what I wanted. Fabric feels premium.',
        author: 'Ivy Chan',
        avatar: AVATARS[0]
      },
      {
        rating: 4,
        date: 'February 17 2024 at 11:15',
        text: 'Great everyday hoodie, holds up nicely after multiple washes.',
        author: 'Miles B.',
        avatar: AVATARS[1]
      },
      {
        rating: 4,
        date: 'January 24 2024 at 09:00',
        text: 'Soft and warm, runs slightly large so consider sizing down.',
        author: 'Aaliyah T.',
        avatar: AVATARS[2]
      }
    ]
  },
  {
    id: 'hm-denim-jacket',
    brand: 'H&M',
    name: 'Classic Fit Denim Jacket',
    image: '/images/product-card/image-12.webp',
    price: 64.99,
    originalPrice: 79.99,
    discount: 19,
    showDiscountBadge: true,
    href: '/product/hm-denim-jacket',
    rating: 4.1,
    reviewCount: 93,
    category: 'Clothing',
    description:
      'A timeless washed-denim jacket with a classic button-front closure, chest pockets, and a durable cotton weave that only gets better with wear.',
    images: [
      '/images/product-details/product-detail-01.webp',
      '/images/product-details/product-detail-02.webp',
      '/images/product-details/product-detail-03.webp',
      '/images/product-details/product-detail-04.webp'
    ],
    colors: [COLOR.blue, COLOR.black, COLOR.beige],
    sizes: [
      { label: 'S' },
      { label: 'M' },
      { label: 'L' },
      { label: 'XL', note: '2 left' },
      { label: 'XXL', disabled: true }
    ],
    highlights: [
      {
        category: 'Jackets & Outerwear',
        manufacture: 'H&M',
        material: '100% Cotton Denim',
        compatibility: 'Unisex - Spring/Fall',
        features: ['Classic Button Front', 'Chest Pockets']
      },
      {
        category: 'Timeless Style',
        manufacture: 'H&M',
        material: 'Washed Denim Weave',
        compatibility: 'S - XXL',
        features: ['Durable Stitching', 'Fades Beautifully']
      }
    ],
    reviews: [
      {
        rating: 4,
        date: 'February 29 2024 at 13:50',
        text: 'Classic look that goes with everything. Denim feels sturdy, not paper-thin.',
        author: 'Rey M.',
        avatar: AVATARS[1]
      },
      {
        rating: 4,
        date: 'February 7 2024 at 10:35',
        text: 'Great fit, true to size. The wash looks even better in person.',
        author: 'Sasha W.',
        avatar: AVATARS[2]
      },
      {
        rating: 4,
        date: 'January 13 2024 at 16:00',
        text: 'Solid everyday jacket. Buttons feel a little cheap but overall happy with it.',
        author: 'Dario P.',
        avatar: AVATARS[0]
      }
    ]
  },
  {
    id: 'levis-slim-jeans',
    brand: "Levi's",
    name: '511 Slim Fit Jeans',
    image: '/images/product-card/image-13.webp',
    price: 74.99,
    originalPrice: 89.99,
    discount: 17,
    showDiscountBadge: true,
    href: '/product/levis-slim-jeans',
    rating: 4.6,
    reviewCount: 287,
    category: 'Clothing',
    description:
      'A slim-fit stretch denim jean that moves with you - a modern silhouette from hip to ankle with classic five-pocket styling.',
    images: [
      '/images/product-details/product-detail-01.webp',
      '/images/product-details/product-detail-02.webp',
      '/images/product-details/product-detail-03.webp',
      '/images/product-details/product-detail-04.webp'
    ],
    colors: [COLOR.blue, COLOR.black, COLOR.slate],
    sizes: [
      { label: 'S' },
      { label: 'M', note: '2 left' },
      { label: 'L' },
      { label: 'XL' },
      { label: 'XXL', disabled: true }
    ],
    highlights: [
      {
        category: 'Jeans & Denim',
        manufacture: 'Levi Strauss & Co.',
        material: 'Stretch Cotton Denim',
        compatibility: 'Unisex - All Seasons',
        features: ['Slim Fit Silhouette', 'Five-Pocket Styling']
      },
      {
        category: 'Everyday Denim',
        manufacture: 'Levi Strauss & Co.',
        material: 'Comfort Stretch Weave',
        compatibility: 'S - XXL',
        features: ['Fade-Resistant Dye', 'Reinforced Stitching']
      }
    ],
    reviews: [
      {
        rating: 5,
        date: 'March 13 2024 at 09:15',
        text: 'The stretch denim is a game changer for comfort. Fit is exactly as described.',
        author: 'Nate B.',
        avatar: AVATARS[0]
      },
      {
        rating: 5,
        date: 'February 20 2024 at 17:40',
        text: "Perfect slim fit without being too tight. Color hasn't faded after several washes.",
        author: 'Selin A.',
        avatar: AVATARS[1]
      },
      {
        rating: 4,
        date: 'January 16 2024 at 12:25',
        text: 'Great quality denim, took a wash or two to break in comfortably.',
        author: 'Marco D.',
        avatar: AVATARS[2]
      }
    ]
  },

  // Beauty & Skincare
  {
    id: 'bellavita-body-spray',
    brand: 'Bellavita',
    name: 'Vanilla Twist Body Spray',
    image: '/images/landing-page/perfume.webp',
    price: 39.99,
    originalPrice: 39.99,
    discount: 0,
    href: '/product/bellavita-body-spray',
    isNew: true,
    isPopular: true,
    rating: 4.4,
    reviewCount: 88,
    category: 'Beauty & Skincare',
    description:
      'A long-lasting vanilla-twist body spray with a warm, sweet trail - non-gas formula that is gentle on skin and perfect for daily wear.',
    images: [
      '/images/product-details/product-detail-01.webp',
      '/images/product-details/product-detail-02.webp',
      '/images/product-details/product-detail-03.webp',
      '/images/product-details/product-detail-04.webp'
    ],
    colors: [COLOR.rose, COLOR.amber, COLOR.white],
    highlights: [
      {
        category: 'Fragrances',
        manufacture: 'Bellavita Organics',
        material: 'Non-Gas Alcohol Base',
        compatibility: 'All Skin Types',
        features: ['Long Lasting', 'Skin Friendly']
      },
      {
        category: 'Premium Scent',
        manufacture: 'Bellavita Organics',
        material: 'Natural Essential Oils',
        compatibility: 'Daily Wear',
        features: ['Warm Sweet Trail', 'Gentle Formula']
      }
    ],
    reviews: [
      {
        rating: 5,
        date: 'February 22 2024 at 15:05',
        text: 'The vanilla scent is gorgeous and lasts most of the day. Will repurchase.',
        author: 'Maya J.',
        avatar: AVATARS[0]
      },
      {
        rating: 4,
        date: 'February 3 2024 at 08:50',
        text: 'Lovely sweet fragrance, not overpowering. Great for everyday.',
        author: 'Ria K.',
        avatar: AVATARS[1]
      },
      {
        rating: 3,
        date: 'January 10 2024 at 13:15',
        text: 'Smells good initially but fades quickly. Decent for the price though.',
        author: 'Victoria L.',
        avatar: AVATARS[2]
      }
    ]
  },
  {
    id: 'lakme-face-serum',
    brand: 'Lakme',
    name: 'Vitamin C Brightening Face Serum',
    image: '/images/category-listing/plum.webp',
    price: 24.99,
    originalPrice: 29.99,
    discount: 17,
    href: '/product/lakme-face-serum',
    isNew: true,
    rating: 4.5,
    reviewCount: 412,
    category: 'Beauty & Skincare',
    description:
      'A lightweight Vitamin C serum that brightens dull skin, fades dark spots, and boosts radiance - dermatologist-tested and suitable for daily use.',
    images: [
      '/images/product-details/product-detail-01.webp',
      '/images/product-details/product-detail-02.webp',
      '/images/product-details/product-detail-03.webp',
      '/images/product-details/product-detail-04.webp'
    ],
    colors: [COLOR.amber, COLOR.white],
    highlights: [
      {
        category: 'Skincare Serums',
        manufacture: 'Lakme India',
        material: '10% Vitamin C + Hyaluronic Acid',
        compatibility: 'All Skin Types',
        features: ['Brightens Dull Skin', 'Fades Dark Spots']
      },
      {
        category: 'Daily Glow',
        manufacture: 'Lakme India',
        material: 'Lightweight Non-Greasy Formula',
        compatibility: 'Dermatologist Tested',
        features: ['Fast Absorbing', 'Fragrance Free']
      }
    ],
    reviews: [
      {
        rating: 5,
        date: 'March 5 2024 at 09:40',
        text: 'Noticed visibly brighter skin within two weeks. Absorbs fast, no greasy residue.',
        author: 'Neha V.',
        avatar: AVATARS[0]
      },
      {
        rating: 4,
        date: 'February 10 2024 at 14:20',
        text: 'Gentle on sensitive skin and dark spots have faded noticeably.',
        author: 'Claire M.',
        avatar: AVATARS[1]
      },
      {
        rating: 4,
        date: 'January 6 2024 at 10:05',
        text: 'Works well but I wish the bottle was bigger for the price.',
        author: 'Dhruv P.',
        avatar: AVATARS[2]
      }
    ]
  },
  {
    id: 'mamaearth-sunscreen',
    brand: 'Mamaearth',
    name: 'Ultra Light SPF 50 Sunscreen',
    image: '/images/product-card/image-14.webp',
    price: 14.99,
    originalPrice: 18.99,
    discount: 21,
    showDiscountBadge: true,
    href: '/product/mamaearth-sunscreen',
    rating: 4.3,
    reviewCount: 356,
    category: 'Beauty & Skincare',
    description:
      'A non-greasy SPF 50 PA+++ sunscreen that absorbs instantly, leaves no white cast, and protects against UVA/UVB rays for up to 6 hours.',
    images: [
      '/images/product-details/product-detail-01.webp',
      '/images/product-details/product-detail-02.webp',
      '/images/product-details/product-detail-03.webp',
      '/images/product-details/product-detail-04.webp'
    ],
    colors: [COLOR.white, COLOR.beige],
    highlights: [
      {
        category: 'Sun Care',
        manufacture: 'Mamaearth',
        material: 'SPF 50 PA+++ Formula',
        compatibility: 'All Skin Types',
        features: ['No White Cast', '6Hr UV Protection']
      },
      {
        category: 'Everyday Skincare',
        manufacture: 'Mamaearth',
        material: 'Non-Greasy Lightweight Base',
        compatibility: 'Face & Body',
        features: ['Fast Absorbing', 'Water Resistant']
      }
    ],
    reviews: [
      {
        rating: 5,
        date: 'March 2 2024 at 08:10',
        text: 'Finally a sunscreen with zero white cast that actually sits well under makeup.',
        author: 'Anika R.',
        avatar: AVATARS[1]
      },
      {
        rating: 4,
        date: 'February 8 2024 at 16:45',
        text: 'Lightweight and non-sticky. Held up well during a full day outdoors.',
        author: 'Oliver S.',
        avatar: AVATARS[2]
      },
      {
        rating: 4,
        date: 'January 14 2024 at 11:30',
        text: 'Good protection, though I reapply a bit more often than the label suggests.',
        author: 'Fatima Z.',
        avatar: AVATARS[0]
      }
    ]
  },
  {
    id: 'nivea-body-lotion',
    brand: 'Nivea',
    name: 'Soft Milk Nourishing Body Lotion',
    image: '/images/category-listing/nivea-cream.webp',
    price: 12.99,
    originalPrice: 15.99,
    discount: 19,
    showDiscountBadge: true,
    href: '/product/nivea-body-lotion',
    rating: 4.4,
    reviewCount: 289,
    category: 'Beauty & Skincare',
    description:
      'A fast-absorbing body lotion enriched with almond oil and vitamin E that leaves skin soft, smooth, and nourished for up to 48 hours.',
    images: [
      '/images/product-details/product-detail-01.webp',
      '/images/product-details/product-detail-02.webp',
      '/images/product-details/product-detail-03.webp',
      '/images/product-details/product-detail-04.webp'
    ],
    colors: [COLOR.white, COLOR.blue],
    highlights: [
      {
        category: 'Body Care',
        manufacture: 'Nivea',
        material: 'Almond Oil + Vitamin E',
        compatibility: 'All Skin Types',
        features: ['48Hr Moisture', 'Fast Absorbing']
      },
      {
        category: 'Daily Nourishment',
        manufacture: 'Nivea',
        material: 'Non-Sticky Milk Formula',
        compatibility: 'Dermatologically Tested',
        features: ['Soft Skin Feel', 'Light Fragrance']
      }
    ],
    reviews: [
      {
        rating: 5,
        date: 'February 25 2024 at 12:55',
        text: 'Skin feels soft all day without any sticky residue. Great for dry winter skin.',
        author: 'Beatrice L.',
        avatar: AVATARS[2]
      },
      {
        rating: 4,
        date: 'February 1 2024 at 09:15',
        text: 'Absorbs quickly and the scent is subtle, not overpowering.',
        author: 'Rohan G.',
        avatar: AVATARS[0]
      },
      {
        rating: 4,
        date: 'January 9 2024 at 17:00',
        text: 'Good everyday lotion, works well as a large family-size bottle.',
        author: 'Wren H.',
        avatar: AVATARS[1]
      }
    ]
  },
  {
    id: 'garnier-face-wash',
    brand: 'Garnier',
    name: 'Bright Complete Vitamin C Face Wash',
    image: '/images/category-listing/beauty-03.webp',
    price: 8.99,
    originalPrice: 10.99,
    discount: 18,
    href: '/product/garnier-face-wash',
    rating: 4.2,
    reviewCount: 501,
    category: 'Beauty & Skincare',
    description:
      'A gentle foaming face wash with Vitamin C that removes dirt and excess oil while brightening skin tone with regular use.',
    images: [
      '/images/product-details/product-detail-01.webp',
      '/images/product-details/product-detail-02.webp',
      '/images/product-details/product-detail-03.webp',
      '/images/product-details/product-detail-04.webp'
    ],
    colors: [COLOR.green, COLOR.white],
    highlights: [
      {
        category: 'Face Cleansers',
        manufacture: 'Garnier',
        material: 'Vitamin C + Micro-Scrub Beads',
        compatibility: 'All Skin Types',
        features: ['Removes Excess Oil', 'Brightens Skin Tone']
      },
      {
        category: 'Daily Cleansing',
        manufacture: 'Garnier',
        material: 'Gentle Foaming Formula',
        compatibility: 'Twice-Daily Use',
        features: ['Non-Drying', 'Dermatologically Tested']
      }
    ],
    reviews: [
      {
        rating: 5,
        date: 'March 7 2024 at 07:50',
        text: 'Leaves skin feeling clean without stripping it dry. Noticed brighter skin in a month.',
        author: 'Kiara B.',
        avatar: AVATARS[0]
      },
      {
        rating: 4,
        date: 'February 13 2024 at 12:35',
        text: 'Foams up nicely and a little goes a long way. Great value.',
        author: 'Aditya M.',
        avatar: AVATARS[1]
      },
      {
        rating: 3,
        date: 'January 17 2024 at 09:20',
        text: 'Does the job but the scent is a bit strong for my liking.',
        author: 'Nadia F.',
        avatar: AVATARS[2]
      }
    ]
  },

  // Electronics
  {
    id: 'boat-airdopes-138',
    brand: 'boAt',
    name: 'Airdopes 138 True Wireless Earbuds',
    image: '/images/landing-page/product-deal-01.webp',
    price: 89.99,
    originalPrice: 89.99,
    discount: 0,
    href: '/product/boat-airdopes-138',
    rating: 2.8,
    reviewCount: 128,
    category: 'Electronics',
    description:
      'Truly wireless earbuds with punchy bass, ENx environmental noise cancellation for calls, and a compact charging case for up to 24 hours of total playback.',
    images: [
      '/images/product-details/boat-buds-01.webp',
      '/images/product-details/boat-buds-02.webp',
      '/images/product-details/boat-buds-03.webp',
      '/images/product-details/boat-buds-04.webp'
    ],
    colors: [COLOR.black, COLOR.white, COLOR.blue],
    highlights: [
      {
        category: 'True Wireless Earbuds',
        manufacture: 'Imagine Marketing Ltd. (boAt)',
        material: 'ABS Plastic + Silicone Tips',
        compatibility: 'Bluetooth 5.3 - iOS & Android',
        features: ['ENx Call Noise Cancellation', '24Hr Total Playback']
      },
      {
        category: 'Audio Performance',
        manufacture: 'Imagine Marketing Ltd. (boAt)',
        material: '8mm Dynamic Drivers',
        compatibility: 'IPX4 Water Resistant',
        features: ['Low Latency Gaming Mode', 'Touch Controls']
      }
    ],
    reviews: [
      {
        rating: 5,
        date: 'March 2 2024 at 11:20',
        text: 'Bass is punchy for the price and the case fits easily in a pocket. Pairing is instant.',
        author: 'Priya N.',
        avatar: AVATARS[0]
      },
      {
        rating: 4,
        date: 'February 14 2024 at 09:02',
        text: 'Solid battery life and calls sound clear. Touch controls take a bit of getting used to.',
        author: 'Rahul M.',
        avatar: AVATARS[1]
      },
      {
        rating: 3,
        date: 'January 25 2024 at 14:35',
        text: 'Good sound for daily use but one bud disconnects occasionally. Case build feels a bit plasticky.',
        author: 'Amit S.',
        avatar: AVATARS[2]
      }
    ]
  },
  {
    id: 'nestea-steel-bottle',
    brand: 'Milton',
    name: 'Smart LED Temperature Display Bottle',
    image: '/images/category-listing/bottles.webp',
    price: 49.99,
    originalPrice: 49.99,
    discount: 0,
    href: '/product/nestea-steel-bottle',
    isNew: true,
    rating: 4.8,
    reviewCount: 47,
    category: 'Kitchen Appliances',
    description:
      'A double-wall stainless-steel smart bottle with a built-in LED temperature display, USB-C rechargeable touch sensor, and a leak-proof cap.',
    images: [
      '/images/product-details/product-detail-01.webp',
      '/images/product-details/product-detail-02.webp',
      '/images/product-details/product-detail-03.webp',
      '/images/product-details/product-detail-04.webp'
    ],
    colors: [COLOR.silver, COLOR.black, COLOR.blue],
    highlights: [
      {
        category: 'Smart Drinkware',
        manufacture: 'Milton',
        material: '18/8 Stainless Steel',
        compatibility: 'USB-C Rechargeable',
        features: ['LED Temp Display', 'Leak Proof']
      },
      {
        category: 'Hydration Tech',
        manufacture: 'Milton',
        material: 'Double-Wall Vacuum Design',
        compatibility: 'Companion Hydration App',
        features: ['Touch Sensor Cap', 'Hot/Cold 12Hr']
      }
    ],
    reviews: [
      {
        rating: 4,
        date: 'February 5 2024 at 07:55',
        text: 'The LED temperature readout is surprisingly handy and there are no leaks in my bag.',
        author: 'Derek O.',
        avatar: AVATARS[1]
      },
      {
        rating: 4,
        date: 'January 19 2024 at 16:20',
        text: 'Charges fast over USB-C and the display stays accurate. Easy to clean too.',
        author: 'Mei L.',
        avatar: AVATARS[2]
      },
      {
        rating: 3,
        date: 'December 15 2023 at 10:15',
        text: 'Neat gadget but the touch sensor cap can be finicky in cold weather.',
        author: 'Xavier G.',
        avatar: AVATARS[0]
      }
    ]
  },
  {
    id: 'philips-air-fryer',
    brand: 'Philips',
    name: 'Digital Air Fryer XL 6.2L',
    image: '/images/product-card/image-15.webp',
    price: 129.99,
    originalPrice: 159.99,
    discount: 19,
    showDiscountBadge: true,
    href: '/product/philips-air-fryer',
    isPopular: true,
    rating: 4.6,
    reviewCount: 322,
    category: 'Kitchen Appliances',
    description:
      'A 6.2L digital air fryer with rapid-air technology that cooks with up to 90% less oil, plus 8 preset cooking programs and a dishwasher-safe basket.',
    images: [
      '/images/product-details/product-detail-01.webp',
      '/images/product-details/product-detail-02.webp',
      '/images/product-details/product-detail-03.webp',
      '/images/product-details/product-detail-04.webp'
    ],
    colors: [COLOR.black, COLOR.white],
    highlights: [
      {
        category: 'Air Fryers',
        manufacture: 'Philips India',
        material: 'Non-Stick Aluminium Basket',
        compatibility: '230V - 1400W',
        features: ['90% Less Oil', '8 Preset Programs']
      },
      {
        category: 'Smart Cooking',
        manufacture: 'Philips India',
        material: 'Rapid Air Technology',
        compatibility: '6.2L Family Size',
        features: ['Dishwasher-Safe Basket', 'Digital Touch Display']
      }
    ],
    reviews: [
      {
        rating: 5,
        date: 'March 9 2024 at 08:20',
        text: 'Fries come out crispy without any oil smell in the kitchen. Basket cleans up in seconds.',
        author: 'Renee A.',
        avatar: AVATARS[0]
      },
      {
        rating: 5,
        date: 'February 19 2024 at 17:05',
        text: 'The preset programs take the guesswork out of cooking. Family uses it almost daily now.',
        author: 'Karan S.',
        avatar: AVATARS[1]
      },
      {
        rating: 4,
        date: 'January 22 2024 at 12:40',
        text: 'Great results, just wish the basket was a bit larger for bigger batches.',
        author: 'Paula G.',
        avatar: AVATARS[2]
      }
    ]
  },
  {
    id: 'prestige-toaster',
    brand: 'Prestige',
    name: 'PopUp 2-Slice Toaster',
    image: '/images/product-card/image-16.webp',
    price: 24.99,
    originalPrice: 29.99,
    discount: 17,
    showDiscountBadge: true,
    href: '/product/prestige-toaster',
    rating: 4.1,
    reviewCount: 187,
    category: 'Kitchen Appliances',
    description:
      'A 2-slice pop-up toaster with 7-level browning control, a removable crumb tray, and automatic shut-off for safe, effortless breakfasts.',
    images: [
      '/images/product-details/product-detail-01.webp',
      '/images/product-details/product-detail-02.webp',
      '/images/product-details/product-detail-03.webp',
      '/images/product-details/product-detail-04.webp'
    ],
    colors: [COLOR.silver, COLOR.red, COLOR.black],
    highlights: [
      {
        category: 'Toasters',
        manufacture: 'TTK Prestige',
        material: 'Stainless Steel Housing',
        compatibility: '230V - 750W',
        features: ['7-Level Browning', 'Removable Crumb Tray']
      },
      {
        category: 'Everyday Breakfast',
        manufacture: 'TTK Prestige',
        material: 'Wide Slice Slots',
        compatibility: 'Auto Shut-Off Safety',
        features: ['Reheat & Defrost Modes', 'Cord Storage']
      }
    ],
    reviews: [
      {
        rating: 4,
        date: 'February 27 2024 at 07:35',
        text: 'Toasts evenly and the crumb tray makes cleanup painless. Good value.',
        author: 'Imani D.',
        avatar: AVATARS[1]
      },
      {
        rating: 4,
        date: 'February 3 2024 at 18:50',
        text: 'Simple and reliable. The wide slots fit thick bread slices without a squeeze.',
        author: 'Hugo M.',
        avatar: AVATARS[2]
      },
      {
        rating: 3,
        date: 'January 9 2024 at 09:10',
        text: 'Does the basics fine, though the browning dial could use finer increments.',
        author: 'Sana T.',
        avatar: AVATARS[0]
      }
    ]
  },
  {
    id: 'bajaj-blender',
    brand: 'Bajaj',
    name: 'Rex 750W Juicer Mixer Grinder',
    image: '/images/product-card/image-17.webp',
    price: 54.99,
    originalPrice: 69.99,
    discount: 21,
    href: '/product/bajaj-blender',
    isNew: true,
    rating: 4.4,
    reviewCount: 245,
    category: 'Kitchen Appliances',
    description:
      'A 750W juicer mixer grinder with 3 stainless-steel jars, a powerful copper motor, and overload protection built for daily cooking.',
    images: [
      '/images/product-details/product-detail-01.webp',
      '/images/product-details/product-detail-02.webp',
      '/images/product-details/product-detail-03.webp',
      '/images/product-details/product-detail-04.webp'
    ],
    colors: [COLOR.black, COLOR.white, COLOR.red],
    highlights: [
      {
        category: 'Juicers & Blenders',
        manufacture: 'Bajaj Electricals',
        material: 'Stainless Steel Jars + Copper Motor',
        compatibility: '230V - 750W',
        features: ['3 Jars Included', 'Overload Protection']
      },
      {
        category: 'Daily Cooking',
        manufacture: 'Bajaj Electricals',
        material: 'Shockproof ABS Body',
        compatibility: '2-Year Warranty',
        features: ['3-Speed Control', 'Easy-Grip Jars']
      }
    ],
    reviews: [
      {
        rating: 5,
        date: 'March 4 2024 at 11:30',
        text: 'Copper motor handles daily grinding without heating up. Three jars cover everything I need.',
        author: 'Divya K.',
        avatar: AVATARS[2]
      },
      {
        rating: 4,
        date: 'February 14 2024 at 16:15',
        text: 'Sturdy and powerful for the price. Slightly loud on the highest speed.',
        author: 'Tomas R.',
        avatar: AVATARS[0]
      },
      {
        rating: 4,
        date: 'January 26 2024 at 10:05',
        text: 'Reliable everyday blender, jars are easy to clean and lids seal well.',
        author: 'Ngozi E.',
        avatar: AVATARS[1]
      }
    ]
  },

  // Home Decor
  {
    id: 'boat-photo-frames',
    brand: 'Boat',
    name: 'Smart Digital Photo Frame with WiFi',
    image: '/images/product-card/image-18.webp',
    price: 39.99,
    originalPrice: 54.99,
    discount: 27,
    href: '/product/boat-photo-frames',
    rating: 4.3,
    reviewCount: 64,
    category: 'Home Decor',
    description:
      'A 10" WiFi-connected digital photo frame with touch controls, cloud photo sync, and an anti-glare HD display - share memories to family frames instantly.',
    images: [
      '/images/product-details/product-detail-01.webp',
      '/images/product-details/product-detail-02.webp',
      '/images/product-details/product-detail-03.webp',
      '/images/product-details/product-detail-04.webp'
    ],
    colors: [COLOR.beige, COLOR.black, COLOR.white],
    highlights: [
      {
        category: 'Digital Photo Frames',
        manufacture: 'Boat Living',
        material: 'HD IPS Touch Display',
        compatibility: 'WiFi + Companion App',
        features: ['10" Anti-Glare Screen', 'Cloud Photo Sync']
      },
      {
        category: 'Smart Home',
        manufacture: 'Boat Living',
        material: 'Aluminium Frame',
        compatibility: 'iOS / Android App',
        features: ['Unlimited Cloud Storage', 'Motion-Sensor Auto Wake']
      }
    ],
    reviews: [
      {
        rating: 4,
        date: 'January 30 2024 at 13:40',
        text: 'Setup was quick and the whole family can push photos to it remotely. Screen looks great.',
        author: 'Hannah B.',
        avatar: AVATARS[2]
      },
      {
        rating: 4,
        date: 'January 12 2024 at 17:18',
        text: 'Touch controls are responsive and the app makes uploading photos painless.',
        author: 'George W.',
        avatar: AVATARS[0]
      },
      {
        rating: 3,
        date: 'December 28 2023 at 12:30',
        text: 'Great concept but WiFi sync drops occasionally. Still happy with the purchase.',
        author: 'Lily C.',
        avatar: AVATARS[1]
      }
    ]
  },
  {
    id: 'urban-wall-art-canvas',
    brand: 'Urban Ladder',
    name: 'Abstract Canvas Wall Art Set of 3',
    image: '/images/product-card/image-19.webp',
    price: 69.99,
    originalPrice: 89.99,
    discount: 22,
    showDiscountBadge: true,
    href: '/product/urban-wall-art-canvas',
    isPopular: true,
    rating: 4.5,
    reviewCount: 142,
    category: 'Home Decor',
    description:
      'A set of 3 framed abstract canvas prints with fade-resistant ink and ready-to-hang mounts - an instant statement wall for any living space.',
    images: [
      '/images/product-details/product-detail-01.webp',
      '/images/product-details/product-detail-02.webp',
      '/images/product-details/product-detail-03.webp',
      '/images/product-details/product-detail-04.webp'
    ],
    colors: [COLOR.beige, COLOR.slate, COLOR.blue],
    highlights: [
      {
        category: 'Wall Art',
        manufacture: 'Urban Ladder',
        material: 'Canvas + Engineered Wood Frame',
        compatibility: 'Set of 3 - 12x16" Each',
        features: ['Fade-Resistant Print', 'Ready to Hang']
      },
      {
        category: 'Living Room Decor',
        manufacture: 'Urban Ladder',
        material: 'Matte Finish Print',
        compatibility: 'All Wall Types',
        features: ['Lightweight Frame', 'Pre-Installed Hooks']
      }
    ],
    reviews: [
      {
        rating: 5,
        date: 'March 11 2024 at 09:45',
        text: 'Colours are richer in person and the set transformed our living room wall instantly.',
        author: 'Chloe B.',
        avatar: AVATARS[0]
      },
      {
        rating: 4,
        date: 'February 21 2024 at 14:20',
        text: 'Frames feel sturdy and hanging hardware was already attached. Easy setup.',
        author: 'Ravi P.',
        avatar: AVATARS[1]
      },
      {
        rating: 4,
        date: 'January 28 2024 at 08:55',
        text: 'Good quality prints, though one frame edge had a small dent on arrival.',
        author: 'Elise M.',
        avatar: AVATARS[2]
      }
    ]
  },
  {
    id: 'yankee-scented-candle',
    brand: 'Yankee Candle',
    name: 'Vanilla Cupcake Scented Jar Candle',
    image: '/images/product-card/image-20.webp',
    price: 19.99,
    originalPrice: 24.99,
    discount: 20,
    href: '/product/yankee-scented-candle',
    rating: 4.7,
    reviewCount: 398,
    category: 'Home Decor',
    description:
      'A hand-poured soy-blend jar candle in warm vanilla cupcake, with an even burn and up to 50 hours of fragrance for a cozy home ambiance.',
    images: [
      '/images/product-details/product-detail-01.webp',
      '/images/product-details/product-detail-02.webp',
      '/images/product-details/product-detail-03.webp',
      '/images/product-details/product-detail-04.webp'
    ],
    colors: [COLOR.amber, COLOR.white],
    highlights: [
      {
        category: 'Candles & Fragrance',
        manufacture: 'Yankee Candle Co.',
        material: 'Soy-Paraffin Wax Blend',
        compatibility: 'Indoor Use',
        features: ['50Hr Burn Time', 'Even Wax Pool']
      },
      {
        category: 'Home Ambiance',
        manufacture: 'Yankee Candle Co.',
        material: 'Cotton Wick',
        compatibility: 'Medium Jar 20oz',
        features: ['Long-Lasting Scent Throw', 'Reusable Glass Jar']
      }
    ],
    reviews: [
      {
        rating: 5,
        date: 'March 2 2024 at 19:10',
        text: 'Fills the whole room with a warm bakery scent without being overpowering.',
        author: 'Bea H.',
        avatar: AVATARS[1]
      },
      {
        rating: 5,
        date: 'February 9 2024 at 20:30',
        text: 'Burns evenly all the way down, no tunneling. Jar looks great on display too.',
        author: 'Andre L.',
        avatar: AVATARS[2]
      },
      {
        rating: 4,
        date: 'January 15 2024 at 15:00',
        text: 'Lovely scent, wish it lasted a bit longer for the price.',
        author: 'Junko S.',
        avatar: AVATARS[0]
      }
    ]
  },
  {
    id: 'ikea-ceramic-vase',
    brand: 'IKEA',
    name: 'Ceramic Decorative Vase Set of 2',
    image: '/images/product-card/image-21.webp',
    price: 34.99,
    originalPrice: 44.99,
    discount: 22,
    href: '/product/ikea-ceramic-vase',
    isNew: true,
    rating: 4.3,
    reviewCount: 176,
    category: 'Home Decor',
    description:
      'A set of 2 handcrafted ceramic vases in complementary shapes and finishes - perfect for fresh or dried florals on a shelf, table, or console.',
    images: [
      '/images/product-details/product-detail-01.webp',
      '/images/product-details/product-detail-02.webp',
      '/images/product-details/product-detail-03.webp',
      '/images/product-details/product-detail-04.webp'
    ],
    colors: [COLOR.white, COLOR.beige, COLOR.slate],
    highlights: [
      {
        category: 'Vases & Planters',
        manufacture: 'IKEA',
        material: 'Glazed Stoneware Ceramic',
        compatibility: 'Set of 2 - 8" & 11"',
        features: ['Handcrafted Finish', 'Water-Tight Glaze']
      },
      {
        category: 'Tabletop Decor',
        manufacture: 'IKEA',
        material: 'Matte + Gloss Finish Pair',
        compatibility: 'Indoor Display',
        features: ['Wide Stable Base', 'Complementary Shapes']
      }
    ],
    reviews: [
      {
        rating: 5,
        date: 'February 24 2024 at 10:40',
        text: 'Beautiful finish in person, the two shapes pair really nicely on a shelf.',
        author: 'Freya J.',
        avatar: AVATARS[2]
      },
      {
        rating: 4,
        date: 'February 1 2024 at 13:25',
        text: 'Sturdy and well glazed inside, holds water without any seepage.',
        author: 'Kabir N.',
        avatar: AVATARS[0]
      },
      {
        rating: 4,
        date: 'January 6 2024 at 09:50',
        text: 'Good quality for the price, smaller than I pictured but still lovely.',
        author: 'Marisol T.',
        avatar: AVATARS[1]
      }
    ]
  },
  {
    id: 'hosley-fairy-lights',
    brand: 'Hosley',
    name: 'Warm White LED Fairy String Lights',
    image: '/images/product-card/image-22.webp',
    price: 15.99,
    originalPrice: 19.99,
    discount: 20,
    href: '/product/hosley-fairy-lights',
    rating: 4.5,
    reviewCount: 263,
    category: 'Home Decor',
    description:
      'A 20ft copper-wire LED fairy light string with 8 flicker modes and USB power - perfect for shelves, headboards, and festive decor.',
    images: [
      '/images/product-details/product-detail-01.webp',
      '/images/product-details/product-detail-02.webp',
      '/images/product-details/product-detail-03.webp',
      '/images/product-details/product-detail-04.webp'
    ],
    colors: [COLOR.amber, COLOR.white],
    highlights: [
      {
        category: 'String Lights',
        manufacture: 'Hosley',
        material: 'Flexible Copper Wire',
        compatibility: 'USB Powered',
        features: ['20ft / 60 LEDs', '8 Flicker Modes']
      },
      {
        category: 'Festive Decor',
        manufacture: 'Hosley',
        material: 'Warm White LEDs',
        compatibility: 'Indoor / Covered Outdoor',
        features: ['Bendable & Reusable', 'Low Heat Emission']
      }
    ],
    reviews: [
      {
        rating: 5,
        date: 'March 6 2024 at 21:00',
        text: 'Wraps around my headboard perfectly and the warm glow is exactly what I wanted.',
        author: 'Talia F.',
        avatar: AVATARS[0]
      },
      {
        rating: 4,
        date: 'February 12 2024 at 18:35',
        text: 'Bright and easy to shape. USB power means no bulky battery pack.',
        author: 'Emeka O.',
        avatar: AVATARS[1]
      },
      {
        rating: 4,
        date: 'January 20 2024 at 11:15',
        text: 'Great value string lights, one segment was slightly dimmer than the rest.',
        author: 'Ines C.',
        avatar: AVATARS[2]
      }
    ]
  },

  // Toys & Games
  {
    id: 'hotwheels-track-set',
    brand: 'Hot Wheels',
    name: 'Ultimate Garage Track Set',
    image: '/images/product-card/image-23.webp',
    price: 49.99,
    originalPrice: 64.99,
    discount: 23,
    showDiscountBadge: true,
    href: '/product/hotwheels-track-set',
    isPopular: true,
    rating: 4.7,
    reviewCount: 421,
    category: 'Toys & Games',
    description:
      'A multi-level track playset that stores over 90 die-cast cars, with a motorized elevator, spiral track, and a working car wash feature.',
    images: [
      '/images/product-details/product-detail-01.webp',
      '/images/product-details/product-detail-02.webp',
      '/images/product-details/product-detail-03.webp',
      '/images/product-details/product-detail-04.webp'
    ],
    colors: [COLOR.blue, COLOR.red, COLOR.amber],
    highlights: [
      {
        category: 'Vehicle Playsets',
        manufacture: 'Mattel Inc.',
        material: 'Durable ABS Plastic',
        compatibility: 'Ages 5+',
        features: ['Stores 90+ Cars', 'Motorized Elevator']
      },
      {
        category: 'Active Play',
        manufacture: 'Mattel Inc.',
        material: 'Multi-Level Track Design',
        compatibility: 'Compatible with All Hot Wheels Cars',
        features: ['Spiral Track', 'Working Car Wash']
      }
    ],
    reviews: [
      {
        rating: 5,
        date: 'March 8 2024 at 15:20',
        text: 'Keeps my kids entertained for hours and actually stores all their cars for once.',
        author: 'Dante W.',
        avatar: AVATARS[1]
      },
      {
        rating: 5,
        date: 'February 18 2024 at 10:05',
        text: 'The motorized elevator is a huge hit. Assembly took a while but worth it.',
        author: 'Priyanka B.',
        avatar: AVATARS[2]
      },
      {
        rating: 4,
        date: 'January 25 2024 at 17:40',
        text: 'Fun set overall, a couple of track clips feel a bit flimsy.',
        author: 'Soren K.',
        avatar: AVATARS[0]
      }
    ]
  },
  {
    id: 'lego-city-builder',
    brand: 'LEGO',
    name: 'City Builder Block Set 1200pc',
    image: '/images/product-card/image-24.webp',
    price: 89.99,
    originalPrice: 109.99,
    discount: 18,
    href: '/product/lego-city-builder',
    isNew: true,
    rating: 4.8,
    reviewCount: 512,
    category: 'Toys & Games',
    description:
      'A 1200-piece city-builder block set with interchangeable buildings, vehicles, and mini-figures - designed for hours of creative, screen-free play.',
    images: [
      '/images/product-details/product-detail-01.webp',
      '/images/product-details/product-detail-02.webp',
      '/images/product-details/product-detail-03.webp',
      '/images/product-details/product-detail-04.webp'
    ],
    colors: [COLOR.red, COLOR.blue, COLOR.green, COLOR.amber],
    highlights: [
      {
        category: 'Building Blocks',
        manufacture: 'LEGO Group',
        material: 'ABS Interlocking Bricks',
        compatibility: 'Ages 8+',
        features: ['1200 Pieces', '12 Mini-Figures']
      },
      {
        category: 'Creative Play',
        manufacture: 'LEGO Group',
        material: 'Compatible with Standard LEGO Sets',
        compatibility: 'Screen-Free Play',
        features: ['Modular Buildings', 'Instruction Booklet Included']
      }
    ],
    reviews: [
      {
        rating: 5,
        date: 'March 13 2024 at 12:50',
        text: 'Incredible detail for the piece count and it builds into a proper little city.',
        author: 'Lena V.',
        avatar: AVATARS[0]
      },
      {
        rating: 5,
        date: 'February 27 2024 at 09:30',
        text: 'Kept my 10-year-old occupied for an entire weekend. Pieces are high quality.',
        author: 'Femi A.',
        avatar: AVATARS[1]
      },
      {
        rating: 4,
        date: 'January 30 2024 at 14:15',
        text: 'Great set, instructions could be a little clearer in a couple of steps.',
        author: 'Odette R.',
        avatar: AVATARS[2]
      }
    ]
  },
  {
    id: 'funskool-monopoly',
    brand: 'Funskool',
    name: 'Monopoly Classic Board Game',
    image: '/images/product-card/image-25.webp',
    price: 22.99,
    originalPrice: 27.99,
    discount: 18,
    href: '/product/funskool-monopoly',
    rating: 4.6,
    reviewCount: 367,
    category: 'Toys & Games',
    description:
      'The classic property-trading board game with tokens, play money, and title deed cards - a family game night favorite for 2 to 6 players.',
    images: [
      '/images/product-details/product-detail-01.webp',
      '/images/product-details/product-detail-02.webp',
      '/images/product-details/product-detail-03.webp',
      '/images/product-details/product-detail-04.webp'
    ],
    colors: [COLOR.red, COLOR.green, COLOR.black],
    highlights: [
      {
        category: 'Board Games',
        manufacture: 'Funskool India',
        material: 'Cardstock Board + Plastic Tokens',
        compatibility: '2-6 Players',
        features: ['Classic Ruleset', 'Includes Play Money']
      },
      {
        category: 'Family Game Night',
        manufacture: 'Funskool India',
        material: 'Durable Storage Box',
        compatibility: 'Ages 8+',
        features: ['45-90 Min Playtime', 'Easy-Store Box']
      }
    ],
    reviews: [
      {
        rating: 5,
        date: 'March 1 2024 at 20:10',
        text: 'Same classic game we grew up with, box quality is sturdier than expected.',
        author: 'Cyrus M.',
        avatar: AVATARS[2]
      },
      {
        rating: 4,
        date: 'February 6 2024 at 16:45',
        text: 'Great family game night staple, tokens feel a bit lightweight though.',
        author: 'Adaeze N.',
        avatar: AVATARS[0]
      },
      {
        rating: 4,
        date: 'January 11 2024 at 11:20',
        text: 'All pieces present and accounted for, board folds and stores neatly.',
        author: 'Willa P.',
        avatar: AVATARS[1]
      }
    ]
  },
  {
    id: 'barbie-fashionista-doll',
    brand: 'Barbie',
    name: 'Fashionista Doll with Accessories',
    image: '/images/product-card/image-26.webp',
    price: 17.99,
    originalPrice: 22.99,
    discount: 22,
    href: '/product/barbie-fashionista-doll',
    isNew: true,
    rating: 4.5,
    reviewCount: 289,
    category: 'Toys & Games',
    description:
      'A poseable fashion doll with swappable outfits, shoes, and accessories - encourages imaginative styling play for kids ages 3 and up.',
    images: [
      '/images/product-details/product-detail-01.webp',
      '/images/product-details/product-detail-02.webp',
      '/images/product-details/product-detail-03.webp',
      '/images/product-details/product-detail-04.webp'
    ],
    colors: [COLOR.rose, COLOR.purple, COLOR.white],
    highlights: [
      {
        category: 'Fashion Dolls',
        manufacture: 'Mattel Inc.',
        material: 'Poseable Vinyl Body',
        compatibility: 'Ages 3+',
        features: ['Swappable Outfits', 'Included Accessories']
      },
      {
        category: 'Imaginative Play',
        manufacture: 'Mattel Inc.',
        material: 'Soft-Touch Hair',
        compatibility: 'Compatible with Barbie Accessory Sets',
        features: ['11 Points of Articulation', 'Storage-Friendly Box']
      }
    ],
    reviews: [
      {
        rating: 5,
        date: 'March 5 2024 at 13:35',
        text: 'My daughter loves swapping the outfits and the joints hold poses well.',
        author: 'Grace O.',
        avatar: AVATARS[1]
      },
      {
        rating: 4,
        date: 'February 16 2024 at 09:50',
        text: 'Good quality doll, accessories are a little fiddly for small hands.',
        author: 'Bilal Q.',
        avatar: AVATARS[2]
      },
      {
        rating: 4,
        date: 'January 21 2024 at 15:05',
        text: 'Nice detail on the outfit stitching, arrived well packaged.',
        author: 'Suki H.',
        avatar: AVATARS[0]
      }
    ]
  },
  {
    id: 'nerf-elite-blaster',
    brand: 'Nerf',
    name: 'Elite 2.0 Dart Blaster',
    image: '/images/product-card/image-27.webp',
    price: 24.99,
    originalPrice: 29.99,
    discount: 17,
    showDiscountBadge: true,
    href: '/product/nerf-elite-blaster',
    rating: 4.4,
    reviewCount: 334,
    category: 'Toys & Games',
    description:
      'A pump-action dart blaster with a 12-dart clip, adjustable stock, and tactical rail - includes 12 Elite foam darts for backyard battles.',
    images: [
      '/images/product-details/product-detail-01.webp',
      '/images/product-details/product-detail-02.webp',
      '/images/product-details/product-detail-03.webp',
      '/images/product-details/product-detail-04.webp'
    ],
    colors: [COLOR.amber, COLOR.black, COLOR.blue],
    highlights: [
      {
        category: 'Dart Blasters',
        manufacture: 'Hasbro Nerf',
        material: 'Impact-Resistant Plastic',
        compatibility: 'Ages 8+',
        features: ['12-Dart Clip', 'Adjustable Stock']
      },
      {
        category: 'Outdoor Play',
        manufacture: 'Hasbro Nerf',
        material: 'Pump-Action Priming',
        compatibility: 'Elite Dart Compatible',
        features: ['Tactical Rail', 'Includes 12 Darts']
      }
    ],
    reviews: [
      {
        rating: 5,
        date: 'March 10 2024 at 17:25',
        text: 'Solid range and the pump action feels satisfying. Backyard battles got a lot more fun.',
        author: 'Mika D.',
        avatar: AVATARS[2]
      },
      {
        rating: 4,
        date: 'February 23 2024 at 12:10',
        text: 'Good accuracy for a foam blaster, clip loads smoothly.',
        author: 'Amos T.',
        avatar: AVATARS[0]
      },
      {
        rating: 4,
        date: 'January 29 2024 at 08:40',
        text: "Fun blaster, stock feels a little loose but doesn't affect performance.",
        author: 'Rosalind K.',
        avatar: AVATARS[1]
      }
    ]
  }
]

/** Ordered collections - reference catalog products by id (stands in for a join table). */
export const dealIds = [
  'boat-airdopes-138',
  'amazfit-gts-smartwatch',
  'warmeo-micro-matic-lunchbox',
  'noise-buds-x-prime',
  'powera-fusion-pro',
  'boat-photo-frames'
]

export const newArrivalIds = [
  'bellavita-body-spray',
  'spigen-iphone-case',
  'vivo-v29-pro',
  'tagdo-casual-shirt',
  'nestea-steel-bottle',
  'nike-drifit-tshirt',
  'powera-fusion-pro',
  'boat-photo-frames'
]

/** Seed wishlist (demo). With a real backend this comes from the user's saved wishlist. */
export const defaultWishlistIds = ['apple-smartwatch', 'apple-airpods-max', 'noise-buds-earbuds']

/** Seed cart (demo). With a real backend this comes from the user's saved cart. */
export const defaultCartIds = ['noise-buds-x-prime', 'titan-neo-smartwatch']

/** Default product used by the "Product Details" nav link and the bare /write-review page. */
export const sampleProductId = 'tagdo-casual-shirt'
