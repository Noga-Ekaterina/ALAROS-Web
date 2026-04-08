import React, {} from 'react';
import 'swiper/css/effect-fade';
import HtmlProcessing from "../../HtmlProcessing";
import {IHomeData} from "@/types/data";
import HomeMainScreenSlider from './HomeMainScreenSlider';

interface Props{
  homeData: IHomeData
}

const HomeMainScreen = ({homeData}: Props) => {
  return (
      <div className="main-screen home-main-screen">
        <HomeMainScreenSlider projects={homeData.projects} mainTitle={homeData.mainTitle} />
        <aside className="home-main-screen__aside">
          <div className="home-main-screen__aside-ellipse-wrapp">
            <div className="home-main-screen__aside-ellipse"></div>
          </div>

          <div className="main-screen__bg" style={{backgroundImage: 'url("/Assets/Pages/Home/bg/1.svg")'}}/>

          <HtmlProcessing html={homeData.mainSection}/>
        </aside>
      </div>
  );
};

export default HomeMainScreen;
