'use client'
import React, {useRef, useState} from 'react';
import "./big-slider.scss"
import {IWithChildren, IWithClass} from "../../types/tehnic";
import classNames from "classnames";
import {ReactSVG} from "react-svg";
import {Swiper, SwiperRef} from "swiper/react";
import {SwiperNavigation} from "../../utils/SwiperNavigation";

interface IProps extends IWithChildren, IWithClass{
  slidesPerView: number
}

const BigSlider = (props: IProps) => {
  const swiperRef=useRef<SwiperRef | null>(null);
  const swiperNav= new SwiperNavigation(swiperRef)
  const [swiperIsStart, setSwiperIsStart] = useState(true)
  const [swiperIsEnd, setSwiperIsEnd] = useState(false)

  function togleSwiper  (){
    setSwiperIsStart(swiperNav.isStart())
    setSwiperIsEnd(swiperNav.isEnd(props.slidesPerView))
  }

  return (
      <div className="big-slider">
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
            spaceBetween={"10rem"}
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
      </div>

  );
};

export default BigSlider;
