import React from "react";
import done from '../images/done.svg'
import fail from '../images/fail.svg'

function InfoTooltip({ isRegistrationSuccessful, onClose, isOpen }) {
  return (
    <section className={`popup popup_info-tooltip ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button type="button" className="popup__close" onClick={onClose} />
        <img className="popup__info-tooltip-image" alt="result" src={ isRegistrationSuccessful ? done : fail }/>
        <p className="popup__text">
          { isRegistrationSuccessful ? 
          "Вы успешно зарегистрировались!" : 
          "Что-то пошло не так! Попробуйте ещё раз." }</p>
      </div>
    </section>
  )
}

export default InfoTooltip;