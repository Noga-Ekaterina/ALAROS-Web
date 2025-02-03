import {IEvent, IEventsByYear, IEventsDataYear, INomination} from "../types/data";

export const nominationsSProcessing=(nominations: string)=>{
  const [rows]= Array.from(nominations.matchAll(/<tbody>(.*?)<\/tbody>/gs)).map(m => m[1])
  const rowsArr=Array.from(rows.matchAll(/<tr>(.*?)<\/tr>/gs)).map(m=>m[1])

  console.log(rowsArr)

  return rowsArr.map(row=>{
    const [number, title, link] = Array.from(row.matchAll(/<td>(?:<p>)?(.*?)(?:<\/p>)?<\/td>/gs)).map(m => m[1]);

    return {number, title, link}
  })
}