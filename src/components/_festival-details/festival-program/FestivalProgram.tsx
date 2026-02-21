'use client'
import React, {useMemo} from 'react';
import "./festival-program.scss"
import {IFestival, IFestivalProgramDay, IFestivalDetails} from "@/types/data";
import {createDate, formaterDate} from "@/utils/date";
import Detalis from "@/components/detalis/Detalis";
import HtmlProcessing from "@/components/HtmlProcessing";
import HorizontalScrollSection from "@/app/HorizontalScrollSection";
import cn from "classnames";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";

interface Props{
  pageData: IFestivalDetails
  festivalProgram: IFestivalProgramDay[]
}

const FestivalProgram = ({pageData, festivalProgram}:Props) => {
  const titles= useMemo(() => [...pageData.festivalProgramColumns].slice(0,4), [])

  return (
      <div className="festival-program" id="festival-program">
        <div className="container">
          <h2 className="festival-program__title">{pageData.festivalProgramTitle}</h2>

          <HorizontalScrollSection className="festival-program__content">
            <div className="festival-program__row festival-program__header">
              {
                titles.map((str, index)=>(
                    <span key={index}>{nonBreakingSpaces(str)}</span>
                ))
              }
            </div>

            <div className="festival-program__body">
              {
                festivalProgram.map(day => {
                  const {dayShort} = createDate({date: new Date(day.date)})

                  return day.events.map((item, index) => (
                      <div
                          className={cn(
                              "festival-program__row",
                              {"festival-program__row--business-program": item.businessProgram}
                          )}
                          key={`${day.date}-${item.time}-${index}`}
                      >
                        <span
                            className="festival-program__day">{index === 0 && <>{formaterDate(day.date)} | {dayShort}</>}</span>
                        <span className="festival-program__time">{item.time}</span>
                        <div>
                          {
                            (!item.businessProgram) ?
                                <div className="festival-program__text">
                                  <span>{nonBreakingSpaces(item.title)}</span>
                                </div>
                                :
                                <Detalis
                                    title={<div className="festival-program__text"><HtmlProcessing
                                    html={`<span>${item.title}</span>`}/></div>}
                                >
                                  <div className="festival-program__text festival-program__business-program">
                                    <HtmlProcessing html={item.businessProgram}/>
                                  </div>

                                  {item.fullVersionBusinessProgram &&
                                      <div className="festival-program__full-version-business-program"><HtmlProcessing
                                          html={item.fullVersionBusinessProgram}/></div>}
                                </Detalis>
                          }
                        </div>
                        <span className="festival-program__place">{nonBreakingSpaces(item.place)}</span>
                      </div>))
                })
              }
            </div>
          </HorizontalScrollSection>
        </div>
      </div>
  );
};

export default FestivalProgram;
