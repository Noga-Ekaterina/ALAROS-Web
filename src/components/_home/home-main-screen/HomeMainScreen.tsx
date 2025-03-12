'use client'
import React from 'react';
import "./home-main-screen.scss"
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import 'swiper/css/effect-fade';
import {EffectFade, Autoplay} from "swiper/modules";
import HtmlProcessing from "../../HtmlProcessing";
import {IHomeData} from "@/types/data";
import project from "@/components/_projects/project/Project";
import {useSearchParams} from "next/navigation";
import {buildLink} from "@/utils/buildLink";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";
import MainScreenProject from "@/components/_projects/main-screen-project/MainScreenProject";

interface Props{
  homeData: IHomeData
}

const HomeMainScreen = ({homeData}: Props) => {
  return (
      <div className="main-screen home-main-screen">
        <div className="home-main-screen__slider-wrapp">
          <Swiper
              className="home-main-screen__slider"
              loop={true}
              modules={[EffectFade, Autoplay]}
              effect="fade"
              autoplay={{delay: 3500, disableOnInteraction: false}}
          >
            {
              homeData.projects.map(project=>(
                  <SwiperSlide key={`${project.year}-${project.number}`}>
                    <MainScreenProject project={project} className="home-main-screen__slide-content" >
                      <div className="home-main-screen__slide-title-wrapp">
                        <h2 className='home-main-screen__slide-title'>{nonBreakingSpaces(homeData.mainTitle)}</h2>
                      </div>
                    </MainScreenProject>
                  </SwiperSlide>
              ))
            }
          </Swiper>
        </div>
        <aside className="home-main-screen__aside">
          <div className="home-main-screen__aside-ellipse-wrapp">
            <div className="home-main-screen__aside-ellipse"></div>
          </div>

          <HtmlProcessing html={homeData.mainSection.html}/>
        </aside>
      </div>
  );
};

export default HomeMainScreen;
