import React from 'react';
import { withRouter } from 'react-router-dom';

function Login (props) {

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
      <h2 className="auth-form__header">Войти</h2>
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
        className="auth-form__submit-btn"
        type="submit"
      >
        Войти
      </button>
    </form>
  )
}

export default withRouter(Login);
