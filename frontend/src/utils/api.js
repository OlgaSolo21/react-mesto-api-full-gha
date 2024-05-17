class Api {
    constructor({url}) {
        this._url = url
    }

    //"Можно сделать универсальный метод запроса с проверкой ответа,
    // чтобы не дублировать эту проверку в каждом запросе"//
  //рекомендация ревью и наставника (подробнее в пачке еще в треде, также можно отдельным классом (см ревью))

    _request(endpoint, options = {}) {
        const token = localStorage.getItem('jwt')

        return fetch(
            `${ this._url }/${endpoint}`,
            {headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }, ...options})
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
    url: 'https://api.nomoreparties.co',
})

export default api