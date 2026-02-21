import Detalis from "@/components/detalis/Detalis";
import React from "react";
import Session from "./Session";
import {createDate, formaterDate} from "@/utils/date";
import {IBusinessProgramDay} from "@/types/data";

const FestivalBusinessProgram
    = ({date, sections, title}:IBusinessProgramDay & {title: string}) => {
  const {day}=createDate({date: new Date(date)})
  const formatDate=formaterDate(date)
  const dateId= formatDate.replaceAll('.', '-')
  return (
      <div id={`business-program-${dateId}`}>
          <Detalis title={<span>{title} {day}</span>} hash={`business-program-${dateId}`} isBigGray={true} isSticky={true}>
          {
            sections.map((session, index) => (
                <Session key={index} {...session} date={index==0? formatDate:undefined}/>
            ))
          }
        </Detalis>
      </div>
  );
};

export default FestivalBusinessProgram;
