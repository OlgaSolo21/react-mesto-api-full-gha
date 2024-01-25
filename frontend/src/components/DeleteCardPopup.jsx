import PopupWithForm from "./PopupWithForm.jsx";
import card from "./Card.jsx";

function DeleteCardPopup({isOpen, onClose, onDeleteCard, onLoading}) {

    return(
        <PopupWithForm
            name='delete-card'
            title='Вы уверены?'
            buttonText={onLoading ? `Удаление...` : `Да`}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={onDeleteCard}
        />
    )
}

export default DeleteCardPopup