import React from 'react';

function InfoTooltip (props) {

  return(
    <div className={`popup ${props.isOpened ? "popup_opened" : ""}`}>
      <img className="popup__auth-img" src={props.image} alt={props.message}></img>
      <p className="popup__auth-message"> {props.message} </p>
      <button onClick={props.onClose} className="popup__close-btn" type="button"></button>
    </div>
  )

}

export default InfoTooltip;
