'use client'
import React, {FC, useEffect, useRef, useState} from 'react';
import "./logos-slider.scss"
import {clearTimers, observer} from "mobx-react-lite";
import {Swiper, SwiperRef, SwiperSlide} from "swiper/react";
import {SwiperNavigation} from "../../../utils/SwiperNavigation";
import arrow from '../../../public/images/arrow.svg';
import pagesData from "@/store/pagesData";

const LogosSlider: FC = (props) => {
  const {homeData}=pagesData
  const [slides, setSlides] = useState<JSX.Element[]|null>(null)
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
      timeout= setTimeout(()=>togleSwiper("next"), 6000)
    },2000)
  }

  // useEffect(() => {
  //   if (!homeData) return
  //
  //   const result: JSX.Element[]=[]
  //   homeData.partners.forEach( (partner)=>{
  //     result.push(
  //         <SwiperSlide>
  //           <a href={partner.href}>
  //             <img src={`/Assets/Pages/Home/Partners/${partner.title}.svg`} alt="" loading="lazy"/>
  //           </a>
  //         </SwiperSlide>
  //     )
  //   })
  //
  //   setSlides(result)
  // }, [homeData]);

  useEffect(() => {
    togleSwiper()

    return ()=> {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, []);

  return (
      <>
        {
            slides &&
            <div className="logos-slider">
               <button className="logos-slider__btn logos-slider__btn--prev" onClick={() => togleSwiper("prev")}>
                  <img src="/Assets/Icons/arrow.svg" alt=''/>
               </button>
               <Swiper
                   slidesPerView={5}
                   loop={true}
                   className="logos-slider__swiper"
                   ref={swiperRef}
               >
                 {
                   slides.map(slide => slide)
                 }
               </Swiper>
               <button className="logos-slider__btn" onClick={() => togleSwiper("next")}>
                  <img src="/Assets/Icons/arrow.svg" alt=''/>
               </button>
            </div>

        }
      </>
  );
};

export default observer(LogosSlider);
