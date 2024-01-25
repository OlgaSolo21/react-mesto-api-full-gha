import {Link} from "react-router-dom"
import {useState} from "react";

function Register({onRegister}) {
    //переменные состояния для работы с инпутами
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onRegister(email, password);
    }

    return(
        <div className='auth'>
            <form name='registerForm' id='registerForm' className='auth__form' onSubmit={handleSubmit}>
                <h1 className='auth__title'>Регистрация</h1>
                <input
                    className='auth__input'
                    type="email"
                    name="EmailInput"
                    id="email-input"
                    placeholder="Email"
                    required
                    onChange={handleChangeEmail}
                    value={email}
                />
                <input
                    className='auth__input'
                    type="password"
                    name="PasswordInput"
                    id="password-input"
                    placeholder="Пароль"
                    required
                    onChange={handleChangePassword}
                    value={password}
                />
                <button className='auth__button'>Зарегистрироваться</button>
            </form>
            <p className='auth__subtitle'>Уже зарегистрированы?&ensp;
                <Link to='/sign-in' className='auth__subtitle'>Войти</Link></p>
        </div>
    )
}

export default Register