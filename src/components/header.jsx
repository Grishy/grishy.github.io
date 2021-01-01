import React from "react";
import { Link } from "gatsby";

import style from "./header.module.scss";

const menuLinks = [
  { to: "/", name: "Блог" },
  { to: "/projects", name: "Проекты" },
  { to: "/contacts", name: "Контакты" },
];


function menuLinksJSX() {
  return menuLinks.map((el) => {
    return (
      <Link
        key={el.to}
        to={el.to}
        className={style.header__nav__link}
        activeClassName={style.header__nav__linkActive}
      >
        {el.name}
      </Link>
    );
  });
}

class Header extends React.Component {
  render() {
    return (
      <div className={style.header__container}>
        <header className={`container ${style.header}`}>
          <Link to="/" className={style.header__title}>
            Sergey G.
          </Link>
          <nav className={style.header__nav}>{menuLinksJSX()}</nav>
        </header>
      </div>
    );
  }
}

export default Header;
