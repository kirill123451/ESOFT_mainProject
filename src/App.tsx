import { useState, useEffect } from 'react'
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom'
import FilterSearch from './FilterSearch/FilterSearchClothes'
import Header from './Header/Header'
import News from './News/News'
import Slider from './slider/Slider'
import TrendClothes from './TrendClothes/TrendClothes'
import './App.css'
import Feedback from './Feedback/Feedback'
import Footer from './Footer/Footer'
import Basket from './Header/Basket/Basket'
import Brands from './Brands/Brands'
import AuthForm from './AuthForm/AuthForm'
import ProductPage from './ProductPage/ProductPage'
import axios from 'axios'
import Profile from './Profile/Profile'

interface BasketItem {
  product: any
  quantity: number
}

interface Product {
  id: number
  individualName: string
  type?: string
  gender: string
  color: string
  material: string
  brand: string
  price: number
  imgUrl: string
  isSpecial: boolean
  productType?: 'clothes' | 'shoes' | 'bags'
}

function App() {
  const [basket, setBasket] = useState<BasketItem[]>([])
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [authChecked, setAuthChecked] = useState<boolean>(false)
  const [specialProducts, setSpecialProducts] = useState<Product[]>([])
  const [loadingSpecialProducts, setLoadingSpecialProducts] = useState(true)
  const [userData, setUserData] = useState({
  email: '',
  name: '',
  role: 'USER',
  id: ''
});


  useEffect(() => {
  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setAuthChecked(true);
      return;
    }
    
    try {
      const response = await fetch('http://localhost:3000/auth/validate-token', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!response.ok) {
        throw new Error('Invalid token');
      }
      
      const data = await response.json();
      
      if (data.isValid && data.user) {
        setIsAuthenticated(true)
        setUserData({ 
          email: data.user.email,
          name: data.user.name || '',
          role: data.user.role || 'USER',
          id: data.user.id
        });
      } else {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('token');
      setIsAuthenticated(false);
    } finally {
      setAuthChecked(true);
    }
  };
  
  checkAuth();
}, []);

  useEffect(() => {
    const loadSpecialProducts = async () => {
      try {
        setLoadingSpecialProducts(true);
        const response = await axios.get('http://localhost:3000/product/special-offers')
        setSpecialProducts(response.data);
      } catch (err) {
        console.error('Ошибка загрузки спецпредложений:', err);
      } finally {
        setLoadingSpecialProducts(false);
      }
    };
    loadSpecialProducts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
    window.location.href = '/'
  }

  const handleAddToBasket = (product: Product, quantity: number) => {
    setBasket(prev => {
      const existingItem = prev.find(item => item.product.id === product.id)
      return existingItem
        ? prev.map(item => item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item)
        : [...prev, { product, quantity }]
    })
  }

  if (!authChecked) {
    return <div className="loading-screen">Проверка авторизации...</div>
  }

  return (
    <Router>
      <Header basket={basket} isAuthenticated={isAuthenticated} onLogout={handleLogout} userData={userData} />
      <Routes>
        <Route path='/' element={
          <>
            <Slider />
            <div className="trends-section">
              <h2 className="section-title">Хиты</h2>
              <TrendClothes 
                products={specialProducts}
                showAllSpecialsButton={true} 
                addToBasket={handleAddToBasket}
              />
            </div>
            <News />
            <Feedback />
          </>
        } />
        <Route path='/basket' element={
          isAuthenticated ? <Basket basket={basket} setBasket={setBasket} userData={userData} /> : <Navigate to="/AuthForm" replace />
        } />
        <Route path='/profile' element={
          isAuthenticated ? <Profile userData = {userData} /> : <Navigate to="/AuthForm" replace />
        } />
        <Route path='/brands' element={<Brands />} />
        <Route path='/AuthForm' element={
          isAuthenticated ? <Navigate to="/" replace /> : <AuthForm setIsAuthenticated={setIsAuthenticated} />
        } />
        <Route path='/contacts' element={<Feedback />} />
        <Route path='/product/:id' element={<ProductPage addToBasket={handleAddToBasket} />} />
        <Route path='/sale' element={
          <div className="trends-section">
            <h2 className="section-title">Спецпредложения</h2>
            <TrendClothes showAllSpecialsButton={false} addToBasket={handleAddToBasket} products={specialProducts}/>
          </div>
        } />
        <Route path='/clothes' element={
          <ProductsPage 
            title="Вся одежда"
            productType="clothes"
            addToBasket={handleAddToBasket}
            showClothesTypeFilter={true}
          />
        } />
        <Route path='/bags' element={
          <ProductsPage 
            title="Все сумки"
            productType="bags"
            addToBasket={handleAddToBasket}
          />
        } />
        <Route path='/shoes' element={
          <ProductsPage 
            title="Вся обувь"
            productType="shoes"
            addToBasket={handleAddToBasket}
          />
        } />
      </Routes>
      <Footer />
    </Router>
  )
}

interface ProductsPageProps {
  title: string
  productType: 'clothes' | 'shoes' | 'bags'
  addToBasket: (product: Product, quantity: number) => void
  showClothesTypeFilter?: boolean
}

function ProductsPage({ title, productType, addToBasket, showClothesTypeFilter = false }: ProductsPageProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`http://localhost:3000/product/full/${productType}`)
        setProducts(response.data)
        setError(null)
      } catch (err) {
        console.error(`Ошибка загрузки ${productType}:`, err)
        setError('Не удалось загрузить товары')
      } finally {
        setLoading(false)
      }
    }
    
    loadProducts()
  }, [productType])

  const handleFilter = async (filters: any) => {
    try {
      const params = new URLSearchParams()
      params.append('type', productType)
      
      if (filters.priceRange) {
        params.append('minPrice', filters.priceRange[0])
        params.append('maxPrice', filters.priceRange[1])
      }
      
      if (filters.brands?.length) {
        filters.brands.forEach((brand: string) => {
          params.append('brands', brand)
        })
      }
      
      if (filters.materials?.length) {
        filters.materials.forEach((material: string) => {
          params.append('material', material)
        })
      }
      
      if (filters.clothesType?.length && productType === 'clothes') {
        filters.clothesType.forEach((type: string) => {
          params.append('clothesType', type)
        })
      }

      const response = await axios.get('http://localhost:3000/product/filter', { params })
      setProducts(response.data)
      setError(null)
    } catch (err) {
      console.error(`Ошибка фильтрации ${productType}:`, err)
      setError('Ошибка при фильтрации товаров')
    }
  }

  if (loading) {
    return <div className="loading-screen">Загрузка товаров...</div>
  }

  if (error) {
    return <div className="error-message">{error}</div>
  }

  return (
    <div className="main-content">
      <div className="products-section">
        <h2 className="section-title">{title}</h2>
        <TrendClothes 
          products={products}
          addToBasket={addToBasket}
          productType={productType}
        />
      </div>
      <div className="filter-section">
        <FilterSearch 
          items={products} 
          onFilterChange={handleFilter}
          showClothesTypeFilter={showClothesTypeFilter}
        />
      </div>
    </div>
  )
}

export default App