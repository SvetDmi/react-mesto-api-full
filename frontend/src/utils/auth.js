export const BASE_URL = 'https://api.svetdmi.students.nomoredomains.rocks';
// export const BASE_URL = 'http://localhost:3002';

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ email, password })
    })
        .then((res) => {
            let data = res.json();
            if (!res.ok) {
                return Promise.reject(res.status);

            }
            return data;
        })
        .catch(err => console.log(err));
};

// export const register = (email, password) => {
//     return fetch(`${BASE_URL}/signup`, {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password })
//     })
//         .then(response => {
//             let data = response.json();
//             if (!response.ok) {
//                 return Promise.reject(response.status);
//             }
//             console.log (data)
//             return data;
//         })
// };

// export const login = (email, password) => {
//     return fetch(`${BASE_URL}/signin`, {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ email, password })
//     })
//         .then((response => {
//             let data = response.json();
//             if (!response.ok) {
//                 return Promise.reject(response.status);
//             }

//             return data;
//         }))
//         .then((data) => {
//             if (data.token) {

//                 localStorage.setItem('token', data.token);
//                 return data;
//             }
//             return data;

//         })
// };

export const login = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ email, password })
    })
        .then((res => {
            let data = res.json();
            if (!res.ok) {
                return Promise.reject(res.status);
            }
            return data;
        }))
        .then((data) => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                return data;
            }
        })
        .catch(err => console.log(err))
};

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(data => data)
};

