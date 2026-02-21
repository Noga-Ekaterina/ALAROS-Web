import React from 'react';
import "./infopartners.scss"
import PartnersSliderClient from "@/components/partners-slider/PartnersSliderClient";
import {revalidateTag, unstable_cache} from "next/cache";
import {fetchData} from "@/utils/fetchData";
import {IInfopartnersSlider} from "@/types/data";
import {partnersProcessing} from "@/components/partners-slider/partnersProcessing";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";
import HtmlProcessing from "@/components/HtmlProcessing";

const InfopartnersSlider =({infopartners, infopartnersTitle, infopartnersText }: IInfopartnersSlider) => {

  return (
      <div className="infopartners">
        <div className="container titles-block">
          <h2 className="titles-block__title titles-block__title--small grey">{nonBreakingSpaces(infopartnersTitle)}</h2>
        </div>
        <div className="infopartners__row">
          <div className="infopartners__block-text">
            <HtmlProcessing html={infopartnersText}/>
          </div>
          <PartnersSliderClient partners={infopartners} slidesPerViewMobile={4} slidesPerView={7} slidesPerViewBigDesktop={8}/>
        </div>
      </div>
  )
};

export default InfopartnersSlider;
