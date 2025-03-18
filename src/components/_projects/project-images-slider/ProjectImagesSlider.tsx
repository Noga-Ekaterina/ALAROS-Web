'use client'
import React, {useEffect, useRef, useState} from 'react';
import "./project-images-slider.scss"
import {Swiper, SwiperRef, SwiperSlide} from "swiper/react";
import {IProject} from "@/types/data";
import {SwiperNavigation} from "@/utils/SwiperNavigation";
import {ReactSVG} from "react-svg";
import {useRouter} from "next/navigation";
import {useMediaQuery} from "react-responsive";
import classNames from "classnames";
import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";
import cn from "classnames";

interface Props{
  project: IProject
}

// Замените объявление типа в компоненте:
type zoomFunc = (
    step?: number,
    animationTime?: number,
    animationType?:
        | 'easeOut'
        | 'linear'
        | 'easeInQuad'
        | 'easeOutQuad'
        | 'easeInOutQuad'
        | 'easeInCubic'
        | 'easeOutCubic'
        | 'easeInOutCubic'
        | 'easeInQuart'
        | 'easeOutQuart'
        | 'easeInOutQuart'
        | 'easeInQuint'
        | 'easeOutQuint'
        | 'easeInOutQuint'
) => void;

const ProjectImagesSlider = ({project}:Props) => {
  const router= useRouter()
  const swiperRef=useRef<SwiperRef | null>(null);
  const swiperNav= new SwiperNavigation(swiperRef)
  const [swiperIsStart, setSwiperIsStart] = useState(true)
  const [swiperIsEnd, setSwiperIsEnd] = useState(false)
  const [activeSlide, setActiveSlide] = useState(1)
  const mobileScreen = useMediaQuery({maxWidth: 660});
  const [scale, setScale] =useState(1)

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

  const scaleIn=(zoomIn: zoomFunc)=>{
    setScale(prevState => prevState + (prevState<3? 0.5:0))

    if ((scale>=1.5 || mobileScreen) && scale<3) {
      zoomIn(0.5)
    }
  }

  const scaleOut=(zoomOut: zoomFunc)=>{
    if (scale>1) {
      setScale(prevState => prevState - 0.5)
      zoomOut(0.5)
    }
  }

  return (
      <div className="project-images-slider">
        <TransformWrapper >
          {({ zoomIn, zoomOut, resetTransform }) => (
              <>
                <div className="project-images-slider__scale">
                  <button
                      className="project-images-slider__btn project-images-slider__btn--increase"
                      onClick={()=> scaleIn(zoomIn)}
                  >
                    <ReactSVG src="/Assets/Icons/close.svg"/>
                  </button>
                  <button
                      className="project-images-slider__btn project-images-slider__btn--decrease"
                      onClick={()=>scaleOut(zoomOut)}
                  />
                </div>

                <div
                    className={cn(
                        "project-images-slider__scale-img-wrap",
                        scale>1 &&"project-images-slider__scale-img-wrap--opened"
                    )}
                >
                  <TransformComponent
                      wrapperStyle={{maxHeight: "100vh"}}
                    contentStyle={{cursor: "move"}}
                  >
                    {
                      scale > 1 ?
                          <div className="">
                            <img
                                src={`/Assets/Projects/${project.year}/Project_${project.number}/${project.images[activeSlide - 1]}`}
                                alt=""/>
                          </div>
                          :<div/>
                    }
                  </TransformComponent>

                </div>
              </>
          )}
        </TransformWrapper>
        <button
            className="project-images-slider__btn project-images-slider__btn--back"
            onClick={() => scale>1? setScale(1):router.back()}
        >
          <ReactSVG src="/Assets/Icons/close.svg"/>
        </button>
        <div className="project-images-slider__control">
          <button
              className={classNames(
                  "project-images-slider__control-btn",
                  "project-images-slider__control-btn--prev",
                  swiperIsStart && "btn--disable"
              )}
              onClick={() => swiperNav.goToPrev()}
          >
            <ReactSVG src="/Assets/Icons/arrow.svg"/>
          </button>
          <span>{activeSlide} из {project.images.length}</span>
          <button
              className={classNames(
                  "project-images-slider__control-btn",
                  "project-images-slider__control-btn--next",
                  swiperIsEnd && "btn--disable"
              )}
              onClick={() => swiperNav.goToNext()}
          >
            <ReactSVG src="/Assets/Icons/arrow.svg"/>
          </button>
        </div>
        <Swiper
            centeredSlides={true}
            spaceBetween={'45rem'}
            slidesPerView={mobileScreen ? 1 : 1.45}
            ref={swiperRef}
            onActiveIndexChange={togleSwiper}
        >
          {
            project.images.map((image, index) => (
                <SwiperSlide key={index} onClick={()=> index===activeSlide-1 && setScale(1.5)}>
                  <img src={`/Assets/Projects/${project.year}/Project_${project.number}/${image}`} alt=""/>
                </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
  );
};

export default ProjectImagesSlider;
