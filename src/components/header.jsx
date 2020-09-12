import React from "react";
import { Link } from "gatsby";

import style from "./header.module.scss";

class Header extends React.Component {
  render() {
    return (
      <header className={style.header}>
        <div className={style.one_third}>{/* Plug */}</div>
        <div className={style.one_third}>
          <Link to="/" className={`${style.title}`}>
            Grishy
          </Link>
        </div>
        <div className={style.one_third}>
          <Link className={style.about} to={"/about"}>
            Обо мне
          </Link>
        </div>
      </header>
    );
  }
}

export default Header;
