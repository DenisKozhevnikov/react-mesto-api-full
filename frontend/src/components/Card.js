import React, { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  return (
    <article className="card">
      <img
        className="card__image"
        src={card.link}
        alt="#"
        onClick={() => onCardClick(card)}
      />
      <div className="card__container">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-container">
          <button
            type="button"
            className={`card__like ${isLiked && "card__like_active"}`}
            onClick={() => onCardLike(card)}
          />
          <p className="card__like-count">{card.likes.length}</p>
        </div>
      </div>
      {isOwn && (
        <button
          type="button"
          className="card__remove"
          onClick={() => onCardDelete(card)}
        />
      )}
    </article>
  );
}

export default Card;
