import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {

    const avatar = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatar.current.value,
        });
    }

    React.useEffect(() => {
        avatar.current.value = '';
    }, [isOpen])

    return (

        <PopupWithForm
            name="avatar"
            title="Обновить аватар"
            buttonText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isLoading={isLoading}
        >
            <input ref={avatar} type="url" name="link" placeholder="Ссылка на картинку"
                className="popup__input popup__input_subject_pic-link" required />
            <span className="popup__input-error"></span>

        </PopupWithForm >
    );
}

export default EditAvatarPopup;