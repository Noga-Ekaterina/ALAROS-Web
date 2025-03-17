import React from 'react';
import PartnersSliderClient from "@/components/partners-slider/PartnersSliderClient";
import {revalidateTag, unstable_cache} from "next/cache";
import {fetchData} from "@/utils/fetchData";
import {IPartnersSlider} from "@/types/data";
import {partnersProcessing} from "@/components/partners-slider/partnersProcessing";

interface IData{
  partnersSliders: IPartnersSlider[]
}

const init= unstable_cache(async ()=>{
  const data: IData|null|string= await fetchData(`
    query MyQuery {
      partnersSliders {
        title
        partners {
          html
        }
      }
    }
  `)

  if (typeof data==="string" || !data){
    return data
  }

  const {title, partners}= data.partnersSliders[0]

  return {title, partners: partnersProcessing(partners.html)}
}, ["partners-slider"], {tags: ["PartnersSlider"]})

const PartnersSlider = async () => {
  const data=  await init()

  if (typeof data==="string" || !data) {
    revalidateTag("Home")
    return <div>произошла ошибка{data && `: ${data}`}, перезагрузите страницу</div>
  }

  return <PartnersSliderClient title={data.title} partners={data.partners}/>
};

export default PartnersSlider;
