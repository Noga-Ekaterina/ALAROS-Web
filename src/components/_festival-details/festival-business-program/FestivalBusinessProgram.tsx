'use client'
import React, {useEffect, useMemo, useRef, useState} from 'react';
import './festival-business-program.scss'
import HtmlProcessing from "../../HtmlProcessing";
import {IFestival, IFestivalDetails, IHtmlString} from "../../../types/data";
import {formaterDate} from "../../../utils/date/formaterDate";
import {useMediaQuery} from "react-responsive";
import {Swiper, SwiperRef, SwiperSlide} from "swiper/react";
import {SwiperNavigation} from "../../../utils/SwiperNavigation";
import {Mousewheel} from "swiper/modules";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";
import Detalis from "@/components/detalis/Detalis";
import {getDaysData, getSessionData, getUsers} from "./getData";
import UserCard from "@/components/_festival-details/festival-business-program/User";
import Day from "@/components/_festival-details/festival-business-program/Day";

interface Props{
  pageData: IFestivalDetails
}

const FestivalBusinessProgram = ({pageData}:Props) => {
  const days = useMemo(() => getDaysData(pageData.businessProgramSessions), []);
  return (
      <div className="festival-business-program" id="business-program">
        {
          days.map((day)=>(
              <Day title={pageData.businessProgramTitle} {...day} key={day.date.join("-")}/>
          ))
        }
      </div>
  );
};

export default FestivalBusinessProgram;
