import React, { useContext, useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const currentUser = useContext(CurrentUserContext);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="form__inputs">
        <input
          id="name-input"
          type="text"
          className="form__input popup__item_name"
          name="name"
          placeholder="Имя"
          required
          minLength="2"
          maxLength="40"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <span id="name-input-error" className="form__error" />
        <input
          id="about-me-input"
          type="text"
          className="form__input popup__item_about-me"
          name="aboutMe"
          placeholder="О себе"
          required
          minLength="2"
          maxLength="200"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <span id="about-me-input-error" className="form__error" />
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
