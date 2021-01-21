import React from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister(email, password)
    }

    const onEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value)
    }

    return (
        <div className="page__sections auth">
            <h2 className="auth__title">Регистрация</h2>
            <form className="auth__form auth__form_type_register" method="post" noValidate onSubmit={handleSubmit}>

                <input id="input-email" type="email" autoComplete="username" name="email" value={email || ""} placeholder='Email'
                    className="auth__input" required minLength="5" maxLength="40" onChange={onEmailChange} />
                <span id="input-email-error" className="popup__input-error"></span>
                <input id="input-password" type="password" autoComplete="new-password" name="password" value={password || ""} placeholder='Пароль'
                    className="auth__input" required minLength="5" maxLength="40" onChange={onPasswordChange} />
                <span id="input-password-error" className="popup__input-error"></span>
                <button type="submit" className="auth__submit">Зарегистрироваться</button>
            </form>
            <Link to="./sign-in" className="button auth__link">Уже зарегистрированы? Войти</Link>
        </div>

    )
}

export default Register;