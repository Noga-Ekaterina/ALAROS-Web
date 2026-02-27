import React from 'react';
import "./partners-events.scss"
import {IPartners} from "@/types/data";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";
import HtmlProcessing from "@/components/HtmlProcessing";

interface Props{
  pageData: IPartners
}

const PartnersEvents = ({pageData}: Props) => {
  return (
      <div className="partners-events" id="events">
        <div className="container">
          <div className="titles-block">
            <h2 className="titles-block__title">{nonBreakingSpaces(pageData.eventsTitle)}</h2>
          </div>
          <div className="partners-events__text-wrap">
            {
              pageData.events.map(({text}, index)=>(
                  <div className="partners-events__block-text" key={index}>
                    <HtmlProcessing html={text}/>
                  </div>
              ))
            }
          </div>
        </div>
      </div>
  );
};

export default PartnersEvents;
