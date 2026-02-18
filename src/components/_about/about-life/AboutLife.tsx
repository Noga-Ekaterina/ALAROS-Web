'use client'
import React, {useMemo, useRef} from 'react';
import "./about-life.scss"
import {IAbout, IImageSize, ILifeItem, IMediaSizes} from "@/types/data";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";
import HtmlProcessing from "@/components/HtmlProcessing";
import {Swiper, SwiperRef, SwiperSlide} from "swiper/react";
import SliderProgress from "@/components/slider-progress/SliderProgress";
import {useMediaQuery} from "react-responsive";
import {useGetRem} from "@/hoocs/useGetRem";
import SliderClue from "@/components/slider-clue/SliderClue";
import Image from "@/components/Image";

interface Props{
  pageData: IAbout
}

const sizes: Record<ILifeItem['size'], {size: IImageSize, mediaSizes: IMediaSizes}>={
  horizontal:{
    size: "xs",
    mediaSizes:{
      bigDesktop: "large",
      desktop: "medium",
      laptop: "medium"
    }
  },
  "horizontal-small":{
    size: "xs",
    mediaSizes:{
      bigDesktop: "medium",
      desktop: "small"
    }
  },
  vertical:{
    size: "xs",
    mediaSizes:{
      bigDesktop: "large",
      desktop: "medium",
      laptop: "medium"
    }
  },
  square:{
    size: "xs",
    mediaSizes:{
      bigDesktop: "medium",
      desktop: "small"
    }
  }
}

const AboutLife = ({pageData}: Props) => {
  const slides= useMemo(()=> [...pageData.life].reverse(), [])
  const swiperRef=useRef<SwiperRef | null>(null);

  const mobileScreen = useMediaQuery({maxWidth: 660});
  const bigDesktopScreen = useMediaQuery({minWidth: 2560});
  const rem= useGetRem()

  return (
      <div className="about-life" id="life">
        <div className="container">
          <div className="titles-block">
            <h2 className="titles-block__title titles-block__title--small">{nonBreakingSpaces(pageData.lifeTitle)}</h2>
          </div>

          <div className="about-life__signature">
            <HtmlProcessing html={pageData.lifeSignature}/>
          </div>

          <SliderProgress swiperRef={swiperRef} progressClass="about-life__progress"/>
          <div className="about-life__slider">
            <Swiper
                slidesPerView="auto"
                spaceBetween={(bigDesktopScreen? 8: mobileScreen? 7:10)*rem}
                ref={swiperRef}
            >
              {
                slides.map((slide, index) => (
                    <SwiperSlide
                        key={slide.image.id}
                        className={`about-life__slide about-life__slide--${slide.size}`}
                    >
                      <Image image={slide.image} size={sizes[slide.size].size} mediaSizes={sizes[slide.size].mediaSizes}/>
                      <p>{nonBreakingSpaces(slide.image.caption)}</p>
                    </SwiperSlide>
                ))
              }
            </Swiper>
            <SliderClue threshold={0.65}/>
          </div>
        </div>
      </div>
  );
};

export default AboutLife;
