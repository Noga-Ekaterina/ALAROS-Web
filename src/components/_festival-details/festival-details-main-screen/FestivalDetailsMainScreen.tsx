'use client'
import React from 'react';
import './festival-details-main-screen.scss'
import HtmlProcessing from "../../HtmlProcessing";
import {IFestival, IFestivalDetails} from "@/types/data";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";
import Link from "next/link";
import {buildLink} from "@/utils/buildLink";
import {useSearchParams} from "next/navigation";
import MainScreenProject from "@/components/_projects/main-screen-project/MainScreenProject";

interface Props{
  pageData: IFestivalDetails
}

const FestivalDetailsMainScreen = ({pageData}: Props) => {
  return (
      <div className="main-screen festival-details-main-screen">
        <div className="festival-details-main-screen__block-text">
          <div className="main-screen__bg" style={{backgroundImage: 'url("/Assets/Pages/Festival-details/bg/1.svg")'}}/>
          <HtmlProcessing html={pageData.mainScreenLeftSection.html}/>
        </div>

        <MainScreenProject project={pageData.mainScreenProject} className="festival-details-main-screen__img-wrapp"/>
      </div>
  );
};

export default FestivalDetailsMainScreen