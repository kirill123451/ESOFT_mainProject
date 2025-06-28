import './Basket.css'
import type { clotheList } from "../../ClothesList"
import { useEffect } from 'react'

interface BasketItem {
  product: clotheList
  quantity: number
}

interface HeaderProps {
  basket: BasketItem[]
  setBasket: (newBasket: BasketItem[]) => void
}

function Basket({ basket, setBasket }: HeaderProps) {
  useEffect(() => {
    const savedBasket = localStorage.getItem('basket')
    if (savedBasket) {
      try {
        const parsed = JSON.parse(savedBasket)
        if (Array.isArray(parsed)) {
          setBasket(parsed)
        }
      } catch (e) {
        console.error('Ошибка загрузки корзины:', e)
        localStorage.removeItem('basket')
      }
    }
  }, [setBasket])

  useEffect(() => {
    if (basket.length > 0) {
      localStorage.setItem('basket', JSON.stringify(basket))
    } else {
      localStorage.removeItem('basket')
    }
  }, [basket])

  function deleteFromBasket(productToDelete: clotheList) {
    const updatedBasket = basket.filter(
      (item) => item.product.individualName !== productToDelete.individualName
    )
    setBasket(updatedBasket)
  }

  function updateQuantity(product: clotheList, newQuantity: number) {
    if (newQuantity < 1) newQuantity = 1

    const updatedBasket = basket.map(item => 
      item.product.individualName === product.individualName
        ? { ...item, quantity: newQuantity }
        : item
    )
    
    setBasket(updatedBasket)
  }

  function clearBasket() {
    setBasket([])
    localStorage.removeItem('basket')
  }

  function handleCheckout() {
    alert('Спасибо за заказ!')
    clearBasket()
  }

  const total = basket.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)

  return (
    <div className='basketContainer'>
      {basket.length === 0 ? (
        <p className='emptyMessage'>Ваша корзина пуста</p>
      ) : (
        <>
          <button onClick={clearBasket} className='clearAllBtn'>
            Очистить корзину
          </button>

          {basket.map((item) => (
            <div key={item.product.id} className='itemCard'>
              <img 
                src={item.product.img} 
                alt={item.product.individualName} 
                className='itemImage'
              />
              
              <div className='itemDetails'>
                <h3 className='itemName'>{item.product.individualName}</h3>
                <p className='itemBrand'>{item.product.brand}</p>
                <p className='itemPrice'>
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
            <button onClick={handleCheckout} className='orderBtn'>
              Оформить заказ
            </button>
            <p className='totalText'>Итого: {total} ₽</p>
          </div>
        </>
      )}
    </div>
  )
}

export default Basket