import React from 'react';
import './festival-main-screen.scss'
import HtmlProcessing from "../../HtmlProcessing";
import {IFestival} from "@/types/data";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";

interface Props{
  pageData: IFestival
}

const FestivalMainScreen = ({pageData}: Props) => {
  return (
      <div className="main-screen festival-main-screen">
        <div className="festival-main-screen__block-text">
          <div className="main-screen__bg" style={{backgroundImage: 'url("/Assets/Pages/Festival-main/bg/1.svg")'}}/>
          <HtmlProcessing html={pageData.mainScreenLeftSection.html}/>
        </div>

        <div className="festival-main-screen__img-wrapp">
          <img src={`/Assets/Pages/Festival-main/${pageData.mainScreenPhoto}`} alt="" className="festival-main-screen__img"/>
          <HtmlProcessing html={pageData.mainScreenSections.html}/>
        </div>
      </div>
  );
};

export default FestivalMainScreen