import PopupWithForm from "./PopupWithForm.jsx";
import {useEffect, useState} from "react";

function AddPlacePopup ({isOpen, onClose, onAddPlace, onLoading}) {

    // используем переменные состояния, чтобы исп управляемые компоненты (как в блоке редактирования пользователя)
    const [nameAdd, setNameAdd] = useState('')
    const [linkAdd, setLinkAdd] = useState('')

    // Обработчик изменения инпута обновляет стейт
    function handleNameAddInput(e) {
        setNameAdd(e.target.value)
    }
    function handleLinkAddInput(e) {
        setLinkAdd(e.target.value)
    }

    // После добавления карточки, она также летит на сервер
    // ее данные будут использованы в управляемых компонентах.
    useEffect(() => {
        setNameAdd('')
        setLinkAdd('')
    }, [isOpen])

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        onAddPlace({name: nameAdd, link: linkAdd});
    }

    return (
        <PopupWithForm
            name='add-card'
            title='Новое место'
            isOpen={isOpen}
            onClose={onClose}
            buttonText={onLoading ? `Добавление...` : `Добавить`}
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                name="UserPlace"
                id="place-input"
                className="popup__input popup__input_type_place"
                placeholder="Название места"
                minLength={2}
                maxLength={30}
                required=""
                onChange={handleNameAddInput}
                value={nameAdd || ""}
            />
            <span
                id="UserPlace-error"
                className="popup__span-error place-input-error"
            />
            <input
                type="url"
                name="UserLink"
                id="link-input"
                className="popup__input popup__input_type_link"
                placeholder="Ссылка на картинку"
                required=""
                onChange={handleLinkAddInput}
                value={linkAdd || ""}
            />
            <span
                id="UserLink-error"
                className="popup__span-error link-input-error"
            />
        </PopupWithForm>
    )
}

export default AddPlacePopup