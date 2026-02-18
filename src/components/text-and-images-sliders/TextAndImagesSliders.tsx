'use client'
import {JSX, useMemo} from "react";
import "./text-and-images-sliders.scss"
import parse from 'html-react-parser';
import {Swiper, SwiperSlide} from "swiper/react";
import {IWithClass} from "@/types/tehnic";
import HtmlProcessing from "@/components/HtmlProcessing";
import SliderClue from "@/components/slider-clue/SliderClue";
import {IContentComponent} from "@/types/data";
import Image from "../Image";

interface Props extends IWithClass{
  html: IContentComponent[];
}

const TextAndImagesSliders = ({html, className}: Props) => {
  const result= useMemo(() => {
    if (!html || html.length === 0) {
      return [];
    }

    const result: JSX.Element[] = [];

    html.forEach((component) => {
      const componentType = component.__component;


      if (componentType === 'conten.slider' && component.images) {
        const slides: JSX.Element[] = component.images.map((image, imgIndex) => {
          const caption = image.caption || '';
          
          return (
            <SwiperSlide key={`image-${component.id}-${imgIndex}`} className={className}>
              <Image image={image} alt={image.alternativeText || ''} loading="lazy" />
              {caption && <HtmlProcessing html={`<p>${caption}</p>`}/>}
            </SwiperSlide>
          );
        });

        result.push(
          <div key={`slider-${component.id}`} className="images-slider">
            <Swiper
              slidesPerView="auto"
              spaceBetween={"10rem"}
              className="news-article__slider"
            >
              {slides}
            </Swiper>
            {slides.length > 1 && <SliderClue/>}
          </div>
        );
      } else if (componentType === 'conten.text-light' && component.text) {
        const replaceTd = component.text.replaceAll(/<td>(.*?)<\/td><td><p>-<\/p><\/td>/g, "<td colspan='2'>$1</td>")
            .replaceAll("^", "&nbsp;");

        const jsx = parse(replaceTd);
        
        if (typeof jsx === "object") {
          if (Array.isArray(jsx)) {
            result.push(...jsx);
          } else {
            result.push(jsx);
          }
        }
      }
    });

    return result;
  }, [html, className])

  return <HtmlProcessing html={result}/>
};

export default TextAndImagesSliders