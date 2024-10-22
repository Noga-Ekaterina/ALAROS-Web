import React, {useEffect} from 'react';
import "swiper/css"
import HomeMainScreen from "../components/_home/home-main-screen/HomeMainScreen";
import HomeEvents from "../components/_home/home-events/HomeEvents";
import {observer} from "mobx-react-lite";
import pagesData from "../store/pagesData";
import CalendarEvents from "../components/_home/calendar-events/CalendarEvents";
import HomeNewsSlider from "../components/_home/home-news-slider/HomeNewsSlider";

const Home = () => {
  const {homeData, fetchHomeData, calendarEvents, fetchNewsPage, newsPages, fetchCalendarEvents}=pagesData

  useEffect(() => {
    if (!homeData)
      fetchHomeData()

    if (!calendarEvents)
      fetchCalendarEvents()

    fetchNewsPage(1)
  }, []);

  return (
    <>
      {
        (homeData && calendarEvents && newsPages["1"])?
            <div>
              <HomeMainScreen/>
              <HomeEvents/>
              <CalendarEvents/>
              <HomeNewsSlider/>
            </div>
            :
            <></>
      }
    </>
  );
};

export default observer(Home);