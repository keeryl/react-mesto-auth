import React from 'react';
import { Link, withRouter } from 'react-router-dom';

function Register (props) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    props.onLogin();
    setEmail('');
    setPassword('');
  }

  return(
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2 className="auth-form__header">Регистрация</h2>
      <fieldset className="auth-form__inputs">
        <input
          type="email"
          className="auth-form__input"
          onChange={handleEmailChange}
          value={email}
          placeholder="Email"
        >
        </input>
        <input
          type="password"
          className="auth-form__input"
          onChange={handlePasswordChange}
          value={password}
          placeholder="Пароль"
        >
        </input>
      </fieldset>
      <button
        type="submit"
        className="auth-form__submit-btn"
      >
        Зарегистрироваться
      </button>
      <p className="auth-form__text">
        Уже зарегистрированы?
        <Link
          className="auth-form__link"
          to="/sign-in"
        >
          Войти
        </Link>
      </p>
    </form>
  )
}

export default withRouter(Register);
