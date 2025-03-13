'use client'
import {ReactLenis, useLenis} from "@studio-freight/react-lenis";
import {IWithChildren} from "@/types/tehnic";
import { useEffect } from 'react';

interface Props extends IWithChildren{
  wrapper?: HTMLDivElement | null
  root?: boolean
}

function SmoothScrolling({ children, root, wrapper }: Props) {
  const lenis = useLenis()

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
            syncTouch: true
          }}
      >
        {children}
      </ReactLenis>
  )
}

export default SmoothScrolling