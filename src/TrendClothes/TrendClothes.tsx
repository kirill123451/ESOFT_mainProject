import './TrendClothes.css';
import { useState } from 'react';
import type { clotheList } from '../ClothesList';
import { Link } from 'react-router-dom';

interface TrendClothesProps {
  products?: clotheList[];
  showAllSpecialsButton?: boolean;
  link?: boolean;
  addToBasket?: (product: clotheList, quantity: number) => void;
}

export default function TrendClothes({ 
  products = [], 
  showAllSpecialsButton = false, 
  link = true, 
  addToBasket 
}: TrendClothesProps) {
  const [hoveredProductId, setHoveredProductId] = useState<number | null>(null);
  const [quantities, setQuantities] = useState<{ [id: number]: number }>({});

  if (products.length === 0) {
    return <div className="season-trends">Нет товаров для отображения</div>;
  }

  const hasSpecialItems = products.some(product => product.isSpecial);

  const handleAddToCart = (product: clotheList, e: React.MouseEvent) => {
    e.stopPropagation();
    if (addToBasket) {
      const quantity = quantities[product.id] || 1;
      addToBasket(product, quantity);
    }
  };

  const updateQuantity = (productId: number, change: number) => {
    setQuantities(prev => {
      const current = prev[productId] || 1;
      const newQuantity = Math.max(current + change, 1);
      return {
        ...prev,
        [productId]: newQuantity
      };
    });
  };

  return (
    <div className="season-trends">
      <div className="products-grid">
        {products.map((product) => {
          const currentQuantity = quantities[product.id] || 1;
          const isHovered = hoveredProductId === product.id;
          
          return (
            <div
              key={product.id}
              className={`product-card ${isHovered ? 'show-details' : ''}`}
              onMouseEnter={() => setHoveredProductId(product.id)}
              onMouseLeave={() => setHoveredProductId(null)}
            >
              {product.isSpecial && (
                <div className="special-badge">Спецпредложение</div>
              )}
              
              <img 
                src={product.img} 
                alt={product.individualName || 'Одежда'} 
                className='product-image' 
              />
              
              <h3 className="product-title">{product.individualName}</h3>
              <p className="product-price">{product.price} ₽</p>

              {isHovered && (
                <div className='product-details'>
                  <div className='detail-row'>
                    <span>Артикул</span>
                    <span> Артикул </span>
                  </div>
                  
                  <div className='detail-row'>
                    <span>Производитель</span>
                    <span>{product.brand || 'Не указан'}</span>
                  </div>
                  
                  <div className='detail-row'>
                    <span>Материал</span>
                    <span>{product.material || 'Не указан'}</span>
                  </div>

                  <div className='product-actions'>
                    <div className='quantity-selector'>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateQuantity(product.id, -1);
                        }}
                        aria-label="Уменьшить количество"
                      >
                        −
                      </button>
                      
                      <span>{currentQuantity}</span>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateQuantity(product.id, 1);
                        }}
                        aria-label="Увеличить количество"
                      >
                        +
                      </button>
                      
                      <span>шт</span>
                    </div>
                    
                    <button 
                      className='buy-button'
                      onClick={(e) => handleAddToCart(product, e)}
                      aria-label={`Добавить ${product.individualName} в корзину`}
                    >
                      Купить
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showAllSpecialsButton && hasSpecialItems && link && (
        <div className="view-all-specials-container">
          <Link to="/sale" className="view-all-specials-button">
            Все спецпредложения →
          </Link>
        </div>
      )}
    </div>
  );
}