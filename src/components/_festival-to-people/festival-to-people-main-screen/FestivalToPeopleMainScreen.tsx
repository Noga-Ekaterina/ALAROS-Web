import React from 'react';
import './festival-to-people-main-screen.scss'
import HtmlProcessing from "../../HtmlProcessing";
import {IFestival, FestivalToPeople} from "@/types/data";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";

interface Props{
  pageData: FestivalToPeople
}

const FestivalToPeopleMainScreen = ({pageData}: Props) => {
  return (
      <div className="main-screen festival-main-screen">
        <div className="festival-main-screen__block-text">
          <HtmlProcessing html={pageData.mainScreenLeftSection.html}/>
        </div>

        <div className="festival-main-screen__img-wrapp">
          <img src={`/Assets/Pages/festival-to-people/${pageData.mainScreenPhoto}`} alt="" className="main-screen__img festival-main-screen__img"/>
        </div>
      </div>
  );
};

export default FestivalToPeopleMainScreen