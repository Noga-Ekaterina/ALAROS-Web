import React from 'react';
import './abouts-main-screen.scss'
import HtmlProcessing from "../../HtmlProcessing";
import MainScreenProject from "@/components/_projects/main-screen-project/MainScreenProject";
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

        <MainScreenProject project={pageData.mainScreenProject} className="about-main-screen__img-wrapp" isShowGrid/>
      </div>
  );
};

export default AboutMainScreen