import {IEvent, IEventsByYear, IEventsDataYear} from "../types/data";

export const eventsDataProcessing= (eventsDataYears: IEventsDataYear[])=>{
  const eventsByYear: IEventsByYear={}

  const getEvents=(table: string)=>{
    const [rows]= Array.from(table.matchAll(/<tbody>(.*?)<\/tbody>/gs)).map(m => m[1])
    const rowsArr=Array.from(rows.matchAll(/<tr>(.*?)<\/tr>/gs)).map(m=>m[1])

    console.log(rowsArr)

    return rowsArr.map(row=>{
      const [start, end, title, place, description, image] = Array.from(row.matchAll(/<td>(?:<p>)?(.*?)(?:<\/p>)?<\/td>/gs)).map(m => m[1]);

      return {start, end, title, place, description, image}
    })
  }


  eventsDataYears.forEach(yearData=>{
    const eventsRows= getEvents(yearData.events.html)
    const eventsYear: IEvent[]= eventsRows.map(row=>({
      date:{
        start: row.start,
        end: row.end
      },
      title: row.title,
      place: row.place,
      description: row.description
    }))

    eventsByYear[yearData.year]= eventsYear
  })

  return eventsByYear
}