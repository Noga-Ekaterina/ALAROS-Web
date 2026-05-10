'use client'
import React, {useEffect, useMemo, useRef, useState} from 'react';
import "./calendar-events.scss";
import {Swiper, SwiperRef, SwiperSlide} from "swiper/react";
import {Mousewheel, FreeMode} from 'swiper/modules';
import {getMonthesNames} from "../../utils/date";
import classNames from "classnames";
import {ReactSVG} from "react-svg";
import Dropdown from "../dropdown/Dropdown";
import {SwiperNavigation} from "../../utils/SwiperNavigation";
import {IEventsDataYear} from "../../types/data";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";
import SliderProgress from "@/components/slider-progress/SliderProgress";
import Event from "@/components/calendar-events/Event";
import {buildCalendarModel, ICalendarDay} from "@/components/calendar-events/calendarModel";

interface Props{
  title?: string
  calendarEvents: IEventsDataYear[]
}

const CalendarEventsClient = ({title, calendarEvents}: Props) => {
  const calendarModel = useMemo(() => buildCalendarModel(calendarEvents), [calendarEvents])
  const {eventsByYear, years, days, eventsDays, eventsStart, nextEventIndex} = calendarModel
  const [activeEventsDays, setActiveEventsDays] = useState<ICalendarDay[]>(calendarModel.initialActiveEventsDays)
  const [activeMonth, setActiveMonth] = useState(calendarModel.initialActiveMonth)
  const [activeYear, setActiveYear] = useState(calendarModel.initialActiveYear)

  const swiperCalendarRef = useRef<SwiperRef | null>(null);
  const swiperEventRef = useRef<SwiperRef | null>(null);
  const swiperCalendarNav = new SwiperNavigation(swiperCalendarRef)
  const swiperEventNav = new SwiperNavigation(swiperEventRef)
  const progressRef = useRef<HTMLDivElement>(null);

  const handleActiveDayIndexChange = () => {
    if (swiperCalendarRef.current){
      const {activeIndex, progress} = swiperCalendarRef.current.swiper
      const activeDay = days[activeIndex]

      if (progressRef.current)
        progressRef.current.style.left = `min(${progress * 100}%, calc(100% - 100rem))`

      if (activeDay) {
        setActiveMonth(activeDay.month)
        setActiveYear(activeDay.year)
      }
    }
  }

  const changeActiveEventDays = (day: ICalendarDay) => {
    for (let i = 0; i < eventsDays.length; i++){
      if (eventsDays[i].findIndex(item => item.date === day.date) === 0){
        setActiveEventsDays(eventsDays[i])
        break
      }
    }
  }

  const handleClickBtnEvent = (dir: "next"|"prev") => {
    if (dir === "next")
      swiperEventNav.goToNext()
    else
      swiperEventNav.goToPrev()
  }

  const handleActiveEvent = () => {
    if (swiperEventRef.current){
      const {activeIndex} = swiperEventRef.current.swiper
      const activeDay = eventsStart[activeIndex]

      if (activeDay) {
        for (let i = 0; i < eventsDays.length; i++){
          if (eventsDays[i].indexOf(activeDay) === 0){
            setActiveEventsDays(eventsDays[i])
            break
          }
        }
      }
    }
  }

  useEffect(() => {
    setActiveEventsDays(calendarModel.initialActiveEventsDays)
    setActiveMonth(calendarModel.initialActiveMonth)
    setActiveYear(calendarModel.initialActiveYear)
    swiperCalendarNav.goToSlide(nextEventIndex)
  }, [calendarModel, nextEventIndex]);

  useEffect(() => {
    const day = days[nextEventIndex]

    if (day && swiperCalendarRef.current){
      const activeIndex = swiperCalendarRef.current.swiper.activeIndex
      const activeDay = days[activeIndex]

      if (activeDay && (activeDay.month !== activeMonth || activeDay.year !== activeYear)){
        swiperCalendarNav.goToSlide(days.findIndex(day => day.month === activeMonth && day.year === activeYear))
      }
    }
  }, [activeYear, activeMonth, days, nextEventIndex]);

  useEffect(() => {
    const activeDay = activeEventsDays[0]

    if (!activeDay)
      return

    swiperEventNav.goToSlide(eventsStart.findIndex(start =>
        start.year === activeDay.year &&
        start.monthNumber === activeDay.monthNumber &&
        start.dayNumber === activeDay.dayNumber
    ))

    swiperCalendarNav.goToSlideNoVisible(days.indexOf(activeDay))

    if (swiperCalendarRef.current) {
      const {progress} = swiperCalendarRef.current.swiper

      if (progressRef.current)
        progressRef.current.style.left = `min(${progress * 100}%, calc(100% - 100rem))`
    }
  }, [activeEventsDays, days, eventsStart]);

  return (
      <div className="calendar-events" id="calendar-events">
        <ReactSVG src="/Assets/Calendar-events/bg.svg" className="calendar-events__bg"/>
        <div className="calendar-events__event-wrapp">
          {
            title &&
              <div className="titles-block calendar-events__main-title">
                <h2 className="titles-block__title">{nonBreakingSpaces(title)}</h2>
              </div>
          }
          <button
              className={classNames(
                  "calendar-events__btn",
                  eventsDays.indexOf(activeEventsDays) < 1 && "btn--disable"
              )}
              onClick={() => handleClickBtnEvent("prev")}
          >
            <ReactSVG src="/Assets/Icons/arrow.svg"/>
          </button>
          <Swiper
              ref={swiperEventRef}
              className="calendar-events__event-slider"
              onActiveIndexChange={handleActiveEvent}
              spaceBetween="1px"
          >
            {
              eventsStart.map(start => {
                const event = eventsByYear[start.year]?.find(event => {
                  const startDate = event.start.split('-');

                  const startDay = Number(startDate[2]);
                  const startMonth = Number(startDate[1])

                  return start.dayNumber === startDay && start.monthNumber === startMonth
                })

                if (event) {
                  return (
                      <SwiperSlide key={`${event.start}`} className="calendar-events__event">
                        {
                          event.link ?
                              <a href={event.link} target="_blank">
                                <Event event={event}/>
                              </a>
                              :
                              <Event event={event}/>
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
                  eventsDays.indexOf(activeEventsDays) === eventsDays.length - 1 && "btn--disable"
              )}
              onClick={() => handleClickBtnEvent("next")}
          >
            <ReactSVG src="/Assets/Icons/arrow.svg"/>
          </button>
        </div>
        <div className="calendar-events__calendar">
          <SliderProgress swiperRef={swiperCalendarRef} progressClass="calendar-events__progres"/>
          <div
              className="calendar-events__calendar-wrapp"
              onWheel={(e) => (e.target as HTMLElement)?.closest(".swiper") && e.stopPropagation()}
          >
            <Dropdown
                value={activeMonth}
                values={getMonthesNames()}
                handleCheck={(e) => setActiveMonth(e.target.value)}
                name="month"
                className="calendar-events__month"
            />
            <Dropdown
                value={String(activeYear)}
                values={years}
                handleCheck={(e) => setActiveYear(Number(e.target.value))}
                name='year'
                className="calendar-events__year"
            />

            <Swiper
                slidesPerView="auto"
                mousewheel={{
                  sensitivity: 0.5,
                  releaseOnEdges: true,
                }}
                speed={800}
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
                        className={classNames(
                            'calendar-events__day',
                            (day.dayNumberInWeek === 1 || day.dayNumberInWeek === 7) && "red",
                            day.dayNumberInWeek === 1 && "calendar-events__day--last-week",
                            (day.startEvent && activeEventsDays.indexOf(day) !== 0) ?
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
