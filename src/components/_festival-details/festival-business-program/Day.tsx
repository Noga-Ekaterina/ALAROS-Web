import Detalis from "@/components/detalis/Detalis";
import React from "react";
import Session from "./Session";
import {IDay} from "./getData";
import {createDate} from "@/utils/date";

const FestivalBusinessProgram = ({date, sessions, title}:IDay & {title: string}) => {
  const {day}=createDate({date: new Date(`${date[2]}-${date[1]}-${date[0]}`)})
  return (
      <div id={`business-program-${date.join("-")}`}>
          <Detalis title={<span>{title} {day}</span>} hash={`business-program-${date.join("-")}`} isBigGray={true} isSticky={true}>
          {
            sessions.map((session, index) => (
                <Session key={index} {...session}/>
            ))
          }
        </Detalis>
      </div>
  );
};

export default FestivalBusinessProgram;
