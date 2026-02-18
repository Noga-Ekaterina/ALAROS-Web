import React from 'react';
import "./about-history.scss"
import {IAbout, IHistoryYear} from "@/types/data";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";
import Year from "@/components/_about/about-history/Year";
import AdditionItem from "@/components/_about/about-history/AdditionItem";
import additionItem from "@/components/_about/about-history/AdditionItem";

interface Props{
  title: string,
  data: IHistoryYear[]|undefined
}

const AboutHistory = ({title, data}: Props) => {
  if (!data) return

  return (
      <div className="about-history" id="history">
        <div className="container">
          <div className="titles-block">
            <h2 className="titles-block__title">{nonBreakingSpaces(title)}</h2>
          </div>
        </div>
        
        <div className="about-history__container">
          <div className="about-history__additions-mobile">
            {
              data.map((item, index)=>(
                  item.additions?.map(additionItem=>(
                      <AdditionItem data={additionItem.body} key={additionItem.id}/>
                  ))
              ))
            }
          </div>
          
          <div className="about-history__content">
            {
              data.map((item, index)=>(
                  <Year data={item} key={index}/>
              ))
            }
          </div>
        </div>
      </div>
  );
};

export default AboutHistory;
