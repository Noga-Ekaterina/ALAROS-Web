'use client'
import React, {useEffect, useRef, useState} from 'react';
import "./project-images-slider.scss"
import {Swiper, SwiperRef, SwiperSlide} from "swiper/react";
import {IProject} from "@/types/data";
import {SwiperNavigation} from "@/utils/SwiperNavigation";
import {ReactSVG} from "react-svg";
import {useRouter} from "next/navigation";
import {useMediaQuery} from "react-responsive";

interface Props{
  project: IProject
}

const ProjectImagesSlider = ({project}:Props) => {
  const router= useRouter()
  const swiperRef=useRef<SwiperRef | null>(null);
  const swiperNav= new SwiperNavigation(swiperRef)
  const [swiperIsStart, setSwiperIsStart] = useState(true)
  const [swiperIsEnd, setSwiperIsEnd] = useState(false)
  const [activeSlide, setActiveSlide] = useState(1)
  const mobileScreen = useMediaQuery({maxWidth: 660});

  function togleSwiper  (){
    setSwiperIsStart(swiperNav.isStart())
    setSwiperIsEnd(swiperNav.isEnd(1))
    setActiveSlide(swiperNav.getActiveIndex()+1)
  }

  useEffect(() => {
    document.documentElement.style.overflow="hidden"

    return ()=>{
      document.documentElement.style.overflow=""
    }
  }, []);
  return (
      <div className="project-images-slider">
        <button
            className="project-images-slider__back"
            onClick={()=> router.back()}
        >
          <ReactSVG src="/Assets/Icons/close.svg"/>
        </button>
        <div className="project-images-slider__control">
          <span>{activeSlide} из {project.images.length}</span>
        </div>
        <Swiper
            centeredSlides={true}
            spaceBetween={'45rem'}
            slidesPerView={mobileScreen? 1:1.45}
            ref={swiperRef}
            onActiveIndexChange={togleSwiper}
        >
          {
            project.images.map((image, index)=>(
                <SwiperSlide key={index}>
                  <img src={`/Assets/Projects/${project.year}/Project_${project.number}/${image}`} alt=""/>
                </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
  );
};

export default ProjectImagesSlider;
