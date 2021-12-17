import React from 'react';
import { withRouter } from 'react-router-dom';
import auth from '../../utils/Auth';

function Login (props) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    auth.authorize(password, email)
      .then(res => {
        if(res) {
          console.log(res);
          localStorage.setItem('token', res.token);
          console.log(localStorage);
          props.history.push('/');
          props.onLogin();
          setEmail('');
          setPassword('');
        }
      })
      .catch(err => console.log(err));

  }

  return(
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2 className="auth-form__header">Вход</h2>
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
