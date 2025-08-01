'use client'
import React, { useEffect, useRef, useState} from 'react';
import "./calendar-events.scss";
import {Swiper, SwiperRef, SwiperSlide} from "swiper/react";
import { Mousewheel, FreeMode } from 'swiper/modules';
import {createDate, createYear, getMonthesNames} from "../../utils/date";
import classNames from "classnames";
import { IDay } from "../../types/tehnic";
import {ReactSVG} from "react-svg";
import Dropdown from "../dropdown/Dropdown";
import {SwiperNavigation} from "../../utils/SwiperNavigation";
import {IEventsByYear, IEventsDataYear} from "../../types/data";
import {eventsDataProcessing} from "./eventsDataProcessing";
import HtmlProcessing from "../HtmlProcessing";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";
import SliderProgress from "@/components/slider-progress/SliderProgress";
import Event from "@/components/calendar-events/Event";

interface Props{
  title?: string
  calendarEvents: IEventsDataYear[]
}

interface ICalendarDay extends IDay {
  startEvent?: boolean;
  endEvent?: boolean;
  passed?: boolean
}

const CalendarEventsClient = ({title, calendarEvents}:Props) => {
  const [eventsByYear, setEventsByYear] = useState<null | IEventsByYear>(null)
  const [years, setYears] = useState<string[]>([])
  const [days, setDays] = useState<ICalendarDay[]>([]);
  const [nextEventIndex, setNextEventIndex] = useState(0); // Индекс ближайшего события
  const [eventsDays, setEventsDays] = useState<ICalendarDay[][]>([])
  const [activeEventsDays, setActiveEventsDays] = useState<ICalendarDay[]>([])
  const [activeMonth, setActiveMonth] = useState("")
  const [activeYear, setActiveYear] = useState(0)
  const [eventsStart, setEventsStart] = useState<ICalendarDay[]>([])

  const swiperCalendarRef=useRef<SwiperRef | null>(null);
  const swiperEventRef=useRef<SwiperRef | null>(null);
  const swiperCalendarNav= new SwiperNavigation(swiperCalendarRef)
  const swiperEventNav= new SwiperNavigation(swiperEventRef)
  const progressRef = useRef<HTMLDivElement>(null);


  const handleActiveDayIndexChange = () => {
    if (swiperCalendarRef.current){
      const {activeIndex, progress}=swiperCalendarRef.current?.swiper
      const activeDay=days[activeIndex]

      if (progressRef.current)
        progressRef.current.style.left=`min(${progress*100}%, calc(100% - 100rem))`

      if (activeDay) {
        setActiveMonth(activeDay.month)
        setActiveYear(activeDay.year)
      }
    }
  }

  const changeActiveEventDays = (day: ICalendarDay) => {
    for (let i=0; i<eventsDays.length; i++){
      if ((eventsDays[i]).findIndex(item=> item.date==day.date)==0){
        setActiveEventsDays(eventsDays[i])
        break
      }
    }
  }

  const handleClickBtnEvent = (dir: "next"|"prev") => {
    if (dir=="next")
      swiperEventNav.goToNext()
    else
      swiperEventNav.goToPrev()
  }


  const handleActiveEvent = () => {
    if (swiperEventRef.current){
      const {activeIndex}=swiperEventRef.current?.swiper
      const activeDay=eventsStart[activeIndex]

      if (activeDay) {
        for (let i=0; i<eventsDays.length; i++){
          if (eventsDays[i].indexOf(activeDay)==0){
            setActiveEventsDays(eventsDays[i])
            break
          }
        }
      }
    }
  }

  useEffect(() => {
    if (!calendarEvents) return

    const data= eventsDataProcessing(calendarEvents)
    setEventsByYear(data)
    setYears(Object.keys(data))
  }, [calendarEvents]);

  useEffect(() => {
    if (eventsByYear) {
      let events: ICalendarDay[][] = [];
      let daysWithEvents: ICalendarDay[] = [];
      const today = createDate();


      // Генерируем дни для каждого года
      years.forEach(year => {
        const monthes = createYear({year: Number(year)}).createYearMonthes();

        monthes.forEach(monthe => {
          daysWithEvents = [...daysWithEvents, ...monthe];
        });

        const eventsForYear = eventsByYear[year];

        eventsForYear.forEach(event => {
          const startDate = event.date.start.split('.');
          const endDate = event.date.end.split('.');

          const startDay = Number(startDate[0]);
          const startMonth = Number(startDate[1]);
          const endDay = Number(endDate[0]);
          const endMonth = Number(endDate[1]);
          const eventDays: ICalendarDay[] = []

          const changePassed = (day: ICalendarDay) => {
            if (
                (Number(year) < today.year) ||
                (Number(year) === today.year && endMonth< today.monthNumber) ||
                (Number(year) === today.year && endMonth === today.monthNumber && endDay < today.dayNumber)
            ){
              day.passed=true
            }
          }

          const startDayObj = daysWithEvents.find(d => d.dayNumber === startDay && d.monthNumber === startMonth && d.year === Number(year));
          if (startDayObj)
            startDayObj.startEvent = true

          const endDayObj = daysWithEvents.find(d => d.dayNumber === endDay && d.monthNumber === endMonth && d.year === Number(year));

          if (endDayObj)
            endDayObj.endEvent=true

          // Обработка событий в одном месяце
          if (startMonth === endMonth) {
            for (let day = startDay; day <= endDay; day++) {
              const dayObj = daysWithEvents.find(d => d.dayNumber === day && d.monthNumber === startMonth && d.year === Number(year));
              if (dayObj) {
                changePassed(dayObj)
                eventDays.push(dayObj)
              }
            }
          } else {
            // Обработка дней стартового месяца
            for (let day = startDay; day <= daysWithEvents.filter(d => d.monthNumber === startMonth && d.year === Number(year)).length; day++) {
              const dayObj = daysWithEvents.find(d => d.dayNumber === day && d.monthNumber === startMonth && d.year === Number(year));
              if (dayObj) {
                changePassed(dayObj)
                eventDays.push(dayObj)
              }
            }

            // Обработка дней конечного месяца
            for (let day = 1; day <= endDay; day++) {
              const dayObj = daysWithEvents.find(d => d.dayNumber === day && d.monthNumber === endMonth && d.year === Number(year));
              if (dayObj) {
                changePassed(dayObj)
                eventDays.push(dayObj)
              }
            }
          }

          if (!events.includes(eventDays))
            events.push(eventDays)
        });
      });

      setEventsDays(events)

      // Находим индекс ближайшего события
      const nextEventEndDayIndex = daysWithEvents.findIndex(day => day.endEvent&&
          (
              (day.year > today.year) ||
              (day.year === today.year && day.monthNumber > today.monthNumber) ||
              (day.year === today.year && day.monthNumber === today.monthNumber && day.dayNumber >= today.dayNumber)
          )
      );
      let nextEventStartDayIndex=daysWithEvents.findIndex(day => day.startEvent  &&
          (
              (day.year > today.year) ||
              (day.year === today.year && day.monthNumber > today.monthNumber) ||
              (day.year === today.year && day.monthNumber === today.monthNumber && day.dayNumber >= today.dayNumber)
          )
      );


      let nextEventDayIndex=0

      if (nextEventStartDayIndex>nextEventEndDayIndex){
        for (let i=nextEventEndDayIndex; i>=0; i--){
          if (daysWithEvents[i].startEvent){
            nextEventDayIndex=i
            break
          }
        }
      } else nextEventDayIndex=nextEventStartDayIndex

      // console.log(nextEventEndDayIndex)
      // console.log(nextEventStartDayIndex)
      setNextEventIndex(nextEventDayIndex !== -1 ? nextEventDayIndex : daysWithEvents.length - 1);

      swiperCalendarNav.goToSlide(nextEventStartDayIndex - 4)

      setDays(daysWithEvents);
      // console.log(daysWithEvents)
    }
  }, [eventsByYear]);

  useEffect(() => {
    const starts= days.filter(day=> day.startEvent)

    setEventsStart(starts)
  }, [eventsDays]);

  useEffect(() => {
    const day=days[nextEventIndex]
    // console.log(day)

    if (day){
      changeActiveEventDays(day)
      setActiveMonth(day.month)
      setActiveYear(day.year)
    }

  }, [nextEventIndex]);

  useEffect(() => {
    const day=days[nextEventIndex]

    if (day && swiperCalendarRef.current){
      const activeIndex=swiperCalendarRef.current?.swiper.activeIndex
      const activeDay=days[activeIndex]

      if (activeDay){
        if ((activeDay.month!=activeMonth || activeDay.year!=activeYear) ){
          swiperCalendarNav.goToSlide(days.findIndex(day=> day.month==activeMonth && day.year==activeYear))
        }
      }
    }
  }, [activeYear, activeMonth]);

  useEffect(() => {
    swiperEventNav.goToSlide(eventsStart.findIndex(start=>{
      const activeDay= activeEventsDays[0]

      return start.year==activeDay.year && start.monthNumber==activeDay.monthNumber && start.dayNumber==activeDay.dayNumber
    }))

    // console.log(days.indexOf(activeEventsDays[0]))

    swiperCalendarNav.goToSlideNoVisible(days.indexOf(activeEventsDays[0]))

    if (swiperCalendarRef.current) {
      const { progress} = swiperCalendarRef.current?.swiper

      // console.log(swiperCalendarRef.current?.swiper)

      if (progressRef.current)
        progressRef.current.style.left = `min(${progress * 100}%, calc(100% - 100rem))`
    }

    // console.log(eventsDays)
    }, [activeEventsDays]);

  return (
      <div className="calendar-events" id="calendar-events">
        <ReactSVG src="/Assets/Calendar-events/bg.svg" className="calendar-events__bg"/>
        <div className="calendar-events__event-wrapp">
          {
            title&&
              <div className="titles-block calendar-events__main-title">
                 <h2 className="titles-block__title">{nonBreakingSpaces(title)}</h2>
              </div>
          }
          <button
              className={classNames(
                  "calendar-events__btn",
                  eventsDays.indexOf(activeEventsDays)<1&& "btn--disable"
              )}
              onClick={()=>handleClickBtnEvent("prev")}
          >
            <ReactSVG src="/Assets/Icons/arrow.svg"/>
          </button>
          <Swiper
              ref={swiperEventRef}
              className="calendar-events__event-slider"
              onActiveIndexChange={handleActiveEvent}
              spaceBetween="10rem"
          >
            {
              eventsStart.map(start => {
                const event = eventsByYear && eventsByYear[start.year].find(event => {
                  const startDate = event.date.start.split('.');

                  const startDay = Number(startDate[0]);
                  const startMonth = Number(startDate[1])

                  return start.dayNumber == startDay && start.monthNumber == startMonth
                })

                if (event) {
                  return (
                      <SwiperSlide key={`${start.year} ${event.date.start}`} className="calendar-events__event">
                        {
                          event.link != "" ?
                              <a href={event.link} target="_blank">
                                <Event event={event} year={start.year}/>
                              </a>
                              :
                              <Event event={event} year={start.year}/>
                        }
                      </SwiperSlide>
                  )
                }
              })
            }
          </Swiper>
          <button
              className={classNames(
                  "calendar-events__btn",
                  "calendar-events__btn--next",
                  eventsDays.indexOf(activeEventsDays) == eventsDays.length - 1 && "btn--disable"
              )}
              onClick={() => handleClickBtnEvent("next")}
          >
            <ReactSVG src="/Assets/Icons/arrow.svg"/>
          </button>
        </div>
        <div className="calendar-events__calendar">
          <SliderProgress swiperRef={swiperCalendarRef} progressClass="calendar-events__progres"/>
          <div className="calendar-events__calendar-wrapp"
               onWheel={(e) => (e.target as HTMLElement)?.closest(".swiper") && e.stopPropagation()}>
            <Dropdown value={activeMonth} values={getMonthesNames()} handleCheck={(e) => setActiveMonth(e.target.value)}
                      name="month" className="calendar-events__month"/>
            <Dropdown value={String(activeYear)} values={years}
                      handleCheck={(e) => setActiveYear(Number(e.target.value))} name='year' className="calendar-events__year"/>

            <Swiper
                slidesPerView="auto"
                mousewheel={{
                  sensitivity: 0.5,    // Уменьшаем чувствительность
                  releaseOnEdges: true, // Разрешаем инерцию после достижения краев
                }}
                speed={800} // Уменьшаем длительность анимации
                freeMode={{
                  momentum: true,
                  momentumRatio: 0.5,
                }}
                modules={[Mousewheel, FreeMode]}
                ref={swiperCalendarRef}
                onActiveIndexChange={handleActiveDayIndexChange}
                className="calendar-events__calendar-slider"
            >
              {
                days.map(day => (
                    <SwiperSlide
                        key={`${day.dayNumber} ${day.monthNumber} ${day.year}`}
                        className={classNames('calendar-events__day',
                            (day.dayNumberInWeek === 1 || day.dayNumberInWeek === 7) && "red",
                            day.dayNumberInWeek === 1 && "calendar-events__day--last-week",
                            (day.startEvent && activeEventsDays.indexOf(day) != 0) ?
                                day.passed ? "calendar-events__day--event-passed-day" : "calendar-events__day--event-day" : "",
                            activeEventsDays.includes(day) ?
                                day.passed ? "calendar-events__day--active-passed-day" : "calendar-events__day--active-day" : ""
                        )}
                        onClick={() => changeActiveEventDays(day)}
                    >
                      <span>{day.dayNumber >= 10 ? day.dayNumber : `0${day.dayNumber}`}</span>

                      {
                          activeEventsDays.indexOf(day) === 0 &&
                          <ReactSVG
                              src="/Assets/Icons/arrow.svg"
                              className="calendar-events__active-arrow"
                              // style={{left: `calc((35rem*${activeEventsDays.length}/2 - 17.5rem)`}}
                          />
                      }
                    </SwiperSlide>
                ))
              }
            </Swiper>
          </div>
        </div>
      </div>
  );
};

export default CalendarEventsClient;
