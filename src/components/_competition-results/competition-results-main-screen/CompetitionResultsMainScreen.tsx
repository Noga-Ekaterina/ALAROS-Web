import React from 'react';
import './competition-results-main-screen.scss'
import HtmlProcessing from "../../HtmlProcessing";
import {ICompetitionResults, IFestival, IFestivalToPeople} from "@/types/data";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";
import Link from "next/link";
import {buildLink} from "@/utils/buildLink";
import {useSearchParams} from "next/navigation";
import MainScreenProject from "@/components/_projects/main-screen-project/MainScreenProject";

interface Props{
  pageData: ICompetitionResults
}

const CompetitionResultsMainScreen = ({pageData}: Props) => {
  return (
      <div className="main-screen competition-results-main-screen">
        <div className="competition-results-main-screen__block-text">
          <HtmlProcessing html={pageData.mainScreenLeftSection.html}/>
        </div>

        <MainScreenProject project={pageData.mainScreenProject} className="competition-results-main-screen__img-wrapp"/>
      </div>
  );
};

export default CompetitionResultsMainScreen