import {IHtmlString} from "@/types/data";

export interface IDay{
  date: string[],
  sessions: ReturnType<typeof getSessionData>[]
}

export const getUsers=(rows: string)=>{
  const rowsArr=Array.from(rows.matchAll(/<tr>(.*?)<\/tr>/gs)).map(m=>m[1])

  return rowsArr.map(row=>{
    const [name, jobTitle, image] = Array.from(row.matchAll(/<td>(?:<p>)?(.*?)(?:<\/p>)?<\/td>/gs)).map(m => m[1]);

    return {name, jobTitle, image}
  })
}

export const getSessionData=(data: string)=>{
  const [text]=Array.from(data.matchAll(/([\s\S]*?)<h4[^>]*>/ig)).map(m => m[1])
  const [moderatorRows, speakersRows]=Array.from(data.matchAll(/<tbody>(.*?)<\/tbody>/gs)).map(m => m[1])
  const [moderatorsTitle, speakersTitle]=Array.from(data.matchAll(/<h4>(.*?)<\/h4>/gs)).map(m => m[1])

  return({
    text,
    moderatorsTitle,
    speakersTitle,
    moderators: getUsers(moderatorRows),
    speakers: getUsers(speakersRows)
  })
}

export const getDaysData=(items: IHtmlString[])=>{
  const days: IDay[]=[]

  items.forEach(({html})=>{
    const section=getSessionData(html)
    const [date]=Array.from(html.matchAll(/^<p>.*?(\d\d)\.(\d\d)\.(\d\d\d\d).*?<\/p>/gs)).map(m => [m[1], m[2], m[3]]);

    if (date && date.length>0){
      days.push({date, sessions: [section]})
    }else {
      days[days.length-1].sessions.push(section)
    }
  })

  return days
}