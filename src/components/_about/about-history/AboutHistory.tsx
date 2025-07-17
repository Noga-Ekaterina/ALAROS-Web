import React from 'react';
import "./about-history.scss"
import {IAbout} from "@/types/data";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";

interface Props{
  pageData: IAbout
}

const AboutHistory = ({pageData}: Props) => {
  return (
      <div className="about-history">
        <div className="container">
          <div className="titles-block">
            <h2 className="titles-block__title">{nonBreakingSpaces(pageData.historyTitle)}</h2>
          </div>
        </div>
      </div>
  );
};

export default AboutHistory;
