import React from 'react';
import NewsMainScreen from "../../components/_news/news-main-screen/NewsMainScreen";
import NewsList from "../../components/_news/news-list/NewsList";
import {fetchData, getNewsPageData, getNewsQueryStr} from "@/utils/fetchData";
import {INews, INewsItem} from "@/types/data";
import {revalidateTag, unstable_cache} from "next/cache";
import ProjectModal from "@/components/_projects/project-modal/ProjectModal";
import CalendarEvents from "@/components/calendar-events/CalendarEvents";
import AnimationPage from "@/app/AnimationPage";
import type {Metadata} from "next";
import Pagination from "@/components/pagination/Pagination";

interface Props{
  searchParams: { [key: string]: string | string[] | undefined }
}

interface IData{
  newsAll: INewsItem[]
  newsAllConnection:{
    aggregate: {
      count: number
    }
  }
}

const init= unstable_cache(async (page: string)=>{

  const data= await fetchData<IData>( `
          query NewsAllQuery {
            ${getNewsQueryStr(Number(page))}
            newsAllConnection(
              stage: PUBLISHED,
            ) {
              aggregate {
                count
              }
            }
          }
      `)

  if (typeof data==="string"|| !data){
    return data
  }

  return {news: data.newsAll, count: data.newsAllConnection.aggregate.count}
}, ["news-page"], {tags: ["News", "AllNews"]})

const Page = async ({searchParams}:Props) => {
  const {page}=searchParams
  const data= await init( typeof page==="string"? isNaN(Number(page))? page:"1":"1")
  const pageData= await getNewsPageData()

  if (typeof data=="string" || data===null) {
    revalidateTag("AllNews")
    return <div>произошла ошибка{data && `: ${data}`}, перезагрузите страницу</div>
  }

  if (!pageData|| typeof pageData==="string" ) {
    revalidateTag("NewsPage")
    return <div>произошла ошибка{pageData && `: ${pageData}`}, перезагрузите страницу</div>
  }
  return (
      <AnimationPage>
        <ProjectModal projects={[pageData.mainScreenProject]} searchParams={searchParams}/>
        <NewsMainScreen data={pageData}/>
        <div style={{background: "#fff", overflow: "hidden"}}>
          <CalendarEvents title={pageData.calendarEventsTitle}/>
          <NewsList news={data.news} pageData={pageData}/>
          <Pagination count={data.count} size={10}/>
        </div>
      </AnimationPage>
  );
};

export const metadata: Metadata = {
  title: "АЛАРОС | Новости",
};

export default Page;
