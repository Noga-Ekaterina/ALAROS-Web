  import {ReactNode} from "react";
import {getMonthNumberOfDays} from "../utils/date";

export interface IWithClass {
  className?: string
}

export interface IWithChildren {
  children?: ReactNode
}

export interface IDay {
  date: Date,
  dayNumber: number,
  day: string,
  dayNumberInWeek: number,
  dayShort: string,
  year: number,
  yearShort: string,
  month: string,
  monthShort: string,
  monthNumber: number,
  monthIndex: number,
  monthNumberOfDays: number
  timestamp: number,
  week: number
}

export interface IField{
  field:{
    [key: string]: string
    value: string
  }
}