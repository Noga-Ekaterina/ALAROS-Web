import React from 'react';
import "./infopartners.scss"
import PartnersSliderClient from "@/components/partners-slider/PartnersSliderClient";
import {IInfopartnersSlider} from "@/types/data";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";
import HtmlProcessing from "@/components/HtmlProcessing";
import { revalidateTag, unstable_cache } from 'next/cache';
import { fetchSingle } from '@/utils/strapFetch';
import InfopartnersSliderClient from './InfopartnersSliderClient';

const init=unstable_cache(async ()=>{
  const data= await fetchSingle<IInfopartnersSlider>("infopartners")

  return data
}, ["infopartners"], {tags: ["infopartners",]})

const InfopartnersSlider =async () => {
  const data= await init()

  if (typeof data==="string" || !data) {
    revalidateTag("infopartners")
    return <div>произошла ошибка{data && `: ${data}`}, перезагрузите страницу</div>
  }

  return (
    <InfopartnersSliderClient {...data} />
  )
};

export default InfopartnersSlider;
