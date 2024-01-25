import PopupWithForm from "./PopupWithForm.jsx";
import {useEffect, useRef} from "react";

function EditAvatarPopup ({isOpen, onClose, onUpdateAvatar, onLoading}) {

    const avatarRef = useRef() // используем реф, чтобы получить прямой доступ к DOM-элементу инпута и его значению
    useEffect(() => { // монтируем эффект и указывает значение пустую строку
        avatarRef.current.value = ""; // очищаем инпут попапа для последующиего обновления аватара
    }, [isOpen])
    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value
        });
    }

    return (
        <PopupWithForm
            name='avatar-profile'
            title='Обновить аватар'
            isOpen={isOpen}
            onClose={onClose}
            buttonText={onLoading ? `Обновление...` : `Обновить`}
            onSubmit={handleSubmit}
        >
            <input
                type="url"
                name="AvatarLink"
                id="avatar-input"
                defaultValue=""
                className="popup__input popup__input_type_link"
                placeholder="Ссылка на картинку"
                required=""
                ref={avatarRef}
            />
            <span
                id="AvatarLink-error"
                className="popup__span-error avatar-input-error"
            />
        </PopupWithForm>
    )
}

export default EditAvatarPopup;