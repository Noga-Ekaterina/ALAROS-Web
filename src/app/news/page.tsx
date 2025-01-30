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
  newsAll?: INewsItem[]
  newsPages?: INews[]
}

const init= async (page: string)=>{
  if (page in pagesData.newsPages && pagesData.news) return {pageData: pagesData.news, news: pagesData.newsPages[page]}

  const data: IData|null= await fetchData( `
          query NewsAllQuery {
            ${!(page in pagesData.newsPages) &&getNewsQueryStr(Number(page))}
            ${!pagesData.news&&`
            newsPages {
              allNews {
                html
              }
              title
            }
            `}
          }
      `)

  if (!data) return null

  if (data.newsPages)
    pagesData.news= data.newsPages[0]

  if (data.newsAll)
    pagesData.newsPages[page]=data.newsAll

  return {
    pageData: data.newsPages? data.newsPages[0] :pagesData.news,
    news: data.newsAll?? pagesData.newsPages[page]
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
