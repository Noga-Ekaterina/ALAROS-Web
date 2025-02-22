import React from 'react';
import './news-main-screen.scss'
import {INews} from "@/types/data";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";
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
          <img src={`/Assets/Pages/News/${data.mainScreenPhoto}`} alt="" className="main-screen__img"/>
          <div className="news-main-screen__elipse"></div>

          <div className="main-screen__signature-wrapp">
            <strong className="main-screen__signature news-main-screen__signature">{nonBreakingSpaces(data.mainScreenPhotoSignature)}</strong>
          </div>
        </div>
      </div>
  );
};

export default NewsMainScreen;