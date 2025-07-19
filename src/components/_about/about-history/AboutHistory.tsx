import React from 'react';
import "./about-history.scss"
import {IAbout} from "@/types/data";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";
import Year from "@/components/_about/about-history/Year";
import AdditionItem from "@/components/_about/about-history/AdditionItem";

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
        
        <div className="about-history__container">
          <div className="about-history__additions">
            {
              pageData.historyAdditions.map(({html}, index)=>(
                  <AdditionItem data={html} key={index}/>
              ))
            }
          </div>
          
          <div className="about-history__content">
            {
              pageData.historyContent.map(({html}, index)=>(
                  <Year data={html} key={index}/>
              ))
            }
          </div>
        </div>
      </div>
  );
};

export default AboutHistory;
