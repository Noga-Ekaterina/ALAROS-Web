'use client'
import React from 'react';
import "./festival-protections.scss"
import Detalis from "../../detalis/Detalis";
import HtmlProcessing from "../../HtmlProcessing";
import {createDate, formaterDate} from "../../../utils/date";
import {IProtectionsDay} from "@/types/data";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";
import SmoothScrolling from "@/app/SmoothScrolling";

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
            protectionsDays.map((item, index)=>{
              const [year, month, dayNumber]=item.date.split("-")
              const {day}=createDate  ({date:new Date(Number(year), Number(month)-1, Number(dayNumber))})

              return(
                  <Detalis  key={item.date} title={<span>{formaterDate(item.date)} | {day}</span>} startIsOpen={index===0}>
                    <SmoothScrolling enableScrollTransfer={true}>
                      <HtmlProcessing html={item.protections.html}/>
                    </SmoothScrolling>
                  </Detalis>
              )
            })
          }
        </div>
      </div>
  );
};

export default FestivalProtections;
