'use client'
import React from 'react';
import "./home-main-screen.scss"
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import 'swiper/css/effect-fade';
import {EffectFade, Autoplay} from "swiper/modules";
import HtmlProcessing from "../../HtmlProcessing";
import {IHomeData} from "@/types/data";

interface Props{
  homeData: IHomeData
}

const HomeMainScreen = ({homeData}: Props) => {
  return (
      <div className="main-screen home-main-screen">
        <div className="home-main-screen__slider-wrapp">
          <Swiper
              className="home-main-screen__slider"
              loop={true}
              modules={[EffectFade, Autoplay]}
              effect="fade"
              autoplay={{delay: 2500, disableOnInteraction: false}}
          >
            <SwiperSlide>
              <Link href={`/`} className="home-main-screen__slide-content">
                <img src="/Assets/Projects/2023/Project_1/cover.jpg" alt="" className="main-screen__img"/>
                <div className="home-main-screen__slide-title-wrapp">
                  <h2 className='home-main-screen__slide-title'>
                    Ассоциация <br/>
                    Ландшафтных <br/>
                    Архитекторов <br/>
                    России
                  </h2>
                </div>
                <div className="main-screen__signature-wrapp">
                  <strong className="main-screen__signature">Конкурсная работа «Федоровский сквер» © DOR
                    Технологии, 2023</strong>
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link href={`/`} className="home-main-screen__slide-content">
                <img src="/Assets/Projects/2023/Project_2/cover.jpg" alt="" className="main-screen__img"/>
                <div className="home-main-screen__slide-title-wrapp">
                  <h2 className='home-main-screen__slide-title'>
                    Ассоциация <br/>
                    Ландшафтных <br/>
                    Архитекторов <br/>
                    России
                  </h2>
                </div>
                <div className="main-screen__signature-wrapp">
                  <strong className="main-screen__signature">Конкурсная работа «Благоустройство территории DOR
                    Технологии» © Готика, 2023</strong>
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link href={`/`} className="home-main-screen__slide-content">
                <img src="/Assets/Projects/2023/Project_3/cover.jpg" alt="" className="main-screen__img"/>
                <div className="home-main-screen__slide-title-wrapp">
                  <h2 className='home-main-screen__slide-title'>
                    Ассоциация <br/>
                    Ландшафтных <br/>
                    Архитекторов <br/>
                    России
                  </h2>
                </div>
                <div className="main-screen__signature-wrapp">
                  <strong className="main-screen__signature">Конкурсная работа «Чайный дом» © L.BURO, 2023</strong>
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link href={`/`} className="home-main-screen__slide-content">
                <img src="/Assets/Projects/2023/Project_4/cover.jpg" alt="" className="main-screen__img"/>
                <div className="home-main-screen__slide-title-wrapp">
                  <h2 className='home-main-screen__slide-title'>
                    Ассоциация <br/>
                    Ландшафтных <br/>
                    Архитекторов <br/>
                    России
                  </h2>
                </div>
                <div className="main-screen__signature-wrapp">
                  <strong className="main-screen__signature">Конкурсная работа «Парк Берега» © Компания «Мегапарк», 2023</strong>
                </div>
              </Link>
            </SwiperSlide>
          </Swiper>
        </div>
        <aside className="home-main-screen__aside">
          <div className="home-main-screen__aside-ellipse-wrapp">
            <div className="home-main-screen__aside-ellipse"></div>
          </div>

          <HtmlProcessing html={homeData.mainSection.html}/>
        </aside>
      </div>
  );
};

export default HomeMainScreen;
