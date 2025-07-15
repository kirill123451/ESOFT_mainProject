import { Link } from 'react-router-dom';
import SearchField from './SearchField';
import { FiShoppingBag, FiUser, FiLogOut } from 'react-icons/fi';
import type { BasketItem, UserData } from './types';
import './Header.css';

interface HeaderProps {
  basket?: BasketItem[];
  isAuthenticated: boolean;
  onLogout: () => void;
  userData?: UserData;
}

function Header({ basket = [], isAuthenticated, onLogout, userData }: HeaderProps) {
  const totalItems = basket.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="vintage-header">
      <div className="header-content">
        <div className="header-title">
          <Link to="/">Евгения</Link>
        </div>
        
        <div className="header-navigation">
          <nav className="nav-links">
            <Link to="/">Главная</Link>
            <Link to="/clothes">Одежда</Link>
            <Link to="/bags">Сумки</Link>
            <Link to="/shoes">Обувь</Link>
            <Link to="/sale" className="sale-link">SALE</Link>
            <Link to="/contacts">Контакты</Link>
          </nav>
          
          <div className="header-actions">
            <div className="search-wrapper">
              <SearchField userData={userData} />
            </div>
            
            <div className="user-actions">
              {isAuthenticated ? (
                <>
                  <Link to="/profile" className="user-icon">
                    <FiUser size={16} />
                    {userData?.role === 'ADMIN' && <span className="admin-indicator"></span>}
                  </Link>
                  <button className="logout-btn" onClick={onLogout}>
                    <FiLogOut size={16} />
                  </button>
                </>
              ) : (
                <Link to="/AuthForm" className="auth-link">Войти</Link>
              )}
              
              <Link to="/basket" className="basket-icon">
                <FiShoppingBag size={18} />
                {totalItems > 0 && (
                  <span className="basket-count">{totalItems}</span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;