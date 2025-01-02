import React from 'react';
import "./home-news-slider.scss"
import {SwiperSlide} from "swiper/react";
import pagesData from "../../../store/pagesData";
import {observer} from "mobx-react-lite";
import NewsItem from "../../_news/news-item/NewsItem";
import classNames from "classnames";
import BigSlider from "../../big-slider/BigSlider";
import {useMediaQuery} from "react-responsive";

const HomeNewsSlider = () => {
  const {newsPages, homeData}= pagesData
  const arrIndexSmall= [2, 5, 7, 10]
  const mobileScreen = useMediaQuery({maxWidth: 660});

  if (!homeData || !newsPages[1]) return <div/>

  return (
      <div className="home-news-slider">
        <div className="container">
          <h2 className="home-news-slider__title">{homeData.newsTitle}</h2>

          <BigSlider slidesPerView={mobileScreen? 1:2}>
            {
                newsPages["1"].map((news, index) => (
                    <SwiperSlide
                        key={`news-slide-${news.slug}`}
                        className={classNames(
                            "home-news-slider__slide",
                            arrIndexSmall.includes(index + 1) && "home-news-slider__slide--small"
                        )}
                    >
                      <NewsItem news={news}/>
                    </SwiperSlide>
                ))
            }
          </BigSlider>
        </div>
      </div>
  );
};

export default observer(HomeNewsSlider);