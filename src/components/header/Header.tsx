import React from 'react';
import "./header.scss"
import {IWithClass} from "../../types/tehnic";
import classNames from "classnames";
import Link from 'next/link';
import {ReactSVG} from "react-svg";

interface Props extends IWithClass{

}
const Header = (props: Props) => {
  return (
      <header className={classNames("header", props.className)}>
        <div className="container header__container">
          <div className="header__left-block">
            <Link href="/" className="header__logo">
              <ReactSVG src="/Assets/Icons/logo.svg"/>
            </Link>
            <button className="header__menu-wrapp">
              <ReactSVG src="/Assets/Icons/more.svg" className="header__menu"/>
              <span>Меню</span>
            </button>
          </div>


          <button className="header__search">
            <ReactSVG src="/Assets/Icons/search.svg"/>
          </button>
        </div>
      </header>
  );
};

export default Header;
