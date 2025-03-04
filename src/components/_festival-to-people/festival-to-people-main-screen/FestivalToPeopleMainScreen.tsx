'use client'
import React from 'react';
import './festival-to-people-main-screen.scss'
import HtmlProcessing from "../../HtmlProcessing";
import {IFestival, IFestivalToPeople} from "@/types/data";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";
import Link from "next/link";
import {buildLink} from "@/utils/buildLink";
import {useSearchParams} from "next/navigation";
import MainScreenProject from "@/components/_projects/main-screen-project/MainScreenProject";

interface Props{
  pageData: IFestivalToPeople
}

const FestivalToPeopleMainScreen = ({pageData}: Props) => {
  const searchParams= useSearchParams()
  return (
      <div className="main-screen festival-to-people-main-screen">
        <div className="festival-to-people-main-screen__block-text">
          <HtmlProcessing html={pageData.mainScreenLeftSection.html}/>
        </div>

        <MainScreenProject project={pageData.mainScreenProject} className="festival-to-people-main-screen__img-wrapp"/>
      </div>
  );
};

export default FestivalToPeopleMainScreen