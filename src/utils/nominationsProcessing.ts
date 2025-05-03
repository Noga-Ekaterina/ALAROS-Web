import {getRowsInTable} from "@/utils/getRowsInTable";

export const nominationsSProcessing=(nominations: string)=>{
  const rowsArr= getRowsInTable(nominations)

  return rowsArr.map(row=>{
    const [number, title, link] = Array.from(row.matchAll(/<td>(?:<p>)?(.*?)(?:<\/p>)?<\/td>/gs)).map(m => m[1]);

    return {number, title, link, value: `${number} ${title}`}
  })
}