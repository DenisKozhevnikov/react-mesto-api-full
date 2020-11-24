const BASE_URL = 'https://api.denisk.students.nomoreparties.xyz';

const handleRequestResponse = (res) => {
  if(res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка: ${res.status}`);
}

export function setNewUser(password, email) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  }) 
  .then(handleRequestResponse)
}

export function onUserLogin(password, email) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
  .then(handleRequestResponse)
}

export function onGetContent(token) {
  return fetch(`${BASE_URL}/users/me`,{
    method: 'GET',
    headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
    }
  })
  .then(handleRequestResponse)
}