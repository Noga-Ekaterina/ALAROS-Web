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

interface Props{
  homeData: IHomeData
}

const HomeMainScreen = ({homeData}: Props) => {
  const searchParams= useSearchParams()
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
                  <SwiperSlide>
                    <Link
                        href={buildLink("/", searchParams, {project: String(project.number), projectYear: String(project.year)})}
                          className="home-main-screen__slide-content"
                    >
                      <img src={`/Assets/Projects/${project.year}/Project_${project.number}/cover.jpg`} alt="" className="main-screen__img"/>
                      <div className="home-main-screen__slide-title-wrapp">
                        <h2 className='home-main-screen__slide-title'>{nonBreakingSpaces(homeData.mainTitle)}</h2>
                      </div>
                      <div className="main-screen__signature-wrapp">
                        <strong className="main-screen__signature">{project.homeSignature && nonBreakingSpaces(project.homeSignature)}</strong>
                      </div>
                    </Link>
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
