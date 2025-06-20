import './TrendClothes.css'
import { useState } from 'react'
import type { clotheList } from '../ClothesList'


interface TrendClothesProps {
  products?: clotheList[];
}

export default function TrendClothes({ products = [] }: TrendClothesProps) {
  const [select, setSelect] = useState<number | null>(null);
  const [quantities, setQuantities] = useState<{ [id: number]: number }>({});

  if (products.length === 0) {
    return <div className="season-trends">Нет товаров для отображения</div>;
  }

  return (
    <div className="season-trends">
      <div className="products-grid">
        {products.map((product) => {
          const currentQuantity = quantities[product.id] || 1;
          return (
            <div
              key={product.id}
              className={`product-card ${select === product.id ? 'show-details' : ''}`}
              onMouseEnter={() => setSelect(product.id)}
              onMouseLeave={() => setSelect(null)}
            >
              {product.isSpecial && (
                <div className="special-badge">Спецпредложение</div>
              )}
              <img src={product.img} alt='Одежда' className='product-image' />
              <h3 className="product-title">{product.individualName}</h3>
              <p className="product-price">{product.price}</p>

              {select === product.id && (
                <div className='product-details'>
                  <div className='detail-row'>
                    <span>Артикул</span>
                    <span>Артикул</span>
                  </div>
                  <div className='detail-row'>
                    <span>Производитель</span>
                    <span>{product.brand}</span>
                  </div>
                  <div className='detail-row'>
                    <span>Материал</span>
                    <span>{product.material}</span>
                  </div>

                  <div className='product-actions'>
                    <div className='quantity-selector'>
                      <button
                        onClick={() =>
                          setQuantities(prev => {
                            const current = prev[product.id] || 1;
                            return {
                              ...prev,
                              [product.id]: Math.max(current - 1, 1)
                            };
                          })
                        }
                      >
                        -
                      </button>
                      <span>{currentQuantity}</span>
                      <button
                        onClick={() =>
                          setQuantities(prev => {
                            const current = prev[product.id] || 1;
                            return {
                              ...prev,
                              [product.id]: current + 1
                            };
                          })
                        }
                      >
                        +
                      </button>
                      <span>шт</span>
                    </div>
                    <button className='buy-button'>Купить</button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}