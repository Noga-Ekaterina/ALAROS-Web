import React from 'react';
import HomeMainScreen from "../components/_home/home-main-screen/HomeMainScreen";
import HomeEvents from "../components/_home/home-events/HomeEvents";
import CalendarEvents from "../components/_home/calendar-events/CalendarEvents";
import HomeNewsSlider from "../components/_home/home-news-slider/HomeNewsSlider";
import LogosSlider from "@/components/partners-slider/PartnersSliderClient";
import {fetchData, getNewsQueryStr} from "@/utils/fetchData";
import {IEventsDataYear, IHomeData, INewsItem} from "@/types/data";
import {revalidateTag, unstable_cache} from "next/cache";
import ProjectModal from "@/components/_projects/project-modal/ProjectModal";
import PartnersSlider from "@/components/partners-slider/PartnersSlider";

interface Props{
  searchParams: { [key: string]: string | string[] | undefined }
}

interface IData{
  homes: IHomeData[]
  eventsYears: IEventsDataYear[]
  newsAll: INewsItem[]
}

const init= unstable_cache(async ()=>{
  const data: IData|null|string= await fetchData(`
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
              bannersMobile
              events {
                html
              }
              newsTitle
            }
            eventsYears {
              year
              events {
                html
              }
            }
            ${getNewsQueryStr(1)}
          }`)

  if (typeof data==="string" || !data){
    return data
  }

  const {homes, eventsYears, newsAll}=data

  const result={homeData: homes[0], calendarEvents: eventsYears, news: newsAll}

  return result
}, ["home"], {tags: ["Home", "Project", "EventsYear", "News"]})

const Home = async ({searchParams}:Props) => {
  const {preview}=searchParams
  const data=  await init()

  if (typeof data==="string" || !data) {
    revalidateTag("Home")
    return <div>произошла ошибка{data && `: ${data}`}, перезагрузите страницу</div>
  }

  const {homeData, calendarEvents, news}= data

  return (
      <div>
        <ProjectModal projects={homeData.projects} searchParams={searchParams}/>
        <HomeMainScreen homeData={homeData}/>
        <HomeEvents homeData={homeData}/>
        <CalendarEvents calendarEvents={calendarEvents}/>
        <HomeNewsSlider title={homeData.newsTitle} news={news}/>
        <PartnersSlider/>
      </div>
  );
};

export default Home;