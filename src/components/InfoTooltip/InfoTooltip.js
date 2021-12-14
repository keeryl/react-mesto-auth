import React from 'react';

function ImagePopup (props) {

  return(
    <div className={`popup ${props.isOpened ? "popup_opened" : ""}`}>
      <figure className="popup__image-container">
        <img className="popup__card-image" src={props.card.link} alt={`Изображение: ${props.card.name}`}/>
        <figcaption className="popup__card-image-title">{props.message}</figcaption>
        <button onClick={props.onClose} className="popup__close-btn" type="button"></button>
      </figure>
    </div>
  );

}

export default ImagePopup;
