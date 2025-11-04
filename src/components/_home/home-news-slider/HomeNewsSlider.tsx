'use client'
import React from 'react';
import "./home-news-slider.scss"
import {SwiperSlide} from "swiper/react";
import NewsItem from "../../_news/news-item/NewsItem";
import classNames from "classnames";
import BigSlider from "../../big-slider/BigSlider";
import {useMediaQuery} from "react-responsive";
import {INewsItem} from "@/types/data";

interface Props{
  news: INewsItem[]
  title: string
}

const HomeNewsSlider = ({title, news}: Props) => {
  const arrIndexSmall= [2, 5, 7, 10]
  const mobileScreen = useMediaQuery({maxWidth: 660});
  const bigDesktopScreen = useMediaQuery({minWidth: 1920});

  return (
      <div className="home-news-slider">
        <div className="container">
          <h2 className="home-news-slider__title">{title}</h2>

          <BigSlider slidesPerView={mobileScreen? 1: bigDesktopScreen? 3:2}>
            {
                news.map((news, index) => (
                    <SwiperSlide
                        key={`news-slide-${news.slug}`}
                        className={classNames(
                            "home-news-slider__slide",
                            arrIndexSmall.includes(index + 1) && "home-news-slider__slide--small"
                        )}
                    >
                      <NewsItem news={news} small/>
                    </SwiperSlide>
                ))
            }
          </BigSlider>
        </div>
      </div>
  );
};

export default HomeNewsSlider