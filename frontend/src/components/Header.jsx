import {Link, Route, Routes} from "react-router-dom"
function Header({email, onExit}) {
    return (
        <header className="header">
            <div className="header__logo" />
            <Routes>
                <Route path='/' element={
                    <div className='header__auth'>
                        <p className='header__email'>{ email }</p>
                        <Link to='/sign-in' className='header__title' onClick={onExit}>Выйти</Link>
                    </div>} />

                <Route path='/sign-in'
                       element={<Link to='/sign-up' className='header__title'>Регистрация</Link>} />

                <Route path='/sign-up'
                        element={<Link to='/sign-in' className='header__title'>Вход</Link>} />
            </Routes>
        </header>
    )
}

export default Header