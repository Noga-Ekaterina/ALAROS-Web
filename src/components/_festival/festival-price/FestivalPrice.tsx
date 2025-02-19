'use client'
import React from 'react';
import "./festival-price.scss"
import Marquee from 'react-fast-marquee';
import HtmlProcessing from "../../HtmlProcessing";
import {IFestival} from "@/types/data";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";

interface Props{
  festivalText: IFestival
}

const FestivalPrice = ({festivalText}:Props) => {
  return (
      <div className="festival-price" id="price">
        <div className="container">
          <div className="titles-block">
            <h2 className="titles-block__title">{nonBreakingSpaces(festivalText.priceTitle)}</h2>
          </div>
          <div className="festival-price__body">
            <HtmlProcessing html={festivalText.priceTable.html}/>
          </div>
        </div>
        <div className="festival-price__running-line">
          <Marquee direction='left' className="festival-price__running-line__player">
            <div className="festival-price__running-line-wrapp">
              <HtmlProcessing html={festivalText.priceRunningLine.html}/>
              <HtmlProcessing html={festivalText.priceRunningLine.html}/>
            </div>
          </Marquee>
        </div>
      </div>
  );
};

export default FestivalPrice;
