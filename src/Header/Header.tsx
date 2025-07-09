import { Link } from 'react-router-dom'
import './Header.css'
import SearchField from './SearchField'
import { FiShoppingBag, FiUser, FiLogOut } from 'react-icons/fi'

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
  isAuthenticated: boolean
  onLogout: () => void
}

function Header({ basket = [], isAuthenticated, onLogout }: HeaderProps) {
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
          <span><Link to="/contacts">Контакты</Link></span>
          
          {isAuthenticated ? (
            <>
              <span className="user-icon">
                <Link to="/profile"><FiUser size={16} /></Link>
              </span>
              <span className="logout-btn" onClick={onLogout}>
                <FiLogOut size={16} />
              </span>
            </>
          ) : (
            <span><Link to="/AuthForm">Войти</Link></span>
          )}
          
          <div className="search-container">
            <SearchField />
          </div>
          
          <div className="basket-icon">
            <Link to="/basket">
              <FiShoppingBag size={18} />
              {totalItems > 0 && (
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
