import React from 'react';
import "./menu.scss"
import MenuClient from "@/components/menu/MenuClient";
import {revalidateTag, unstable_cache} from "next/cache";
import {fetchData} from "@/utils/fetchData";
import {IMenuSection} from "@/types/data";

interface IData{
  menuSections: IMenuSection[]
}

const init= unstable_cache(async ()=>{
  const data= await fetchData<IData>(`
    query MyQuery {
      menuSections(orderBy: position_ASC) {
        position
        section {
          html
        }
        subsections {
          html
        }
        isAdditional
      }
    }
  `)

  if (typeof data==="string" || !data){
    return data
  }

  return data.menuSections
}, ["menu"], {tags: ["MenuSection"]})

const Menu = async () => {
  const data= await init()

  if (typeof data==="string" || !data) {
    revalidateTag("Footer")
    return <div>произошла ошибка{data && `: ${data}`}, перезагрузите страницу</div>
  }

  return <MenuClient data={data}/>
};

export default Menu;
