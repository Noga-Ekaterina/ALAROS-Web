'use client'
import React from 'react';
import "./festival-documents.scss"
import {IFestival, INomination} from "@/types/data";
import {getBtns} from "@/utils/getBtns";
import FestivalTemplates from "@/components/_festival/festival-templates/FestivalTemplates";
import LinkBlock from "@/components/link-block/LinkBlock";

interface Props{
  festivalText: IFestival
  nominations: INomination[]
}

const FestivalDocuments = ({festivalText, nominations}: Props) => {
  const btns= getBtns(festivalText.documentsLinks)


  return (
      <div className="festival-documents" id="documents">
        <div className="container">
          <div className="titles-block">
            <h2 className="titles-block__title">{festivalText.documentsTitle}</h2>
          </div>

          <div className="festival-documents__btns">
            {
              btns.map((btn, index)=>{
                return (
                    <LinkBlock title={btn.title} link={btn.link} className="festival-documents__btn" key={index}/>
                )
              })
            }
            <FestivalTemplates festivalText={festivalText} nominations={nominations}/>
          </div>
        </div>
      </div>
  );
};

export default FestivalDocuments;
