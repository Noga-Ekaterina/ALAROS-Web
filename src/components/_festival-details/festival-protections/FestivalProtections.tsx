'use client'
import React, {useMemo} from 'react';
import "./festival-protections.scss"
import Detalis from "../../detalis/Detalis";
import HtmlProcessing from "../../HtmlProcessing";
import {createDate, formaterDate} from "../../../utils/date";
import {IProtectionsDay} from "@/types/data";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";
import SmoothScrolling from "@/app/SmoothScrolling";
import HorizontalScrollSection from "@/app/HorizontalScrollSection";
import cn from "classnames";
import HoverMarquee from "./HoverMarquee";

interface Props {
  title: string
  protectionsDays: IProtectionsDay[]
  protectionsRightSignature: string | null
  protectionsColumns: string[]
}

const FestivalProtections = ({title, protectionsDays, protectionsRightSignature, protectionsColumns}:Props) => {
  const titles=useMemo(()=> [...protectionsColumns].slice(0, 6), [protectionsColumns])
  return (
      <div className="festival-protections" id="protections">
        <div className="container">
          <div className="titles-block">
            <h2 className="titles-block__title titles-block__title--small festival-protections__title">{nonBreakingSpaces(title)}</h2>
            <div className="titles-block__section">
              <HtmlProcessing html={protectionsRightSignature}/>
            </div>
          </div>

          {
            protectionsDays.map((item, index) => {
              const [year, month, dayNumber]=item.date.split("-")
              const {day}=createDate  ({date:new Date(Number(year), Number(month)-1, Number(dayNumber))})

              return(
                  <Detalis  key={`${item.date}-${item.place}`} title={<p className="festival-protections__title-item">
                    <span>{formaterDate(item.date)} | {day}</span> <span className="festival-protections__place">{item.place}</span></p>} startIsOpen={index === 0}>
                    <HorizontalScrollSection>
                      <div className="festival-protections__table">
                        <div className="festival-protections__head festival-protections__row">
                          {
                            titles.map((str, titleIndex)=>(
                                <div key={titleIndex} className="festival-protections__cell festival-protections__cell--head">
                                  {nonBreakingSpaces(str)}
                                </div>
                            ))
                          }
                        </div>

                        <SmoothScrolling enableScrollTransfer={true}>
                          <div className="festival-protections__body">
                            {
                              item.protections.map((protection, protectionIndex)=>(
                                  <div
                                      key={protectionIndex}
                                      className={cn("festival-protections__row", {
                                        "festival-protections__row--break": protection.isBreak
                                      })}
                                  >
                                    <div className="festival-protections__cell">
                                      <HoverMarquee text={protection.time}/>
                                    </div>
                                    {
                                      protection.isBreak?
                                          <div className="festival-protections__cell">
                                            {protection.breakTitle}
                                          </div>
                                      :
                                          <>
                                            <div className="festival-protections__cell festival-protections__cell--red">
                                              {protection.isOnline &&"online"}
                                            </div>
                                            <div className="festival-protections__cell">{protection.number}</div>
                                            <div className="festival-protections__cell">
                                              <HoverMarquee text={protection.nomination}/>
                                            </div>
                                            <div className="festival-protections__cell">
                                              <HoverMarquee text={protection.winner}/>
                                            </div>
                                            <div className="festival-protections__cell">
                                              <HoverMarquee text={protection.name}/>
                                            </div>
                                          </>
                                    }
                                  </div>
                              ))
                            }
                          </div>
                        </SmoothScrolling>
                      </div>
                    </HorizontalScrollSection>
                  </Detalis>
                    )
                  })
            }
            </div>
      </div>
  );
};

export default FestivalProtections;
