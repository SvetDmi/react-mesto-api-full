import React from 'react';

import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading, onTitleChange, onLinkChange, name, link }) {

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name: name,
            link: link
        });
    }
    // useEffect уже имелся в app, но без isOpen (это поправила) - все стейты и эффекты попапов в прошлой работе я вынесла в app.
    return (

        <PopupWithForm
            name="element"
            title="Новое место"
            buttonText="Создать"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isLoading={isLoading}
        >
            <>
                <input id="input-name" type="text" name="name" value={name} placeholder="Название"
                    className="popup__input popup__input_subject_pictitle" required minLength="1" maxLength="30" onChange={onTitleChange} />
                <span id="input-name-error" className="popup__input-error"></span>
                <input id="input-link" type="url" name="link" value={link} placeholder="Ссылка на картинку"
                    className="popup__input popup__input_subject_pic-link" required onChange={onLinkChange} />
                <span id="input-link-error" className="popup__input-error"></span>
            </>
        </PopupWithForm>

    );
}


export default AddPlacePopup;