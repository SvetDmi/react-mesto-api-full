import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header({ email, onLogout, isLogged }) {

    const [isNaviconClick, setNaviconClick] = React.useState(false);

    const openMenu = () => {
        setNaviconClick(true)
    }

    const closeMenu = () => {
        setNaviconClick(false)
    }

    return (

        <header className={`page__sections ${isLogged ? 'header-auth' : 'header'}`}>
            <Switch>
                <Route path="/signin">
                    <Link to="./signup" className="header__link">Регистрация</Link>
                </Route>
                <Route path="/signup">
                    <Link to="./signin" className="header__link">Войти</Link>
                </Route>
                <Route path="/">
                    <div className={`${isNaviconClick ? 'header__menu-mobile' : 'header__menu '}`}>
                        <p className="header__email" >{email}</p>
                        <Link to="./signin" onClick={onLogout} className="header__link header__link_out">Выйти</Link>
                    </div>

                    <button onClick={openMenu} className={`button header__menu-pic ${isNaviconClick ? '' : 'header__menu-pic_type_open'}`}>
                    </button>
                    <button onClick={closeMenu}
                        className={`button header__menu-pic ${isNaviconClick ? 'header__menu-pic_type_close' : ''}`}>
                    </button>

                </Route>

            </Switch>
            <img src={logo} alt="Mesto Russia" className='header__logo' />



        </header>

    );
}

export default Header;