'use client'
import React, {useEffect, useMemo, useState} from 'react';
import "./about-presidium.scss"
import {IFestival, IUser} from "../../../types/data";
import {Swiper, SwiperSlide} from "swiper/react";
import {useGetRem} from "../../../hoocs/useGetRem";
import cn from "classnames";
import HtmlProcessing from "../../HtmlProcessing";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";
import {Autoplay} from "swiper/modules";
import Marquee from "react-fast-marquee";
import {getData} from "@/components/_about/about-presidium/getData";
import {number} from "prop-types";
import SmoothScrolling from "@/app/SmoothScrolling";

interface Props{
  title: string
  data: string
}

type TItem= IUser|null|undefined

const getSlides=(users: IUser[])=>{
  let newIndex=0

  const result: TItem[][]=[]

  for (let i = 0; i < users.length; i++){
    const item=users[newIndex]

    if (!item)
      break

    result.push([item, users[newIndex+1]])
    newIndex=newIndex+2
  }

  return result
}

const AboutPresidium = ({data, title}:Props) => {
  const users= useMemo(()=>getData(data), [])
  const slides= getSlides(users)
  const [isOpened, setIsOpened] = useState<[number, number] | null>(null)

  const openInfo=(newSlide: number, newItem: number)=>{
    if (!isOpened || isOpened[0]!=newSlide || isOpened[1]!=newItem){
      setIsOpened([newSlide, newItem])
    }else {
      setIsOpened(null)
    }
  }

  return (
      <div className="about-presidium" id="presidium">
        <img
            src="/Assets/Pages/About/bg/2.svg"
            className="about-presidium__bg"
            alt=""
        />

        <h2 className="about-presidium__title">{title}</h2>

        <Marquee direction='left' speed={20} className="about-presidium__running-line__player">
          <div className="about-presidium__running-line-wrapp">

            {
              slides.map((items, index) => (
                  <div key={index} className="about-presidium__slide">
                    {
                      items.map((item, itemIndex) => (
                          <div key={index + itemIndex} className="about-presidium__item"
                               onClick={() => openInfo(index, itemIndex)}
                          >
                            {
                                item &&
                                <>
                                   <img src={`/Assets/Pages/People/${item.image}`} alt="" loading="lazy"/>

                                   <div className={cn(
                                       "about-presidium__info",
                                       isOpened &&isOpened[0]===index && isOpened[1]===itemIndex && "about-presidium__info--opened"
                                   )}>
                                      <SmoothScrolling enableScrollTransfer>
                                         <div>
                                            <p className="about-presidium__name">{nonBreakingSpaces(item.name)}</p><p
                                             className="yellow">{nonBreakingSpaces(item.place)}</p>
                                         </div>
                                         <HtmlProcessing html={`<p>${item.jobTitle}</p>`}/>
                                      </SmoothScrolling>
                                   </div>
                                </>
                            }
                          </div>
                      ))
                    }
                  </div>
              ))
            }
          </div>
        </Marquee>
      </div>
  );
};

export default AboutPresidium;
