import { useEffect } from 'react';
import type { BasketItem, Product, UserData } from '../types'
import './Basket.css';
import axios from 'axios';

interface BasketProps {
  basket: BasketItem[];
  setBasket: (newBasket: BasketItem[]) => void;
  userData?: UserData;
}

function Basket({ basket, setBasket, userData }: BasketProps) {
  useEffect(() => {
    const savedBasket = localStorage.getItem('basket');
    if (savedBasket) {
      try {
        const parsed = JSON.parse(savedBasket);
        if (Array.isArray(parsed)) {
          setBasket(parsed);
        }
      } catch (e) {
        console.error('Ошибка загрузки корзины:', e);
        localStorage.removeItem('basket');
      }
    }
  }, [setBasket]);

  useEffect(() => {
    if (basket.length > 0) {
      localStorage.setItem('basket', JSON.stringify(basket));
    } else {
      localStorage.removeItem('basket');
    }
  }, [basket]);

  function deleteFromBasket(productToDelete: Product) {
    const updatedBasket = basket.filter(
      (item) => item.product.id !== productToDelete.id
    );
    setBasket(updatedBasket);
  }

  function updateQuantity(product: Product, newQuantity: number) {
    if (newQuantity < 1) newQuantity = 1;

    const updatedBasket = basket.map(item => 
      item.product.id === product.id
        ? { ...item, quantity: newQuantity }
        : item
    );
    
    setBasket(updatedBasket);
  }

  function clearBasket() {
    setBasket([]);
    localStorage.removeItem('basket');
  }

  async function handleCheckout() {
    if (!userData) {
      alert('Для оформления заказа необходимо авторизоваться');
      return;
    }
    
    try {
      const orderData = {
        userId: userData.id,
        items: basket.map(item => ({
          productId: item.product.id,
          quantity: item.quantity,
          price: item.product.price
        })),
        total: total
      };

      const response = await axios.post('http://localhost:3000/api/orders', orderData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      alert(`Спасибо за заказ, ${userData.name || userData.email}! Номер вашего заказа: #${response.data.orderId}`);
      clearBasket();
    } catch (error) {
      console.error('Ошибка оформления заказа:', error);
      alert('Произошла ошибка при оформлении заказа');
    }
  }

  const total = basket.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return (
    <div className='basketContainer'>
      {basket.length === 0 ? (
        <p className='emptyMessage'>Ваша корзина пуста</p>
      ) : (
        <>
          <div className="basket-header">
            {userData && (
              <div className="user-info">
                <span>Покупатель: {userData.name || userData.email}</span>
                {userData.role === 'ADMIN' && (
                  <span className="admin-badge">ADMIN</span>
                )}
              </div>
            )}
            <button onClick={clearBasket} className='clearAllBtn'>
              Очистить корзину
            </button>
          </div>

          {basket.map((item) => (
            <div key={item.product.id} className='itemCard'>
              <img 
                src={item.product.imgUrl} 
                alt={item.product.individualName} 
                className='itemImage'
              />
              
              <div className='itemDetails'>
                <h3 className='itemName'>
                  {item.product.individualName}
                  {item.product.isSpecial && <span className="sale-tag">SALE</span>}
                </h3>
                <p className='itemBrand'>{item.product.brand}</p>
                <p className={`itemPrice ${item.product.isSpecial ? 'special-price' : ''}`}>
                  {item.product.price * item.quantity} ₽ ({item.quantity} шт.)
                </p>
                
                <div className='quantityControls'>
                  <button 
                    onClick={() => updateQuantity(item.product, item.quantity - 1)}
                    className='quantityBtn'
                  >
                    -
                  </button>
                  <span className='quantityValue'>{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.product, item.quantity + 1)}
                    className='quantityBtn'
                  >
                    +
                  </button>
                </div>
                
                <button 
                  onClick={() => deleteFromBasket(item.product)}
                  className='removeBtn'
                >
                  Удалить
                </button>
              </div>
            </div>
          ))}

          <div className='totalSection'>
            <p className='totalText'>Итого: {total} ₽</p>
            <button onClick={handleCheckout} className='orderBtn'>
              Оформить заказ
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Basket;  