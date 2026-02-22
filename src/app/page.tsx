import React from 'react';
import HomeMainScreen from "../components/_home/home-main-screen/HomeMainScreen";
import HomeEvents from "../components/_home/home-events/HomeEvents";
import CalendarEvents from "@/components/calendar-events/CalendarEvents";
import HomeNewsSlider from "../components/_home/home-news-slider/HomeNewsSlider";
import {IEventsDataYear, IHomeData, INewsItem} from "@/types/data";
import {revalidateTag, unstable_cache} from "next/cache";
import ProjectModal from "@/components/_projects/project-modal/ProjectModal";
import PartnersSlider from "@/components/partners-slider/PartnersSlider";
import AnimationPage from "@/app/AnimationPage";
import type {Metadata} from "next";
import {fetchSingle, getNews} from "@/utils/strapFetch";

interface Props{
  searchParams: { [key: string]: string | string[] | undefined }
}

const init= unstable_cache(async ()=>{
  const data= await fetchSingle<IHomeData>("home")

  return data
}, ["home"], {tags: ["home", "project" ]})

const Home = async ({searchParams}:Props) => {
  const {preview}=searchParams
  const [homeData, news]=  await Promise.all([init(), getNews('1')])

  if (typeof homeData==="string" || !homeData) {
    revalidateTag("home")
    return <div>произошла ошибка{homeData && `: ${homeData}`}, перезагрузите страницу</div>
  }

  return (
      <AnimationPage>
        <ProjectModal projects={homeData.projects} searchParams={searchParams}/>
        <HomeMainScreen homeData={homeData}/>
        <HomeEvents homeData={homeData}/>
        <CalendarEvents/>
        <HomeNewsSlider title={homeData.newsTitle} news={news?.news}/>
        <PartnersSlider/>
      </AnimationPage>
  );
};

export const metadata: Metadata = {
  title: "АЛАРОС | Ассоциация Ландшафтных Архитекторов России",
};

export default Home;