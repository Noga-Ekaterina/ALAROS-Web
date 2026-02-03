import React from 'react';
import "./menu.scss"
import MenuClient from "@/components/menu/MenuClient";
import {revalidateTag, unstable_cache} from "next/cache";
import {fetchData} from "@/utils/fetchData";
import {IMenu} from "@/types/data";
import {fetchSingle} from "@/utils/strapFetch";

const init= unstable_cache(async ()=>{
  const data= await fetchSingle<IMenu>("menu")
  if (typeof data==="string" || !data){
    return data
  }

  return data
}, ["menu"], {tags: ["menu"]})

const Menu = async () => {
  const data= await init()

  if (typeof data==="string" || !data) {
    revalidateTag("Footer")
    return <div>произошла ошибка{data && `: ${data}`}, перезагрузите страницу</div>
  }

  return <MenuClient data={data}/>
};

export default Menu;
