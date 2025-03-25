'use client'
import React, {useEffect, useState} from 'react';
import "./home-events.scss"
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Pagination} from "swiper/modules";
import {useMediaQuery} from "react-responsive";
import {ReactSVG} from "react-svg";
import HtmlProcessing from "../../HtmlProcessing";
import {IHomeData} from "@/types/data";

interface Props{
  homeData: IHomeData
}

const HomeEvents = ({homeData}:Props) => {
  const mobileScreen = useMediaQuery({maxWidth: 660});
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, []);

  return (
      <div className="home-events">
        <ReactSVG src="/Assets/Pages/Home/bg/2.svg" className="home-events__bg"/>
      <div className="home-events__block-text">
          <HtmlProcessing html={homeData.events.html}/>
      </div>
        <div className='home-events__slider'>
          <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{delay:3000, disableOnInteraction: false}}
              pagination={{clickable: true, el:'.home-events__slider-pagination', bulletClass: 'home-events__slider-pagination-item', bulletActiveClass: 'home-events__slider-pagination-item--active'}}
              loop={true}
          >
            {
              (mobileScreen && isClient)?
                  <>
                  {
                    homeData.bannersMobile.map((banner, index)=>(
                        <SwiperSlide key={`mob banner ${index}`}>
                          <img src={`/Assets/Pages/Home/Banners/Mobile/${banner}`} alt=""/>
                        </SwiperSlide>
                    ))
                  }
                  </>
                  :
                  <>
                    {
                      homeData.bannersDesktop.map((banner, index)=>(
                          <SwiperSlide key={`banner ${index}`}>
                            <img src={`/Assets/Pages/Home/Banners/Desktop/${banner}`} alt=""/>
                          </SwiperSlide>
                      ))
                    }
                  </>
            }
          </Swiper>
          <div className='home-events__slider-pagination'></div>
        </div>
      </div>
  );
};

export default HomeEvents;
