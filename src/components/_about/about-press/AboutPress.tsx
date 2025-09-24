'use client'
import React, {useMemo} from 'react';
import "./about-press.scss"
import {IAbout} from "@/types/data";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";
import {getData} from "./getData";
import {useMediaQuery} from "react-responsive";
import BigSlider from "@/components/big-slider/BigSlider";
import {SwiperSlide} from "swiper/react";
import HtmlProcessing from "@/components/HtmlProcessing";

interface Props{
  pageData: IAbout
}

const AboutPress = ({pageData}: Props) => {
  const slides= useMemo(()=> getData(pageData.press.html), [])
  const mobileScreen = useMediaQuery({maxWidth: 660});

  return (
      <div className="about-press" id="press">
        <div className="container">
          <div className="titles-block">
            <h2 className="titles-block__title">{nonBreakingSpaces(pageData.pressTitle)}</h2>
          </div>

          <BigSlider slidesPerView={mobileScreen ? 2 : 4}>
            {
              slides.map((slide, index) => (
                  <SwiperSlide
                      key={index}
                      className="about-press__slide"
                  >
                    <a href={slide.link} target="_blank" className="about-press__item">
                      <div className="about-press__img">
                        <img src={`/Press/${slide.image}`} alt=""/>

                        <div className="about-press__hover-block">
                          <span>Читать</span>
                        </div>
                      </div>

                      <div className="about-press__caption">
                        <HtmlProcessing html={`<p>${slide.caption}</p>`}/>
                      </div>
                    </a>
                  </SwiperSlide>
              ))
            }
          </BigSlider>
        </div>
      </div>
  );
};

export default AboutPress;
