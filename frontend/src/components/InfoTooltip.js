import React from 'react';



function InfoTooltip({ isOpen, onClose, authResult, message }) {

    return (

        <div className={`popup  ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button type="button" className="button popup__close" onClick={onClose}></button>
                <div className={`popup__info ${authResult ? 'popup__info_type_yes' : 'popup__info_type_no'}`}
                ></div>
                <h2 className="popup__title popup__title_infotooltip">{message}</h2>
            </div>

        </div>

    );
}

export default InfoTooltip;