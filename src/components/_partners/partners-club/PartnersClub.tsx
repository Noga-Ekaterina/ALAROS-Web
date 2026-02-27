import React from 'react';
import "./partners-club.scss"
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";
import {IPartners} from "@/types/data";
import HtmlProcessing from "@/components/HtmlProcessing";
import PartnersSliderClient from "@/components/partners-slider/PartnersSliderClient";
import Documents from "@/components/documents/Documents";

interface Props{
  pageData: IPartners
}

const PartnersClub = ({pageData}: Props) => {
  return (
      <div className="partners-club" id="club">
        <img src="/Assets/Pages/Partners/2.svg" className="partners-club__bg"/>
        <div className="container">
          <div className="titles-block">
            <h2 className="titles-block__title">{nonBreakingSpaces(pageData.clubTitle)}</h2>
          </div>
          <div className="partners-club__text-wrap">
            <div className="partners-club__text">
              <HtmlProcessing html={pageData.clubText}/>
            </div>
          </div>
        </div>

        <PartnersSliderClient partners={pageData.clubPartners}/>
        <Documents links={pageData.documentsLinks} buttonDetails={pageData.documentsPartners} linksDetails={pageData.documentsPartnersLinks} isDisabledDetails={pageData.documentsPartnersDisabled}/>
      </div>
  );
};

export default PartnersClub;
