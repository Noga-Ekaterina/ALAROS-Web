import React, {useEffect, useState} from 'react';
import "./festival-price.scss"
import {observer} from "mobx-react-lite";
import pagesData from "../../../store/pagesData";
import Marquee from 'react-fast-marquee';
import {useMediaQuery} from "react-responsive";
import {useGetRem} from "../../../hoocs/useGetRem";
import parse from "html-react-parser";
import HtmlProcessing from "../../HtmlProcessing";

const FestivalPrice = () => {
  const {festivalText} = pagesData

  if (!festivalText) return <div/>

  return (
      <div className="festival-price">
        <div className="container">
          <div className="titles-block">
            <h2 className="titles-block__title">{festivalText.priceTitle}</h2>
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

export default observer(FestivalPrice);
