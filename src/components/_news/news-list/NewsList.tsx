'use client'
import React, { FC, ReactNode, useEffect, useState } from 'react';
import './news-list.scss';

import cn from 'classnames';
import { useMediaQuery } from 'react-responsive';
import {INews, INewsItem} from "../../../types/data";
import {observer} from "mobx-react-lite";
import NewsItem from "../news-item/NewsItem";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";
import HtmlProcessing from "@/components/HtmlProcessing";
import {ReactSVG} from "react-svg";

interface Props{
  news: INewsItem[]
  pageData: INews
}

const NewsList: FC<Props> = ({news, pageData}) => {
  const [baseChunkSize, setBaseChunkSize] = useState(3);
  const mobileScreen = useMediaQuery({maxWidth: 640});
  const [isBigItem, setIsBigItem] = useState(false)

  const getModifiedList = (data: any[]) => {
    const chunkSizes = [baseChunkSize, mobileScreen? baseChunkSize: baseChunkSize+1]; // Чередование размеров порций
    let result: any[] = [];
    let index = 0;
    let chunkIndex = 0;

    while (index < data.length) {
      const currentChunkSize = chunkSizes[chunkIndex % chunkSizes.length];
      const subArray = data.slice(index, index + currentChunkSize);


      if (subArray.length > 0) {
        // Добавляем новую порцию
        result.push(subArray);
      }

      index += currentChunkSize;
      chunkIndex++;
    }

    // Если result не пустой, проверяем последнюю порцию на предмет недостающих элементов
    if (result.length > 0) {
      const lastChunk = result[result.length - 1];
      const needed =  (index-data.length)

      if (needed > 0) {
        const extraElements = data.slice(0, needed);
        lastChunk.push(...extraElements);
      }
    }


    return result;
  };

  const [itemsGrid, setItemsGrid] = useState<any[]>([]);

  useEffect(() => {
    if (!news) return;

    setItemsGrid(getModifiedList(news));
  }, [news, baseChunkSize]);


  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch(`/api/projects/${title}`);
  //     const json = await response.json();
  //
  //     setData(json);
  //   })();
  // },[])

  useEffect(() => {
    if (mobileScreen) {
      setBaseChunkSize(1);
    } else {
      setBaseChunkSize(2);
    }
  },[mobileScreen])

  return (
    <div className="news-list" id="news-list">
      <ReactSVG src="/Assets/Pages/News/bg/2.svg" className="news-list__bg"/>
      <div className="container">
        <div className="titles-block">
          <h2 className="titles-block__title">{nonBreakingSpaces(pageData.newsTitle)}</h2>
          <div className="titles-block__section">
            <HtmlProcessing html={pageData.newsRightSignature.html}/>
          </div>
        </div>
        {itemsGrid.map((row, rowIndex) => {
          const rowClass = cn(
            "news-list__row",
            (row.length == baseChunkSize) && 'news-list__row--large', (rowIndex % 3==0 && rowIndex%2==0) &&'news-list__row--large-reverse',
          )

          return (
            <div className={rowClass}
                 key={`news-list-row-${rowIndex}`}>

              {row.map((item: INewsItem, index: number) => {
                return (
                  <NewsItem news={item} key={`news-list-item-${index}`}/>
                );
              })}

            </div>
          )
        })}
      </div>
    </div>
  );
};

export default observer(NewsList);
