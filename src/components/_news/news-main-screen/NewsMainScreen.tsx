import React from 'react';
import './news-main-screen.scss'
import {INews} from "@/types/data";
interface Props{
  data: INews
}
const NewsMainScreen = ({data}: Props) => {
  return (
      <div className="main-screen news-main-screen">
        <div className="news-main-screen__block-text">
          <h1 className="news-main-screen__title">{data.title}</h1>
        </div>

        <div className="news-main-screen__img-wrapp">
          <img src="/Assets/Page/2023/Project_5/cover.jpg" alt="" className="main-screen__img"/>
          <div className="news-main-screen__elipse"></div>

          <div className="main-screen__signature-wrapp">
            <strong className="main-screen__signature news-main-screen__signature">Конкурсная работа «Лесной сад Вероникас» © ООО «Сакура», 2023</strong>
          </div>
        </div>
      </div>
  );
};

export default NewsMainScreen;