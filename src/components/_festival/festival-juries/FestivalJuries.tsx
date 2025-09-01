'use client'
import React, {useEffect, useState} from 'react';
import "./festival-juries.scss"
import {IFestival, IHtmlString, IUser} from "../../../types/data";
import {Swiper, SwiperSlide} from "swiper/react";
import {useGetRem} from "../../../hoocs/useGetRem";
import cn from "classnames";
import HtmlProcessing from "../../HtmlProcessing";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";
import {Autoplay} from "swiper/modules";
import Marquee from "react-fast-marquee";
import {getData} from "@/components/_festival/festival-juries/getData";
import {motion} from "framer-motion";
import {useMediaQuery} from "react-responsive";
import SmoothScrolling from "@/app/SmoothScrolling";

interface Props{
  title: string
  juriesDataString: IHtmlString[]
}


const FestivalJuries = ({juriesDataString, title}:Props) => {
  const sections=getData(juriesDataString)
  const [activeSection, setActiveSection] = useState(0)
  const rem=useGetRem()
  const [isOpenedArr, setIsOpenedArr] = useState<number[]>([])
  const bigDesktopScreen = useMediaQuery({minWidth: 1920});

  const openInfo=(item: number)=>{
    if (!isOpenedArr.includes(item))
      setIsOpenedArr(prevState => [...prevState, item])
    else {
      const index= isOpenedArr.indexOf(item)
      const result=[...isOpenedArr]
      result.splice(index, 1)
      setIsOpenedArr(result)
    }
  }

  return (
      <div className="festival-juries" id="juries">
        <img src="/Assets/Pages/Festival-main/bg/juries.svg" alt="" className="festival-juries__bg"/>
        <div className="container">
          <h2 className="festival-juries__title">{title}</h2>

          <Swiper slidesPerView="auto" spaceBetween={35*rem} className="festival-juries__sections">
            {
              sections.map(({section}, index) => (
                  <SwiperSlide key={index} style={{width: "fit-content"}}>
                    <button  className="festival-juries__btn link-underline"
                            disabled={index === activeSection}
                            onClick={() => {
                              setActiveSection(index)
                              setIsOpenedArr([])
                            }}>{section}</button>
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
              {nonBreakingSpaces(sections[activeSection].note)}
            </p>
              <Swiper slidesPerView="auto" spaceBetween={(bigDesktopScreen? 9.45:8.28)*rem}>
              {
                sections[activeSection].juries.map((item, itemIndex) => (
                    <SwiperSlide key={itemIndex} className="festival-juries__slide"
                                 onClick={() => openInfo(itemIndex)}
                    >
                      {
                          item &&
                          <>
                             <div className="festival-juries__img-wrap">
                                <img src={`/Assets/Pages/People/${item.image}`} alt=""/>

                                <div className={cn(
                                    "festival-juries__info",
                                    isOpenedArr.includes(itemIndex) && "festival-juries__info--opened"
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
          </motion.div>

        </div>
      </div>
  );
};

export default FestivalJuries;
