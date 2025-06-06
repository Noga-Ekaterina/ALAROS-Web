'use client'
import React, {JSX, useEffect, useState} from 'react';
import "./festival-premiya.scss"
import {observer} from "mobx-react-lite";
import parse from "html-react-parser";
import HtmlProcessing from "../../HtmlProcessing";
import {IFestival, IHtmlString} from "@/types/data";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";

interface Props{
  pageData: IFestival
}

const getCols=(arr: IHtmlString[])=>{

  const steps: JSX.Element[]=[]

  arr.forEach((step, index)=>{
    steps.push(
        <div key={`festival-premiya-step-${index}`} className="festival-premiya__step">
          <span className="festival-premiya__num">0{index+1}</span>
          <div className='festival-premiya__text'>
            <HtmlProcessing html={step.html}/>
          </div>
        </div>
    )
  })

  const result: JSX.Element[]=[]
  const colSize= Math.ceil(steps.length/2)
  const colsArr: JSX.Element[][]=[steps.slice(0, colSize), steps.slice(colSize)]

  return colsArr.map((col, index)=> (
      <div key={`festival-premiya-col-${index}`} className="festival-premiya__col">
        {
          col.map(step => step)
        }
      </div>
  ))
}

const FestivalPremiya = ({pageData}: Props) => {
  const cols = getCols(pageData.premiyaSteps)

  return (
      <div className="festival-premiya" id="premiya">
        <div className="container">
          <div className="titles-block">
            <h2 className="titles-block__title">{nonBreakingSpaces(pageData.premiyaTitle)}</h2>
          </div>
          <div className="festival-premiya__list">
            {
              cols.map(step => step)
            }
          </div>
        </div>
      </div>
  );
};

export default observer(FestivalPremiya);
