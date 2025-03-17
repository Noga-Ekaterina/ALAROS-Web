'use client'
import React, {FC, useEffect, useRef, useState} from 'react';
import "./partners-slider.scss"
import {Swiper, SwiperRef, SwiperSlide} from "swiper/react";
import {SwiperNavigation} from "../../utils/SwiperNavigation";
import {IPartner} from "@/types/data";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";

interface Props{
  title: string
  partners: IPartner[]
}

const PartnersSliderClient = ({title, partners}:Props) => {
  const swiperRef = useRef<SwiperRef>(null);
  const swiperNav= new SwiperNavigation(swiperRef)
  let timeout: ReturnType<typeof setTimeout>
  let interval: ReturnType<typeof setInterval>;

  const togleSwiper=(dir?: "next" | "prev")=>{
    clearTimeout(timeout)
    clearInterval(interval)

    const step=()=>{
      if (dir=="next")
        swiperNav.goToNext()
      else
        swiperNav.goToPrev()
    }

    step()

    interval= setInterval( step, 400)

    setTimeout(()=>{
      clearInterval(interval)
      timeout= setTimeout(()=>togleSwiper("next"), 5000)
    },2000)
  }

  useEffect(() => {
    togleSwiper()

    return ()=> {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, []);

  return (
      <>
        <div className="container titles-block partners-slider-title">
          <h2 className="titles-block__title titles-block__title--small">{nonBreakingSpaces(title)}</h2>
        </div>
        <div className="partners-slider">
          <button className="partners-slider__btn partners-slider__btn--prev" onClick={() => togleSwiper("prev")}>
            <img src="/Assets/Icons/arrow.svg" alt=''/>
          </button>
          <Swiper
              slidesPerView={5}
              spaceBetween={"30rem"}
              loop={true}
              className="partners-slider__swiper"
              ref={swiperRef}
          >
            {
              partners.map(partner => (
                  <SwiperSlide key={`${partner.image}-${partner.link}`} className="partners-slider__slide">
                    {
                      partner.link === "" ? <img src={`/Assets/Pages/Logo-partners/${partner.image}`}/> :
                          <a href={partner.link} target="_blank">
                            <img src={`/Assets/Pages/Logo-partners/${partner.image}`}/>
                          </a>
                    }
                  </SwiperSlide>
              ))
            }
          </Swiper>
          <button className="partners-slider__btn partners-slider__btn--next" onClick={() => togleSwiper("next")}>
            <img src="/Assets/Icons/arrow.svg" alt=''/>
          </button>
        </div>
      </>
  );
};

export default PartnersSliderClient
