'use client'
import {JSX, useMemo} from "react";
import "./text-and-images-sliders.scss"
import parse from 'html-react-parser';
import {Swiper, SwiperSlide} from "swiper/react";
import {Mousewheel} from "swiper/modules";
import {IWithClass} from "@/types/tehnic";
import HtmlProcessing from "@/components/HtmlProcessing";
import SliderClue from "@/components/slider-clue/SliderClue";

interface Props extends IWithClass{
  html: string
  path: string
}

const TextAndImagesSliders = ({html, path, className}: Props) => {
  const result= useMemo(() => {
    const patternImgs = /<h2>IMG<\/h2><table><tbody>(.*?)<\/tbody><\/table>/gs;
    const segments: string[] = html.replaceAll("^", "&nbsp;").split(patternImgs);
    const result: JSX.Element[] = [];

    segments.forEach((segment, index) => {
      if (index % 2 === 0) {
        const replaceTd= segment.replaceAll(/<td>(.*?)<\/td><td><p>-<\/p><\/td>/g, "<td colspan='2'>$1</td>")
        const jsx= parse(replaceTd)
        if (typeof jsx==="object"){
          if (Array.isArray(jsx))
            result.push(...jsx);
          else
            result.push(jsx)
        }

      } else {
        const rows: string = segment;
        const rowMatches=Array.from(rows.matchAll(/<tr>(.*?)<\/tr>/g))
        if (rowMatches) {
          const slides: JSX.Element[]=[]
          const images = Array.from(rowMatches[0][1].matchAll(rowMatches[0][1].includes("<p>")? /<td><p>(.*?)<\/p><\/td>/g : /<td>(.*?)<\/td>/g)).map(m => m[1].trim());
          const captions = Array.from(rowMatches[1][1].matchAll(rowMatches[1][1].includes("<p>")? /<td><p>(.*?)<\/p><\/td>/g : /<td>(.*?)<\/td>/g)).map(m => m[1].trim());

          images.forEach((img, imgIndex)=>{
            const caption = captions[imgIndex];
            slides.push(
                <SwiperSlide key={`image-${img}`} className={className}>
                  <img src={`${path}/${img}`} alt="" loading="lazy"/>
                  <HtmlProcessing html={`<p>${caption}</p>`}/>
                </SwiperSlide>
            );
          })

          result.push(
              <div className="images-slider">
                <Swiper
                    slidesPerView="auto"
                    spaceBetween={"10rem"}
                    className="news-article__slider"
                >
                  {
                    slides.map(slide=>slide)
                  }
                </Swiper>
                {
                    slides.length>1 && <SliderClue/>
                }
              </div>
          )
        }
      }
    });

    return result
  }, [html, path, className])

  return <HtmlProcessing html={result}/>
};

export default TextAndImagesSliders