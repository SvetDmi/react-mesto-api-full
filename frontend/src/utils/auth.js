export const BASE_URL = 'https://auth.nomoreparties.co';


export const headers = {
    'Content-Type': 'application/json'
};

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ email, password })
    })
        .then((response) => {
            return response.json();
        })
        .then((res) => {
            console.log(res);
            return res;
        })
};

export const login = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ email, password })
    })
        .then((response => response.json()))
        .then((data) => {
            if (data.token) {
                localStorage.setItem('jwt', data.token);
                return data;
            } else {
                return;
            }
        })
};

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then(res => res.json())
        .then(data => data)
};