import React, {useEffect, useState} from 'react';
import "./home-events.scss"
import {Swiper, SwiperSlide} from "swiper/react";
import pagesData from "../../../store/pagesData";
import {Autoplay, Pagination} from "swiper/modules";
import {useMediaQuery} from "react-responsive";
import {ReactSVG} from "react-svg";
const HomeEvents = () => {
  const {homeData}=pagesData
  const mobileScreen = useMediaQuery({maxWidth: 660});
  const [slides, setSlides] = useState<any[]>([])

  useEffect(() => {
    if (homeData?.announcements.slides) {
      const newArr: any[] = []
      for (let i = 1; i <= homeData.announcements.slides; i++) {
        newArr.push(
            <SwiperSlide>
              <img src={`/Assets/Pages/Home/Announcements/${i}${mobileScreen? "-mobile":""}.png`} alt=""/>
            </SwiperSlide>
        )
      }
      setSlides(newArr)
    }
  }, [mobileScreen]);
  return (
      <div className="home-events">
        <ReactSVG src="/Assets/Pages/Home/bg/2.svg" className="home-events__bg"/>
      <div className="home-events__block-text">
          <div className="home-events__title">События</div>
          <p className="home-events__text">Календарь ближайших <br/>
            событий и мероприятий <br/>
            в индустрии</p>
        <a href="" className="home-events__link link-underline">Смотреть все</a>
        </div>
        <div className='home-events__slider'>
          <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{delay:3000, disableOnInteraction: false}}
              pagination={{clickable: true, el:'.home-events__slider-pagination', bulletClass: 'home-events__slider-pagination-item', bulletActiveClass: 'home-events__slider-pagination-item--active'}}
              loop={true}
          >
            {
              slides.map(slide=>slide)
            }
          </Swiper>
          <div className='home-events__slider-pagination'></div>
        </div>
      </div>
  );
};

export default HomeEvents;
