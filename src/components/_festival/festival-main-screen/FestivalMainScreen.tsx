import React from 'react';
import './festival-main-screen.scss'
import {observer} from "mobx-react-lite";
import pagesData from "../../../store/pagesData";
import HtmlProcessing from "../../HtmlProcessing";
const FestivalMainScreen = () => {
  const {festivalText}=pagesData

  if (!festivalText) return <div/>
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

export default observer(FestivalMainScreen)