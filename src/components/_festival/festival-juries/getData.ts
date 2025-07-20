import {IHtmlString, IUser} from "@/types/data";
import {getRowsInTable} from "@/utils/getRowsInTable";

export const getData=(arr: IHtmlString[])=>(
    arr.map(({html})=>{
      const rowsArr=getRowsInTable(html)
      const [section]=Array.from(html.matchAll(/^<h1>(.*?)<\/h1>/gs)).map(m => m[1]);
      const [note]=Array.from(html.matchAll(/^<h1>.*?<\/h1><p>(.*?)<\/p>/gs)).map(m => m[1]);

      const juries: IUser[]=rowsArr.map(row=>{
        const [name, jobTitle, place, image] = Array.from(row.matchAll(/<td>(?:<p>)?(.*?)(?:<\/p>)?<\/td>/gs)).map(m => m[1]);

        return {name, jobTitle, place, image}
      })

      return {section, note, juries}
    })
)