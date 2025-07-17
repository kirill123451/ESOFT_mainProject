import { useState, useEffect, useRef, useCallback } from "react"
import { Link } from "react-router-dom"
import axios from 'axios'
import type { Product } from './types'
import './SearchField.css'

interface SearchFieldProps {
  userData?: {
    role: 'USER' | 'ADMIN'
  }
}

function SearchField({ userData }: SearchFieldProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const searchRef = useRef<HTMLDivElement>(null)

  const searchProducts = useCallback(async (term: string) => {
    if (term.trim() === '') {
      setResults([])
      return
    }

    setIsLoading(true)
    setError(null)
    
    try {
  const response = await axios.get<Product[]>('http://localhost:3000/product', {
    params: {
      search: term,
      limit: 5
    }
  })

  if (response.data && Array.isArray(response.data)) {
    setResults(response.data)
  } else {
    setResults([])
    setError('Некорректный формат данных')
  }
} catch (err) {
  console.error('Ошибка поиска:', err)
  setResults([])
  setError('Ошибка при загрузке данных')
} finally {
  setIsLoading(false)
}
  }, [])

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      searchProducts(searchTerm)
    }, 300)

    return () => clearTimeout(debounceTimer)
  }, [searchTerm, searchProducts])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const renderResults = () => {
    if (error) {
      return <div className="no-results">{error}</div>
    }

    if (isLoading) {
      return <div className="search-loading">Поиск...</div>
    }

    if (!Array.isArray(results) || results.length === 0) {
      return <div className="no-results">Ничего не найдено</div>
    }

    return results.map(product => (
      <Link 
        key={product.id} 
        to={`/product/${product.id}`} 
        className="search-result-item"
        onClick={() => {
          setSearchTerm('')
          setIsFocused(false)
        }}
      >
        <img 
          src={product.imgUrl || '/images/placeholder.jpg'} 
          alt={product.individualName} 
          className="result-image" 
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/placeholder.jpg'
          }}
        />
        <div className="result-info">
          <h4 className="result-title">
            {product.individualName}
            {product.isSpecial && <span className="sale-badge">SALE</span>}
          </h4>
          <div className="result-meta">
            <span className="result-brand">{product.brand}</span>
            <span className={`result-price ${product.isSpecial ? 'special-price' : ''}`}>
              {product.price} ₽
            </span>
          </div>
        </div>
      </Link>
    ))
  }

  return (
    <div className="search-field" ref={searchRef}>
      <input
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsFocused(true)}
        placeholder="Поиск товаров..."
        className="search-input"
        aria-label="Поиск товаров"
      />
      
      {(isFocused && searchTerm) && (
        <div className="search-results">
          {renderResults()}
        </div>
      )}
    </div>
  )
}

export default SearchField