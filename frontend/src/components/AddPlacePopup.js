import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const textRef = useRef("");
  const linkRef = useRef("");

  function handleAddPlaceSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: textRef.current.value,
      link: linkRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleAddPlaceSubmit}
    >
      <fieldset className="form__inputs">
        <input
          autoComplete="off"
          ref={textRef}
          id="title-input"
          type="text"
          className="form__input popup__item_name"
          name="name"
          placeholder="Название"
          required
          minLength="1"
          maxLength="30"
        />
        <span id="title-input-error" className="form__error" />
        <input
          autoComplete="off"
          ref={linkRef}
          id="link-input"
          type="url"
          className="form__input popup__item_link"
          name="link"
          placeholder="Ссылка на картинку"
          required
        />
        <span id="link-input-error" className="form__error" />
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
