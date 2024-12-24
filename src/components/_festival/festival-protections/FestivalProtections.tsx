import React from 'react';
import "./festival-protections.scss"
import pagesData from "../../../store/pagesData";
import Detalis from "../../detalis/Detalis";
import HtmlProcessing from "../../HtmlProcessing";
import {createDate} from "../../../utils/date";

const FestivalProtections = () => {
  const {festivalText, protectionsDays}=pagesData

  if (!festivalText ||!protectionsDays) return <div/>
  return (
      <div className="festival-protections" id="protections">
        <div className="container">
          <h2 className="festival-protections__title">{festivalText.protectionsTitle}</h2>

          {
            protectionsDays.map(item=>{
              const [dayNumber, month, year]=item.date.split(".")
              const {day}=createDate  ({date:new Date(Number(year), Number(month)-1, Number(dayNumber))})

              console.log(createDate({date:new Date(Number(year), Number(month)-1, Number(dayNumber))}))

              return(
                  <Detalis title={<span>{item.date} | {day}</span>}>
                    <HtmlProcessing html={item.protections.html}/>
                  </Detalis>
              )
            })
          }
        </div>
      </div>
  );
};

export default FestivalProtections;
