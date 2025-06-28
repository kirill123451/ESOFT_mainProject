import { useState } from 'react';
import './Login.css';

function Login() {
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [email, setEmail] = useState('')

  const handleForgotPassword = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setShowForgotPassword(true)
  };

  const handleBackToLogin = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setShowForgotPassword(false)
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        {showForgotPassword ? (
          <>
            <h2 className="login-header">Восстановление пароля</h2>
            <form className="login-form">
              <div className="input-field">
                <label>Email</label>
                <input 
                  type="email" 
                  placeholder="Введите ваш email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <button type="submit" className="submit-btn">Отправить ссылку</button>
              
              <p className="forgot-link">
                <a href="#" onClick={handleBackToLogin}>← Вернуться к входу</a>
              </p>
            </form>
          </>
        ) : (
          <>
            <h2 className="login-header">Пожалуйста, авторизуйтесь</h2>
            <form className="login-form">
              <div className="input-field">
                <label>Логин</label>
                <input type="text" placeholder="Введите ваш логин" />
              </div>
              
              <div className="input-field">
                <label>Пароль</label>
                <input type="password" placeholder="Введите ваш пароль" />
              </div>
              
              <div className="remember-block">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Запомнить меня на этом компьютере</label>
              </div>
              
              <button type="submit" className="submit-btn">Войти</button>
              
              <p className="forgot-link">
                <a href="#" onClick={handleForgotPassword}>Забыли свой пароль?</a>
              </p>
            </form>
            
          </>
        )}
      </div>
    </div>
  );
}

export default Login;