import React from 'react';
import Card from './Card';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({
    onEditProfile,
    onAddPlace,
    onEditAvatar,
    onCardClick,
    onCardLike,
    onCardDelete,
    cards

}) {
    const currentUser = React.useContext(CurrentUserContext);



    return (
        <main>

            <section className="profile page__sections">
                <img src={currentUser.avatar} alt={currentUser.name} className="profile__avatar" />
                <button type="button" className="button profile__avatar_edit" onClick={onEditAvatar}></button>
                <div className="profile__info">
                    <h1 className="profile__title">{currentUser.name} </h1>
                    <button type="button" className="button profile__edit" onClick={onEditProfile}></button>
                    <p className="profile__text">{currentUser.about}</p>
                </div>
                <button type="button" className="button profile__add" onClick={onAddPlace}></button>
            </section>

            <section className="cards page__sections">
                <ul className="cards__items">
                    {
                        cards.map((card) =>
                            < Card
                                key={card._id}
                                card={card}
                                onCardClick={onCardClick}
                                onCardLike={onCardLike}
                                onCardDelete={onCardDelete}
                            />
                        )
                    }
                </ul>
            </section>
        </main>
    );
}

export default Main;