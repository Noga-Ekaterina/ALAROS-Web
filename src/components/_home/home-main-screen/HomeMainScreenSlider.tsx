'use client'
import MainScreenImageLink from "@/components/main-screen-image-link/MainScreenImageLink"
import { useGetRem } from "@/hoocs/useGetRem"
import { IProject } from "@/types/data"
import { nonBreakingSpaces } from "@/utils/nonBreakingSpaces"
import { useState, useRef, useEffect } from "react"
import { useMediaQuery } from "react-responsive"
import { EffectFade, Autoplay } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

interface Props{
  projects: IProject[]
  mainTitle: string
}

const HomeMainScreenSlider = ({projects, mainTitle}: Props) => {
  const [diagonalWidth, setDiagonalWidth] = useState(0)
  const [diagonalDeg, setDiagonalDeg] = useState(0)
  const [diagonalRight, setDiagonalRight] = useState(0)
  const rem= useGetRem()
  const block= useRef<HTMLDivElement>(null)
  const mobileScreen = useMediaQuery({maxWidth: 660});
  const mdBoockScreen = useMediaQuery({minWidth: 660.1, minHeight: "80vw"});

  useEffect(() => {
    if (!block.current) return

    const width= block.current.clientWidth/ ((mobileScreen || mdBoockScreen)?1: 2)
    const height= block.current.clientHeight/2
    const diagonal= Math.sqrt(Math.pow(width, 2)+Math.pow(height, 2))

    setDiagonalWidth(diagonal)
    setDiagonalDeg(Math.asin(height/diagonal) * (180 / Math.PI)* (mobileScreen? 1: -1))
    setDiagonalRight((diagonal-width)/2)
  }, [rem, mobileScreen, mdBoockScreen, block]);

  return (
    <div className="home-main-screen__slider-wrapp" ref={block}>
      <Swiper
          className="home-main-screen__slider"
          loop={true}
          modules={[EffectFade, Autoplay]}
          effect="fade"
          autoplay={{delay: 3500, disableOnInteraction: false}}
      >
        {
          projects.map(project=>(
              <SwiperSlide key={`${project.year}-${project.number}`}>
                <MainScreenImageLink
                    item={project}
                    className="home-main-screen__slide-content"
                    mediaSizes={{
                      bigDesktop: 'xxl',
                      desktop: "xl",
                      laptop: "large"
                    }}
                >
                  <div className="home-main-screen__slide-title-wrapp">
                    <h2 className='home-main-screen__slide-title'>{nonBreakingSpaces(mainTitle)}</h2>
                  </div>
                  <div className="home-main-screen__diagonal" style={{width: `${diagonalWidth}px`, transform: ` rotate(${diagonalDeg}deg)`, right: block.current? `-${diagonalRight}px`:''}}></div>
                </MainScreenImageLink>
              </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  );
}

export default HomeMainScreenSlider;