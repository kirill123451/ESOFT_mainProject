import { useState } from 'react'
import FilterSearch from './FilterSearch/FilterSearchClothes'
import Header from './Header/Header'
import News from './News/News'
import Slider from './slider/Slider'
import TrendClothes from './TrendClothes/TrendClothes'
import { clothesList } from './ClothesList'
import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Feedback from './Feedback/Feedback'
import Footer from './Footer/Footer'

function App() {
  const [filteredProducts, setFilteredProducts] = useState(clothesList)

  const handleFilterChange = (filters: {
    priceRange: [number, number]
    brands: string[]
    materials: string[]
  }) =>{
  const filteredList = clothesList.filter(item => {
    const brandMatch = filters.brands.length === 0 || filters.brands.includes(item.brand)
    const materialMatch = filters.materials.length === 0 || filters.materials.includes(item.material)
    const priceInRange = item.price >= filters.priceRange[0] && item.price <= filters.priceRange[1] 
    return priceInRange && brandMatch && materialMatch
  })
    setFilteredProducts(filteredList)
  }

  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element= {
              <>
              <Slider />
              <div className="trends-section">
                <h2 className="section-title">Хиты</h2>
                <TrendClothes products={clothesList.filter(item => item.isSpecial)} />
              </div>
              <News />
              <Feedback />
              </>
        } />
        <Route path='/clothes' element = {
            <div className="main-content">
              <div className="products-section">
                <h2 className="section-title">Вся одежда</h2>
                <TrendClothes products={filteredProducts} />
              </div>
              
              <div className="filter-section">
                <FilterSearch onFilterChange={handleFilterChange} />
              </div>
            </div>
        } />
        <Route path='/bags' element = {
            <div className="main-content">
              <div className="products-section">
                <h2 className="section-title">Все Сумки</h2>
                <TrendClothes products={filteredProducts} />
              </div>
              
              <div className="filter-section">
                <FilterSearch onFilterChange={handleFilterChange} />
              </div>
            </div>
        } />
        <Route path='/shoes' element = {
            <div className="main-content">
              <div className="products-section">
                <h2 className="section-title">Вся обувь</h2>
                <TrendClothes products={filteredProducts} />
              </div>
              
              <div className="filter-section">
                <FilterSearch onFilterChange={handleFilterChange} />
              </div>
            </div>
        } />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
