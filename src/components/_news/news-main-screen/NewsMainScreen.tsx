import React from 'react';
import './news-main-screen.scss'
import {INews} from "@/types/data";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";
import MainScreenProject from "@/components/_projects/main-screen-project/MainScreenProject";
interface Props{
  data: INews
}
const NewsMainScreen = ({data}: Props) => {
  return (
      <div className="main-screen news-main-screen">
        <div className="news-main-screen__block-text">
          <div className="main-screen__bg" style={{backgroundImage: 'url("/Assets/Pages/News/bg/1.svg")'}}/>
          <h1 className="news-main-screen__title">{nonBreakingSpaces(data.mainTitle)}</h1>
        </div>

        <MainScreenProject project={data.mainScreenProject} className="news-main-screen__img-wrapp">
        <div className="news-main-screen__elipse"></div>
        </MainScreenProject>
      </div>
  );
};

export default NewsMainScreen;