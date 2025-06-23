import { useState } from 'react'
import FilterSearch from './FilterSearch/FilterSearchClothes'
import Header from './Header/Header'
import News from './News/News'
import Slider from './slider/Slider'
import TrendClothes from './TrendClothes/TrendClothes'
import { clothesList } from './ClothesList'
import { shoesList } from './ShoesList'
import { bagsList } from './BagsList'
import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Feedback from './Feedback/Feedback'
import Footer from './Footer/Footer'

interface BasketItem {
  product: any
  quantity: number
}

function App() {
  const [basket, setBasket] = useState<BasketItem[]>([])
  const [filteredClothes, setFilteredClothes] = useState(clothesList)
  const [filteredBags, setFilteredBags] = useState(bagsList)
  const [filteredShoes, setFilteredShoes] = useState(shoesList)
  const [specialItems] = useState(() => [
    ...clothesList.filter(item => item.isSpecial),
    ...bagsList.filter(item => item.isSpecial),
    ...shoesList.filter(item => item.isSpecial)
  ])

  const handleAddToBasket = (product: any, quantity: number) => {
    setBasket(prev => {
      const existingItem = prev.find(item => item.product.id === product.id)
      if (existingItem) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, { product, quantity }]
    })
  }

  const handleClothesFilter = (filters: {
    priceRange: [number, number]
    brands: string[]
    materials: string[]
    clothesType?: string[]
  }) => {
    const filtered = clothesList.filter(item => {
      const priceMatch = item.price >= filters.priceRange[0] && item.price <= filters.priceRange[1]
      const brandMatch = filters.brands.length === 0 || filters.brands.includes(item.brand)
      const materialMatch = filters.materials.length === 0 || filters.materials.includes(item.material)
      const typeMatch = !filters.clothesType || filters.clothesType.length === 0 || 
                       filters.clothesType.includes(item.clothesType)
      return priceMatch && brandMatch && materialMatch && typeMatch
    })
    setFilteredClothes(filtered)
  }

  const handleBagsFilter = (filters: {
    priceRange: [number, number]
    brands: string[]
    materials: string[]
  }) => {
    const filtered = bagsList.filter(item => {
      const priceMatch = item.price >= filters.priceRange[0] && item.price <= filters.priceRange[1]
      const brandMatch = filters.brands.length === 0 || filters.brands.includes(item.brand)
      const materialMatch = filters.materials.length === 0 || filters.materials.includes(item.material)
      return priceMatch && brandMatch && materialMatch
    })
    setFilteredBags(filtered)
  }

  const handleShoesFilter = (filters: {
    priceRange: [number, number]
    brands: string[]
    materials: string[]
  }) => {
    const filtered = shoesList.filter(item => {
      const priceMatch = item.price >= filters.priceRange[0] && item.price <= filters.priceRange[1]
      const brandMatch = filters.brands.length === 0 || filters.brands.includes(item.brand)
      const materialMatch = filters.materials.length === 0 || filters.materials.includes(item.material)
      return priceMatch && brandMatch && materialMatch
    })
    setFilteredShoes(filtered)
  }

  const FilterablePage = ({ 
    title, 
    items, 
    filteredItems, 
    onFilterChange,
    showClothesTypeFilter = false
  }: {
    title: string
    items: any[]
    filteredItems: any[]
    onFilterChange: (filters: any) => void
    showClothesTypeFilter?: boolean
  }) => (
    <div className="main-content">
      <div className="products-section">
        <h2 className="section-title">{title}</h2>
        <TrendClothes 
          products={filteredItems} 
          addToBasket={handleAddToBasket}
        />
      </div>
      
      <div className="filter-section">
        <FilterSearch 
          items={items} 
          onFilterChange={onFilterChange}
          showClothesTypeFilter={showClothesTypeFilter}
        />
      </div>
    </div>
  )

  return (
    <Router>
      <Header basket={basket} />
      <Routes>
        <Route path='/' element={
          <>
            <Slider />
            <div className="trends-section">
              <h2 className="section-title">Хиты</h2>
              <TrendClothes 
                products={specialItems} 
                showAllSpecialsButton={true} 
                addToBasket={handleAddToBasket}
              />
            </div>
            <News />
            <Feedback />
          </>
        } />

        <Route path='/sale' element={
          <>
            <div className="trends-section">
              <h2 className="section-title">Спецпредложения</h2>
              <TrendClothes 
                products={specialItems} 
                showAllSpecialsButton={true} 
                link={false}
                addToBasket={handleAddToBasket}
              />
            </div>
          </>
        } />
        
        <Route path='/clothes' element={
          <FilterablePage 
            title="Вся одежда"
            items={clothesList}
            filteredItems={filteredClothes}
            onFilterChange={handleClothesFilter}
            showClothesTypeFilter={true}
          />
        } />
        
        <Route path='/bags' element={
          <FilterablePage 
            title="Все Сумки"
            items={bagsList}
            filteredItems={filteredBags}
            onFilterChange={handleBagsFilter}
          />
        } />
        
        <Route path='/shoes' element={
          <FilterablePage 
            title="Вся обувь"
            items={shoesList}
            filteredItems={filteredShoes}
            onFilterChange={handleShoesFilter}
          />
        } />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App