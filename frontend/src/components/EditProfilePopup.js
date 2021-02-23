import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading, name, description, onNameChange, onDescriptionChange }) {

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (

        <PopupWithForm
            name="profile"
            title="Редактировать профиль"
            buttonText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isLoading={isLoading}
        >
            <input type="text" name="name" value={name || ""} placeholder='Имя'
                className="popup__input popup__input_subject_name" required minLength="2" maxLength="40" onChange={onNameChange} />
            <span className="popup__input-error"></span>
            <input type="text" name="about" value={description || ""} placeholder='О себе'
                className="popup__input popup__input_subject_job" required minLength="2" maxLength="200" onChange={onDescriptionChange} />
            <span className="popup__input-error"></span>
        </PopupWithForm>
    );
}

export default EditProfilePopup;