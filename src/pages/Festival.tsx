import React, {useEffect} from 'react';
import FestivalMainScreen from "../components/_festival/festival-main-screen/FestivalMainScreen";
import pagesData from "../store/pagesData";
import {observer} from "mobx-react-lite";
import FestivalPremiya from "../components/_festival/festival-premiya/FestivalPremiya";

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
              </div>
              :
              <div></div>
        }
      </>
  );
};

export default observer(Festival);
