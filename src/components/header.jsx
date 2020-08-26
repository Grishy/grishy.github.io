import React from "react";
import classNames from "classnames/bind";
import { Link } from "gatsby";

import style from "./header.module.scss";

const LIST = [
  {
    to: "/about",
    title: "Обо мне",
  },
];
class Header extends React.Component {
  render() {
    const listItems = LIST.map((el) => (
      <li key={el.to}>
        <Link title={el.title} to={el.to}>
          {el.title}
        </Link>
      </li>
    ));

    return (
      <header className={`container ${style.header}`}>
        <Link to="/" className={style.title}>
          Grishy
        </Link>

        <ul className={style.navigation}>{listItems}</ul>
      </header>
    );
  }
}

export default Header;
