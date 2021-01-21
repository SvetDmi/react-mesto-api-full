import { logDOM } from '@testing-library/react';
import React from 'react';

// "Файл logo.svg, который находится в директории components в вашем проекте (но здесь он не отображается), 
// следует переместить в папку images" 
// я переместила, но не поняла, почему это замечание было в компоненте Login и почему "не отображается"? У меня при открытии сайта 
// логотип отображался везде

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

                <input id="input-email" type="email" autoComplete="username" name="email" value={email || ""} placeholder='Email'
                    className="auth__input" required onChange={onEmailChange} />
                <span id="input-name-error" className="popup__input-error"></span>
                <input id="input-password" type="password" autoComplete="current-password" name="password" value={password || ""} placeholder='Пароль'
                    className="auth__input" required onChange={onPasswordChange} />
                <span id="input-job-error" className="popup__input-error"></span>
                <button type="submit" className="auth__submit">Войти</button>
            </form>

        </div>

    )
}

export default Login;