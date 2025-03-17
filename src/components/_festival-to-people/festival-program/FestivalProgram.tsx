import React from 'react';
import "./festival-program.scss"
import {IFestival, IFestivalProgramDay, IFestivalToPeople} from "@/types/data";
import {getRowsInTable} from "@/utils/getRowsInTable";
import {createDate, formaterDate} from "@/utils/date";
import Detalis from "@/components/detalis/Detalis";
import HtmlProcessing from "@/components/HtmlProcessing";
import {getPrgramTitles, programProcessing} from "./getData";

interface Props{
  pageData: IFestivalToPeople
  festivalProgram: IFestivalProgramDay[]
}

const FestivalProgram = ({pageData, festivalProgram}:Props) => {
  const titles= getPrgramTitles(pageData.festivalProgramColumns.html)
  const programDays= programProcessing(festivalProgram)

  return (
      <div className="festival-program" id="festival-program">
        <div className="container">
          <h2 className="festival-program__title">{pageData.festivalProgramTitle}</h2>

          <div className="festival-program__content">
            <div className="festival-program__row festival-program__header">
              <span>{titles.day}</span>
              <span>{titles.time}</span>
              <span>{titles.title}</span>
              <span>{titles.place}</span>
            </div>

            <div className="festival-program__body">
              {
                programDays.map(day => {
                  const [year, month, dayNumber] = day.date.split("-")
                  const {dayShort} = createDate({date: new Date(Number(year), Number(month) - 1, Number(dayNumber))})

                  return day.scheduleObjs.map((item, index) => (
                      <div className="festival-program__row">
                        <span
                            className="festival-program__day">{index === 0 && <>{formaterDate(day.date)} | {dayShort}</>}</span>
                        <span className="festival-program__time">{item.time}</span>
                        <div>
                          {
                            (day.businessProgramPosition != index + 1 || !day.businessProgram) ?
                                <div className="festival-program__text"><HtmlProcessing
                                    html={`<span>${item.title}</span>`}/></div> :
                                <Detalis title={<div className="festival-program__text"><HtmlProcessing
                                    html={`<span>${item.title}</span>`}/></div>}>
                                  <div className="festival-program__text festival-program__business-program">
                                    <HtmlProcessing html={day.businessProgram.html}/>
                                  </div>

                                  {day.fullVersionBusinessProgram &&
                                      <div className="festival-program__full-version-business-program"><HtmlProcessing
                                          html={day.fullVersionBusinessProgram.html}/></div>}
                                </Detalis>
                          }
                        </div>
                        <span className="festival-program__place">{item.place}</span>
                      </div>))
                })
              }
            </div>
          </div>
        </div>
      </div>
  );
};

export default FestivalProgram;
