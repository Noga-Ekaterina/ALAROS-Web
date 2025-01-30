import React from 'react';
import './festival-main-screen.scss'
import HtmlProcessing from "../../HtmlProcessing";
import {IFestival} from "@/types/data";

interface Props{
  festivalText: IFestival
}

const FestivalMainScreen = ({festivalText}: Props) => {
  return (
      <div className="main-screen festival-main-screen">
        <div className="festival-main-screen__block-text">
          <HtmlProcessing html={festivalText.mainScreenLeftSection.html}/>
        </div>

        <div className="festival-main-screen__img-wrapp">
          <img src="/Assets/Pages/Festival/Images/Main.png" alt="" className="main-screen__img festival-main-screen__img"/>
          <HtmlProcessing html={festivalText.mainScreenSections.html}/>
        </div>
      </div>
  );
};

export default FestivalMainScreen