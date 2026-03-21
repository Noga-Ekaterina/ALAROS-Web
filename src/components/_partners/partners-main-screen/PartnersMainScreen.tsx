'use client'
import React from 'react';
import './partners-main-screen.scss'
import HtmlProcessing from "../../HtmlProcessing";
import MainScreenImageLink from "@/components/main-screen-image-link/MainScreenImageLink";
import {IPartners} from "@/types/data";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/effect-fade';
import { Autoplay, EffectFade } from "swiper/modules";

interface Props{
  pageData: IPartners
}

const PartnersMainScreen = ({pageData}: Props) => {
  return (
      <div className="main-screen partners-main-screen">
        <div className="partners-main-screen__block-text">
          <div className="main-screen__bg" style={{backgroundImage: 'url("/Assets/Pages/Partners/1.svg")'}}/>

          <HtmlProcessing html={pageData.mainScreenLeftSection}/>
        </div>

        <div className="partners-main-screen__slider-wrapp">
          <Swiper
              className="partners-main-screen__slider"
              loop={pageData.mainScreenImages.length > 1}
              modules={[EffectFade, Autoplay]}
              effect="fade"
              autoplay={{delay: 3500, disableOnInteraction: false}}
          >
            {pageData.mainScreenImages.map((image, index) => (
                <SwiperSlide key={`${image.link}-${index}`}>
                  <MainScreenImageLink item={image} className="partners-main-screen__img-wrapp" isShowGrid/>
                </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
  );
};

export default PartnersMainScreen
