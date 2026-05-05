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
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const lastTouchY = useRef(0);
  const touchDirection = useRef<"horizontal" | "vertical" | null>(null);
  const isHorizontalTouchArea = useRef(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const lenisRef=useRef<{lenis: Lenis | undefined}>(null)
  const touchDirectionThreshold = 8;

  const getHorizontalTouchArea = (target: EventTarget | null) => {
    if (!(target instanceof HTMLElement)) return null;

    return target.closest(".swiper, [data-horizontal-scroll-lock]");
  };

  const lockTouchDirection = (touch: Pick<Touch, "clientX" | "clientY">) => {
    const deltaXFromStart = touch.clientX - touchStartX.current;
    const deltaYFromStart = touch.clientY - touchStartY.current;
    const absDeltaXFromStart = Math.abs(deltaXFromStart);
    const absDeltaYFromStart = Math.abs(deltaYFromStart);

    if (
        !touchDirection.current &&
        Math.max(absDeltaXFromStart, absDeltaYFromStart) > touchDirectionThreshold
    ) {
      touchDirection.current = absDeltaXFromStart > absDeltaYFromStart
          ? "horizontal"
          : "vertical";
    }
  };

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
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    lastTouchY.current = e.touches[0].clientY;
    touchDirection.current = null;
    isHorizontalTouchArea.current = Boolean(getHorizontalTouchArea(e.target));
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const currentTouchY = e.touches[0].clientY;
    if (isHorizontalTouchArea.current) {
      lockTouchDirection(e.touches[0]);
    }

    if (isHorizontalTouchArea.current && touchDirection.current === "horizontal") {
      return;
    }

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

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const handleNativeTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
      lastTouchY.current = e.touches[0].clientY;
      touchDirection.current = null;
      isHorizontalTouchArea.current = Boolean(getHorizontalTouchArea(e.target));
    };

    const handleNativeTouchMove = (e: TouchEvent) => {
      if (!isHorizontalTouchArea.current || e.touches.length !== 1) return;

      lockTouchDirection(e.touches[0]);

      if (touchDirection.current === "horizontal") {
        lenisRef.current?.lenis?.stop();

        if (getHorizontalTouchArea(e.target)?.hasAttribute("data-horizontal-scroll-lock")) {
          e.preventDefault();
        }
      }
    };

    const handleNativeTouchEnd = () => {
      if (touchDirection.current === "horizontal") {
        lenisRef.current?.lenis?.start();
      }

      isHorizontalTouchArea.current = false;
      touchDirection.current = null;
    };

    content.addEventListener("touchstart", handleNativeTouchStart, {capture: true, passive: true});
    content.addEventListener("touchmove", handleNativeTouchMove, {capture: true, passive: false});
    content.addEventListener("touchend", handleNativeTouchEnd, {capture: true});
    content.addEventListener("touchcancel", handleNativeTouchEnd, {capture: true});

    return () => {
      content.removeEventListener("touchstart", handleNativeTouchStart, {capture: true});
      content.removeEventListener("touchmove", handleNativeTouchMove, {capture: true});
      content.removeEventListener("touchend", handleNativeTouchEnd, {capture: true});
      content.removeEventListener("touchcancel", handleNativeTouchEnd, {capture: true});
    };
  }, []);

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
            ref={contentRef}
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
