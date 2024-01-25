function ImagePopup({card, onClose, isOpen}) {
    return(
        <div className={`popup popup_fullscreen ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__cards">
                <button
                    type="button"
                    aria-label="Close"
                    className="popup__close popup__close_type_fullscreen cursor"
                    onClick={onClose}
                />
                <figure className="popup__cards">
                    <img src={card.link} alt={card.name} className="popup__image" />
                    <figcaption className="popup__caption">{card.name}</figcaption>
                </figure>
            </div>
        </div>
    )
}

export default ImagePopup