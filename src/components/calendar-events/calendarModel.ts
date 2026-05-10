import {createDate, createYear} from "../../utils/date";
import {IEvent, IEventsDataYear} from "../../types/data";
import {IDay} from "../../types/tehnic";

export interface ICalendarDay extends IDay {
  startEvent?: boolean;
  endEvent?: boolean;
  passed?: boolean
}

interface CalendarModel {
  eventsByYear: Record<string, IEvent[]>;
  years: string[];
  days: ICalendarDay[];
  eventsDays: ICalendarDay[][];
  eventsStart: ICalendarDay[];
  nextEventIndex: number;
  initialActiveEventsDays: ICalendarDay[];
  initialActiveMonth: string;
  initialActiveYear: number;
}

export const buildCalendarModel = (calendarEvents: IEventsDataYear[]): CalendarModel => {
  const eventsByYear: Record<string, IEvent[]> = {}
  const years: string[] = []
  const eventsDays: ICalendarDay[][] = [];
  let days: ICalendarDay[] = [];
  const today = createDate();

  calendarEvents.forEach(item => {
    eventsByYear[item.year] = item.events
    years.push(item.year.toString())
  })

  years.forEach(year => {
    const monthes = createYear({year: Number(year)}).createYearMonthes();

    monthes.forEach(month => {
      days = [...days, ...month];
    });

    const eventsForYear = eventsByYear[year] ?? [];

    eventsForYear.forEach(event => {
      const startDate = event.start.split('-');
      const endDate = event.end.split('-');

      const startDay = Number(startDate[2]);
      const startMonth = Number(startDate[1]);
      const endDay = Number(endDate[2]);
      const endMonth = Number(endDate[1]);
      const eventDays: ICalendarDay[] = []

      const changePassed = (day: ICalendarDay) => {
        if (
            (Number(year) < today.year) ||
            (Number(year) === today.year && endMonth < today.monthNumber) ||
            (Number(year) === today.year && endMonth === today.monthNumber && endDay < today.dayNumber)
        ){
          day.passed = true
        }
      }

      const startDayObj = days.find(d => d.dayNumber === startDay && d.monthNumber === startMonth && d.year === Number(year));
      if (startDayObj)
        startDayObj.startEvent = true

      const endDayObj = days.find(d => d.dayNumber === endDay && d.monthNumber === endMonth && d.year === Number(year));

      if (endDayObj)
        endDayObj.endEvent = true

      if (startMonth === endMonth) {
        for (let day = startDay; day <= endDay; day++) {
          const dayObj = days.find(d => d.dayNumber === day && d.monthNumber === startMonth && d.year === Number(year));
          if (dayObj) {
            changePassed(dayObj)
            eventDays.push(dayObj)
          }
        }
      } else {
        for (let day = startDay; day <= days.filter(d => d.monthNumber === startMonth && d.year === Number(year)).length; day++) {
          const dayObj = days.find(d => d.dayNumber === day && d.monthNumber === startMonth && d.year === Number(year));
          if (dayObj) {
            changePassed(dayObj)
            eventDays.push(dayObj)
          }
        }

        for (let day = 1; day <= endDay; day++) {
          const dayObj = days.find(d => d.dayNumber === day && d.monthNumber === endMonth && d.year === Number(year));
          if (dayObj) {
            changePassed(dayObj)
            eventDays.push(dayObj)
          }
        }
      }

      eventsDays.push(eventDays)
    });
  });

  let nextEventEndDayIndex = days.findIndex(day => day.endEvent &&
      (
          (day.year > today.year) ||
          (day.year === today.year && day.monthNumber > today.monthNumber) ||
          (day.year === today.year && day.monthNumber === today.monthNumber && day.dayNumber >= today.dayNumber)
      )
  );
  let nextEventStartDayIndex = days.findIndex(day => day.startEvent &&
      (
          (day.year > today.year) ||
          (day.year === today.year && day.monthNumber > today.monthNumber) ||
          (day.year === today.year && day.monthNumber === today.monthNumber && day.dayNumber >= today.dayNumber)
      )
  );

  if (nextEventEndDayIndex === -1){
    nextEventEndDayIndex = days.findLastIndex(day => day.endEvent)
  }

  if (nextEventStartDayIndex === -1){
    nextEventStartDayIndex = days.findLastIndex(day => day.startEvent)
  }

  let nextEventIndex = 0

  if (nextEventStartDayIndex > nextEventEndDayIndex){
    for (let i = nextEventEndDayIndex; i >= 0; i--){
      if (days[i].startEvent){
        nextEventIndex = i
        break
      }
    }
  } else if (nextEventStartDayIndex >= 0) {
    nextEventIndex = nextEventStartDayIndex
  }

  const eventsStart = days.filter(day => day.startEvent)
  const activeDay = days[nextEventIndex]
  const initialActiveEventsDays = activeDay
      ? eventsDays.find(eventDays => eventDays[0] === activeDay) ?? []
      : []

  return {
    eventsByYear,
    years,
    days,
    eventsDays,
    eventsStart,
    nextEventIndex,
    initialActiveEventsDays,
    initialActiveMonth: activeDay?.month ?? "",
    initialActiveYear: activeDay?.year ?? Number(years[0] ?? 0),
  }
}
