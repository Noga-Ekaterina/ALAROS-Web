import React from 'react';
import "./news-item.scss"
import {INewsItem} from "../../../types/data";
import {Link} from "react-router-dom";

interface Props {
  news: INewsItem
}
const NewsItem = ({news}: Props) => {
  return (
      <Link to={`/news/${news.slug}`} className='news-item'>
        <h3 className="news-item__title"><span>{news.title}</span></h3>
        <img src={`http://demo-it-park.ru/alaros/Assets/News/${news.slug}/cover.png`} alt="" className="news-item__img"/>

        <p className="news-item__date">{news.date}</p>
        <p className="news-item__description">{news.description}</p>
      </Link>
  );
};

export default NewsItem;
