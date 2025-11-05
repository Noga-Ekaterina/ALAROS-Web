'use client'
import React from 'react';
import "./header.scss"
import {IWithClass} from "../../types/tehnic";
import classNames from "classnames";
import Link from 'next/link';
import {ReactSVG} from "react-svg";
import store from "@/store/store";

interface Props extends IWithClass{
  isMenuOpened?: boolean
}

const Header = ({className, isMenuOpened}: Props) => {
  const {togleMenu}=store

  return (
      <header className={classNames("header", className, {"header--menu": isMenuOpened})}>
        <div className="container header__container">
          <div className="header__left-block">
            <Link href="/" className="header__logo" onClick={()=> isMenuOpened && togleMenu()}>
              <ReactSVG src="/Assets/Icons/logo.svg"/>
            </Link>
            <button className="header__menu-wrapp" onClick={togleMenu}>
              <ReactSVG src={`/Assets/Icons/${isMenuOpened? "close":"more"}.svg`} className="header__menu"/>
              <span>Меню</span>
            </button>
          </div>


          {/*<button className="header__search">*/}
          {/*  <ReactSVG src="/Assets/Icons/search.svg"/>*/}
          {/*</button>*/}

          <Link href="/contacts" className="header__contacts" onClick={()=> isMenuOpened && togleMenu()}>
            <ReactSVG src="/Assets/Icons/contacts.svg"/>
          </Link>
        </div>
      </header>
  );
};

export default Header;
