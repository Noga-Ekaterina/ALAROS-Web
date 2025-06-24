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
        <p className="news-item__date">{formaterDate(news.date)}</p>
        <div className="news-item__img">
          <img src={`/Assets/News/${news.slug}/${news.cover}`} alt=""/>
        </div>

        <p className="news-item__title">{nonBreakingSpaces(news.title)}</p>
        <p className="news-item__description">{nonBreakingSpaces(news.description)}</p>
      </Link>
  );
};

export default NewsItem;
