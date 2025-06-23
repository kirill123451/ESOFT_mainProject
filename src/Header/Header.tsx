import { Link } from 'react-router-dom'
import './Header.css'
import SearchField from './SearchField'
import { FiShoppingBag } from 'react-icons/fi'

interface BasketItem {
  product: {
    id: number
    name: string
    price: number
  }
  quantity: number
}

interface HeaderProps {
  basket?: BasketItem[]
}

function Header({ basket = [] }: HeaderProps) {
  const totalItems = basket.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="vintage-header">
      <div className="header-content">
        <div className="header-title">
          <Link to="/">Евгения</Link>
        </div>
        
        <div className="header-text">
          <span><Link to="/">Главная</Link></span>
          <span><Link to="/clothes">Одежда</Link></span>
          <span><Link to="/bags">Сумки</Link></span>
          <span><Link to="/shoes">Обувь</Link></span>
          <span><Link to="/sale">SALE</Link></span>
          <span>Бренды</span>
          <span>Контакты</span>
          <span>Личный кабинет</span>
          
          <div className="search-container">
            <SearchField />
          </div>
          
          <div className="basket-icon">
            <Link to="/basket"> <FiShoppingBag size={18} /> {totalItems > 0 && (
                <span className="basket-count">{totalItems}</span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
