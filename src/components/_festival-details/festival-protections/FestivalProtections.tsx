'use client'
import React, {useMemo} from 'react';
import "./festival-protections.scss"
import Detalis from "../../detalis/Detalis";
import HtmlProcessing from "../../HtmlProcessing";
import {createDate, formaterDate} from "../../../utils/date";
import {IHtmlString, IProtectionsDay} from "@/types/data";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";
import SmoothScrolling from "@/app/SmoothScrolling";
import HorizontalScrollSection from "@/app/HorizontalScrollSection";
import cn from "classnames";

interface Props {
  title: string
  protectionsDays: IProtectionsDay[]
  protectionsRightSignature: string | null
  protectionsColumns: string[]
}

const FestivalProtections = ({title, protectionsDays, protectionsRightSignature, protectionsColumns}:Props) => {
  const titles=useMemo(()=> [...protectionsColumns].slice(0, 6), [])
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
                    <SmoothScrolling enableScrollTransfer={true}>
                      <HorizontalScrollSection>
                        <table>
                          <thead>
                            <tr>
                              {
                                titles.map((str, titleIndex)=>(
                                    <th key={titleIndex}>{nonBreakingSpaces(str)}</th>
                                ))
                              }
                            </tr>
                          </thead>
                          <tbody>
                          {
                            item.protections.map((protection, protectionIndex)=>(
                                <tr key={protectionIndex} className={cn({"grey": protection.isBreak})}>
                                  <td>{protection.time}</td>
                                  {
                                    protection.isBreak?
                                        <td>{protection.breakTitle}</td>
                                    :
                                        <>
                                          <td className="red">
                                            {protection.isOnline &&"online"}
                                          </td>
                                          <td>{protection.number}</td>
                                          <td>{protection.nomination}</td>
                                          <td>{protection.name}</td>
                                          <td>{protection.winner}</td>
                                        </>
                                  }
                                </tr>
                            ))
                          }
                          </tbody>
                        </table>
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
