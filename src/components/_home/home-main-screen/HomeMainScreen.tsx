'use client'
import React, {useEffect, useRef, useState} from 'react';
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
import {useGetRem} from "@/hoocs/useGetRem";
import {useMediaQuery} from "react-responsive";

interface Props{
  homeData: IHomeData
}

const HomeMainScreen = ({homeData}: Props) => {
  const [diagonalWidth, setDiagonalWidth] = useState(0)
  const [diagonalDeg, setDiagonalDeg] = useState(0)
  const [diagonalRight, setDiagonalRight] = useState(0)
  const rem= useGetRem()
  const block= useRef<HTMLDivElement>(null)
  const mobileScreen = useMediaQuery({maxWidth: 660});
  const mdBoockScreen = useMediaQuery({minWidth: 660.1, minHeight: "80vw"});

  useEffect(() => {
    if (!block.current) return

    const width= block.current.clientWidth/ ((mobileScreen || mdBoockScreen)?1: 2)
    const height= block.current.clientHeight/2
    const diagonal= Math.sqrt(Math.pow(width, 2)+Math.pow(height, 2))

    console.log(height/diagonal)

    setDiagonalWidth(diagonal)
    setDiagonalDeg(Math.asin(height/diagonal) * (180 / Math.PI)* (mobileScreen? 1: -1))
    setDiagonalRight((diagonal-width)/2)
  }, [rem]);

  return (
      <div className="main-screen home-main-screen">
        <div className="home-main-screen__slider-wrapp" ref={block}>
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
                      <div className="home-main-screen__diagonal" style={{width: `${diagonalWidth}px`, transform: ` rotate(${diagonalDeg}deg)`, right: block.current? `-${diagonalRight}px`:''}}></div>
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
