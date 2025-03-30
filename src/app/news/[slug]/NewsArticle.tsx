'use client'
import React, {JSX, useEffect} from 'react';
import {INewsItem} from "@/types/data";
import Link from "next/link";
import HtmlProcessing from "@/components/HtmlProcessing";
import parse from 'html-react-parser';
import {Swiper, SwiperSlide} from "swiper/react";
import {Mousewheel} from "swiper/modules";
import {ReactSVG} from "react-svg";
import {formaterDate} from "@/utils/date";
import {useRouter} from "next/navigation";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";

interface Props{
  slug: string
  news: INewsItem
  allNews: string
}

const NewsArticle = ({news, slug, allNews}:Props) => {
  const replaceHtmlSegments = (html: string): JSX.Element[] => {
    const patternImgs = /<h2>IMG<\/h2><table><tbody>(.*?)<\/tbody><\/table>/gs;
    const segments: string[] = html.split(patternImgs);
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
                <SwiperSlide key={`image-${img}`} className="news-article__slide">
                  <img src={`http://demo-it-park.ru/alaros/Assets/News/${slug}/${img}`} alt={caption} />
                  <p>{caption}</p>
                </SwiperSlide>
            );
          })

          result.push(
              <Swiper
                  slidesPerView="auto"
                  spaceBetween={"10rem"}
                  className="news-article__slider"
              >
                {
                  slides.map(slide=>slide)
                }
              </Swiper>
          )
        }
      }
    });

    return result;
  };
  const router= useRouter()

  const body = replaceHtmlSegments(news.body? news.body.html:'')
  
  return (
      <div className="news-article">
        <button
            className="news-article__back"
          onClick={()=>router.back()}
        >
          <ReactSVG src="/Assets/Icons/arrow.svg" className="news-article__arr"/>
        </button>
        <div className="container">
          <div className="news-article__header">
            <p>{formaterDate(news.date)}</p>
            <p className="news-article__place">{news.place && news.place}</p>
          </div>
          <h1 className="news-article__title">{nonBreakingSpaces(news.title)}</h1>
          <p className="news-article__description">{  nonBreakingSpaces(news.description)}</p>
          <div className="news-article__main">
            <div className="news-article__aside">
              <img src={`http://demo-it-park.ru/alaros/Assets/News/${slug}/${news.cover}`} alt=""/>
              <div className="news-article__link news-article__link--md">
                <HtmlProcessing html={allNews}/>
              </div>
            </div>
            <div className="news-article__body">
              {
                  body && <HtmlProcessing html={body}/>
              }
            </div>
          </div>

          <div className="news-article__link news-article__link--sm">
            <HtmlProcessing html={allNews}/>
          </div>
        </div>
      </div>
  );
};

export default NewsArticle;
