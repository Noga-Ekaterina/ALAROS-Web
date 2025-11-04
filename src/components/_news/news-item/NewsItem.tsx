import React, {useEffect, useMemo, useState} from 'react';
import "./news-item.scss"
import {INewsItem} from "../../../types/data";
import Link from 'next/link';
import {formaterDate} from "@/utils/date";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";
import {useMediaQuery} from "react-responsive";

interface Props {
  news: INewsItem
  small?: boolean
}
const NewsItem = ({news, small}: Props) => {
  const mobileScreen = useMediaQuery({maxWidth: 660});
  const [description, setDescription] = useState(news.description)

  useEffect(()=>{
    let i=330

    if (news.description.length<=i+1 || !small) return

    if (!mobileScreen){
      setDescription(news.description)

      return;
    }

    let end= news.description[i]

    while(end===" " || end==="^" || end==="\n"){
      i--
      end= news.description[i]
    }

    const result= news.description.slice(0, i)

    setDescription(`${result}...`)
  }, [mobileScreen, small, news])

  return (
      <Link href={`/news/${news.slug}`} className='news-item'>
        <p className="news-item__date">{formaterDate(news.date)}</p>
        <div className="news-item__img">
          <img src={`/Assets/News/${news.slug}/${news.cover}`} alt=""/>
        </div>

        <p className="news-item__title">{nonBreakingSpaces(news.title)}</p>
        <p className="news-item__description">{nonBreakingSpaces(description)}</p>
      </Link>
  );
};

export default NewsItem;
