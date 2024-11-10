import React, {useEffect} from 'react';
import FestivalMainScreen from "../components/_festival/festival-main-screen/FestivalMainScreen";
import pagesData from "../store/pagesData";
import {observer} from "mobx-react-lite";
import FestivalPremiya from "../components/_festival/festival-premiya/FestivalPremiya";
import FestivalPrice from "../components/_festival/festival-price/FestivalPrice";
import FestivalDate from "../components/_festival/festival-date/FestivalDate";
import FestivalBid from "../components/_festival/festival-bid/FestivalBid";

const Festival = () => {
  const {festivalText, fetchFestivalText}=pagesData

  useEffect(() => {
    if (!festivalText)
      fetchFestivalText()
  }, []);
  return (
      <>
        {
          festivalText ?
              <div>
                <FestivalMainScreen/>
                <FestivalPremiya/>
                <FestivalPrice/>
                <FestivalDate/>
                <FestivalBid/>
              </div>
              :
              <div></div>
        }
      </>
  );
};

export default observer(Festival);
