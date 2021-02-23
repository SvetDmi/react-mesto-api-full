import React from "react";
import PopupWithForm from "./PopupWithForm";

const DeleteCardPopup = ({ card, isOpen, onClose, onCardDelete }) => {

    const handleSubmit = (event) => {
        event.preventDefault();
        onCardDelete(card);
    };

    return (
        <PopupWithForm
            name="deleteCard"
            title="Вы уверены?"
            buttonText="Да"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
        </PopupWithForm>

    );
}

export default DeleteCardPopup;