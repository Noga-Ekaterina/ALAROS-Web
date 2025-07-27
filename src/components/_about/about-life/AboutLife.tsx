'use client'
import React, {useRef} from 'react';
import "./about-life.scss"
import {IAbout} from "@/types/data";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";
import HtmlProcessing from "@/components/HtmlProcessing";
import {Swiper, SwiperRef, SwiperSlide} from "swiper/react";
import {getData} from "@/components/_about/about-life/getData";
import SliderProgress from "@/components/slider-progress/SliderProgress";
import {useMediaQuery} from "react-responsive";
import {useGetRem} from "@/hoocs/useGetRem";
import SliderClue from "@/components/slider-clue/SliderClue";

interface Props{
  pageData: IAbout
}

const AboutLife = ({pageData}: Props) => {
  const slides= getData(pageData.life.html)
  const swiperRef=useRef<SwiperRef | null>(null);

  const bigDesktopScreen = useMediaQuery({minWidth: 2560});
  const rem= useGetRem()

  return (
      <div className="about-life">
        <div className="container">
          <div className="titles-block">
            <h2 className="titles-block__title titles-block__title--small">{nonBreakingSpaces(pageData.lifeTitle)}</h2>
          </div>

          <div className="about-life__signature">
            <HtmlProcessing html={pageData.lifeSignature.html}/>
          </div>

          <SliderProgress swiperRef={swiperRef} progressClass="about-life__progress"/>
          <div className="about-life__slider">
            <Swiper
                slidesPerView="auto"
                spaceBetween={(bigDesktopScreen ? 8 : 10) * rem} ref={swiperRef}
            >
              {
                slides.map((slide, index) => (
                    <SwiperSlide
                        key={index}
                        className={`about-life__slide about-life__slide--${slide.size}`}
                    >
                      <img src={`/Assets/Pages/About/Life/${slide.image}`} alt=""/>
                      <HtmlProcessing html={`<p>${slide.caption}</p>`}/>
                    </SwiperSlide>
                ))
              }
            </Swiper>
            <SliderClue/>
          </div>
        </div>
      </div>
  );
};

export default AboutLife;
