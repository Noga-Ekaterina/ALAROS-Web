'use client'
import React, {useEffect, useMemo, useRef, useState} from "react";
import {getSessionData} from "@/components/_festival-details/festival-business-program/getData";
import {useMediaQuery} from "react-responsive";
import {Swiper, SwiperRef, SwiperSlide} from "swiper/react";
import {SwiperNavigation} from "@/utils/SwiperNavigation";
import HtmlProcessing from "@/components/HtmlProcessing";
import UserCard from "@/components/_festival-details/festival-business-program/User";
import {Mousewheel} from "swiper/modules";

const Session = ({speakers, speakersTitle, moderatorsTitle, moderators, text}: ReturnType<typeof getSessionData>) => {
  const mobileScreen = useMediaQuery({maxWidth: 660});
  const usersSwiperRef=useRef<SwiperRef | null>(null);
  const rolleSwiperRef=useRef<SwiperRef | null>(null);
  const rolleSwiperNav= new SwiperNavigation(rolleSwiperRef)
  const [isClient, setIsClient] = useState(false)

  const handleSwiper=()=>{
    if (!usersSwiperRef.current) return

    const activeUser= usersSwiperRef.current.swiper.activeIndex

    if (activeUser+1>moderators.length){
      rolleSwiperNav.goToSlide(2)
    }else {
      rolleSwiperNav.goToSlide(0)
    }
  }

  useEffect(() => {
    setIsClient(true)

  }, []);

  return(
      <div className="festival-business-program__session">
        <div className="container">
          {/*<h3 className="festival-business-program__title">{mainTitle}</h3>*/}
          <HtmlProcessing html={text ||""}/>

          {
            (isClient&&!mobileScreen) ?
                <div className="festival-business-program__content">
                  <div className="">
                    <h4 className="festival-business-program__rolle">{moderatorsTitle}</h4>
                    <div className="festival-business-program__moderators">
                      {
                        moderators.map(moderator => (
                            <UserCard key={moderator.name} user={moderator}/>
                        ))
                      }
                    </div>
                  </div>
                  <div className="">
                    <h4 className="festival-business-program__rolle">{speakersTitle}</h4>
                    <div className="festival-business-program__speakers">
                      {
                        speakers.map(speaker => (
                            <UserCard key={speaker.name} user={speaker}/>
                        ))
                      }
                    </div>
                  </div>
                </div>
                :
                <>
                  <Swiper
                      slidesPerView="auto"
                      allowTouchMove={false}
                      spaceBetween="10rem"
                      ref={rolleSwiperRef}
                  >
                    <SwiperSlide className="festival-business-program__slide">
                      <h4 className="festival-business-program__rolle">{moderatorsTitle}</h4>

                    </SwiperSlide>
                    <SwiperSlide className="festival-business-program__slide">
                      <h4 className="festival-business-program__rolle">{speakersTitle}</h4>

                    </SwiperSlide>
                    <SwiperSlide className="festival-business-program__slide"/>
                  </Swiper>
                  <Swiper
                      slidesPerView="auto"
                      spaceBetween="10rem"
                      ref={usersSwiperRef}
                      modules={[Mousewheel]}
                      onActiveIndexChange={handleSwiper}
                  >
                    {
                      moderators.map(moderator => (
                          <SwiperSlide key={moderator.name} className="festival-business-program__slide">
                            <UserCard user={moderator}/>
                          </SwiperSlide>
                      ))
                    }
                    {
                      speakers.map(speaker => (
                          <SwiperSlide key={speaker.name} className="festival-business-program__slide">
                            <UserCard user={speaker}/>
                          </SwiperSlide>
                      ))
                    }
                  </Swiper>
                </>
          }
        </div>
      </div>
  )
}

export default Session