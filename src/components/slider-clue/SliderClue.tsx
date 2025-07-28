'use client'
import React, {useEffect, useRef, useState} from 'react';
import "./slider-clue.scss"
import {CSSTransition} from "react-transition-group";
import {ReactSVG} from "react-svg";

interface Props{
  parentRef?:  React.MutableRefObject<null | HTMLElement>
  threshold?: number
}

const SliderClue = ({parentRef, threshold}:Props) => {
  const containerRef=useRef<null|HTMLDivElement>(null)
  const [isPlay, setIsPlay] = useState(false)

  useEffect(() => {
    const parent=parentRef?.current || containerRef.current?.parentElement

    const observer = new IntersectionObserver(
        ([entry]) => {
          // Запускаем анимацию, когда элемент появляется в viewport
          if (entry.isIntersecting) {
            setIsPlay(true);
            setTimeout(()=> setIsPlay(false), 1500)
          }
        },
        {
          root: null, // Используем viewport как область отслеживания
          threshold: threshold || 0.8
        }
    );

    if (parent) {
      observer.observe(parent);
    }


    return () => {
      if (parent) {
        observer.unobserve(parent);
      }
    };
  }, [containerRef.current]);
  return (
      <div ref={containerRef}>
        <CSSTransition in={isPlay} classNames='slider-clue-content' timeout={1100} unmountOnExit={true}>
          <div className="slider-clue-content">
            <ReactSVG src="/Assets/Icons/arrow.svg" className="slider-clue-content__arrow"/>
            <ReactSVG src="/Assets/Icons/hand.svg" className="slider-clue-content__hand"/>
            <ReactSVG src="/Assets/Icons/arrow.svg" className="slider-clue-content__arrow slider-clue-content__arrow--next"/>
          </div>
        </CSSTransition>

        <CSSTransition in={isPlay} classNames='slider-clue-elipse' timeout={1000} unmountOnExit={true}>
          <div className="slider-clue-elipse">
          </div>
        </CSSTransition>
      </div>
  );
};

export default SliderClue