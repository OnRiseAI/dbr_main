// Component Imports
import CategoryHero from '@/views/pages/category/category-hero'
import CategoryElectronics from '@/views/pages/category/category-electronics'
import CategoryBrands from '@/views/pages/category/category-brands'
import CategoryDeals from '@/views/pages/category/category-deals'
import CategoryClothing from '@/views/pages/category/category-clothing'
import CategoryPromo from '@/views/pages/category/category-promo'
import CategorySkincare from '@/views/pages/category/category-skincare'

const CategoryView = () => {
  return (
    <div>
      <CategoryHero />
      <CategoryElectronics />
      <CategoryBrands />
      <CategoryDeals />
      <CategoryPromo />
      <CategorySkincare />
      <CategoryClothing />
    </div>
  )
}

export { CategoryView }

export default CategoryView
