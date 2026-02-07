import React from 'react';
import {IEventsDataYear, IHomeData, INewsItem} from "@/types/data";
import {revalidateTag, unstable_cache} from "next/cache";
import CalendarEventsClient from "@/components/calendar-events/CalendarEventsClient";
import {fetchColection} from "@/utils/strapFetch";


interface IData{
  eventsYears: IEventsDataYear[]
}

interface Props{
  title?: string
}

const init= unstable_cache(async ()=>{
  const data= await fetchColection<IEventsDataYear>({
    name: "events-years",
    sort: "year",
    pagination:{
      pageSize: 100
    }
  })

  if (typeof data==="string" || !data){
    return data
  }

  return data
}, ["events-years"], {tags: ["EventsYear"]})

const CalendarEvents = async ({title}: Props) => {
  const data=  await init()

  if (typeof data==="string" || !data) {
    revalidateTag("Home")
    return <div>произошла ошибка{data && `: ${data}`}, перезагрузите страницу</div>
  }

  return <CalendarEventsClient title={title} calendarEvents={data.data}/>
};

export default CalendarEvents;
