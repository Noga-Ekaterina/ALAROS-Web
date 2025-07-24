import {getRowsInTable} from "@/utils/getRowsInTable";

export const getData=(html: string)=>{
  const rowsArr=getRowsInTable(html)

  return rowsArr.map(row=>{
    const [image, caption, link] = Array.from(row.matchAll(/<td>(?:<p>)?(.*?)(?:<\/p>)?<\/td>/gs)).map(m => m[1]);

    return {image, caption, link}
  })

}