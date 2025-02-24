import React from 'react';
import "./festival-emails.scss"
import HtmlProcessing from "../../HtmlProcessing";
import {IFestival} from "@/types/data";

interface Props{
  pageData: IFestival
}

const FestivalEmails = ({pageData}:Props) => {
  return (
      <div className="festival-emails">
        <div className="container festival-emails__container">
          {
            pageData.emails.map(({html})=>(
                <div className='festival-emails__item'><HtmlProcessing html={html}/></div>
            ))
          }
        </div>
      </div>
  );
};

export default FestivalEmails;
