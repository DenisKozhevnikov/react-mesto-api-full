/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithImage from "./PopupWithImage";
import api from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import { setToken, getToken, removeToken } from "../utils/token";
import { setNewUser, onUserLogin, onGetContent } from "../utils/auth";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoToolTipPopupOpen, setIsInfoToolTipPopupOpen] = useState(false);
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] = useState(
    false
  );
  const [email, setEmail] = useState("");
  const [tok, setTok] = useState("");
  const history = useHistory();

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleInfoToolTip() {
    setIsInfoToolTipPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
    setIsInfoToolTipPopupOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(newUser) {
    api
      .setUserInfo(newUser)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(avatar) {
    api
      .setUserAvatar(avatar)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlace(place) {
    api
      .setPlace(place)
      .then((newCard) => {
        setCards([...cards, newCard]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .toggleLike(card._id, isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .deleteItem(card._id)
      .then(() => {
        const newCards = cards.filter((e) => e._id !== card._id);
        setCards(newCards);
      })
      .catch((err) => console.log(err));
  }

  function onRegister(...props) {
    // password, email
    setNewUser(...props)
      .then((data) => {
        if (data) {
          setIsRegistrationSuccessful(true);
          handleInfoToolTip();
          history.push("/signin");
        }
      })
      .catch((err) => {
        setIsRegistrationSuccessful(false);
        handleInfoToolTip();
        console.log(err);
      });
  }

  function onLogin(...props) {
    // password, email
    onUserLogin(...props)
      .then((data) => {
        if (data) {
          setToken(data.token);
          setTok(data.token);
          setLoggedIn(true);
          onGetContent(data.token).then((data) => {
            if (data) {
              setEmail(data.email);
            }
          });
          history.push("/");
        }
      })
      .catch((err) => {
        setIsRegistrationSuccessful(false);
        handleInfoToolTip();
        console.log(err);
      });
  }

  function onSignOut() {
    removeToken();
    setLoggedIn(false);
    history.push("/signin");
  }

  function getContent(token) {
    onGetContent(token)
      .then((data) => {
        if (data) {
          setEmail(data.email);
          setLoggedIn(true);
          history.push("/");
        }
      })
      .catch((err) => console.log(err));
  }

  function tokenCheck() {
    const token = getToken();

    if (!token) {
      return;
    }
    setTok(token);
    getContent(token);
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (tok) {
      Promise.all([api.getUserInfo(), api.getItems()])
        .then(([user, items]) => {
          setCurrentUser(user);
          setCards(items);
        })
        .catch((err) => console.log(err));
    }
  }, [tok]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="container">
        <Header email={email} onSignOut={onSignOut} />
        <Switch>
          <Route exact path="/signup">
            <Register onRegister={onRegister} />
          </Route>
          <Route exact path="/signin">
            <Login onLogin={onLogin} />
          </Route>
          <ProtectedRoute
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            setCurrentUser={setCurrentUser}
            setCards={setCards}
          ></ProtectedRoute>
        </Switch>
        <Footer />
      </div>
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlace}
      />

      <PopupWithImage card={selectedCard} onClose={closeAllPopups} />
      <InfoTooltip
        isOpen={isInfoToolTipPopupOpen}
        onClose={closeAllPopups}
        isRegistrationSuccessful={isRegistrationSuccessful}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
