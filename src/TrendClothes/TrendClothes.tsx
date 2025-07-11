import { Link } from 'react-router-dom';
import { useState } from 'react';
import './TrendClothes.css';

interface Product {
  id: number;
  individualName: string;
  clothesType?: string;
  shoesType?: string;
  bagsType?: string;
  gender: string;
  color: string;
  material: string;
  brand: string;
  price: number;
  imgUrl: string;
  isSpecial: boolean;
}

interface TrendClothesProps {
  products: Product[];
  showAllSpecialsButton?: boolean;
  addToBasket?: (product: Product, quantity: number) => void;
  appliedFilters?: any;
  productType?: 'clothes' | 'shoes' | 'bags'
}

export default function TrendClothes({ 
  products = [], 
  showAllSpecialsButton = false,
  addToBasket,  
  appliedFilters
}: TrendClothesProps) {
  const [hoveredProductId, setHoveredProductId] = useState<number | null>(null);
  const [quantities, setQuantities] = useState<{ [id: number]: number }>({});

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    if (addToBasket) {
      const quantity = quantities[product.id] || 1;
      addToBasket(product, quantity);
    }
  };

  const changeQuantity = (productId: number, amount: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) + amount)
    }));
  };

  if (products.length === 0) {
    return <div className="season-trends">Нет товаров для отображения</div>;
  }

  return (
    <div className="season-trends">
      <div className="products-grid">
        {products.map(product => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className={`product-card ${hoveredProductId === product.id ? 'show-details' : ''}`}
            onMouseEnter={() => setHoveredProductId(product.id)}
            onMouseLeave={() => setHoveredProductId(null)}
          >
            {product.isSpecial && (
              <div className="special-badge">Спецпредложение</div>
            )}

            <img 
              src={product.imgUrl} 
              alt={product.individualName} 
              className="product-image" 
            />

            <h3 className="product-title">{product.individualName}</h3>
            <p className="product-price">{product.price} ₽</p>

            {hoveredProductId === product.id && (
              <div className="product-details">
                <div className="detail-row">
                  <span>Бренд:</span>
                  <span>{product.brand || 'Не указан'}</span>
                </div>
                <div className="detail-row">
                  <span>Цвет:</span>
                  <span>{product.color || 'Не указан'}</span>
                </div>
                <div className="detail-row">
                  <span>Материал:</span>
                  <span>{product.material || 'Не указан'}</span>
                </div>

                {addToBasket && (
                  <div className="product-actions">
                    <div className="quantity-selector">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          changeQuantity(product.id, -1);
                        }}
                      >
                        -
                      </button>
                      <span>{quantities[product.id] || 1}</span>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          changeQuantity(product.id, 1);
                        }}
                      >
                        +
                      </button>
                    </div>
                    <button 
                      className="buy-button"
                      onClick={(e) => handleAddToCart(product, e)}
                    >
                      Купить
                    </button>
                  </div>
                )}
              </div>
            )}
          </Link>
        ))}
      </div>
        
      {showAllSpecialsButton && products.some(p => p.isSpecial) && (
        <div className="view-all-specials-container">
          <Link to="/sale" className="view-all-specials-button">
            Все спецпредложения →
          </Link>
        </div>
      )}
    </div>
  );
}
