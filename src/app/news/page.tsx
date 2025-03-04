import React from 'react';
import NewsMainScreen from "../../components/_news/news-main-screen/NewsMainScreen";
import NewsList from "../../components/_news/news-list/NewsList";
import {fetchData, getNewsQueryStr} from "@/utils/fetchData";
import {INews, INewsItem} from "@/types/data";
import {unstable_cache} from "next/cache";
import ProjectModal from "@/components/_projects/project-modal/ProjectModal";

interface Props{
  searchParams: { [key: string]: string | string[] | undefined }
}

interface IData{
  newsAll: INewsItem[]
  newsPages: INews[]
}

const init= unstable_cache(async (page: string)=>{

  const data: IData|null= await fetchData( `
          query NewsAllQuery {
            ${getNewsQueryStr(Number(page))}
            newsPages {
              allNews {
                html
              }
              title
              mainScreenProject {
                cover
                diploma
                signature
                images
                name
                nomination
                number
                winner
                year
              }
            }
          }
      `)

  if (!data) return null

  return {
    pageData: data.newsPages[0],
    news: data.newsAll
  }
}, ["news-page"], {tags: ["News", "NewsPage"]})

const Page = async ({searchParams}:Props) => {
  const {page}=searchParams
  const data= await init( typeof page==="string"? isNaN(Number(page))? page:"1":"1")

  if (!data ||!data.pageData) return <div>произошла ошибка, перезагрузите страницу</div>
  return (
      <>
        <ProjectModal projects={[data.pageData.mainScreenProject]} searchParams={searchParams}/>
        <NewsMainScreen data={data.pageData}/>
        <NewsList news={data.news}/>
      </>
  );
};

export default Page;
