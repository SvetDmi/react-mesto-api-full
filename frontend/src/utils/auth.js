export const BASE_URL = 'http://api.svetdmi.students.nomoredomains.rocks';

const headers = {
    'Content-Type': 'application/json'
};

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ email, password })
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(res.status);
        })
        .then((res) => {
            return res;
        });
};

export const login = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ email, password })
    })
        // .then((res) => {
        //     if (res.ok) {
        //         return res.json();
        //     }
        //     return Promise.reject(res.status);
        // })

        .then(res => res.json())
        .then((data) => {
            if (data.token) {
                localStorage.setItem('token', data.token);
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
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(res.status);
        })
        .then(data => data)
};