'use client'
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import { IWithChildren } from "@/types/tehnic";
import React, { useEffect, useRef, useState } from 'react';
import type Lenis from "@studio-freight/lenis";
import cn from "classnames";

interface Props extends IWithChildren {
  wrapper?: HTMLDivElement | null;
  root?: boolean;
  enableScrollTransfer?: boolean;
  noAnimation?: boolean
}

function SmoothScrolling({
                           children,
                           root,
                           wrapper,
                           enableScrollTransfer = false,
                           noAnimation= false
                         }: Props) {
  const lenis = useLenis();
  const touchStartY = useRef(0);
  const lastTouchY = useRef(0);
  const lenisRef=useRef<{lenis: Lenis | undefined}>(null)

  // Анимация границ
  const animation = (target: HTMLElement, direction: "top"|"bottom") => {
    const el = target.closest(".lenis__content") as HTMLDivElement|null;

    if (!el || el.classList.contains("enableScrollTransfer")) return;

    el.style.transform = `translateY(${direction === "bottom" ? -15 : 15}rem)`;
    setTimeout(() => {
      el.style.transform = "";
    }, 300);
  };

  const isEnd = (deltaY: number, el: Element) => {
    const { scrollTop, scrollHeight, clientHeight } = el;
    const isBottom = scrollTop + clientHeight >= scrollHeight - 1 && deltaY>0;
    const isTop = scrollTop === 0 && deltaY<0;

    return {isBottom, isTop}
  };

  // Обработчик передачи скролла
  const handleScrollTransfer = (deltaY: number, el: Element) => {
    if (!enableScrollTransfer|| !lenisRef.current) return false;
    const lenisCurrent= lenisRef.current.lenis

    if (!lenisCurrent) return

    const {isTop, isBottom} =isEnd(deltaY, el)

    if (isBottom || isTop) {
      lenisCurrent.stop();
      return true;
    } else {
      lenisCurrent.start();
      return false;
    }
  };

  // Обработчики событий
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartY.current = e.touches[0].clientY;
    lastTouchY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const currentTouchY = e.touches[0].clientY;
    const deltaY = -(currentTouchY - lastTouchY.current);
    lastTouchY.current = currentTouchY;

    const el = (e.target as HTMLElement).closest(".lenis.lenis-smooth");
    if (!el) return;

    if (enableScrollTransfer) {
      handleScrollTransfer(deltaY, el)
    } else if (!noAnimation){
      const {isTop, isBottom} =isEnd(deltaY, el)

      if (isBottom) {
        animation(e.target as HTMLElement, "bottom");
      } else if (isTop) {
        animation(e.target as HTMLElement, "top");
      }
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const el = (e.target as HTMLElement).closest(".lenis.lenis-smooth");
    if (!el) return;

    if (enableScrollTransfer) {
      handleScrollTransfer(e.deltaY, el)
    } else if (!noAnimation){
      const {isTop, isBottom} =isEnd(e.deltaY, el)
      
      if (isBottom) {
        animation(e.target as HTMLElement, "bottom");
      } else if (isTop) {
        animation(e.target as HTMLElement, "top");
      }
    }
  };

  // Наблюдатель за изменениями DOM
  useEffect(() => {
    const observer = new MutationObserver(() => {
      lenis?.resize();
    });

    observer.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true
    });

    return () => observer.disconnect();
  }, [lenis]);

  return (
      <ReactLenis
          root={root}
          options={{
            wrapper: wrapper ?? undefined,
            lerp: 0.1,
            duration: 1.5,
            smoothWheel: true,
            syncTouch: true,
          }}
          ref={lenisRef}
      >
        <div
            className={cn("lenis__content", {enableScrollTransfer})}
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
        >
          {children}
        </div>
      </ReactLenis>
  );
}

export default SmoothScrolling;