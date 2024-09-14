import React from 'react';
import "./home-main-screen.scss"
import { Swiper, SwiperSlide } from 'swiper/react';
import {Link} from "react-router-dom";
import 'swiper/css';
import 'swiper/css/effect-fade';

import {EffectFade, Autoplay} from "swiper/modules";


const HomeMainScreen = () => {
  return (
      <div className="home-main-screen">
        <div className="home-main-screen__slider-wrapp">
          <Swiper
              className="home-main-screen__slider"
              loop={true}
              modules={[EffectFade, Autoplay]}
              effect="fade"
              autoplay={{delay: 2500, disableOnInteraction: false}}
          >
            <SwiperSlide>
              <Link to={`/`} className="home-main-screen__slide-content">
                <img src="/Assets/Projects/1.png" alt="" className="home-main-screen__slide-bg"/>
                <div className="home-main-screen__slide-title-wrapp">
                  <h2 className='home-main-screen__slide-title'>
                    Ассоциация <br/>
                    Ландшафтных <br/>
                    Архитекторов <br/>
                    России
                  </h2>
                </div>
                <div className="home-main-screen__slide-signature-wrapp">
                  <strong className="home-main-screen__slide-signature">Конкурсная работа «Федоровский сквер» © DOR
                    Технологии, 2023</strong>
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to={`/`} className="home-main-screen__slide-content">
                <img src="/Assets/Projects/2.png" alt="" className="home-main-screen__slide-bg"/>
                <div className="home-main-screen__slide-title-wrapp">
                  <h2 className='home-main-screen__slide-title'>
                    Ассоциация <br/>
                    Ландшафтных <br/>
                    Архитекторов <br/>
                    России
                  </h2>
                </div>
                <div className="home-main-screen__slide-signature-wrapp">
                  <strong className="home-main-screen__slide-signature">Конкурсная работа «Благоустройство территории в ЖК
                    UNION PARK» © Готика, 2023</strong>
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to={`/`} className="home-main-screen__slide-content">
                <img src="/Assets/Projects/3.png" alt="" className="home-main-screen__slide-bg"/>
                <div className="home-main-screen__slide-title-wrapp">
                  <h2 className='home-main-screen__slide-title'>
                    Ассоциация <br/>
                    Ландшафтных <br/>
                    Архитекторов <br/>
                    России
                  </h2>
                </div>
                <div className="home-main-screen__slide-signature-wrapp">
                  <strong className="home-main-screen__slide-signature">Конкурсная работа «Чайный дом» © L.BURO, 2023</strong>
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to={`/`} className="home-main-screen__slide-content">
                <img src="/Assets/Projects/4.png" alt="" className="home-main-screen__slide-bg"/>
                <div className="home-main-screen__slide-title-wrapp">
                  <h2 className='home-main-screen__slide-title'>
                    Ассоциация <br/>
                    Ландшафтных <br/>
                    Архитекторов <br/>
                    России
                  </h2>
                </div>
                <div className="home-main-screen__slide-signature-wrapp">
                  <strong className="home-main-screen__slide-signature">Конкурсная работа «Парк Берега» © Компания «Мегапарк», 2023</strong>
                </div>
              </Link>
            </SwiperSlide>
          </Swiper>
        </div>
        <aside className="home-main-screen__aside">
          <strong className="accent">Ежегодное событие</strong>
          <h2 className="home-main-screen__aside-title">Национальная <br/>
            премия <br/>
            по ландшафтной <br/>
            архитектуре <br/>
            и садово-парковому <br/>
            искусству</h2>
          <div className="home-main-screen__links">
            <Link to="/" className="home-main-screen__link-main">Принять участие</Link>
            <Link to="/" className="home-main-screen__link">Архив работ</Link>
          </div>
          <div className="home-main-screen__aside-ellipse-wrapp">
            <div className="home-main-screen__aside-ellipse"></div>
          </div>
        </aside>
      </div>
  );
};

export default HomeMainScreen;
