import React from 'react';
import NewsMainScreen from "../../components/_news/news-main-screen/NewsMainScreen";
import NewsList from "../../components/_news/news-list/NewsList";
import {INews, INewsItem} from "@/types/data";
import {revalidateTag, unstable_cache} from "next/cache";
import ProjectModal from "@/components/_projects/project-modal/ProjectModal";
import CalendarEvents from "@/components/calendar-events/CalendarEvents";
import AnimationPage from "@/app/AnimationPage";
import type {Metadata} from "next";
import Pagination from "@/components/pagination/Pagination";
import {fetchColection, fetchSingle, getNews} from '@/utils/strapFetch';

interface Props{
  searchParams: { [key: string]: string | string[] | undefined }
}


const getNewsPageData = unstable_cache(async ()=>{
  const data = await fetchSingle<INews>("news-page")

  return data
}, ["news-page-data"], {tags: ["news-page", "project", "nomination-projects"]})

const Page = async ({searchParams}:Props) => {
  const {page}=searchParams
  const pageParam = typeof page==="string"? !isNaN(Number(page))? page:"1":"1"
  const [pageData, data]= await Promise.all([getNewsPageData(), getNews(pageParam)])

  if (typeof data=="string" || data===null) {
    revalidateTag("news")
    return <div>произошла ошибка{data && `: ${data}`}, перезагрузите страницу</div>
  }

  if (!pageData|| typeof pageData==="string" ) {
    revalidateTag("news-page")
    return <div>произошла ошибка{pageData && `: ${pageData}`}, перезагрузите страницу</div>
  }
  return (
      <AnimationPage>
        <ProjectModal projects={[pageData.mainScreenProject]} searchParams={searchParams}/>
        <NewsMainScreen data={pageData}/>
        <div style={{ overflow: "hidden"}}>
          <CalendarEvents title={pageData.calendarEventsTitle}/>
          <NewsList news={data.news} pageData={pageData}/>
          <Pagination pages={data.pageCount} hash="#news-list"/>
        </div>
      </AnimationPage>
  );
};

export const metadata: Metadata = {
  title: "АЛАРОС | Новости",
};

export default Page;
