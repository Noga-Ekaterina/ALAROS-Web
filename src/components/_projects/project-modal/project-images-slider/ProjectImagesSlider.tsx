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
import {useSearchParamsControl} from "@/hoocs/useSearchParamsControl";
import ProjectText from "@/components/_projects/project-modal/project-text/ProjectText";

interface Props{
  project: IProject
  scale: number,
  handleScale:  React.Dispatch<React.SetStateAction<number>>
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

const ProjectImagesSlider = ({project, scale, handleScale}:Props) => {
  const swiperRef=useRef<SwiperRef | null>(null);
  const swiperNav= new SwiperNavigation(swiperRef)
  const [swiperIsStart, setSwiperIsStart] = useState(true)
  const [swiperIsEnd, setSwiperIsEnd] = useState(false)
  const [activeSlide, setActiveSlide] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const mobileScreen = useMediaQuery({maxWidth: 660});
  const desktopScreen= useMediaQuery({minWidth: 1024})
  const [isClient, setIsClient] = useState(false)

  function togleSwiper  (){
    setSwiperIsStart(swiperNav.isStart())
    setSwiperIsEnd(swiperNav.isEnd(desktopScreen? 3: 1))
    setActiveSlide(swiperNav.getActiveIndex()+1)
    setActiveImage(swiperNav.getActiveIndex())
  }

  const scaleIn=(zoomIn: zoomFunc)=>{
    handleScale(prevState => prevState + (prevState<3? 0.5:0))

    if ((scale>=1.5 || mobileScreen) && scale<3) {
      zoomIn(0.5)
    }
  }

  const scaleOut=(zoomOut: zoomFunc)=>{
    if (scale>1) {
      handleScale(prevState => prevState - 0.5)
      zoomOut(0.5)
    }
  }

  useEffect(() => {
    setIsClient(true)
  }, []);

  useEffect(() => {
    if (scale<=1)
      setActiveImage(swiperNav.getActiveIndex())
  }, [scale]);

  return (
      <div className="project-images-slider">
        <TransformWrapper >
          {({ zoomIn, zoomOut, resetTransform }) => (
              <>
                <div className="project-images-slider__scale">
                  <button
                      className="btn-round project-images-slider__btn btn-round--increase"
                      onClick={()=> scaleIn(zoomIn)}
                  >
                    <ReactSVG src="/Assets/Icons/close_round.svg"/>
                  </button>
                  <button
                      className="btn-round project-images-slider__btn btn-round--decrease"
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
                                src={`/Assets/Projects/${project.year}/Project_${project.number}/${project.images[activeImage]}`}
                                alt=""/>
                          </div>
                          :<div/>
                    }
                  </TransformComponent>

                </div>
              </>
          )}
        </TransformWrapper>

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
            centeredSlides={!desktopScreen}
            spaceBetween={'17rem'}
            slidesPerView={mobileScreen ? 1 : desktopScreen? 3 : 1.45}
            ref={swiperRef}
            onActiveIndexChange={togleSwiper}
            className="project-images-slider__swiper"
        >

          {
            (isClient && desktopScreen) &&
              <SwiperSlide className='project-images-slider__text-slide'>
                 <ProjectText project={project}/>
              </SwiperSlide>

          }
          {
            project.images.map((image, index) => (
                <SwiperSlide key={index} onClick={()=> {
                  setActiveImage(index)
                  handleScale(1.5)
                }}>
                  <img src={`/Assets/Projects/${project.year}/Project_${project.number}/${image}`} alt=""/>
                </SwiperSlide>
            ))
          }
          {(isClient && desktopScreen) && <SwiperSlide/>}
        </Swiper>
      </div>
  );
};

export default ProjectImagesSlider;
