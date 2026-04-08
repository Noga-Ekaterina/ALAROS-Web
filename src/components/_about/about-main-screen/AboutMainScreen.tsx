import React from 'react';
import HtmlProcessing from "../../HtmlProcessing";
import MainScreenImageLink from "@/components/main-screen-image-link/MainScreenImageLink";
import {IAbout} from "@/types/data";

interface Props{
  pageData: IAbout
}

const AboutMainScreen = ({pageData}: Props) => {
  return (
      <div className="main-screen about-main-screen">
        <div className="about-main-screen__block-text">
          <div className="main-screen__bg" style={{backgroundImage: 'url("/Assets/Pages/About/bg/1.svg")'}}/>

          <HtmlProcessing html={pageData.mainScreenLeftSection}/>
        </div>

        <MainScreenImageLink item={pageData.mainScreenProject} className="about-main-screen__img-wrapp" isShowGrid/>
      </div>
  );
};

export default AboutMainScreen
