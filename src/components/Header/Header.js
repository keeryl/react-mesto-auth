import logo from '../../blocks/header/images/logo__img.svg';

function Header () {
  return (
    <header className="header">
      <a className="header__logo header__logo_margin-left" href="#" target="_self">
      <img className="header__logo-img" src={logo} alt="Логотип в виде слов Mesto Russia"/>
      </a>
  </header>
  );
}

export default Header;

