// !--MAIN - ЭТО РАЗМЕТКА ДЛЯ ОСНОВНОЙ ЧАСТИ СТРАНИЦЫ (ФУТЕР И ХЕДЕР ОТДЕЛЬНО)--! //
import addButton from "../images/addButton.svg";
import Card from "./Card.jsx";
import {useContext} from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function Main({cards, onEditProfile, onEditAvatar, onAddPlace, onCardClick, onCardLike, setCardDel, onCardDeletePopup}) {

    const currentUser = useContext(CurrentUserContext) // подписываемся на контекст current User то есть получает данные о пользователе с сервера

    return(
        <main className="content">
            <section className="profile">
                <img
                    src={currentUser.avatar}
                    alt="Фото профиля"
                    className="profile__avatar"
                    //style={{ backgroundImage: `url(${avatarLink})` }}
                />
                <div className="profile__overlay" onClick={onEditAvatar}>
                    <button
                        type="button"
                        aria-label="EditIcon"
                        className="profile__icon"
                    />
                </div>
                <div className="profile__info">
                    <h1 className="profile__title">{currentUser.name}</h1>
                    <button
                        type="button"
                        aria-label="Edit"
                        className="profile__edit-button cursor"
                        onClick={onEditProfile}
                    />
                    <p className="profile__subtitle">{currentUser.about}</p>
                </div>
                <button
                    type="button"
                    aria-label="Add"
                    className="profile__add-button cursor"
                    onClick={onAddPlace}
                >
                    <img
                        src={addButton}
                        alt="Кнопка добавить место"
                    />
                </button>
            </section>
            <section className="cards">
                <ul className="cards__elements">
                    {cards.map((card) => (
                        <Card
                            key={card._id}
                            card={card}
                            onCardClick={onCardClick}
                            onCardLike={onCardLike}
                            onCardDeletePopup={onCardDeletePopup}
                            setCardDel={setCardDel}
                        />
                        ))
                    }
                </ul>
            </section>
        </main>
    )
}

export default Main