import {useEffect, useRef} from "react";
import {IWithChildren, IWithClass} from "@/types/tehnic";

interface Props extends IWithChildren, IWithClass{
  sensitivity?: number
}

function HorizontalScrollSection({
                                   children,
                                   className,
                                   sensitivity = 2
                                 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isScrolling = useRef<boolean>(false)
  const startX = useRef<number>(0)
  const startY = useRef<number>(0)
  const scrollLeft = useRef<number>(0)
  const touchDirection = useRef<"horizontal" | "vertical" | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleTouchStart = (e: TouchEvent) => {
      isScrolling.current = true
      startX.current = e.touches[0].pageX
      startY.current = e.touches[0].pageY
      scrollLeft.current = container.scrollLeft
      touchDirection.current = null
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isScrolling.current) return

      const x = e.touches[0].pageX
      const y = e.touches[0].pageY
      const deltaX = x - startX.current
      const deltaY = y - startY.current
      const absDeltaX = Math.abs(deltaX)
      const absDeltaY = Math.abs(deltaY)

      if (!touchDirection.current && Math.max(absDeltaX, absDeltaY) > 8) {
        touchDirection.current = absDeltaX > absDeltaY ? "horizontal" : "vertical"
      }

      if (touchDirection.current === "vertical") return

      const walk = deltaX * sensitivity
      container.scrollLeft = scrollLeft.current - walk

      if (touchDirection.current === "horizontal") {
        e.preventDefault()
      }
    }

    const handleTouchEnd = () => {
      isScrolling.current = false
      touchDirection.current = null
    }

    container.addEventListener('touchstart', handleTouchStart, { passive: true })
    container.addEventListener('touchmove', handleTouchMove, { passive: false })
    container.addEventListener('touchend', handleTouchEnd)

    return () => {
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchmove', handleTouchMove)
      container.removeEventListener('touchend', handleTouchEnd)
    }
  }, [sensitivity])

  return (
      <div
          ref={containerRef}
          className={className}
          data-horizontal-scroll-lock
          style={{
            overflowX: 'auto',
            overflowY: 'hidden',
            WebkitOverflowScrolling: 'touch',
            touchAction: 'pan-y',
          }}
      >
        {children}
      </div>
  )
}

export default HorizontalScrollSection
