import React, { useContext } from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__container">
          <div className="profile__avatar-container" onClick={onEditAvatar}>
            <img
              src={currentUser.avatar}
              alt="Аватар"
              className="profile__avatar"
            />
          </div>
          <div className="profile__info">
            <div className="profile__info-container">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                type="button"
                className="profile__edit"
                onClick={onEditProfile}
              />
            </div>
            <p className="profile__about-me">{currentUser.about}</p>
          </div>
        </div>
        <button
          type="button"
          className="profile__add-card"
          onClick={onAddPlace}
        />
      </section>
      <section className="cards">
        {cards.map((card) => {
          return (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
