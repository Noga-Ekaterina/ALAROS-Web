import React from 'react';
import "./infopartners.scss"
import PartnersSliderClient from "@/components/partners-slider/PartnersSliderClient";
import {revalidateTag, unstable_cache} from "next/cache";
import {fetchData} from "@/utils/fetchData";
import {IInfopartnersSlider} from "@/types/data";
import {partnersProcessing} from "@/components/partners-slider/partnersProcessing";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";
import HtmlProcessing from "@/components/HtmlProcessing";

interface IData{
  partnersSliders: IInfopartnersSlider[]
}

const init= unstable_cache(async ()=>{
  const data: IData|null|string= await fetchData(`
    query MyQuery {
      partnersSliders {
        infopartnersTitle
        infopartnersText{
          html
        }
        partners {
          html
        }
      }
    }
  `)

  if (typeof data==="string" || !data){
    return data
  }

  const {infopartnersTitle, infopartnersText, partners}= data.partnersSliders[0]

  return {title: infopartnersTitle, text: infopartnersText, partners: partnersProcessing(partners.html)}
}, ["infopartners-slider"], {tags: ["PartnersSlider"]})

const InfopartnersSlider = async () => {
  const data=  await init()

  if (typeof data==="string" || !data) {
    revalidateTag("PartnersSlider")
    return <div>произошла ошибка{data && `: ${data}`}, перезагрузите страницу</div>
  }

  return (
      <div className="infopartners">
        <div className="container titles-block">
          <h2 className="titles-block__title titles-block__title--small">{nonBreakingSpaces(data.title)}</h2>
        </div>
        <div className="infopartners__row">
          <div className="infopartners__block-text">
            <HtmlProcessing html={data.text.html}/>
          </div>
          <PartnersSliderClient partners={data.partners}/>
        </div>
      </div>
  )
};

export default InfopartnersSlider;
