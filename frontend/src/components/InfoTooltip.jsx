import successIcon from '../images/successIcon.svg'
import errorIcon from '../images/errorIcon.svg'

function InfoTooltip({isOpen, onClose, isSuccess}) {
    return (
        <div className={`popup ${isOpen ? 'popup_opened' : ''}`} id='popup-InfoToolTip'>
            <div className="popup__container">
                <button
                    type="button"
                    aria-label="Close"
                    className='popup__close cursor'
                    onClick={onClose}
                />
                <img
                    className='popup__auth-image'
                    alt='Изображение уведомления'
                    src={`${isSuccess ? successIcon : errorIcon}`}
                />
                <h2 className='popup__notification'>{`${isSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}`}</h2>
            </div>
        </div>
    )
}

export default InfoTooltip