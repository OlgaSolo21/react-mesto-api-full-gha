import PopupWithForm from "./PopupWithForm.jsx";
import {useState, useEffect, useContext} from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";


function EditProfilePopup({isOpen, onClose, onUpdateUser, onLoading}) {

    //стейт-переменные name и description для привязки их к полям ввода
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    // Обработчик изменения инпута обновляет стейт
    function handleNameInput(e) {
        setName(e.target.value)
    }
    function handleDescriptionInput(e) {
        setDescription(e.target.value)
    }

    //подписываемся на контекст и подставляем данные имени и о себе в попап
    // Подписка на контекст
    const currentUser = useContext(CurrentUserContext);

    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
        useEffect(() => {
            setName(currentUser.name);
            setDescription(currentUser.about);
        }, [currentUser, isOpen]);
            //Нужно еще следить за isOpen (за состоянием открытости),
    // чтобы вставлять в инпуты данные пользователя, иначе, если мы удалим информацию из инпутов
    // и просто закроем попап, то при следующем открытии инпуты будут пустые (без данных пользователя)

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({name: name, about: description});
    }

    return (
        <PopupWithForm
        name="edit-profile"
        title='Редактировать профиль'
        //в коде App значение isOpen каждого из трёх попапов
        //должно задаваться с помощью соответствующей переменной состояния (из тз 10пр для понимания)
        isOpen={isOpen} //переменная состояния
        onClose={onClose}
        buttonText={onLoading ? `Сохранение...` : `Сохранить`}
        onSubmit={handleSubmit}
    >
        <input
            type="text"
            name="UserName"
            id="name-input"
            className="popup__input popup__input_type_name"
            minLength={2}
            maxLength={40}
            required=""
            placeholder="Введите имя"
            value={name || ""}
            onChange={handleNameInput}
        />
        <span
            id="UserName-error"
            className="popup__span-error name-input-error"
        />
        <input
            type="text"
            name="UserJob"
            id="job-input"
            className="popup__input popup__input_type_job"
            minLength={2}
            maxLength={200}
            required=""
            placeholder="Коротко о себе"
            value={description || ""}
            onChange={handleDescriptionInput}
        />
        <span
            id="UserJob-error"
            className="popup__span-error job-input-error"
        />
    </PopupWithForm>
    )
}

export default EditProfilePopup