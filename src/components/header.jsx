import React from "react";
import classNames from "classnames/bind";
import { Link } from "gatsby";
import { Motion, spring, presets } from "react-motion";
import { RemoveScrollBar } from "react-remove-scroll-bar";

import style from "./header.module.scss";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elems: [
        {
          to: "/about",
          title: "Обо мне"
        }
      ],
      toggle: false
    };
  }

  render() {
    const listItems = this.state.elems.map(el => (
      <li key={el.to}>
        <Link title={el.title} to={el.to}>
          {el.title}
        </Link>
      </li>
    ));

    return (
      <header
        className={classNames({
          container: true,
          [style.header]: true
        })}
      >
        <Link to="/" className={style.title}>
          Grishy
        </Link>

        <ul className={style.navigation}>{listItems}</ul>
      </header>
    );
  }
}

export default Header;
