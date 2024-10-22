import React, {useEffect, useState, JSX} from 'react';
import "./news-article.scss"
import {INewsItem} from "../../types/data";
import axios from "axios";
import parse from 'html-react-parser';
import {useParams} from "react-router";
import {Swiper, SwiperSlide} from "swiper/react";
import {Mousewheel} from "swiper/modules";
import {Link} from "react-router-dom";
import pagesData from "../../store/pagesData";

const NewsArticle = () => {
  const {newsPages}=pagesData
  const {slug}= useParams()
  const [news, setNews] = useState<INewsItem | null>(null)
  const [body, setBody] = useState<JSX.Element[] | null>(null)
  const replaceHtmlSegments = (html: string): JSX.Element[] => {
    const patternImgs = /<h2>IMG<\/h2><table><tbody>(.*?)<\/tbody><\/table>/gs;
    console.log(html)
    const segments: string[] = html.split(patternImgs);
    const result: JSX.Element[] = [];


    segments.forEach((segment, index) => {
      if (index % 2 === 0) {
        const replaceTd= segment.replaceAll(/<td>(.*?)<\/td><td><p>-<\/p><\/td>/g, "<td colspan='2'>$1</td>")
        console.log(replaceTd)
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
        console.log(rowMatches)
        if (rowMatches) {
          const slides: JSX.Element[]=[]
          // console.log(rowMatch)
          const images = Array.from(rowMatches[0][1].matchAll(rowMatches[0][1].includes("<p>")? /<td><p>(.*?)<\/p><\/td>/g : /<td>(.*?)<\/td>/g)).map(m => m[1].trim());
          const captions = Array.from(rowMatches[1][1].matchAll(rowMatches[1][1].includes("<p>")? /<td><p>(.*?)<\/p><\/td>/g : /<td>(.*?)<\/td>/g)).map(m => m[1].trim());

          console.log({images, captions})
          images.forEach((img, imgIndex)=>{
            const caption = captions[imgIndex];
            slides.push(
                <SwiperSlide key={`image-${img}`} className="news-article__slide">
                  <img src={`/Assets/News/${slug}/${img}.png`} alt={`Image ${img}`} />
                  <p>{caption}</p>
                </SwiperSlide>
            );
          })

          result.push(
              <Swiper
                  slidesPerView="auto"
                  mousewheel={{sensitivity: 5000}}
                  modules={[Mousewheel]}
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


  useEffect(() => {
    const keys= Object.keys(newsPages)
    let newsItem: null|INewsItem=null

    for (let i=0; i<=keys.length-1; i++){
      const newsSearch= newsPages[keys[i]].find(item=> item.slug==slug)
      if (newsSearch){
        newsItem=newsSearch
        break
      }
    }

    if (newsItem){
      setNews(newsItem)
    }else {

      axios({
        method: 'POST',
        url: process.env.REACT_APP_API_URL,
        data: {
          query: `
          query NewsItemQuery {
            newsAll(where: {slug: "${slug}"}) {
              date
              description
              title
              slug
              place
              body {
                html
              }
            }
          }`
        }
      }).then((resp) => {
        const news: INewsItem | undefined = resp.data.data.newsAll[0];
        if (news)
          setNews({
            ...news,
            date: new Date(news.date).toLocaleDateString("ru-RU", { year: 'numeric', month: '2-digit', day: '2-digit' })
          })
      });
    }

  }, []);

  useEffect(() => {
    if (news){
      if (news.body)
        setBody(replaceHtmlSegments(news.body.html))
    }
  }, [news]);
  // const resultDivs = replaceHtmlSegments(news?.body.html);

  return (
      <div className="news-article">
        {
          news ?
              <div className="container">
                <div className="news-article__header">
                  <p>{news.date}</p>
                  <p className="news-article__place">{news.place && news.place}</p>
                </div>
                <h1 className="news-article__title">{news.title}</h1>
                <p className="news-article__description">{news.description}</p>
                <div className="news-article__main">
                  <div className="news-article__aside">
                    <img src={`/Assets/News/${slug}/cover.png`} alt=""/>
                    <Link to="/news" className="news-article__link news-article__link--md link-underline">К архиву новостей</Link>
                  </div>
                  <div className="news-article__body">
                    {
                        body && body.map(el => el)
                    }
                  </div>
                </div>

                <Link to="/news" className="news-article__link news-article__link--sm link-underline">К архиву новостей</Link>
              </div>
              :
              <div></div>
        }
      </div>
  );
};

export default NewsArticle