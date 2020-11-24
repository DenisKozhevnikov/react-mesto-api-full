import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import AuthForm from './AuthForm';

function Register({ onRegister }) {
  const emailRef = useRef("");
  const passwordRef = useRef("");

  function onSubmit(e) {
    e.preventDefault();

    onRegister(passwordRef.current.value, emailRef.current.value)
  }

  return (
    <AuthForm name="login" title="Регистрация" submitText="Зарегистрироваться" onSubmit={onSubmit} emailRef={emailRef} passwordRef={passwordRef}>
      <Link className="auth__link" to="/signin">Уже зарегистрированы? Войти</Link>
    </AuthForm>
  )  
}

export default Register;