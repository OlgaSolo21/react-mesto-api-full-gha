class Api {
    constructor({url, headers}) {
        this._url = url
        this._headers = headers
    }

    //"Можно сделать универсальный метод запроса с проверкой ответа,
    // чтобы не дублировать эту проверку в каждом запросе"//
  //рекомендация ревью и наставника (подробнее в пачке еще в треде, также можно отдельным классом (см ревью))
    _request(endpoint, options = {}) {
        return fetch(
            `${ this._url }/${endpoint}`,
            {headers: this._headers, ...options})
            .then(this._handleResponse)
    }

    _handleResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${ res.status }`);
        }
    }


    getInitialCards() { //запрос на сервер для получения карточек
        return this._request('cards', {
                method: 'GET'
        })
    }

    getUserProfile() { // запрос на сервер для получения данных о пользователе
        return this._request('users/me', {
            method: 'GET'
        })
    }

    editProfilePatch(data) { // Редактирование профиля посылаем запрос методом PATCH
        return this._request('users/me',  {
            method: 'PATCH',
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
    }

    addNewCardPost(data) { //Добавление новой карточки POST-запрос
        return this._request('cards', {
            method: 'POST',
            body: JSON.stringify(data)
        })
    }

    changeLikeCardStatus(cardId, like) {// Постановка лайка и Снятие лайка универсальная функция для App
        return this._request(`cards/${cardId}/likes`, {
                    method: like ? 'PUT' : 'DELETE' // где like это булевая переменная которая определяется при вызове метода changeLikeCardStatus
                })
    }
    // setLikeCardPut(cardId) { // Постановка лайка
    //     return fetch(`${this._url}/cards/${cardId}/likes`, {
    //         headers: this._headers,
    //         method: 'PUT'
    //     })
    //         .then(this._handleResponse)
    // }
    //
    // deleteLikeCard(cardId) { // Снятие лайка
    //     return fetch(`${this._url}/cards/${cardId}/likes`, {
    //         headers: this._headers,
    //         method: 'DELETE'
    //     })
    //         .then(this._handleResponse)
    // }

    deleteCard(cardId) { // Удалкние карточки с сервера
        return this._request(`cards/${cardId}`, {
            method: 'DELETE'
        })
    }

    updateAvatarPatch (data) { // Обновление аватара пользователя
        return this._request('users/me/avatar', {
            method: 'PATCH',
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
    }
}

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-77',
    headers: {
        authorization: '7f52bf50-52cc-48bd-9c80-c48495da8ea4',
        'Content-Type': 'application/json'
    }
})

export default api