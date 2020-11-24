import React from "react";

function PopupWithImage({ card, onClose }) {
  return (
    <section
      className={`popup popup_image ${
        Object.keys(card).length !== 0 ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container popup__container_image">
        <button type="button" className="popup__close" onClick={onClose} />
        <figure className="popup__figure">
          <img className="popup__image" src={card.link} alt={card.name} />
          <figcaption className="popup__caption">{card.name}</figcaption>
        </figure>
      </div>
    </section>
  );
}

export default PopupWithImage;