'use client'
import React, {useEffect, useState} from 'react';
import "./festival-juries.scss"
import {IFestival, IJury} from "../../../types/data";
import {Swiper, SwiperSlide} from "swiper/react";
import {useGetRem} from "../../../hoocs/useGetRem";
import cn from "classnames";
import HtmlProcessing from "../../HtmlProcessing";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";
import {Autoplay} from "swiper/modules";
import Marquee from "react-fast-marquee";

interface Props{
  title: string
  juries: IJury[]
}

type TItem= IJury|null|undefined

const getSlides=(juries: IJury[])=>{
  let newIndex=0

  const result: TItem[][]=[]

  for (let i = 0; i < juries.length; i++){
    const item=juries[newIndex]

    if (!item)
      break

    if ((i+1) % 3===0){
      result.push([item, null])
      newIndex++
    } else if (i % 3===0 && i!=0){
      result.push([null, item])
      newIndex++
    } else{
      result.push([item, juries[newIndex+1]])
      newIndex=newIndex+2
    }
  }

  return result
}

const FestivalJuries = ({juries, title}:Props) => {
  const slides= getSlides(juries)
  const rem=useGetRem()
  const [isOpenedArr, setIsOpenedArr] = useState<IJury[]>([])

  const openInfo=(item: TItem)=>{
    if (!item) return

    if (!isOpenedArr.includes(item))
      setIsOpenedArr(prevState => [...prevState, item])
    else {
      const index= isOpenedArr.indexOf(item)
      setIsOpenedArr(prevState => prevState.splice(index, 1))
    }
  }

  return (
      <div className="festival-juries" id="juries">
        <h2 className="festival-juries__title">{title}</h2>


        <Marquee direction='left' speed={20} className="festival-juries__running-line__player">
          <div className="festival-juries__running-line-wrapp">

            {
              slides.map((items, index)=>(
                  <div key={index} className="festival-juries__slide">
                    {
                      items.map((item, itemIndex)=>(
                          <div key={index+itemIndex} className="festival-juries__item"
                               onClick={()=> openInfo(item)}
                          >
                            {
                                item &&
                                <>
                                   <img src={`/Assets/Pages/People/${item.image}`} alt=""/>

                                   <div className={cn(
                                       "festival-juries__info",
                                       isOpenedArr.includes(item) && "festival-juries__info--opened"
                                   )}>
                                      <div>
                                         <p className="festival-juries__name">{nonBreakingSpaces(item.name)}</p><p className="yellow">{nonBreakingSpaces(item.place)}</p>
                                      </div>
                                      <HtmlProcessing html={item.jobTitle.html}/>
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

export default FestivalJuries;
