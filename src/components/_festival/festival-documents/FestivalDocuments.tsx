'use client'
import React from 'react';
import "./festival-documents.scss"
import {IFestival, INomination} from "@/types/data";
import {getBtns} from "@/utils/getBtns";
import FestivalTemplates from "@/components/_festival/festival-templates/FestivalTemplates";
import LinkBlock from "@/components/link-block/LinkBlock";

interface Props{
  pageData: IFestival
  nominations: INomination[]
}

const FestivalDocuments = ({pageData, nominations}: Props) => {
  const btns= getBtns(pageData.documentsLinks)


  return (
      <div className="festival-documents" id="documents">
        <div className="container">
          <div className="titles-block">
            <h2 className="titles-block__title">{pageData.documentsTitle}</h2>
          </div>

          <div className="festival-documents__btns">
            {
              btns.map((btn, index)=>{
                return (
                    <LinkBlock title={btn.title} link={btn.link} className="festival-documents__btn" key={index}/>
                )
              })
            }
            <FestivalTemplates pageData={pageData} nominations={nominations}/>
          </div>
        </div>
      </div>
  );
};

export default FestivalDocuments;
