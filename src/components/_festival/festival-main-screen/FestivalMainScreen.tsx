'use client'
import React from 'react';
import './festival-main-screen.scss'
import HtmlProcessing from "../../HtmlProcessing";
import {IFestival} from "@/types/data";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";
import Image from "@/components/Image";

interface Props{
  pageData: IFestival
}

const FestivalMainScreen = ({pageData}: Props) => {
  return (
      <div className="main-screen festival-main-screen">
        <div className="festival-main-screen__block-text">
          <div className="main-screen__bg" style={{backgroundImage: 'url("/Assets/Pages/Festival-main/bg/1.svg")'}}/>
          <HtmlProcessing html={pageData.mainScreenLeftSection}/>
        </div>

        <div className="festival-main-screen__img-wrapp">
          <Image
              image={pageData.mainScreenPhoto}
              size='small'
              mediaSizes={{
                bigDesktop: "xl",
                desktop: "large",
                laptop: "medium",
                tablet: "small"
              }}
              className="festival-main-screen__img"
          />
          <div className="festival-main-screen__row-block">
            {
              pageData.mainScreenSections.map(({text}, index)=>(
                  <div className="festival-main-screen__buttons-block" key={index}>
                    <HtmlProcessing html={text}/>
                  </div>
              ))
            }
          </div>
        </div>
      </div>
  );
};

export default FestivalMainScreen