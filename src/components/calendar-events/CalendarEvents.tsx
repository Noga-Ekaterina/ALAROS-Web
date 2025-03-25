import React from 'react';
import {IEventsDataYear, IHomeData, INewsItem} from "@/types/data";
import {revalidateTag, unstable_cache} from "next/cache";
import {fetchData, getNewsQueryStr} from "@/utils/fetchData";
import CalendarEventsClient from "@/components/calendar-events/CalendarEventsClient";


interface IData{
  eventsYears: IEventsDataYear[]
}

interface Props{
  title?: string
}

const init= unstable_cache(async ()=>{
  const data: IData|null|string= await fetchData(`
          query MyQuery {
            eventsYears {
              year
              events {
                html
              }
            }
          }`)

  if (typeof data==="string" || !data){
    return data
  }

  return data.eventsYears
}, ["events-years"], {tags: ["EventsYear"]})

const CalendarEvents = async ({title}: Props) => {
  const data=  await init()

  if (typeof data==="string" || !data) {
    revalidateTag("Home")
    return <div>произошла ошибка{data && `: ${data}`}, перезагрузите страницу</div>
  }

  return <CalendarEventsClient title={title} calendarEvents={data}/>
};

export default CalendarEvents;
