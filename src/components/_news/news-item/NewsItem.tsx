import React from 'react';
import "./news-item.scss"
import {INewsItem} from "../../../types/data";
import Link from 'next/link';
import {formaterDate} from "@/utils/date";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";

interface Props {
  news: INewsItem
}
const NewsItem = ({news}: Props) => {
  return (
      <Link href={`/news/${news.slug}`} className='news-item'>
        <h3 className="news-item__title"><span>{nonBreakingSpaces(news.title)}</span></h3>
        <img src={`http://demo-it-park.ru/alaros/Assets/News/${news.slug}/${news.cover}`} alt="" className="news-item__img"/>

        <p className="news-item__date">{formaterDate(news.date)}</p>
        <p className="news-item__description">{nonBreakingSpaces(news.description)}</p>
      </Link>
  );
};

export default NewsItem;
