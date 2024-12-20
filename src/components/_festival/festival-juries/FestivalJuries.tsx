import React, {useEffect, useState} from 'react';
import "./festival-juries.scss"
import pagesData from "../../../store/pagesData";
import {IJury} from "../../../types/data";
import {Swiper, SwiperSlide} from "swiper/react";
import {Mousewheel} from "swiper/modules";
import {useGetRem} from "../../../hoocs/useGetRem";
import cn from "classnames";
import HtmlProcessing from "../../HtmlProcessing";

type TItem= IJury|null|undefined

const FestivalJuries = () => {
  const {festivalText, juries}=pagesData
  const [slides, setSlides] = useState<TItem[][]>([])
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

  useEffect(() => {
    if (!juries) return

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

    setSlides(result)
  }, []);

  if (!festivalText||!juries) return <div/>

  return (
      <div className="festival-juries">
        <h2 className="festival-juries__title">{festivalText.juriesTitle}</h2>

        <Swiper
            spaceBetween={10*rem}
            slidesPerView="auto"
            mousewheel={{sensitivity: 5000}}
            modules={[Mousewheel]}
        >
          {
            slides.map(items=>(
               <SwiperSlide className="festival-juries__slide">
                 {
                   items.map(item=>(
                       <div
                           className="festival-juries__item"
                        onClick={()=> openInfo(item)}
                       >
                         {
                           item &&
                             <>
                                <img src={`/Assets/Pages/Festival/Images/People/${item.image}`} alt=""/>

                                <div className={cn(
                                    "festival-juries__info",
                                    isOpenedArr.includes(item) && "festival-juries__info--opened"
                                )}>
                                   <div>
                                      <p className="festival-juries__name">{item.name}</p><p className="accent">{item.place}</p>
                                   </div>
                                   <HtmlProcessing html={item.jobTitle.html}/>
                                </div>
                             </>
                         }
                       </div>
                   ))
                 }
               </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
  );
};

export default FestivalJuries;
