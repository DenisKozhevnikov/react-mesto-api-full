import React from 'react';


function AuthForm({
  name,
  title,
  submitText,
  children,
  onSubmit,
  emailRef,
  passwordRef
}) {
  return (
    <div className="auth">
      <form onSubmit={onSubmit} action="#" method="post" className="form" name={name}>
        <h2 className="form__heading form__heading_auth">{title}</h2>
        <fieldset className="form__inputs">
          <input ref={emailRef} className="form__input form__input_auth" id="email-input" name="email" type="email" placeholder="Email" required minLength="2" maxLength="40"></input>
          <input ref={passwordRef} className="form__input form__input_auth" id="password-input" name="password" type="password" placeholder="Пароль" required minLength="2" maxLength="40"></input>
        </fieldset>
        <button type="submit" className="form__button form__button_auth">{submitText}</button>
      </form>
      {children}
    </div>
  )  
}

export default AuthForm;

