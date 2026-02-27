import React from 'react';
import './partners-main-screen.scss'
import HtmlProcessing from "../../HtmlProcessing";
import MainScreenProject from "@/components/_projects/main-screen-project/MainScreenProject";
import {IPartners} from "@/types/data";

interface Props{
  pageData: IPartners
}

const PartnersMainScreen = ({pageData}: Props) => {
  return (
      <div className="main-screen partners-main-screen">
        <div className="partners-main-screen__block-text">
          <div className="main-screen__bg" style={{backgroundImage: 'url("/Assets/Pages/Partners/1.svg")'}}/>

          <HtmlProcessing html={pageData.mainScreenLeftSection}/>
        </div>

        <MainScreenProject project={pageData.mainScreenProject} className="partners-main-screen__img-wrapp" isShowGrid/>
      </div>
  );
};

export default PartnersMainScreen