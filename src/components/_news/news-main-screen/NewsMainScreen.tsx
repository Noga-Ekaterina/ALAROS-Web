import React from 'react';
import './news-main-screen.scss'
const NewsMainScreen = () => {
  return (
      <div className="main-screen news-main-screen">
        <div className="news-main-screen__block-text">
          <h1 className="news-main-screen__title">Мы — объединение российских специалистов в&nbsp;области ландшафтной архитектуры, градостроительства  и&nbsp;ландшафтного планирования</h1>
        </div>

        <div className="news-main-screen__img-wrapp">
          <img src="/Assets/Projects/5.jpg" alt="" className="main-screen__img"/>
          <div className="news-main-screen__elipse"></div>

          <div className="main-screen__signature-wrapp">
            <strong className="main-screen__signature news-main-screen__signature">Конкурсная работа «Лесной сад Вероникас» © ООО «Сакура», 2023</strong>
          </div>
        </div>
      </div>
  );
};

export default NewsMainScreen;