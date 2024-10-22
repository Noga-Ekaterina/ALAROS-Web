import React, {useRef, useState} from 'react';
import "./home-news-slider.scss"
import {Swiper, SwiperSlide} from "swiper/react";
import pagesData from "../../../store/pagesData";
import {observer} from "mobx-react-lite";
import NewsItem from "../../_news/news-item/NewsItem";
import {Mousewheel} from "swiper/modules";
import {ReactSVG} from "react-svg";
import {SwiperRef} from "swiper/swiper-react";
import {SwiperNavigation} from "../../../utils/SwiperNavigation";
import classNames from "classnames";
import {useMediaQuery} from "react-responsive";

const HomeNewsSlider = () => {
  const mobileScreen = useMediaQuery({maxWidth: 660});
  const {newsPages}= pagesData
  const swiperRef=useRef<SwiperRef | null>(null);
  const swiperNav= new SwiperNavigation(swiperRef)
  const [swiperIsStart, setSwiperIsStart] = useState(true)
  const [swiperIsEnd, setSwiperIsEnd] = useState(false)
  const arrIndexSmall= [2, 5, 7, 10]

  function togleSwiper  (){
    setSwiperIsStart(swiperNav.isStart())
    setSwiperIsEnd(swiperNav.isEnd(mobileScreen? 1:2))
  }

  return (
      <div className="home-news-slider">
        <div className="container">
          <h2 className="home-news-slider__title">Новости</h2>
          <div className="home-news-slider__wrapp">
            <button
                className={classNames(
                    "home-news-slider__btn",
                    "home-news-slider__btn--prev",
                    swiperIsStart && "btn--disable"
                )}
                onClick={() => swiperNav.goToPrev()}
            >
              <ReactSVG src="/Assets/Icons/arrow.svg"/>
            </button>
            <Swiper
                slidesPerView="auto"
                mousewheel={{sensitivity: 5000}}
                modules={[Mousewheel]}
                spaceBetween={"10rem"}
                ref={swiperRef}
                onActiveIndexChange={togleSwiper}
            >
              {
                  newsPages["1"] && newsPages["1"].map((news, index) => (
                      <SwiperSlide
                          key={`news-slide-${news.slug}`}
                          className={classNames(
                              "home-news-slider__slide",
                              arrIndexSmall.includes(index+1) && "home-news-slider__slide--small"
                          )}
                      >
                        <NewsItem news={news}/>
                      </SwiperSlide>
                  ))
              }
            </Swiper>
            <button
                className={classNames(
                    "home-news-slider__btn",
                    "home-news-slider__btn--next",
                    swiperIsEnd && "btn--disable"
                )}
                onClick={() => swiperNav.goToNext()}
            >
              <ReactSVG src="/Assets/Icons/arrow.svg"/>
            </button>
          </div>
        </div>
      </div>
  );
};

export default observer(HomeNewsSlider);