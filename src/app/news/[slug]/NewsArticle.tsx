'use client'
import React from 'react';
import {INewsItem} from "@/types/data";
import Link from "next/link";
import HtmlProcessing from "@/components/HtmlProcessing";
import {formaterDate} from "@/utils/date";
import {useRouter} from "next/navigation";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";
import TextAndImages from "@/components/TextAndImages";

interface Props{
  slug: string
  news: INewsItem
  allNews: string
}

const NewsArticle = ({news, slug, allNews}:Props) => {
  return (
      <div className="news-article">
        <div className="container">
          <div className="news-article__header">
            <p>{formaterDate(news.date)}</p>
            <p className="news-article__place">{news.place && news.place}</p>
          </div>
          <h1 className="news-article__title">{nonBreakingSpaces(news.title)}</h1>
          <p className="news-article__description">{  nonBreakingSpaces(news.description)}</p>
          <div className="news-article__main">
            <div className="news-article__aside">
              <img src={`/Assets/News/${slug}/${news.cover}`} alt=""/>
              <div className="news-article__link news-article__link--md">
                <HtmlProcessing html={allNews}/>
              </div>
            </div>
            <div className="news-article__body">
              {
                  <TextAndImages html={news.body? news.body.html:""} path={`/Assets/News/${slug}`} className="news-article__slide"/>
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
