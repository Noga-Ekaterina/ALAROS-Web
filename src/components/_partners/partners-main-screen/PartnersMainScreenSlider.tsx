'use client'
import React from 'react';
import MainScreenImageLink from "@/components/main-screen-image-link/MainScreenImageLink";
import {IMainScreenImage} from "@/types/data";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/effect-fade';
import { Autoplay, EffectFade } from "swiper/modules";

interface Props {
  images: IMainScreenImage[]
}

const PartnersMainScreenSlider = ({images}: Props) => {
  return (
      <Swiper
          className="partners-main-screen__slider"
          loop={images.length > 1}
          modules={[EffectFade, Autoplay]}
          effect="fade"
          autoplay={{delay: 3500, disableOnInteraction: false}}
      >
        {images.map((image, index) => (
            <SwiperSlide key={`${image.link}-${index}`}>
              <MainScreenImageLink item={image} className="partners-main-screen__img-wrapp" isShowGrid/>
            </SwiperSlide>
        ))}
      </Swiper>
  );
};

export default PartnersMainScreenSlider;
