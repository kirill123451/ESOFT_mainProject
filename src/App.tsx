import { useState, useEffect } from 'react'
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom'
import FilterSearch from './FilterSearch/FilterSearchClothes'
import Header from './Header/Header'
import News from './News/News'
import Slider from './slider/Slider'
import TrendClothes from './TrendClothes/TrendClothes'
import { clothesList } from './ClothesList'
import { shoesList } from './ShoesList'
import { bagsList } from './BagsList'
import './App.css'
import Feedback from './Feedback/Feedback'
import Footer from './Footer/Footer'
import Basket from './Header/Basket/Basket'
import Brands from './Brands/Brands'
import AuthForm from './AuthForm/AuthForm'
import ProductPage from './ProductPage/ProductPage'

interface BasketItem {
  product: any
  quantity: number
}

function App() {
  const [basket, setBasket] = useState<BasketItem[]>([])
  const [filteredClothes, setFilteredClothes] = useState(clothesList)
  const [filteredBags, setFilteredBags] = useState(bagsList)
  const [filteredShoes, setFilteredShoes] = useState(shoesList)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
    window.location.href = '/'
  }

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        setIsAuthenticated(false)
        return
      }

      try {
        const response = await fetch('http://localhost:3000/auth/validate-token', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        setIsAuthenticated(response.ok)
        if (!response.ok) localStorage.removeItem('token')
      } catch (error) {
        console.error('Auth check failed:', error)
        localStorage.removeItem('token')
        setIsAuthenticated(false)
      }
    }

    checkAuth()
  }, [])

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
    showClothesTypeFilter = false,
    productType
  }: {
    title: string
    items: any[]
    filteredItems: any[]
    onFilterChange: (filters: any) => void
    showClothesTypeFilter?: boolean
    productType?: 'clothes' | 'shoes' | 'bags'
  }) => (
    <div className="main-content">
      <div className="products-section">
        <h2 className="section-title">{title}</h2>
        <TrendClothes 
          products={filteredItems}
          addToBasket={handleAddToBasket}
          productType={productType}
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

  if (isAuthenticated === null) {
    return <div className="loading-screen">Загрузка...</div>
  }

  return (
    <Router>
      <Header basket={basket} isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path='/' element={
          <>
            <Slider />
            <div className="trends-section">
              <h2 className="section-title">Хиты</h2>
              <TrendClothes 
                showAllSpecialsButton={true} 
                addToBasket={handleAddToBasket}
              />
            </div>
            <News />
            <Feedback />
          </>
        } />

        <Route path='/basket' element={
          isAuthenticated 
            ? <Basket basket={basket} setBasket={setBasket} />
            : <Navigate to="/AuthForm" replace />
        } />

        <Route path='/brands' element={<Brands />} />

        <Route path='/AuthForm' element={
          isAuthenticated 
            ? <Navigate to="/" replace />
            : <AuthForm setIsAuthenticated={setIsAuthenticated} />
        } />
        
        <Route path='/contacts' element={
          <div className="feedback-route">
            <Feedback />
          </div>
        } />

        <Route path='/product/:id' element={
          <ProductPage addToBasket={handleAddToBasket} />
        } />

        <Route path='/sale' element={
          <>
            <div className="trends-section">
              <h2 className="section-title">Спецпредложения</h2>
              <TrendClothes 
                showAllSpecialsButton={true} 
                addToBasket={handleAddToBasket}
              />
            </div>
          </>
        } />
        
        <Route path='/clothes' element={
          <FilterablePage 
            title="Вся одежда"
            filteredItems={filteredClothes}
            onFilterChange={handleClothesFilter}
            showClothesTypeFilter={true}
            productType="clothes"
          />
        } />
        
        <Route path='/bags' element={
          <FilterablePage 
            title="Все Сумки"
            filteredItems={filteredBags}
            onFilterChange={handleBagsFilter}
            productType="bags"
          />
        } />
        
        <Route path='/shoes' element={
          <FilterablePage 
            title="Вся обувь"
            items={shoesList}
            filteredItems={filteredShoes}
            onFilterChange={handleShoesFilter}
            productType="shoes"
          />
        } />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App