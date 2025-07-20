'use client'
import React, {useEffect, useState} from 'react';
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
  const users= getData(data)
  const slides= getSlides(users)
  const [isOpenedArr, setIsOpenedArr] = useState<Record<number, number[]>>({})

  const openInfo=(slideIndex: number, item: number)=>{
    const slide= isOpenedArr[slideIndex]? [...isOpenedArr[slideIndex]]:[]
    if (!slide.includes(item))
      setIsOpenedArr(prevState => ({...prevState, [slideIndex]: [...slide, item]}))
    else {
      const index= slide.indexOf(item)
      slide.splice(index, 1)
      setIsOpenedArr(prevState => ({...prevState, [slideIndex]: slide}))
    }
  }

  return (
      <div className="about-presidium" id="users">
        <h2 className="about-presidium__title">{title}</h2>


        <Marquee direction='left' speed={20} className="about-presidium__running-line__player">
          <div className="about-presidium__running-line-wrapp">

            {
              slides.map((items, index)=>(
                  <div key={index} className="about-presidium__slide">
                    {
                      items.map((item, itemIndex)=>(
                          <div key={index+itemIndex} className="about-presidium__item"
                               onClick={()=> openInfo(index, itemIndex)}
                          >
                            {
                                item &&
                                <>
                                   <img src={`/Assets/Pages/People/${item.image}`} alt=""/>

                                   <div className={cn(
                                       "about-presidium__info",
                                       isOpenedArr[index]?.includes(itemIndex) && "about-presidium__info--opened"
                                   )}>
                                      <div>
                                         <p className="about-presidium__name">{nonBreakingSpaces(item.name)}</p><p className="yellow">{nonBreakingSpaces(item.place)}</p>
                                      </div>
                                        <HtmlProcessing html={`<p>${item.jobTitle}</p>`}/>
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
