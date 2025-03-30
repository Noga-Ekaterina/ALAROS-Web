import React from 'react';
import NewsMainScreen from "../../components/_news/news-main-screen/NewsMainScreen";
import NewsList from "../../components/_news/news-list/NewsList";
import {fetchData, getNewsPageData, getNewsQueryStr} from "@/utils/fetchData";
import {INews, INewsItem} from "@/types/data";
import {revalidateTag, unstable_cache} from "next/cache";
import ProjectModal from "@/components/_projects/project-modal/ProjectModal";
import CalendarEvents from "@/components/calendar-events/CalendarEvents";

interface Props{
  searchParams: { [key: string]: string | string[] | undefined }
}

interface IData{
  newsAll: INewsItem[]
}

const init= unstable_cache(async (page: string)=>{

  const data= await fetchData<IData>( `
          query NewsAllQuery {
            ${getNewsQueryStr(Number(page))}
          }
      `)

  if (typeof data==="string"|| !data){
    return data
  }

  return  data.newsAll
}, ["news-page"], {tags: ["News", "AllNews"]})

const Page = async ({searchParams}:Props) => {
  const {page}=searchParams
  const news= await init( typeof page==="string"? isNaN(Number(page))? page:"1":"1")
  const pageData= await getNewsPageData()

  if (typeof news=="string" || news===null) {
    revalidateTag("AllNews")
    return <div>произошла ошибка{news && `: ${news}`}, перезагрузите страницу</div>
  }

  if (!pageData|| typeof pageData==="string" ) {
    revalidateTag("NewsPage")
    return <div>произошла ошибка{pageData && `: ${pageData}`}, перезагрузите страницу</div>
  }
  return (
      <>
        <ProjectModal projects={[pageData.mainScreenProject]} searchParams={searchParams}/>
        <NewsMainScreen data={pageData}/>
        <div style={{background: "#fff", overflow: "hidden"}}>
          <CalendarEvents title={pageData.calendarEventsTitle}/>
          <NewsList news={news} pageData={pageData}/>
        </div>
      </>
  );
};

export default Page;
