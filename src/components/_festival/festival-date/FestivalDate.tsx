'use client'
import React, {Fragment, useState} from 'react';
import "./festival-date.scss"
import classNames from "classnames";
import {IFestival, IHtmlString} from '../../../types/data'
import HtmlProcessing from "../../HtmlProcessing";

interface Props{
  festivalText: IFestival
}

const getSections=(arr: IHtmlString[])=>{

  return arr.map(section=>{
    let str= section.html.replace("<p>", "")
    str=str.replace("<\/p>", '')

    const [title, date]= str.split(/:\s?/)

    return ({title: `<span>${title}</span>`, date: `<span>${date}</span>`})
  })}

const FestivalDate = ({festivalText}:Props) => {
  const sections= getSections(festivalText.dateSections)
  const [activeDateIndex, setActiveDateIndex] = useState(0)

  if (!festivalText) return <div/>
  return (
      <div className='festival-date' id="date">
        <div className="container">
          <div className="festival-date__text">
            <HtmlProcessing html={festivalText.dateText.html}/>
            <p className="festival-date__btns">
              {
                sections.map((section, index)=>(
                    <Fragment key={index}>
                      <button
                        className={classNames(
                            "festival-date__btn",
                            index==activeDateIndex && "festival-date__btn--disabled",
                        )}
                        onClick={()=> setActiveDateIndex(index)}
                      >
                        <HtmlProcessing html={section.title}/>
                      </button>

                      {
                        index<sections.length-1 && <span>|</span>
                      }
                    </Fragment>
                ))
              }
            </p>
          </div>
          <div className="festival-date__date">
            {
              sections[activeDateIndex] && <HtmlProcessing html={sections[activeDateIndex].date}/>
            }
          </div>
        </div>
      </div>
  );
};

export default FestivalDate;
