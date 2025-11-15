'use client'
import React from 'react';
import "./festival-protections.scss"
import Detalis from "../../detalis/Detalis";
import HtmlProcessing from "../../HtmlProcessing";
import {createDate, formaterDate} from "../../../utils/date";
import {IHtmlString, IProtectionsDay} from "@/types/data";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";
import SmoothScrolling from "@/app/SmoothScrolling";
import HorizontalScrollSection from "@/app/HorizontalScrollSection";

interface Props {
  title: string
  protectionsDays: IProtectionsDay[]
  protectionsRightSignature: IHtmlString | null
}

const FestivalProtections = ({title, protectionsDays, protectionsRightSignature}:Props) => {
  return (
      <div className="festival-protections" id="protections">
        <div className="container">
          <div className="titles-block">
            <h2 className="titles-block__title titles-block__title--small festival-protections__title">{nonBreakingSpaces(title)}</h2>
            <div className="titles-block__section">
              <HtmlProcessing html={protectionsRightSignature?.html}/>
            </div>
          </div>

          {
            protectionsDays.map((item, index) => {
              const [year, month, dayNumber]=item.date.split("-")
              const {day}=createDate  ({date:new Date(Number(year), Number(month)-1, Number(dayNumber))})

              return(
                  <Detalis  key={`${item.date}-${item.place}`} title={<p className="festival-protections__title-item">
                    <span>{formaterDate(item.date)} | {day}</span> <span className="festival-protections__place">{item.place}</span></p>} startIsOpen={index === 0}>
                    <SmoothScrolling enableScrollTransfer={true}>
                      <HorizontalScrollSection>
                        <HtmlProcessing html={item.table?.html}/>
                      </HorizontalScrollSection>
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
