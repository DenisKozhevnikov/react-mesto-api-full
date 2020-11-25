class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
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
    return fetch(`${this._baseUrl}/users/me`, { 
      headers:  {
        authorization: `Bearer ${localStorage.jwt}`,
        "Content-Type": "application/json",
      } 
    }).then(
      this._response()
    );
  }

  setUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._response());
  }

  setUserAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._response());
  }

  getItems() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: `Bearer ${localStorage.jwt}`,
        "Content-Type": "application/json",
      },
    }).then(this._response());
  }

  deleteItem(itemId) {
    return fetch(`${this._baseUrl}/cards/${itemId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.jwt}`,
        "Content-Type": "application/json",
      },
    }).then(this._response());
  }

  setPlace({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._response());
  }

  toggleLike(itemId, isLiked) {
    return fetch(`${this._baseUrl}/cards/likes/${itemId}`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: {
        authorization: `Bearer ${localStorage.jwt}`,
        "Content-Type": "application/json",
      },
    }).then(this._response());
  }
}

const api = new Api({
  baseUrl: `http://api.denisk.students.nomoreparties.xyz`,
});

export default api;
