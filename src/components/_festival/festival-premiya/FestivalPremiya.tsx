import React, {JSX, useEffect, useState} from 'react';
import "./festival-premiya.scss"
import {observer} from "mobx-react-lite";
import pagesData from "../../../store/pagesData";
import parse from "html-react-parser";

const FestivalPremiya = () => {
  const {festivalText}=pagesData
  const [cols, setCols] = useState<JSX.Element[]>([])

  useEffect(() => {
    if (!festivalText) return

    const steps: JSX.Element[]=[]

    festivalText.premiya.steps.forEach((step, index)=>{
      let str= step.text

      step.links.forEach(link=>{
        str=str.replace(link.text, `<a href="${link.href}" class="${link.color} link-underline">${link.text}</a>`)
      })


      steps.push(
          <div key={`festival-premiya-step-${index}`} className="festival-premiya__step">
            <span className="festival-premiya__num">0{index+1}</span>
            <div>
              <p>{parse(str)}</p>
              {
                step.note &&
                  <>
                     <br/>
                     <p className="festival-premiya__note">{step.note}</p>
                  </>
              }
            </div>
          </div>
      )
    })

    const result: JSX.Element[]=[]
    const colSize= Math.ceil(steps.length/2)
    const colsArr: JSX.Element[][]=[steps.slice(0, colSize), steps.slice(colSize)]

    colsArr.forEach(((col, index)=>{
      result.push(
          <div key={`festival-premiya-col-${index}`} className="festival-premiya__col">
            {
              col.map(step=> step)
            }
          </div>
      )
    }))

    setCols(result)
  }, [festivalText]);

  if (!festivalText) return <></>

  return (
      <div className="container festival-premiya">
        <div className="titles-block">
          <h2 className="titles-block__title">{festivalText.premiya.title}</h2>
          <strong className="titles-block__section">{typeof festivalText.premiya.section=="string" && festivalText.premiya.section}</strong>
        </div>
        <div className="festival-premiya__list">
          {
            cols.map(step=>step)
          }
        </div>
      </div>
  );
};

export default observer(FestivalPremiya);
