import {getRowsInTable} from "@/utils/getRowsInTable";

export const getLinks=(table: string)=>{
  const rowsArr=getRowsInTable(table)

  return rowsArr.map(row=>{
    const [link, icon] = Array.from(row.matchAll(/<td>(?:<p>)?(.*?)(?:<\/p>)?<\/td>/gs)).map(m => m[1]);

    return {link, icon}
  })
}