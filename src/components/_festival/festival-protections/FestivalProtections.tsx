import React from 'react';
import "./festival-protections.scss"
import pagesData from "@/store/pagesData";
import Detalis from "../../detalis/Detalis";
import HtmlProcessing from "../../HtmlProcessing";
import {createDate, formaterDate} from "../../../utils/date";
import {IProtectionsDay} from "@/types/data";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";

interface Props {
  title: string
  protectionsDays: IProtectionsDay[]
}

const FestivalProtections = ({title, protectionsDays}:Props) => {
  return (
      <div className="festival-protections" id="protections">
        <div className="container">
          <h2 className="festival-protections__title">{nonBreakingSpaces(title)}</h2>

          {
            protectionsDays.map(item=>{
              const [year, month, dayNumber]=item.date.split("-")
              const {day}=createDate  ({date:new Date(Number(year), Number(month)-1, Number(dayNumber))})

              console.log(createDate({date:new Date(Number(year), Number(month)-1, Number(dayNumber))}))

              return(
                  <Detalis title={<span>{formaterDate(item.date)} | {day}</span>}>
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
