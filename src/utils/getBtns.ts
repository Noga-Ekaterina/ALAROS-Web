import {IHtmlString} from "@/types/data";

interface IBtn{
  title: string
  link: string
}

export const getBtns=(arr: IHtmlString[]) => {
  return arr.map(item => {
    let str = item.html.replace('<p>', '')
    str = str.replace('</p>', '')

    const [title, link] = str.split(/:\s?/)

    return ({title: `<span>${title}</span>`, link})
  })
}
