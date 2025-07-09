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

  const getProductType = (product: any): string => {
    if (product.clothesType) return product.clothesType
    if (product.shoesType) return product.shoesType
    if (product.bagsType) return product.bagsType
    return 'Неизвестный тип';
  };

  const handleDecreaseQuantity = () => {
    setSelectedQuantity(prev => Math.max(1, prev - 1));
  };

  const handleIncreaseQuantity = () => {
    setSelectedQuantity(prev => prev + 1);
  };

  const handleAddToBasket = () => {
    addToBasket(product, selectedQuantity)
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
        
        <div className="pp-product-price">{product.price.toLocaleString('ru-RU')} ₽</div>
        
        <div className="pp-product-meta">
          <div className="pp-meta-item">
            <span className="pp-meta-label">Тип:</span>
            <span className="pp-meta-value">{getProductType(product)}</span>
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