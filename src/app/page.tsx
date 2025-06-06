import React from 'react';
import HomeMainScreen from "../components/_home/home-main-screen/HomeMainScreen";
import HomeEvents from "../components/_home/home-events/HomeEvents";
import CalendarEvents from "@/components/calendar-events/CalendarEvents";
import HomeNewsSlider from "../components/_home/home-news-slider/HomeNewsSlider";
import LogosSlider from "@/components/partners-slider/PartnersSliderClient";
import {fetchData, getNewsQueryStr} from "@/utils/fetchData";
import {IEventsDataYear, IHomeData, INewsItem} from "@/types/data";
import {revalidateTag, unstable_cache} from "next/cache";
import ProjectModal from "@/components/_projects/project-modal/ProjectModal";
import PartnersSlider from "@/components/partners-slider/PartnersSlider";
import AnimationPage from "@/app/AnimationPage";
import type {Metadata} from "next";

interface Props{
  searchParams: { [key: string]: string | string[] | undefined }
}

interface IData{
  homes: IHomeData[]
  newsAll: INewsItem[]
}

const init= unstable_cache(async ()=>{
  const data= await fetchData<IData>(`
          query MyQuery {
            homes {
              mainTitle
              mainSection {
                html
              }
              projects {
                name
                nomination
                number
                diploma
                year
                winner
                cover
                images
                signature
              }
              bannersDesktop
              bannersBigDesktop
              bannersMobile
              events {
                html
              }
              newsTitle
            }
            ${getNewsQueryStr(1)}
          }`)

  if (typeof data==="string" || !data){
    return data
  }

  const {homes, newsAll}=data

  const result={homeData: homes[0], news: newsAll}

  return result
}, ["home"], {tags: ["Home", "Project", "News"]})

const Home = async ({searchParams}:Props) => {
  const {preview}=searchParams
  const data=  await init()

  if (typeof data==="string" || !data) {
    revalidateTag("Home")
    return <div>произошла ошибка{data && `: ${data}`}, перезагрузите страницу</div>
  }

  const {homeData, news}= data

  return (
      <AnimationPage>
        <ProjectModal projects={homeData.projects} searchParams={searchParams}/>
        <HomeMainScreen homeData={homeData}/>
        <HomeEvents homeData={homeData}/>
        <CalendarEvents/>
        <HomeNewsSlider title={homeData.newsTitle} news={news}/>
        <PartnersSlider/>
      </AnimationPage>
  );
};

export const metadata: Metadata = {
  title: "АЛАРОС | Ассоциация Ландшафтных Архитекторов России",
};

export default Home;