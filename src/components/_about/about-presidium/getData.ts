import {IUser} from "@/types/data";
import {getRowsInTable} from "@/utils/getRowsInTable";

export const getData=(html: string): IUser[]=>{
  const rowsArr=getRowsInTable(html)

  return rowsArr.map(row=>{
    const [name, jobTitle, place, image] = Array.from(row.matchAll(/<td>(?:<p>)?(.*?)(?:<\/p>)?<\/td>/gs)).map(m => m[1]);

    return {name, jobTitle, place, image}
  })

}