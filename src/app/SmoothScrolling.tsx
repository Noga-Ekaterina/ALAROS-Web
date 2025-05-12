'use client'
import {ReactLenis, useLenis} from "@studio-freight/react-lenis";
import {IWithChildren} from "@/types/tehnic";
import {useEffect, useRef} from 'react';

interface Props extends IWithChildren{
  wrapper?: HTMLDivElement | null
  root?: boolean
}

function SmoothScrolling({ children, root, wrapper }: Props) {
  const lenis = useLenis()
  const touchStartY = useRef(0);
  const lastTouchY = useRef(0);

  useEffect(() => {
    const animation=(el: HTMLElement, durution: "top"|"bottom")=>{
      const child=el.querySelector(".lenis__content") as HTMLElement | null;

      if (!child) return

      child.style.transform=`translateY(${durution=="bottom"? -15:15}rem)`

      setTimeout(()=>{
        child.style.transform=""
      }, 300)
    }

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      lastTouchY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const currentTouchY = e.touches[0].clientY;
      const deltaY = currentTouchY - lastTouchY.current;
      console.log({lastTouchY, deltaY})

      // Обновляем предыдущее значение
      lastTouchY.current = currentTouchY;

      const el = (e.target as HTMLElement).closest(".lenis.lenis-smooth") as HTMLElement;
      if (!el) return;

      const isAtBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
      const isScrollingDown = deltaY < 0; // Отрицательная deltaY = скролл вниз

      if (isAtBottom && isScrollingDown) {
        animation(el, "bottom")
      }else if (el.scrollTop==0 && !isScrollingDown){
        animation(el, "top")
      }
    };

    const handleWheel = (e: WheelEvent) => {
      const el = (e.target as HTMLElement).closest(".lenis.lenis-smooth") as HTMLElement;
      if (!el) return;

      const isAtBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
      if (isAtBottom && e.deltaY > 0) {
        animation(el, "bottom")
      }else if (el.scrollTop==0 && e.deltaY<=0){
        animation(el, "top")
      }
    };

    // Добавляем обработчики
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('wheel', handleWheel);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('wheel', handleWheel);
    };
  }, []);


  useEffect(() => {
    // Обновляем Lenis при любых изменениях в DOM
    const observer = new MutationObserver(() => {
      lenis?.resize()
    })

    observer.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true
    })

    return () => observer.disconnect()
  }, [lenis])



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
      >
        <div className="lenis__content">{children}</div>
      </ReactLenis>
  )
}

export default SmoothScrolling