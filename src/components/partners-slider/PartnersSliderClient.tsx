'use client'
import React, {FC, useEffect, useRef, useState} from 'react';
import "./partners-slider.scss"
import {Swiper, SwiperRef, SwiperSlide} from "swiper/react";
import {SwiperNavigation} from "../../utils/SwiperNavigation";
import {IPartner} from "@/types/data";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";
import {Autoplay} from "swiper/modules";
import {useMediaQuery} from "react-responsive";
import {useGetRem} from "@/hoocs/useGetRem";

interface Props{
  partners: IPartner[]
  slidesPerView?: number
  slidesPerViewMobile?: number
  slidesPerViewBigDesktop?: number
}

const PartnersSliderClient = ({partners, slidesPerView=6, slidesPerViewMobile=2, slidesPerViewBigDesktop=7}:Props) => {
  const swiperRef = useRef<SwiperRef>(null);
  const swiperNav= new SwiperNavigation(swiperRef)
  const mobileScreen = useMediaQuery({maxWidth: 660});
  const bigDesktopScreen = useMediaQuery({minWidth: 2560});
  const rem=useGetRem()

  const togleSwiper=(dir?: "next" | "prev")=>{
    if (dir=="next")
      swiperNav.goToNext()
    else
      swiperNav.goToPrev()
  }

  return (
      <>
        <div className="partners-slider">
          <button className="partners-slider__btn partners-slider__btn--prev" onClick={() => togleSwiper("prev")}>
            <img src="/Assets/Icons/arrow.svg" alt=''/>
          </button>
          <Swiper
              slidesPerView={mobileScreen? slidesPerViewMobile: bigDesktopScreen? slidesPerViewBigDesktop:slidesPerView}
              spaceBetween={15*rem}
              autoplay={{delay: 2000, disableOnInteraction: false}}
              loop={true}
              modules={[Autoplay]}
              className="partners-slider__swiper"
              ref={swiperRef}
          >
            {
              partners.map((partner, index) => (
                  <SwiperSlide key={`${partner.image}-${index}`} className="partners-slider__slide">
                    {
                      partner.link === "" ? <img src={`/Assets/Pages/Logo-partners/${partner.image}`} alt=""/> :
                          <a href={partner.link} target="_blank">
                            <img src={`/Assets/Pages/Logo-partners/${partner.image}`} alt=""/>
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
