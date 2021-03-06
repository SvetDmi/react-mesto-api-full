import { BASE_URL } from './auth';

const headers = {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
};

class Api {
    constructor({ url, headers }) {
        this._url = url
        this._headers = headers
    };

    _parsAnswer(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    // 1. Загрузка информации о пользователе с сервера
    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers
        })
            .then(this._parsAnswer)
        //       .then((res) => {
        // console.log(res)
        //       })
    };

    // 2. Загрузка карточек с сервера
    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            method: "GET",
            headers: this._headers
        })
            .then(this._parsAnswer)
        //       .then((res) => {
        // console.log(res);
        //       })
    };

    getAllInfo() {
        return Promise.all([this.getUserInfo(), this.getInitialCards()])
    }

    // 3. Редактирование профиля
    editUserInfo(inputData) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: inputData.name,
                about: inputData.about
            })
        })
            .then(this._parsAnswer)
    }

    // 4. Добавление новой карточки
    addCard(data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(this._parsAnswer)

    }

    // 7. Удаление карточки
    deleteCard(_id) {
        return fetch(`${this._url}/cards/${_id}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._parsAnswer)
    }

    // 8. Постановка и снятие лайка
    changeLikeCardStatus(_id, isLiked) {
        return fetch(`${this._url}/cards/${_id}/likes`, {
            method: `${isLiked ? 'PUT' : 'DELETE'}`,
            headers: this._headers
        })
            .then(this._parsAnswer)
    }

    // 9. Обновление аватара пользователя  
    editAvatar(inputData) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: inputData.avatar
            })
        })
            .then(this._parsAnswer)
    }

    refreshHeaders() {
        headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }
}

export const api = new Api({
    url: BASE_URL,
    headers: headers
});

