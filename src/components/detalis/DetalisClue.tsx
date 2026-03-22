'use client'
import React, {useEffect, useRef, useState} from 'react';
import {CSSTransition} from "react-transition-group";
import {ReactSVG} from "react-svg";
import "./detalis-clue.scss"

interface Props {
  isOpen?: boolean
  disabled?: boolean
}

const DetalisClue = ({isOpen, disabled}: Props) => {
  const containerRef = useRef<HTMLSpanElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [isPlay, setIsPlay] = useState(false)
  const [allowPlay, setAllowPlay] = useState(!disabled);

  useEffect(() => {
    if(isOpen)
      setAllowPlay(false)
  }, [isOpen]);

  useEffect(() => {
    const parent = containerRef.current?.parentElement

    if (!parent || !allowPlay) return

    const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {

            setIsPlay(true)

            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current)
            }

            timeoutRef.current = setTimeout(() => setIsPlay(false), 1100)
          }
        },
        {
          root: null,
          threshold:0,
          rootMargin: "-25% 0px -25% 0px"
        }
    )

    observer.observe(parent)

    return () => {
      observer.disconnect()

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [allowPlay])

  return (
      <span className="detalis-clue" ref={containerRef} aria-hidden="true">
        <span className="detalis__icon detalis-clue__icon">+</span>

        <CSSTransition in={isPlay} classNames="detalis-clue-hint" timeout={900} unmountOnExit={true}>
          <span className="detalis-clue-hint">
            <span className="detalis-clue-hint__bg"/>
            <ReactSVG src="/Assets/Icons/clue_details.svg" className="detalis-clue-hint__icon"/>
          </span>
        </CSSTransition>
      </span>
  );
};

export default DetalisClue
