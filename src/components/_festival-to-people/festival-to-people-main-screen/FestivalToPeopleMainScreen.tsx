import React from 'react';
import './festival-to-people-main-screen.scss'
import HtmlProcessing from "../../HtmlProcessing";
import {IFestival, IFestivalToPeople} from "@/types/data";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";

interface Props{
  pageData: IFestivalToPeople
}

const FestivalToPeopleMainScreen = ({pageData}: Props) => {
  return (
      <div className="main-screen festival-to-people-main-screen">
        <div className="festival-to-people-main-screen__block-text">
          <HtmlProcessing html={pageData.mainScreenLeftSection.html}/>
        </div>

        <div className="festival-to-people-main-screen__img-wrapp">
          <img src={`/Assets/Pages/Festival-to-people/${pageData.mainScreenPhoto}`} alt="" className="main-screen__img festival-to-people-main-screen__img"/>
        </div>
      </div>
  );
};

export default FestivalToPeopleMainScreen