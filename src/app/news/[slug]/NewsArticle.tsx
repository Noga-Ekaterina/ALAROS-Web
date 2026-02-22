'use client'
import React from 'react';
import { INewsItem } from "@/types/data";
import Link from "next/link";
import HtmlProcessing from "@/components/HtmlProcessing";
import { formaterDate } from "@/utils/date";
import { useRouter } from "next/navigation";
import { nonBreakingSpaces } from "@/utils/nonBreakingSpaces";
import TextAndImagesSliders from "@/components/text-and-images-sliders/TextAndImagesSliders";
import Image from '@/components/Image';

interface Props {
  news: INewsItem
}

const NewsArticle = ({ news, }: Props) => {
  return (
    <div className="news-article">
      <div className="container">
        <div className="news-article__header">
          <p>{formaterDate(news.date)}</p>
          <p className="news-article__place">{news.place && news.place}</p>
        </div>
        <h1 className="news-article__title">{nonBreakingSpaces(news.title)}</h1>
        <p className="news-article__description">{nonBreakingSpaces(news.description)}</p>
        <div className="news-article__main">
          <div className="news-article__aside">
            <Image image={news.cover} />
            <div className="news-article__link news-article__link--md">
              <a title="/news" href="/news"><u>Лента новостей</u></a>
            </div>
          </div>
          <div className="news-article__body">
            {
              <TextAndImagesSliders html={news?.body || []} className="news-article__slide" />
            }
          </div>
        </div>

        <div className="news-article__link news-article__link--sm">
          <a title="/news" href="/news"><u>Лента новостей</u></a>
        </div>
      </div>
    </div>
  );
};

export default NewsArticle;
