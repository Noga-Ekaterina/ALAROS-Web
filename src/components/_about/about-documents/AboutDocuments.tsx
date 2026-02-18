'use client'
import React from 'react';
import "./about-documents.scss"
import {IAbout} from "@/types/data";
import LinkBlock from "@/components/link-block/LinkBlock";
import AboutMembership from "@/components/_about/about-membership/AboutMembership";

interface Props{
  pageData: IAbout
}

const AboutDocuments = ({pageData}: Props) => {

  return (
      <div className="about-documents" id="documents">
        <div className="container">
          <div className="about-documents__btns">
            {
              pageData.documentsLinks.map((btn, index)=>{
                return (
                    <LinkBlock title={btn.left} link={btn.right} className="about-documents__btn" key={index}/>
                )
              })
            }

            <AboutMembership membership={pageData.membership} membershipLinks={pageData.membershipLinks} isDisabled={pageData.membershipDisabled}/>
          </div>
        </div>
      </div>
  );
};

export default AboutDocuments;
