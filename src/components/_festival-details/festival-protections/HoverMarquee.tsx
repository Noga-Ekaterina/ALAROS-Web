'use client'

import React, {PointerEvent, useEffect, useRef, useState} from 'react';
import Marquee from 'react-fast-marquee';
import cn from 'classnames';
import {useClose} from '@/hoocs/useClose';

interface Props {
  text?: string | number | null
  className?: string
}

const HoverMarquee = ({text, className}: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const textRef = useRef<HTMLSpanElement | null>(null)
  const [isOverflowing, setIsOverflowing] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [canHover, setCanHover] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    const updateCanHover = () => setCanHover(mediaQuery.matches)

    updateCanHover()
    mediaQuery.addEventListener('change', updateCanHover)

    return () => mediaQuery.removeEventListener('change', updateCanHover)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    const textNode = textRef.current

    if (!container || !textNode) return

    const checkOverflow = () => {
      setIsOverflowing(textNode.scrollWidth > container.clientWidth)
    }

    checkOverflow()
    window.addEventListener('resize', checkOverflow)

    return () => {
      window.removeEventListener('resize', checkOverflow)
    }

  }, [text])

  useEffect(() => {
    if (!canHover) {
      setIsHovered(false)
    }
  }, [canHover])

  useEffect(() => {
    if (!isHovered || !canHover) return

    const handleMouseMove = (event: MouseEvent) => {
      const container = containerRef.current

      if (!container) return

      const {left, right, top, bottom} = container.getBoundingClientRect()
      const isInside =
          event.clientX >= left &&
          event.clientX <= right &&
          event.clientY >= top &&
          event.clientY <= bottom

      if (!isInside) {
        setIsHovered(false)
      }
    }

    const handleWindowBlur = () => setIsHovered(false)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('blur', handleWindowBlur)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('blur', handleWindowBlur)
    }
  }, [isHovered, canHover])

  const handlePointerEnter = (event: PointerEvent<HTMLDivElement>) => {
    if (!canHover || event.pointerType !== 'mouse') return
    setIsHovered(true)
  }

  const handlePointerLeave = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return
    setIsHovered(false)
  }

  const handleClick = (event: PointerEvent<HTMLDivElement>) => {
    if (!canHover) setIsHovered(prev => !prev)
  }

  useClose({ref: containerRef, isOpen: isHovered, setIsOpen: setIsHovered})

  if (!text) return null

  return (
      <div
          ref={containerRef}
          className={cn("festival-protections__hover-marquee", className)}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          onClick={handleClick}
      >
        {isOverflowing && isHovered ? (
            <Marquee
                play
                speed={25}
                delay={0.2}
                gradient={false}
                autoFill={false}
                className="festival-protections__hover-marquee-track"
            >
              <span className="festival-protections__hover-marquee-text">{text}</span>
            </Marquee>
        ) : (
          <>
            <span ref={textRef} className="festival-protections__hover-marquee-text">
              {text}
            </span>
            
            {isOverflowing && <span className="festival-protections__hover-marquee-elipsis">...</span>}
          </>
        )}
      </div>
  );
};

export default HoverMarquee;
