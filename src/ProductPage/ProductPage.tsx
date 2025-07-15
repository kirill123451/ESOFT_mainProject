import { useParams } from 'react-router-dom';
import './ProductPage.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface ProductPageProps {
  addToBasket: (product: any, quantity: number) => void
}

const ProductPage: React.FC<ProductPageProps> = ({ addToBasket }) => {
  const { id } = useParams<{ id: string }>()
  const productId = id ? parseInt(id) : null

  const [product, setProduct] = useState<any | null>('')
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>('')

  useEffect(() => {
    if (!productId) {
      setError('Неверный ID товара')
      setLoading(false)
      return
    }

    axios.get(`http://localhost:3000/product/${productId}`)
      .then(res => {
        setProduct(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Ошибка при запросе:', err)
        setError(err.response?.data?.error || err.message)
        setLoading(false)
      });
  }, [productId])

  if (loading) return <div className="pp-product-not-found">Загрузка...</div>
  if (error) return <div className="pp-product-not-found">Ошибка: {error}</div>
  if (!product) return <div className="pp-product-not-found">Товар не найден</div>

  const handleDecreaseQuantity = () => {
    setSelectedQuantity(prev => Math.max(1, prev - 1));
  };

  const handleIncreaseQuantity = () => {
    setSelectedQuantity(prev => prev + 1);
  };

  const handleAddToBasket = () => {
    addToBasket(product, selectedQuantity)
  };

  const renderStarRating = () => {
    return (
      <div className="pp-rating-stars">
        <svg className="pp-star pp-star-full" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 
          2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
        <svg className="pp-star pp-star-full" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 
          2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
        <svg className="pp-star pp-star-full" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 
          2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
        <svg className="pp-star pp-star-full" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 
          2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
        <svg className="pp-star pp-star-half" viewBox="0 0 24 24">
          <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.
          82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4V6.1l1.71 
          4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/>
        </svg>
        <span className="pp-rating-value">8/10</span>
      </div>
    );
  };

  return (
    <div className="pp-product-page">
      <div className="pp-product-images">
        <img 
          src={product.imgUrl} 
          alt={product.individualName} 
          className="pp-main-image" 
        />
      </div>
      
      <div className="pp-product-details">
        <h1 className="pp-product-title">{product.individualName}</h1>
        
        <div className="pp-product-brand">{product.brand}</div>
        
        <div className="pp-product-rating">
          {renderStarRating()}
        </div>
        
        <div className="pp-product-price">{product.price.toLocaleString('ru-RU')} ₽</div>
        
        <div className="pp-product-meta">
          <div className="pp-meta-item">
            <span className="pp-meta-label">Тип:</span>
            <span className="pp-meta-value">{product.product_type}</span>
          </div>
          <div className="pp-meta-item">
            <span className="pp-meta-label">Пол:</span>
            <span className="pp-meta-value">{product.gender}</span>
          </div>
          <div className="pp-meta-item">
            <span className="pp-meta-label">Цвет:</span>
            <span className="pp-meta-value">{product.color}</span>
          </div>
          <div className="pp-meta-item">
            <span className="pp-meta-label">Материал:</span>
            <span className="pp-meta-value">{product.material}</span>
          </div>
        </div>
        
        <div className="pp-quantity-selector">
          <button 
            onClick={handleDecreaseQuantity}
            className="pp-quantity-btn"
            aria-label="Уменьшить количество"
          >
            -
          </button>
          <span className="pp-quantity-value">{selectedQuantity}</span>
          <button 
            onClick={handleIncreaseQuantity}
            className="pp-quantity-btn"
            aria-label="Увеличить количество"
          >
            +
          </button>
        </div>
        
        <button 
          className="pp-add-to-basket-btn"
          onClick={handleAddToBasket}
          aria-label="Добавить в корзину"
        >
          Добавить в корзину
        </button>
        
        <div className="pp-product-description">
          <h3>Описание</h3>
          <p>Здесь будет подробное описание товара, его особенности и характеристики.</p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;