'use client'
import React, {useEffect, useMemo, useState} from 'react';
import "./festival-juries.scss"
import {IFestival, IHtmlString, IJuriesCommited, IWorker} from "../../../types/data";
import {Swiper, SwiperSlide} from "swiper/react";
import {useGetRem} from "../../../hoocs/useGetRem";
import cn from "classnames";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";
import {motion} from "framer-motion";
import {useMediaQuery} from "react-responsive";
import SmoothScrolling from "@/app/SmoothScrolling";
import SliderClue from "@/components/slider-clue/SliderClue";
import Image from "@/components/Image";

interface Props{
  title: string
  juriesCommiteds: IJuriesCommited[]
}


const FestivalJuries = ({juriesCommiteds, title}:Props) => {
  const mobileScreen = useMediaQuery({maxWidth: 660});
  const [activeSection, setActiveSection] = useState(0)
  const rem=useGetRem()
  const [isOpened, setIsOpened] = useState<number | null>(null)
  const bigDesktopScreen = useMediaQuery({minWidth: 1920});

  const openInfo=(item: number)=>{
    if (isOpened!=item)
      setIsOpened(item)
    else {
      setIsOpened(null)
    }
  }

  return (
      <div className="festival-juries" id="juries">
        <img src="/Assets/Pages/Festival-main/bg/juries.svg" alt="" className="festival-juries__bg"/>
        <div className="container">
          <h2 className="festival-juries__title">{title}</h2>

          <Swiper slidesPerView="auto" spaceBetween={35*rem} className="festival-juries__sections">
            {
              juriesCommiteds.map(({name}, index) => (
                  <SwiperSlide key={index} style={{width: "fit-content"}}>
                    <button  className="festival-juries__btn link-underline"
                            disabled={index === activeSection}
                            onClick={() => {
                              setActiveSection(index)
                              setIsOpened(null)
                            }}>{name}</button>
                  </SwiperSlide>
              ))
            }
          </Swiper>

          <motion.div
              key={activeSection}
              initial={{opacity: 0,}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              transition={{duration: 0.5}}
          >
            <p className="festival-juries__note">
              {nonBreakingSpaces(juriesCommiteds[activeSection].note)}
            </p>

            <div className="festival-juries__slider-wrapp">
              <Swiper slidesPerView="auto" spaceBetween={(bigDesktopScreen? 9.45:8.28)*rem}>
                {
                  juriesCommiteds[activeSection].juries.map((item, itemIndex) => (
                      <SwiperSlide
                          key={itemIndex} className="festival-juries__slide"
                          onClick={() => openInfo(itemIndex)}
                      >
                        {
                            item &&
                            <>
                               <div className="festival-juries__img-wrap">
                                  <Image
                                      image={item.image}
                                      size={"xs"}
                                      mediaSizes={{
                                        bigDesktop: "small"
                                      }}
                                  />

                                  <div className={cn(
                                      "festival-juries__info",
                                      isOpened===itemIndex && "festival-juries__info--opened"
                                  )}>
                                     <SmoothScrolling enableScrollTransfer={true}>
                                        <p>{nonBreakingSpaces(item.jobTitle)}</p>
                                     </SmoothScrolling>
                                  </div>

                               </div>

                               <div>
                                  <p className="festival-juries__name">{nonBreakingSpaces(item.name)}</p>
                                  <p
                                      className="festival-juries__place">{nonBreakingSpaces(item.place)}</p>
                               </div>
                            </>
                        }
                      </SwiperSlide>
                  ))
                }
              </Swiper>

              {(mobileScreen || juriesCommiteds[activeSection].juries.length>7) && <SliderClue/>}
            </div>
          </motion.div>

        </div>
      </div>
  );
};

export default FestivalJuries;
