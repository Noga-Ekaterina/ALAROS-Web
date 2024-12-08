import React from 'react';
import "./festival-emails.scss"
import pagesData from "../../../store/pagesData";
import HtmlProcessing from "../../HtmlProcessing";

const FestivalEmails = () => {
  const {festivalText}=pagesData

  if (!festivalText) return <div/>

  return (
      <div className="festival-emails">
        <div className="container festival-emails__container">
          {
            festivalText.emails.map(({html})=>(
                <div className='festival-emails__item'><HtmlProcessing html={html}/></div>
            ))
          }
        </div>
      </div>
  );
};

export default FestivalEmails;
