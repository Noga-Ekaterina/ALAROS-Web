'use client'
import React, {MutableRefObject, useCallback, useEffect, useRef, useState} from 'react';
import { SwiperRef } from 'swiper/react';
import './slider-progress.scss';

interface SliderProgressProps {
  swiperRef: MutableRefObject<SwiperRef | null>;
  progressClass?: string;
}

const SliderProgress = ({ swiperRef, progressClass }: SliderProgressProps) => {
  const progressRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);

  useEffect(() => {
    const swiper = swiperRef.current?.swiper;
    if (!swiper || !progressRef.current) return;

    const updateProgress = () => {
      if (!isDragging.current && progressRef.current) {
        progressRef.current.style.left = `min(${swiper.progress * 100}%, calc(100% - 100rem))`;
      }
    };

    swiper.on('progress', updateProgress);
    return () => swiper.off('progress', updateProgress);
  }, [swiperRef, isDragging]);

  const handleDragStart = useCallback((clientX: number) => {
    isDragging.current= true;
    const swiper = swiperRef.current?.swiper;
    if (!swiper || !progressRef.current) return;

    const progressBar = progressRef.current.parentElement;
    if (!progressBar) return;

    dragStartX.current = clientX - progressRef.current.getBoundingClientRect().left;

    // Отключаем transition во время перетаскивания
    progressRef.current.style.transition = 'none';
    swiper.wrapperEl.style.transition = 'none';
  }, [])

  const handleDragMove = useCallback((clientX: number) => {
    if (!isDragging.current || !progressRef.current) return;
    const swiper = swiperRef.current?.swiper;
    if (!swiper) return;

    const progressBar = progressRef.current.parentElement;
    if (!progressBar) return;

    const rect = progressBar.getBoundingClientRect();
    let newX = clientX - rect.left - dragStartX.current;
    newX = Math.max(0, Math.min(newX, rect.width - 100));

    const progress = newX / (rect.width - 100);
    const snapIndex = Math.round(progress * (swiper.slides.length - 1));

    progressRef.current.style.left = `${newX}px`;
    swiper.setProgress(progress);
    swiper.slideTo(snapIndex);
  }, [])

  const handleDragEnd = useCallback(() => {
    isDragging.current=false
    const swiper = swiperRef.current?.swiper;
    if (!swiper || !progressRef.current) return;

    // Восстанавливаем transition
    progressRef.current.style.transition = '';
    swiper.wrapperEl.style.transition = '';
  }, [])

  // Обработчики событий мыши
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()

    handleDragStart(e.clientX);
    document.addEventListener('mousemove', onMouseMove, { passive: false });
    document.addEventListener('mouseup', onMouseUp);
  }, [])

  const onMouseMove = useCallback((e: MouseEvent) => {
    e.preventDefault()

    handleDragMove(e.clientX);
  }, [])
  const onMouseUp = useCallback(() => {
    handleDragEnd();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }, []);

  // Обработчики событий касания
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault()

    handleDragStart(e.touches[0].clientX);
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchend', onTouchEnd);
  }, []);

  const onTouchMove = useCallback((e: TouchEvent) => {
    e.preventDefault()

    handleDragMove(e.touches[0].clientX)
  }, [])
  const onTouchEnd = useCallback(() => {
    handleDragEnd();
    document.removeEventListener('touchmove', onTouchMove);
    document.removeEventListener('touchend', onTouchEnd);
  }, [])

  return (
      <div className={`slider-progress ${progressClass || ''}`}>
        <div
            className="slider-progress__bar"
            ref={progressRef}
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
            role="slider"
            aria-valuemin={0}
            aria-valuemax={100}
        />
      </div>
  );
};

export default SliderProgress;