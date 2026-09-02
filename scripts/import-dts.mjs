import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve('D:/Projects/onrise-web')
const dump = path.join(root, '.firecrawl')
const outDir = path.join(root, 'src/fake-db')

const collections = JSON.parse(fs.readFileSync(path.join(dump, 'dts-collections.json'), 'utf8')).collections
const pages = JSON.parse(fs.readFileSync(path.join(dump, 'dts-pages.json'), 'utf8')).pages
const productsRaw = JSON.parse(fs.readFileSync(path.join(dump, 'dts-products.json'), 'utf8')).products

const collectionFiles = {
  peptides: 'Buy Peptides Online',
  exosomes: 'Exosomes',
  'peptide-blends-combination-products': 'Peptide Blends & Combination Products',
  'peptide-nasal-sprays': 'Peptide Nasal Sprays',
  'bioregulator-peptides': 'Peptides Bioregulators',
  'peptides-for-fitness': 'Peptides for Fitness',
  immunostimulants: 'Peptides for Immune System',
  'peptides-for-muscle-mass': 'Peptides for Muscle Mass',
  'peptides-for-weight-loss': 'Peptides for Weight Loss'
}

const primaryOrder = [
  'Peptide Nasal Sprays',
  'Exosomes',
  'Peptide Blends & Combination Products',
  'Peptides Bioregulators',
  'Peptides for Immune System',
  'Peptides for Weight Loss',
  'Peptides for Muscle Mass',
  'Peptides for Fitness',
  'Buy Peptides Online'
]

const membership = new Map()
for (const [handle, title] of Object.entries(collectionFiles)) {
  const file = path.join(dump, `dts-col-${handle}.json`)
  const list = JSON.parse(fs.readFileSync(file, 'utf8')).products
  for (const item of list) {
    const current = membership.get(item.handle) ?? []
    current.push(title)
    membership.set(item.handle, current)
  }
}

function stripHtml(html = '') {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

function pickCategory(handle) {
  const titles = membership.get(handle) ?? []
  return primaryOrder.find(name => titles.includes(name)) ?? 'Buy Peptides Online'
}

const products = productsRaw.map(product => {
  const variant = product.variants?.[0] ?? {}
  const price = Number(variant.price ?? 0)
  const compare = variant.compare_at_price ? Number(variant.compare_at_price) : price
  const originalPrice = compare > price ? compare : price
  const discount = originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0
  const images = (product.images ?? []).map(img => img.src).filter(Boolean)
  const image = images[0] ?? ''
  const created = new Date(product.created_at).getTime()
  const text = stripHtml(product.body_html)
  const category = pickCategory(product.handle)
  const collections = membership.get(product.handle) ?? [category]

  return {
    id: product.handle,
    brand: product.vendor || 'Pen Peptide',
    name: product.title,
    image,
    price,
    originalPrice,
    discount,
    isNew: Date.now() - created < 1000 * 60 * 60 * 24 * 60,
    isPopular: collections.includes('Buy Peptides Online') && collections.length <= 2,
    href: `/product/${product.handle}`,
    rating: 4.8,
    reviewCount: 0,
    category,
    collections,
    description: text.slice(0, 280),
    bodyHtml: product.body_html || '',
    images: images.length ? images : [image],
    colors: [],
    highlights: [
      {
        category: product.product_type || 'Peptide',
        manufacture: product.vendor || 'Pen Peptide',
        material: 'Stabilized research formula',
        compatibility: 'Laboratory and research use only',
        features: ['Pre-mixed pen or ready format', 'MSSPT stabilization']
      }
    ],
    reviews: []
  }
})

const weightLoss = products.filter(p => p.category === 'Peptides for Weight Loss' || (membership.get(p.id) ?? []).includes('Peptides for Weight Loss'))
const fitness = products.filter(p => (membership.get(p.id) ?? []).includes('Peptides for Fitness'))
const newest = [...products].sort((a, b) => (b.isNew === a.isNew ? 0 : b.isNew ? 1 : -1))

const dealIds = (weightLoss.length ? weightLoss : products).slice(0, 8).map(p => p.id)
const newArrivalIds = newest.slice(0, 8).map(p => p.id)
const popularIds = products.filter(p => (membership.get(p.id) ?? []).includes('Buy Peptides Online')).slice(0, 12).map(p => p.id)
products.forEach(p => {
  p.isPopular = popularIds.includes(p.id)
})

const categories = collections.map(col => ({
  name: col.title,
  handle: col.handle,
  image: col.image?.src ?? '',
  href: `/shop?category=${encodeURIComponent(col.title)}`,
  description: stripHtml(col.description || '').slice(0, 220),
  productsCount: col.products_count
}))

const categoryFilters = {}
for (const cat of categories) {
  const inCat = products.filter(p => p.category === cat.name || (p.collections ?? []).includes(cat.name))
  if (!inCat.length) continue
  const prices = inCat.map(p => p.price)
  categoryFilters[cat.name] = {
    brands: [...new Set(inCat.map(p => p.brand))].sort(),
    priceMin: Math.floor(Math.min(...prices)),
    priceMax: Math.ceil(Math.max(...prices))
  }
}

const pageRecords = pages.map(page => ({
  handle: page.handle,
  title: page.title,
  html: page.body_html || ''
}))

fs.writeFileSync(path.join(outDir, 'dts-products.json'), JSON.stringify(products, null, 2))
fs.writeFileSync(path.join(outDir, 'dts-pages.json'), JSON.stringify(pageRecords, null, 2))
fs.writeFileSync(path.join(outDir, 'dts-categories.json'), JSON.stringify(categories, null, 2))
fs.writeFileSync(path.join(outDir, 'dts-category-filters.json'), JSON.stringify(categoryFilters, null, 2))
fs.writeFileSync(
  path.join(outDir, 'dts-meta.json'),
  JSON.stringify(
    {
      dealIds,
      newArrivalIds,
      defaultWishlistIds: newArrivalIds.slice(0, 3),
      defaultCartIds: dealIds.slice(0, 1),
      sampleProductId: products.some(p => p.id === 'retatrutide-pen-6-12-20-40mg')
        ? 'retatrutide-pen-6-12-20-40mg'
        : products[0].id
    },
    null,
    2
  )
)

console.log('products', products.length)
console.log('categories', categories.map(c => `${c.name} (${c.productsCount})`).join(' | '))
console.log('pages', pageRecords.map(p => p.handle).join(', '))
console.log('deals', dealIds)
console.log('new', newArrivalIds)
