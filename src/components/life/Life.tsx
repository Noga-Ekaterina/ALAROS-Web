'use client'
import React, {useMemo, useRef} from 'react';
import "./life.scss"
import {IHtml, IImageSize, ILifeItem, IMediaSizes} from "@/types/data";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";
import HtmlProcessing from "@/components/HtmlProcessing";
import {Swiper, SwiperRef, SwiperSlide} from "swiper/react";
import SliderProgress from "@/components/slider-progress/SliderProgress";
import {useMediaQuery} from "react-responsive";
import {useGetRem} from "@/hoocs/useGetRem";
import SliderClue from "@/components/slider-clue/SliderClue";
import Image from "@/components/Image";

interface PropsStandard{
  life: ILifeItem[]
}
interface PropsText extends PropsStandard{
  isNotText?: false
  title: string
  signatures: IHtml[]|string
}

interface PropsNotText extends PropsStandard{
  isNotText: true
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

const Life = (props: PropsText | PropsNotText) => {
  const {life, isNotText} = props;
  const slides = useMemo(() => [...life].reverse(), [life])
  const swiperRef=useRef<SwiperRef | null>(null);

  const mobileScreen = useMediaQuery({maxWidth: 660});
  const bigDesktopScreen = useMediaQuery({minWidth: 2560});
  const rem= useGetRem()

  return (
      <div className="life" id="life">
        <div className="container">

          {!isNotText &&
            <>
              <div className="titles-block">
                <h2 className="titles-block__title titles-block__title--small">{nonBreakingSpaces(props.title)}</h2>
              </div>

              <div className="life__signatures-wrap">
                {
                  typeof props.signatures === "string" ?
                      <div className="life__signature">
                        <HtmlProcessing html={props.signatures}/>
                      </div>
                      :
                      props.signatures.map((signature, index) => (
                          <div key={index} className="life__signature">
                            <HtmlProcessing html={signature.text}/>
                          </div>
                      ))
                }
              </div>
            </>
          }

          <SliderProgress swiperRef={swiperRef} progressClass="life__progress"/>
          <div className="life__slider">
            <Swiper
                slidesPerView="auto"
                spaceBetween={(bigDesktopScreen? 8: mobileScreen? 7:10)*rem}
                ref={swiperRef}
            >
              {
                slides.map((slide) => (
                    <SwiperSlide
                        key={slide.image.id}
                        className={`life__slide life__slide--${slide.size}`}
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

export default Life;
