    import { Link } from 'react-router-dom'
    import './Header.css'
    import SearchField from './SearchField'

    function Header () { 



        return (
            <div>
                <header className='vintage-header'>
                    <div className='header-content'>
                    <div className='header-title'><Link to='/'>Евгения</Link></div>
                        <div className='header-text'>
                            <span><Link to='/'>Главная</Link></span>
                            <span><Link to='/clothes'>Одежда</Link></span>
                            <span><Link to='/bags'>Сумки</Link></span>
                            <span><Link to='/shoes'>Обувь</Link></span>
                            <span>sale</span>
                            <span>Бренды</span>
                            <span>Контакты</span>
                            <span>Личный кабинет</span>
                            <SearchField />
                        </div>
                    </div>
                </header>
            </div>
        )
    }









export default Header