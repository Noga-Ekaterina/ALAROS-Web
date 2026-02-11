'use client'
import React from 'react';
import "./festival-documents.scss"
import {IFestival, IFestivalNomination} from "@/types/data";
import {getBtns} from "@/utils/getBtns";
import FestivalTemplates from "@/components/_festival/festival-templates/FestivalTemplates";
import LinkBlock from "@/components/link-block/LinkBlock";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";

interface Props{
  pageData: IFestival
}

const FestivalDocuments = ({pageData}: Props) => {


  return (
      <div className="festival-documents" id="documents">
        <div className="container">
          <div className="titles-block">
            <h2 className="titles-block__title">{nonBreakingSpaces(pageData.documentsTitle)}</h2>
          </div>

          <div className="festival-documents__btns">
            {
              pageData.documentsLinks.map((btn, index)=>{
                return (
                    <LinkBlock title={btn.left} link={btn.right} className="festival-documents__btn" key={index}/>
                )
              })
            }
            <FestivalTemplates pageData={pageData}/>
          </div>
        </div>
      </div>
  );
};

export default FestivalDocuments;
