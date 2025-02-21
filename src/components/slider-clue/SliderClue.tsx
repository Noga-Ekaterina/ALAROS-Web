'use client'
import React, {useEffect, useState} from 'react';
import "./slider-clue.scss"
import {CSSTransition} from "react-transition-group";
import {ReactSVG} from "react-svg";

interface Props{
  parentRef:  React.MutableRefObject<null>
}

const SliderClue = ({parentRef}:Props) => {
  const [isPlay, setIsPlay] = useState(false)

  useEffect(() => {
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
          threshold: 0.8 // Срабатывает, когда 80% элемента видно
        }
    );

    if (parentRef.current) {
      observer.observe(parentRef.current);
    }


    return () => {
      if (parentRef.current) {
        observer.unobserve(parentRef.current);
      }
    };
  }, []);
  return (
      <>
        <CSSTransition in={isPlay} classNames='slider-clue-content' timeout={1000} unmountOnExit={true}>
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
      </>
  );
};

export default SliderClue