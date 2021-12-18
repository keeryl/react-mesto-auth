import logo from '../../blocks/header/images/logo__img.svg';
import { Link, useHistory, useLocation } from 'react-router-dom';


function Header (props) {
  
  const history = useHistory();
  let location = useLocation();
  const buttonText = `${location.pathname === "/sign-up"? "Войти" : "Регистрация"}`;
  const path = `${location.pathname === "/sign-up"? "/sign-in" : "/sign-up"}`
  const user = JSON.parse(localStorage.getItem('user'))

  const signOut = () => {
    localStorage.removeItem('token');
    props.onLogout();
    history.push('/sign-up');
  }

  return (
    <header className="header">
      <Link className="header__logo header__logo_margin-left" to="/" target="_self">
      <img className="header__logo-img" src={logo} alt="Логотип в виде слов Mesto Russia"/>
      </Link>
      {props.loggedIn ?
          (
          <div className="header__wrapper">
          <p className="header__email">{user.email}</p>
          <button className="header__btn" onClick={signOut}>Выйти</button>
          </div>
          )
          :
          (
            <Link className="header__link" to={path}>{buttonText}</Link>
          )
      }
    </header>
  );
}

export default Header;

