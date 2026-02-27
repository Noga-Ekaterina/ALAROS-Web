'use client'
import React from 'react';
import "./documents.scss"
import {IAbout, IButtonBlock, IHtml} from "@/types/data";
import LinkBlock from "@/components/link-block/LinkBlock";
import DocumentsDetails from "@/components/documents-details/DocumentsDetails ";

interface Props{
  links: IButtonBlock[];

  buttonDetails: IButtonBlock;
  linksDetails: IHtml[];
  isDisabledDetails: boolean
}

const Documents = ({links, buttonDetails, linksDetails, isDisabledDetails}: Props) => {

  return (
      <div className="documents" id="documents">
        <div className="container">
          <div className="documents__btns">
            {
              links.map((btn, index)=>{
                return (
                    <LinkBlock title={btn.left} link={btn.right} className="documents__btn" key={index}/>
                )
              })
            }

            <DocumentsDetails button={buttonDetails} links={linksDetails} isDisabled={isDisabledDetails}/>
          </div>
        </div>
      </div>
  );
};

export default Documents;
