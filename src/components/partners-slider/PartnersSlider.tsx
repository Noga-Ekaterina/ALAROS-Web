import React from 'react';
import PartnersSliderClient from "@/components/partners-slider/PartnersSliderClient";
import {revalidateTag, unstable_cache} from "next/cache";
import {IPartnersSlider} from "@/types/data";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";
import {fetchSingle} from "@/utils/strapFetch";

const init= unstable_cache(async ()=>{
  const data= await fetchSingle<IPartnersSlider>("partners-slider")

  if (typeof data==="string" || !data){
    return data
  }

  return data
}, ["partners-slider"], {tags: ["partners-slider"]})

const PartnersSlider = async () => {
  const data=  await init()

  if (typeof data==="string" || !data) {
    revalidateTag("partners-slider")
    return <div>произошла ошибка{data && `: ${data}`}, перезагрузите страницу</div>
  }

  return (
      <>
        <div className="container titles-block partners-slider-title">
          <h2 className="titles-block__title titles-block__title--small">{nonBreakingSpaces(data.title)}</h2>
        </div>
        <PartnersSliderClient partners={data.partners}/>
      </>
  )
};

export default PartnersSlider;
