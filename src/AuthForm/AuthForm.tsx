import { useState } from 'react'
import './AuthForm.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function AuthForm({ setIsAuthenticated }: { setIsAuthenticated: (value: boolean) => void }) {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      if (mode === 'forgot') {
        await axios.post('http://localhost:3000/auth/request-password-reset', { email })
        alert('Ссылка для сброса пароля отправлена на вашу почту')
        setMode('login')
        return
      }

      const endpoint = mode === 'login' ? '/auth/login' : '/auth/register'
      const payload = mode === 'login' 
        ? { email, password }
        : { email, password, name }

      const response = await axios.post(`http://localhost:3000${endpoint}`, payload)
      localStorage.setItem('token', response.data.token)
      setIsAuthenticated(true)
      navigate('/shoes')
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || 'Произошла ошибка')
      } else {
        setError('Произошла ошибка')
      }
    }
  }

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2 className="login-header">
          {mode === 'login' && 'Вход'}
          {mode === 'register' && 'Регистрация'}
          {mode === 'forgot' && 'Восстановление пароля'}
        </h2>
        
        {error && <div className="error-message">{error}</div>}

        <form className="login-form" onSubmit={handleSubmit}>
          {mode === 'register' && (
            <div className="input-field">
              <label>Имя</label>
              <input 
                type="text"
                placeholder="Ваше имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="input-field">
            <label>Email</label>
            <input 
              type="email"
              placeholder="Ваш email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {(mode === 'login' || mode === 'register') && (
            <>
              <div className="input-field">
                <label>Пароль</label>
                <input 
                  type="password"
                  placeholder="Ваш пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {mode === 'login' && (
                <div className="remember-block">
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember">Запомнить меня</label>
                </div>
              )}
            </>
          )}

          <button type="submit" className="submit-btn">
            {mode === 'login' && 'Войти'}
            {mode === 'register' && 'Зарегистрироваться'}
            {mode === 'forgot' && 'Отправить ссылку'}
          </button>

          <div className="auth-actions">
            {mode === 'login' && (
              <>
                <a href="#" onClick={(e) => { e.preventDefault(); setMode('forgot') }}>
                  Забыли пароль?
                </a>
                <a href="#" onClick={(e) => { e.preventDefault(); setMode('register') }}>
                  Нет аккаунта? Зарегистрироваться
                </a>
              </>
            )}
            {(mode === 'register' || mode === 'forgot') && (
              <a href="#" onClick={(e) => { e.preventDefault(); setMode('login') }}>
                ← Вернуться к входу
              </a>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default AuthForm