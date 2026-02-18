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
import {useGetRem} from "@/hoocs/useGetRem";
import Image from "@/components/Image";

interface Props{
  pageData: IAbout
}

const AboutPress = ({pageData}: Props) => {
  const mobileScreen = useMediaQuery({maxWidth: 660});
  const bigDesktopScreen = useMediaQuery({minWidth: 2560});
  const rem= useGetRem()


  return (
      <div className="about-press" id="press">
        <div className="container">
          <div className="titles-block">
            <h2 className="titles-block__title">{nonBreakingSpaces(pageData.pressTitle)}</h2>
          </div>

          <BigSlider slidesPerView={mobileScreen ? 2 : 4} spaceBetween={(bigDesktopScreen? 8: mobileScreen? 7:10)*rem}>
            {
              pageData.press.map((slide, index) => (
                  <SwiperSlide
                      key={index}
                      className="about-press__slide"
                  >
                    <a href={slide.link} target="_blank" className="about-press__item">
                      <div className="about-press__img">
                        <Image
                          image={slide.image}
                          size="xs"
                          mediaSizes={{
                            bigDesktop: "medium",
                            desktop: "small"
                          }}
                        />

                        <div className="about-press__hover-block">
                          <span>Читать</span>
                        </div>
                      </div>

                      <div className="about-press__caption">
                        <p>{nonBreakingSpaces(slide.caption)}</p>
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
