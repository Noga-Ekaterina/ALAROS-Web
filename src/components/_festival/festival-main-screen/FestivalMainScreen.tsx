import React from 'react';
import './festival-main-screen.scss'
const FestivalMainScreen = () => {
  return (
      <div className="main-screen festival-main-screen">
        <div className="festival-main-screen__block-text">
          <h1 className="festival-main-screen__title">Национальная премия России по ландшафтной архитектуре <br/>
            и садово-парковому искусству — главное событие года в отрасли</h1>

          <a href="" className="festival-main-screen__link link-underline festival-main-screen__link--1">Расписание защит 2024</a>
        </div>

        <div className="festival-main-screen__img-wrapp">
          <img src="/Assets/Pages/Festival/Images/Main.png" alt="" className="main-screen__img festival-main-screen__img"/>
          <div className="festival-main-screen__btns">
            <div className="festival-main-screen__btn festival-main-screen__btn--red">
              <h2 className="festival-main-screen__title2">Деловая <br/>
                программа</h2>
              <a href="" className="festival-main-screen__link link-underline">Изучить</a></div>
            <div className="festival-main-screen__btn festival-main-screen__btn--green">
              <h2 className="festival-main-screen__title2">Архив <br/>
                премии</h2>
              <a href="" className="festival-main-screen__link link-underline">Смотреть работы</a></div>
          </div>
        </div>
      </div>
  );
};

export default FestivalMainScreen