import {getRowsInTable} from "@/utils/getRowsInTable";
import {IFestivalProgramDay} from "@/types/data";

export const getPrgramTitles=(table: string)=>{
  const rows = getRowsInTable(table)
  const [day, time, title, place,] = Array.from(rows[0].matchAll(/<td>(?:<p>)?(.*?)(?:<\/p>)?<\/td>/gs)).map(m => m[1]);

  return {day, time, title, place}
}

export const programProcessing=(program: IFestivalProgramDay[])=>(
    program.map(day=>{
      const rows = getRowsInTable(day.schedule.html)

      const scheduleObjs= rows.map(row=>{
        const [time, title, place,] = Array.from(row.matchAll(/<td>(?:<p>)?(.*?)(?:<\/p>)?<\/td>/gs)).map(m => m[1]);

        return {time, title, place}
      })

      return {...day, scheduleObjs}
    })
)