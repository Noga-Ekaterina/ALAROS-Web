import React from 'react';
import "./footer.scss"
import Link from 'next/link';

const Footer = () => {
  return (
      <footer className="footer">
        <div className="container footer__container">
          <div className="footer__item footer__adres">
            <h2 className="footer__title">Адрес</h2>
            <p>Гранатный пер., д. 7, стр. 1 офис 44
              Москва, Россия</p>
          </div>
          <div className="footer__item footer__info">
            <h2 className="footer__title">Информация</h2>
            <ul>
              <li><Link href="/">Об ассоциации</Link></li>
              <li><Link href="/festival-main">Фестиваль</Link></li>
              <li><Link href="/">Партнерам</Link></li>
            </ul>
          </div>
          <div className="footer__item footer__contacts">
            <h2 className="footer__title">Контакты</h2>
            
            <div className="footer__contacts-links">
              <ul>
                <li><a href="tel:+7 (495) 697-35-77">+7 (495) 697-35-77</a></li>
                <li><a href="mailto:alarosinfo@gmail.com">alarosinfo@gmail.com</a></li>
              </ul>

              <div className="footer__social">
                <a href="https://www.youtube.com/channel/UCavMl2BiYh3MtYOR8GjqCLg">YouTube</a>
                <span>|</span>
                <a href="https://vk.com/club89899478?t2fs=acac140d4e0de4abcd_2">Vk</a>
                <span>|</span>
                <a href="https://t.me/alaros_russia">Tg</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
  );
};

export default Footer;
