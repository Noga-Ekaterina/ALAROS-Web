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
import { fetchColection, fetchSingle } from '@/utils/strapFetch';

interface Props{
  searchParams: { [key: string]: string | string[] | undefined }
}

const init = (page: string) =>
  (unstable_cache(
    async () => {
      const pageNumber = Number(page) || 1;
      const data = await fetchColection<INewsItem>({
        name: 'newss',
        pagination: {
          page: pageNumber,
          pageSize: 10
        },
        sort: "date:desc"
      })

      if (!data) {
        return null;
      }
      
      return { 
        news: data.data, 
        pageCount: data.meta.pagination.pageCount 
      }
    },
    ["news-page", page],
    { tags: ["News", "AllNews"] }
  ))

const getNewsPageData = unstable_cache(async ()=>{
  const data = await fetchSingle<any>("news-page")

  return data
}, ["news-page-data"], {tags: ["NewsPage"]})

const Page = async ({searchParams}:Props) => {
  const {page}=searchParams
  const pageParam = typeof page==="string"? !isNaN(Number(page))? page:"1":"1"
  const data= await init(pageParam)()
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
