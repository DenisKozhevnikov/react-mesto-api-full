class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _response() {
    return (res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    };
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, { headers: this._headers }).then(
      this._response()
    );
  }

  setUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._response());
  }

  setUserAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._response());
  }

  getItems() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._response());
  }

  deleteItem(itemId) {
    return fetch(`${this._baseUrl}/cards/${itemId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._response());
  }

  setPlace({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._response());
  }

  toggleLike(itemId, isLiked) {
    return fetch(`${this._baseUrl}/cards/likes/${itemId}`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._headers,
    }).then(this._response());
  }
}

const api = new Api({
  baseUrl: `https://mesto.nomoreparties.co/v1/cohort-14`,
  headers: {
    authorization: "8916ab4b-9a09-4a8e-86cf-42a282e45a8c",
    "Content-Type": "application/json",
  },
});

export default api;
