import React from 'react';
import NewsMainScreen from "../../components/_news/news-main-screen/NewsMainScreen";
import {pagesData} from "@/pagesData";
import NewsList from "../../components/_news/news-list/NewsList";
import {fetchData, getNewsQueryStr} from "@/utils/fetchData";
import {INews, INewsItem} from "@/types/data";

interface Props{
  searchParams: { [key: string]: string | string[] | undefined }
}

interface IData{
  newsAll: INewsItem[]
  newsPages: INews[]
}

const init= async (page: string)=>{

  const data: IData|null= await fetchData( `
          query NewsAllQuery {
            ${getNewsQueryStr(Number(page))}
            newsPages {
              allNews {
                html
              }
              title
              mainScreenPhoto
              mainScreenPhotoSignature
            }
          }
      `)

  if (!data) return null

  return {
    pageData: data.newsPages[0],
    news: data.newsAll
  }
}

const Page = async ({searchParams}:Props) => {
  const {page}=searchParams
  const data= await init( typeof page==="string"? isNaN(Number(page))? page:"1":"1")

  if (!data ||!data.pageData) return <div>произошла ошибка, перезагрузите страницу</div>
  return (
      <div>
        <NewsMainScreen data={data.pageData}/>
        <NewsList news={data.news}/>
      </div>
  );
};

export default Page;
