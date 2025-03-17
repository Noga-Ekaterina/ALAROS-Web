import {getRowsInTable} from "@/utils/getRowsInTable";
import {IPartner} from "@/types/data";

export const partnersProcessing=(table: string): IPartner[]=>{
  const rows = getRowsInTable(table)

  return  rows.map(row=>{
    const [image, link] = Array.from(row.matchAll(/<td>(?:<p>)?(.*?)(?:<\/p>)?<\/td>/gs)).map(m => m[1]);

    return {image, link}
  })
}