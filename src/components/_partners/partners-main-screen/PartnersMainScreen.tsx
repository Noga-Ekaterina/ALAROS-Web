import React from 'react';
import HtmlProcessing from "../../HtmlProcessing";
import {IPartners} from "@/types/data";
import PartnersMainScreenSlider from "@/components/_partners/partners-main-screen/PartnersMainScreenSlider";

interface Props{
  pageData: IPartners
}

const PartnersMainScreen = ({pageData}: Props) => {
  return (
      <div className="main-screen partners-main-screen">
        <div className="partners-main-screen__block-text">
          <div className="main-screen__bg" style={{backgroundImage: 'url("/Assets/Pages/Partners/1.svg")'}}/>

          <HtmlProcessing html={pageData.mainScreenLeftSection}/>
        </div>

        <div className="partners-main-screen__slider-wrapp">
          <PartnersMainScreenSlider images={pageData.mainScreenImages}/>
        </div>
      </div>
  );
};

export default PartnersMainScreen
