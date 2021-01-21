import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Card({ card, onCardClick, onCardLike, onCardDelete }) {

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDelete() {
        onCardDelete(card)
    }

    const currentUser = React.useContext(CurrentUserContext);


    // Показ иконки удаления
    const isOwn = card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
        `button elements__trash ${isOwn ? 'elements__trash_active' : ''}`
    );

    // Показ лайка
    const isLiked = card.likes.some(like => like._id === currentUser._id);
    const cardLikeButtonClassName = (
        `button elements__like ${isLiked ? 'elements__like_active' : ''}`
    );


    return (

        <li className="elements__item" >
            <button type="button" className={cardDeleteButtonClassName} onClick={handleDelete} > </button>
            <img src={card.link} alt={card.name} className="elements__img" onClick={handleClick} />
            <div className="elements__label">
                <h2 className="elements__title">{card.name}</h2>
                <div className="elements__likes">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <div className="elements__like-count">{card.likes.length}</div>
                </div>
            </div>
        </li>

    );
}


export default Card;