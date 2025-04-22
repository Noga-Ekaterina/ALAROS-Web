'use client'
import React, {useRef, useState} from 'react';
import "./big-slider.scss"
import {IWithChildren, IWithClass} from "../../types/tehnic";
import classNames from "classnames";
import {ReactSVG} from "react-svg";
import {Swiper, SwiperRef} from "swiper/react";
import {SwiperNavigation} from "../../utils/SwiperNavigation";
import SliderClue from "@/components/slider-clue/SliderClue";
import {useGetRem} from "@/hoocs/useGetRem";
import {useMediaQuery} from "react-responsive";

interface IProps extends IWithChildren, IWithClass{
  slidesPerView: number
}

const BigSlider = (props: IProps) => {
  const сontainerRef=useRef<null>(null);

  const swiperRef=useRef<SwiperRef | null>(null);
  const swiperNav= new SwiperNavigation(swiperRef)
  const [swiperIsStart, setSwiperIsStart] = useState(true)
  const [swiperIsEnd, setSwiperIsEnd] = useState(false)

  const bigDesktopScreen = useMediaQuery({minWidth: 2560});
  const rem= useGetRem()

  function togleSwiper  (){
    setSwiperIsStart(swiperNav.isStart())
    setSwiperIsEnd(swiperNav.isEnd(props.slidesPerView))
  }

  return (
      <div className="big-slider" ref={сontainerRef}>
        <button
            className={classNames(
                "big-slider__btn",
                "big-slider__btn--prev",
                swiperIsStart && "btn--disable"
            )}
            onClick={() => swiperNav.goToPrev()}
        >
          <ReactSVG src="/Assets/Icons/arrow.svg"/>
        </button>
        <Swiper
            slidesPerView="auto"
            spaceBetween={(bigDesktopScreen? 8:10)*rem}
            ref={swiperRef}
            onActiveIndexChange={togleSwiper}
        >
          {props.children}
        </Swiper>
        <button
            className={classNames(
                "big-slider__btn",
                "big-slider__btn--next",
                swiperIsEnd && "btn--disable"
            )}
            onClick={() => swiperNav.goToNext()}
        >
          <ReactSVG src="/Assets/Icons/arrow.svg"/>
        </button>
        <SliderClue parentRef={сontainerRef}/>
      </div>

  );
};

export default BigSlider;
