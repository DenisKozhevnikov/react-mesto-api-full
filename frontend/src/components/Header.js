/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link, useLocation } from 'react-router-dom';

function Header({ email, onSignOut }) {
  const location = useLocation();

  return (
    <header className="header">
      <Link to="/" className="header__logo">Mesto</Link>
      <div className="header__container">
      {
        location.pathname === "/signin" ? (
          <Link to="/signup" className="header__link">
            Зарегистрироваться
          </Link>
        ) : location.pathname === "/signup" ? (
          <Link to="/signin" className="header__link">
            Войти
          </Link>
        ) : (
          <>
            <p className="header__item">{email}</p>
            <button onClick={onSignOut} className="header__button">
              Выйти
            </button>
          </>
        )
      }
      </div>
    </header>
  );
}

export default Header;