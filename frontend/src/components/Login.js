import React from 'react';

function Login({ onLogin }) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleSubmit(e) {
        e.preventDefault();
        onLogin(email, password)
    }

    const onEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value)
    }

    return (
        <div className="page__sections  auth">
            <h2 className="auth__title">Вход</h2>
            <form className="auth__form" method="post" noValidate onSubmit={handleSubmit}>

                <input type="email" autoComplete="username" name="email" value={email || ""} placeholder='Email'
                    className="auth__input" required onChange={onEmailChange} />
                <span className="popup__input-error"></span>
                <input type="password" autoComplete="current-password" name="password" value={password || ""} placeholder='Пароль'
                    className="auth__input" required onChange={onPasswordChange} />
                <span className="popup__input-error"></span>
                <button type="submit" className="auth__submit">Войти</button>
            </form>
        </div>
    )
}

export default Login;
