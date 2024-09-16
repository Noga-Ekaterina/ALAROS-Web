import React, {useEffect} from 'react';
import HomeMainScreen from "../components/_home/home-main-screen/HomeMainScreen";
import HomeEvents from "../components/_home/home-events/HomeEvents";
import {observer} from "mobx-react-lite";
import pagesData from "../store/pagesData";

const Home = () => {
  const {homeData, fetchHomeData}=pagesData

  useEffect(() => {
    if (!homeData)
      fetchHomeData()
  }, []);

  useEffect(() => {
    console.log(homeData)
  }, [homeData]);

  return (
    <>
      {
        homeData?
            <div>
              <HomeMainScreen/>
              <HomeEvents/>
            </div>
            :
            <></>
      }
    </>
  );
};

export default observer(Home);