import React from 'react';
import NewsMainScreen from "../../components/_news/news-main-screen/NewsMainScreen";
import NewsList from "../../components/_news/news-list/NewsList";
import {fetchData, getNewsPageData, getNewsQueryStr} from "@/utils/fetchData";
import {INews, INewsItem} from "@/types/data";
import {revalidateTag, unstable_cache} from "next/cache";
import ProjectModal from "@/components/_projects/project-modal/ProjectModal";

interface Props{
  searchParams: { [key: string]: string | string[] | undefined }
}

interface IData{
  newsAll: INewsItem[]
}

const init= unstable_cache(async (page: string)=>{

  const data: IData|null|string= await fetchData( `
          query NewsAllQuery {
            ${getNewsQueryStr(Number(page))}
          }
      `)

  if (typeof data==="string"|| !data){
    revalidateTag("AllNews")
    return data
  }

  return  data.newsAll
}, ["news-page"], {tags: ["News", "AllNews"]})

const Page = async ({searchParams}:Props) => {
  const {page}=searchParams
  const news= await init( typeof page==="string"? isNaN(Number(page))? page:"1":"1")
  const pageData= await getNewsPageData()

  if (!news || typeof news ==="string"||!pageData) return <div>произошла ошибка{news && `: ${news}`}, перезагрузите страницу</div>
  return (
      <>
        <ProjectModal projects={[pageData.mainScreenProject]} searchParams={searchParams}/>
        <NewsMainScreen data={pageData}/>
        <NewsList news={news}/>
      </>
  );
};

export default Page;
