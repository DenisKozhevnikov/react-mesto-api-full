import React from "react";

function PopupWithForm({
  name,
  title,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
  children,
}) {
  return (
    <section className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button type="button" className="popup__close" onClick={onClose} />
        <form
          action="#"
          method="post"
          className="form"
          name={name}
          onSubmit={onSubmit}
        >
          <h2 className="form__heading">{title}</h2>
          {children}
          <button type="submit" className="form__button">
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
