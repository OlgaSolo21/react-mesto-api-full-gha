import '../index.css'
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Main from "./Main.jsx";
import ImagePopup from "./ImagePopup.jsx";
import {useEffect, useState} from "react";
import api from "../utils/api.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup.jsx";
import DeleteCardPopup from "./DeleteCardPopup.jsx";
import {Route, Routes, useNavigate} from "react-router-dom";
import Register from "./Register.jsx";
import Login from "./Login.jsx";
import InfoTooltip from "./InfoTooltip.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import * as auth from '../utils/auth.js'


function App() {
    const navigate = useNavigate()
    //пишем [переменные is и их внутреннее состояние setIs] для открытия попапов
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
    const [isDeletePopup, setIsDeletePopup] = useState(false) //попап удаления своей карточки

    //функции обработчики событий, которые изменяют внутреннее состояние попапов
    function handleEditProfileClick() { //редактирование профиля
        setIsEditProfilePopupOpen(true)
    }

    function handleAddPlaceClick() { //добавление картинки
        setIsAddPlacePopupOpen(true)
    }

    function handleEditAvatarClick() { //редактирование аватара
        setIsEditAvatarPopupOpen(true)
    }

    function handleDeleteCardPopup() { //попап удаления своей карточки
        setIsDeletePopup(true)
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setIsEditAvatarPopupOpen(false)
        setSelectedCard({})
        setIsDeletePopup(false)
        setCardDel('')
        setIsInfoToolTip(false)
    }

    //стейт-переменная открытия карточки на весь экран
    const [selectedCard, setSelectedCard] = useState({})

    function handleOpenFullScreenCard(selectedCard) {
        setSelectedCard(selectedCard)
    }

    // стейт currentUser в корневом компоненте чтобы данные о текущем пользователе были видны во всех местах
    const [currentUser, setCurrentUser] = useState({})
    // переменная состояния для массива карточек и запрос на сервер за ними
    const [cards, setCards] = useState([])
    //переменная состояния авторизации
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    //проверка токена
    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            auth.getContent(jwt)
                .then((res) => {
                    if (res) {
                        setIsLoggedIn(true)
                        navigate('/', {replace: true})
                        setEmailUser(res.data.email)
                    }
                })
                .catch(console.error)
        }
    }, [])

    useEffect(() => { //используем хук для монтирования данных на страницу
        if (isLoggedIn) {
            api.getUserProfile() //данные пользователя
                .then((res) => setCurrentUser(res))
                .catch(console.error)

            api.getInitialCards() // данные карточек
                .then((cards) => {
                    setCards(cards)
                })
                .catch(console.error)
        }
    }, [isLoggedIn])

    // функционал поддержки лайков и дизлайко
    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch(console.error)
    }

    // переменная состояния загрузки - спиннер
    const [isLoading, setIsLoading] = useState(false)

    // функционал поддержки удаления карточки
    const [cardDel, setCardDel] = useState('')

    function handleCardDelete(e) {
        setIsLoading(true)
        e.preventDefault();
        api.deleteCard(cardDel)
            .then(() => {
                setCards((cards) => cards.filter((c) => c._id !== cardDel))
                closeAllPopups()
            })
            .catch(console.error)
            .finally(() => setIsLoading(false))
    }

    //работа с блоком редактирования данных
    function handleUpdateUser(data) {
        setIsLoading(true)
        api.editProfilePatch(data)
            .then((item) => {
                setCurrentUser(item)
                closeAllPopups()
            })
            .catch(console.error)
            .finally(() => setIsLoading(false))
    }

    //работа с блоком изменения аватара
    function handleUpdateAvatar(data) {
        setIsLoading(true)
        api.updateAvatarPatch(data)
            .then((item) => {
                setCurrentUser(item)
                closeAllPopups()
            })
            .catch(console.error)
            .finally(() => setIsLoading(false))
    }

    //работа с блоком добавления новой карточки
    function handleAddPlaceSubmit(data) {
        setIsLoading(true)
        api.addNewCardPost(data)
            .then((newCard) => {
                setCards([newCard, ...cards])
                closeAllPopups()
            })
            .catch(console.error)
            .finally(() => setIsLoading(false))
    }

    //переменная состояния успешной аутентификации (меняем текст и картинку в попапе InfoTooltip)
    const [isSuccess, setIsSuccess] = useState(false)

    //переменная попапа уведомления InfoTooltip
    const [isInfoToolTip, setIsInfoToolTip] = useState(false)

    //регистрация пользователя
    function handleRegister(email, password) {
        auth.register(email, password)
            .then(res => {
                if (res) {
                    setIsInfoToolTip(true)
                    setIsSuccess(true)
                    navigate('/sign-in', {replace: true})
                }
            })
            .catch(err => {
                setIsInfoToolTip(true)
                setIsSuccess(false)
                console.log(err)
            })
    }
    
    //авторизация пользователя
    function handleLogin(email, password) {
        auth.login(email, password)
            .then(res => {
                if (res) {
                    localStorage.setItem('jwt', res.token)
                    setIsLoggedIn(true)
                    setEmailUser(email)
                    navigate('/', {replace: true})
                }
            })
            .catch(err => {
                setIsInfoToolTip(true)
                setIsSuccess(false)
                console.log(err)
            })
    }

    const [email, setEmailUser] = useState('')

    function handleExit() {
        localStorage.removeItem('jwt')
        setIsLoggedIn(false)
        navigate('/sign-in', {replace: true})
    }

    return (
        // оборачиваем все содержимое в контекст с провайдером
        <CurrentUserContext.Provider value={ currentUser }>
            <Header
                email={email}
                onExit={handleExit}
            />
            <Routes>
                <Route path='/' element={<ProtectedRoute
                    element={ Main }
                    onEditProfile={ handleEditProfileClick } //редактирование профиля
                    onAddPlace={ handleAddPlaceClick } //добавление картинки
                    onEditAvatar={ handleEditAvatarClick } //редактирование аватара
                    onCardClick={ handleOpenFullScreenCard }
                    cards={ cards }
                    onCardLike={ handleCardLike }
                    setCardDel={ setCardDel }
                    onCardDeletePopup={ handleDeleteCardPopup }
                    loggedIn={ isLoggedIn }
                />} />
                <Route path='/sign-up' element={ <Register onRegister={handleRegister}/> }/>
                <Route path='/sign-in' element={ <Login onRegister={handleLogin}/> }/>
            </Routes>
            <Footer/>

            <EditProfilePopup
                isOpen={ isEditProfilePopupOpen }
                onClose={ closeAllPopups }
                onUpdateUser={ handleUpdateUser }
                onLoading={ isLoading }
            />

            <EditAvatarPopup
                isOpen={ isEditAvatarPopupOpen }
                onClose={ closeAllPopups }
                onUpdateAvatar={ handleUpdateAvatar }
                onLoading={ isLoading }
            />

            <AddPlacePopup
                isOpen={ isAddPlacePopupOpen }
                onClose={ closeAllPopups }
                onAddPlace={ handleAddPlaceSubmit }
                onLoading={ isLoading }
            />

            <DeleteCardPopup
                isOpen={ isDeletePopup }
                onClose={ closeAllPopups }
                onDeleteCard={ handleCardDelete }
                onLoading={ isLoading }
            />

            <ImagePopup
                card={ selectedCard }
                onClose={ closeAllPopups }
                isOpen={ selectedCard._id !== undefined }
            />

            <InfoTooltip
                isSuccess={ isSuccess }
                isOpen={ isInfoToolTip }
                onClose={ closeAllPopups }
            />
        </CurrentUserContext.Provider>
    )
}

export default App
