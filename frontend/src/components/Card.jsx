import {useContext} from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function Card({card, onCardClick, onCardLike, setCardDel, onCardDeletePopup}) {
    const currentUser = useContext(CurrentUserContext) // подписываемся на контекст current User то есть получает данные о пользователе с сервера

    const isOwn = card.owner._id === currentUser._id; // Определяем, являемся ли мы владельцем текущей карточки
    const buttonDeleteCardClassName = `cursor ${isOwn ? 'cards__trash' : ''}` // переменная, которую добавляем в класс корзины

    const isLiked = card.likes.some(i => i._id === currentUser._id); // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const cardLikeButtonClassName = `cards__like ${isLiked ? 'cards__like_active' : ''}` // Создаём переменную, которую после зададим в `className` для кнопки лайка

    const handleCardClick = () => {// открытие на весь экран
        onCardClick(card)
    }
    const handleLikeClick = () => {//постановка снятие лайка
        onCardLike(card)
    }
    const handleDeleteClick = () => {//удаление карточки
        onCardDeletePopup(card)
        setCardDel(card._id)
    }

        return(
        <li className="cards__item">
            <img className="cards__image cursor" src={card.link} alt={`Фото ${card.name}`} onClick={handleCardClick} />
            <button className={buttonDeleteCardClassName} onClick={handleDeleteClick} />
            <div className="cards__content">
                <h2 className="cards__title">{card.name}</h2>
                <div className="cards__group-likes">
                    <button type="button" aria-label="Check" className={cardLikeButtonClassName} onClick={handleLikeClick} />
                    <span className="cards__like-amount">{card.likes.length}</span>
                </div>
            </div>
        </li>
    )
}
export default Card