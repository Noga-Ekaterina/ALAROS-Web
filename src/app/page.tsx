import React from 'react';
import HomeMainScreen from "../components/_home/home-main-screen/HomeMainScreen";
import HomeEvents from "../components/_home/home-events/HomeEvents";
import {pagesData} from "@/pagesData";
import CalendarEvents from "../components/_home/calendar-events/CalendarEvents";
import HomeNewsSlider from "../components/_home/home-news-slider/HomeNewsSlider";
import LogosSlider from "../components/_home/logos-slider/LogosSlider";
import {fetchData, getNewsQueryStr} from "@/utils/fetchData";
import {IEventsDataYear, IHomeData, INewsItem} from "@/types/data";

interface IData{
  homes: IHomeData[]
  eventsYears: IEventsDataYear[]
  newsAll: INewsItem[]
}

const init= async ()=>{
  const data: IData|null= await fetchData(`
          query MyQuery {
            homes {
              mainTitle
              mainSection {
                html
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

  if (!data)
    return null

  const {homes, eventsYears, newsAll}=data

  const result={homeData: homes[0], calendarEvents: eventsYears, news: newsAll}

  pagesData.home=result

  pagesData.newsPages[1]=result.news
  
  return result
}

const Home = async () => {
  const data= pagesData.home?? await init()

  if (!data) return <div>произошла ошибка, перезагрузите страницу</div>

  const {homeData, calendarEvents, news}= data

  return (
      <div>
        <HomeMainScreen homeData={homeData}/>
        <HomeEvents homeData={homeData}/>
        <CalendarEvents calendarEvents={calendarEvents}/>
        <HomeNewsSlider title={homeData.newsTitle} news={news}/>
        <LogosSlider/>
      </div>
  );
};

export default Home;