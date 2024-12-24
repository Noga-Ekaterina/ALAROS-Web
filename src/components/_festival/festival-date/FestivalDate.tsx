import React, {useEffect, useState} from 'react';
import "./festival-date.scss"
import pagesData from "../../../store/pagesData";
import classNames from "classnames";
import {IFestivalDateSection} from '../../../types/data'
import HtmlProcessing from "../../HtmlProcessing";
import {observer} from "mobx-react-lite";

const FestivalDate = () => {
  const {festivalText}=pagesData
  const [sections, setSections] = useState<IFestivalDateSection[]>([])
  const [activeDateIndex, setActiveDateIndex] = useState(0)

  useEffect(() => {
    if (!festivalText) return

    const result: IFestivalDateSection[]=[]
    festivalText.dateSections.map(section=>{
      let str= section.html.replace("<p>", "")
      str=str.replace("<\/p>", '')

      const [title, date]= str.split(/:\s?/)

      result.push({title: `<span>${title}</span>`, date: `<span>${date}</span>`})
    })

    console.log(result)

    setSections(result)
  }, [festivalText]);

  if (!festivalText) return <div/>
  return (
      <div className='festival-date' id="date">
        <div className="container">
          <div className="festival-date__text">
            <HtmlProcessing html={festivalText.dateText.html}/>
            <p className="festival-date__btns">
              {
                sections.map((section, index)=>(
                    <>
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
                    </>
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

export default observer(FestivalDate);
