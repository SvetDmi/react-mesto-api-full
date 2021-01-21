/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';

import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import PopupWithForm from './PopupWithForm';
import Register from './Register';
import Login from './Login';

import { api } from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';



function App() {


    // Стейты
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);
    const [name, setName] = React.useState('');

    const [description, setDescription] = React.useState('');

    const [title, setTitle] = React.useState('');
    const [link, setLink] = React.useState('');

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
    const [isSelectedCardOpen, setIsSelestedCardOpen] = React.useState(false);
    const [selectedCardData, setSelectedCardData] = React.useState({});
    const [cardForDelete, setCardForDelete] = React.useState({})
    const [isLoading, setLoading] = React.useState(false);

    const [loggedIn, setLoggedIn] = React.useState(false);


    const [isInfoToolTipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);

    const [isAuthResult, setAuthResult] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [email, setEmail] = React.useState('');



    // Загрузка данных

    React.useEffect(() => {
        api.getAllInfo()
            .then(([cardsData, userData]) => {
                setCurrentUser(userData)
                setCards(cardsData)
            })
            .catch((err) => {
                console.log(err)
            });
    }, []);

    // Профиль

    function handleUpdateUser(userInfo) {
        setLoading(true)
        api.editUserInfo(userInfo)
            .then((newUserInfo) => {
                setCurrentUser(newUserInfo)
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {

                setLoading(false)
            })
    }

    function handleUpdateAvatar(avatar) {
        setLoading(true)
        api.editAvatar(avatar)
            .then((newAvatar) => {
                setCurrentUser(newAvatar)
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {

                setLoading(false)
            })
    }

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    // КАРТОЧКИ


    function handleAddPlaceSubmit(cardsData) {
        setLoading(true)
        api.addCard(cardsData)
            .then((newCard) => {
                setCards([newCard, ...cards])
                closeAllPopups()
            })
            .catch((err) => {
                console.log(err)

            })
            .finally(() => {
                setLoading(false)
            })
    }

    React.useEffect(() => {
        setTitle('');
        setLink('');
    }, [isAddPlacePopupOpen]);

    function handleTitleChange(e) {
        setTitle(e.target.value);
    }

    function handleLinkChange(e) {
        setLink(e.target.value);
    }


    // открыть из карточки попап с картинкой

    function handleCardClick(card) {
        setIsSelestedCardOpen(true);
        setSelectedCardData({
            link: card.link,
            name: card.name,
            alt: card.name
        })
    }

    // поставить-удалить лайк

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                const newCards = cards.map((item) => item._id === card._id ? newCard : item);
                setCards(newCards);
            })
            .catch(err => {
                console.log(err)
            });
    }

    function handleCardDeleteRequest(card) {
        setCardForDelete(card);
        setIsDeletePopupOpen(true);
    }

    function handleCardDelete(evt) {
        evt.preventDefault();
        api.deleteCard(cardForDelete._id)
            .then(() => {
                const newCards = cards.filter((card) => card._id !== cardForDelete._id);
                setCards(newCards);
                setIsDeletePopupOpen(false);
            })
            .catch(err => console.log(`При удалении карточки: ${err}`))
    }

    // АВТОРИЗАЦИЯ

    const history = useHistory();

    const tokenCheck = () => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            auth.checkToken(jwt).then((res) => {
                if (res) {
                    setLoggedIn(true)
                    setEmail(res.data.email)

                }
                history.push('/');
            })
                .catch((err) => console.log(err))
        }
    };

    React.useEffect(() => {
        tokenCheck();
    }, []);

    function onRegister(email, password) {
        return auth.register(email, password)
            .then((res) => {
                if (res.data) {
                    setAuthResult(true);
                    setMessage('Вы успешно зарегистрировались!');
                    setIsInfoTooltipPopupOpen(true);
                    history.push('/sign-in');
                }
                else {
                    setAuthResult(false);
                    setMessage('Что-то пошло не так! Попробуйте ещё раз');
                    setIsInfoTooltipPopupOpen(true);
                }
            })
            .catch((err) => console.log('некорректно заполнено одно из полей'));

    }


    function onLogin(email, password) {
        return auth.login(email, password)
            .then((res) => {
                if (!res) {
                    setLoggedIn(false);
                    setMessage('Проверьте правильность введения email и пароля');
                    setIsInfoTooltipPopupOpen(true);

                }
                else {
                    localStorage.setItem('token', res.token);
                    tokenCheck();

                }
            })
            .catch((err) => console.log('Пользователь с таким email не найден'));
    }

    function onLogout() {
        localStorage.removeItem('jwt');
        setLoggedIn(false);
        setEmail('');
        history.push('/sign-in');
    }


    // ПОПАПЫ

    // состояние попапов


    //Обработчики попапов
    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsSelestedCardOpen(false);
        setIsDeletePopupOpen(false);
        setIsInfoTooltipPopupOpen(false);
        setSelectedCardData({});
        setCardForDelete(undefined);
    }

    React.useEffect(() => {
        function handleESCclose(evt) {
            if (evt.key === "Escape") {
                closeAllPopups();
            }
        }
        document.addEventListener('keydown', handleESCclose);
        return () => {
            document.removeEventListener('keydown', handleESCclose);
        }
    }, [])



    // Возврат
    return (
        <div className="page">
            <CurrentUserContext.Provider value={currentUser}>

                <div className="App">
                    <Header
                        email={email}
                        onLogout={onLogout}
                        isLogged={loggedIn}

                    />
                    <Switch>
                        <ProtectedRoute exact path="/" loggedIn={loggedIn}>
                            <Main
                                onEditProfile={handleEditProfileClick}
                                onAddPlace={handleAddPlaceClick}
                                onEditAvatar={handleEditAvatarClick}
                                onCardClick={handleCardClick}
                                onCardLike={handleCardLike}
                                onCardDelete={handleCardDeleteRequest}
                                cards={cards}
                            />
                            <Footer />

                        </ProtectedRoute>

                        <Route exact path="/sign-up">
                            <Register
                                onRegister={onRegister}
                            />
                        </Route>

                        <Route path="/sign-in">
                            <Login
                                onLogin={onLogin}
                            />
                        </Route>


                        <Route>
                            {loggedIn ? <Redirect to='/' /> : <Redirect to='/sign-in' />}
                        </Route>

                    </Switch>



                    <EditProfilePopup
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        onUpdateUser={handleUpdateUser}
                        isLoading={isLoading}
                        onNameChange={handleNameChange}
                        onDescriptionChange={handleDescriptionChange}
                        name={name}
                        description={description}
                    />

                    <EditAvatarPopup
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar}
                        isLoading={isLoading}
                    />

                    <AddPlacePopup
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onAddPlace={handleAddPlaceSubmit}
                        isLoading={isLoading}
                        onTitleChange={handleTitleChange}
                        onLinkChange={handleLinkChange}
                        name={title}
                        link={link}
                    />

                    <PopupWithForm
                        name="deleteCard"
                        title="Вы уверены?"
                        buttonText="Да"
                        isOpen={isDeletePopupOpen}
                        onClose={closeAllPopups}
                        onSubmit={handleCardDelete}
                    >
                    </PopupWithForm>


                    <ImagePopup
                        card={selectedCardData}
                        isOpen={isSelectedCardOpen}
                        onClose={closeAllPopups}

                    ></ImagePopup>

                    <InfoTooltip
                        isOpen={isInfoToolTipPopupOpen}
                        onClose={closeAllPopups}
                        authResult={isAuthResult}
                        message={message}
                    ></InfoTooltip>

                </div>


            </CurrentUserContext.Provider>

        </div>
    )
}


export default App;
