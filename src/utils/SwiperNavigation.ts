import {MutableRefObject} from "react";
import {SwiperRef} from "swiper/react";

export class SwiperNavigation {
  // Объявляем свойство swiper
  private swiper: MutableRefObject<SwiperRef | null>;

  constructor(swiper: MutableRefObject<SwiperRef | null>) {
    this.swiper = swiper;
    // console.log(swiper)
  }

  goToSlide(index: number) {
    if (this.swiper.current) {
      this.swiper.current.swiper.slideTo(index); // Перемотка на нужный слайд
    }
  }

  goToNext(){
    if (this.swiper.current)
      this.swiper.current?.swiper.slideNext()
  }

  goToPrev(){
    if (this.swiper.current)
      this.swiper.current?.swiper.slidePrev()
  }

  goToSlideNoVisible (index: number) {
    if (this.swiper.current) {
      const {slides, activeIndex, slidesSizesGrid} = this.swiper.current.swiper;
      const viewportWidth = this.swiper.current.swiper.width; // Ширина контейнера
      // const offset = this.swiper.current.swiper.virtual ? this.swiper.current.swiper.virtual.slides : slides;

      if (slidesSizesGrid){
        let viewSlides = 0
        let slidesSizes = 0

        // console.log(activeIndex)

        while (slidesSizes < viewportWidth) {
          if (slidesSizesGrid[activeIndex + viewSlides]) {
            slidesSizes += slidesSizesGrid[activeIndex + viewSlides]
            viewSlides++
          } else
            break
        }

        if (index > 0 && index < slides.length && (index < activeIndex || index > activeIndex + viewSlides))
          this.goToSlide(index)

      }

      // console.log(slides)
      // console.log(slides[index])

    }
  }

  getActiveIndex() {
    if (this.swiper.current) {
      const {activeIndex,} = this.swiper.current.swiper;

      return activeIndex
    }else
      return 0
  }
  isStart(){
    if (this.swiper.current){
      const { activeIndex,} = this.swiper.current.swiper;

      return activeIndex==0
    }else
      return true
  }


  isEnd(viemSlide: number){
    if (this.swiper.current){
      const {slides, activeIndex,} = this.swiper.current.swiper;

      return activeIndex==slides.length-viemSlide
    }else
      return true
  }
}
