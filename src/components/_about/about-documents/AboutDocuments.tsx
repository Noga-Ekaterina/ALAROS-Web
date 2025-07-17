'use client'
import React from 'react';
import "./about-documents.scss"
import {IAbout} from "@/types/data";
import {getBtns} from "@/utils/getBtns";
import LinkBlock from "@/components/link-block/LinkBlock";
import AboutMembership from "@/components/_about/about-membership/AboutMembership";

interface Props{
  pageData: IAbout
}

const AboutDocuments = ({pageData}: Props) => {
  const btns= getBtns(pageData.documentsLinks)


  return (
      <div className="about-documents" id="documents">
        <div className="container">
          <div className="about-documents__btns">
            {
              btns.map((btn, index)=>{
                return (
                    <LinkBlock title={btn.title} link={btn.link} className="about-documents__btn" key={index}/>
                )
              })
            }

            <AboutMembership membership={pageData.membership} membershipLinks={pageData.membershipLinks}/>
          </div>
        </div>
      </div>
  );
};

export default AboutDocuments;
