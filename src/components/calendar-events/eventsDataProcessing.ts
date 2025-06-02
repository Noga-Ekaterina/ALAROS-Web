import {IEvent, IEventsByYear, IEventsDataYear} from "../../types/data";
import {getRowsInTable} from "@/utils/getRowsInTable";

export const eventsDataProcessing= (eventsDataYears: IEventsDataYear[])=>{
  const eventsByYear: IEventsByYear={}

  const getEvents=(table: string)=>{
    const rowsArr= getRowsInTable(table)

    return rowsArr.map(row=>{
      const [start, end, title, place, description, image, link] = Array.from(row.matchAll(/<td>(?:<p>)?(.*?)(?:<\/p>)?<\/td>/gs)).map(m => m[1]);

      return {start, end, title, place, description, image, link}
    })
  }


  eventsDataYears.forEach(yearData=>{
    const eventsRows= getEvents(yearData.events.html)
    const eventsYear: IEvent[]= eventsRows.map(row=>({
      date:{
        start: row.start,
        end: row.end
      },
      ...row
    }))

    eventsByYear[yearData.year]= eventsYear
  })

  return eventsByYear
}