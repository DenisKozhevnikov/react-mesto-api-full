import React, { useRef } from 'react';
import AuthForm from './AuthForm';

function Login({onLogin}) {
  const emailRef = useRef("");
  const passwordRef = useRef("");

  function onSubmit(e) {
    e.preventDefault();

    onLogin(passwordRef.current.value, emailRef.current.value);
  }

  return (
    <AuthForm name="login" title="Вход" submitText="Войти" onSubmit={onSubmit} emailRef={emailRef} passwordRef={passwordRef} />
  )  
}

export default Login;