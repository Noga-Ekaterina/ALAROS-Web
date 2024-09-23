import React, {useEffect} from 'react';
import "swiper/css"
import HomeMainScreen from "../components/_home/home-main-screen/HomeMainScreen";
import HomeEvents from "../components/_home/home-events/HomeEvents";
import {observer} from "mobx-react-lite";
import pagesData from "../store/pagesData";
import CalendarEvents from "../components/_home/calendar-events/CalendarEvents";

const Home = () => {
  const {homeData, fetchHomeData, calendarEvents, fetchCalendarEvents}=pagesData

  useEffect(() => {
    if (!homeData)
      fetchHomeData()

    if (!calendarEvents)
      fetchCalendarEvents()
  }, []);

  return (
    <>
      {
        (homeData && calendarEvents)?
            <div>
              <HomeMainScreen/>
              <HomeEvents/>
              <CalendarEvents/>
            </div>
            :
            <></>
      }
    </>
  );
};

export default observer(Home);