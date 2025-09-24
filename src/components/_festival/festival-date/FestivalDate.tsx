'use client'
import React, {Fragment, useMemo, useState} from 'react';
import "./festival-date.scss"
import classNames from "classnames";
import {IFestival, IHtmlString} from '../../../types/data'
import HtmlProcessing from "../../HtmlProcessing";
import {motion, AnimatePresence} from "framer-motion";
interface Props{
  pageData: IFestival
}

const getSections=(arr: IHtmlString[])=>{

  return arr.map(section=>{
    let str= section.html.replace("<p>", "")
    str=str.replace("<\/p>", '')

    const [title, date]= str.split(/:\s?/)

    return ({title: `<span>${title}</span>`, date: `<span>${date}</span>`})
  })}

const FestivalDate = ({pageData}:Props) => {
  const sections= useMemo(() => getSections(pageData.dateSections), [])
  const [activeDateIndex, setActiveDateIndex] = useState(0)

  if (!pageData) return <div/>
  return (
      <div className='festival-date' id="date">
        <div className="container">
          <div className="festival-date__text">
            <HtmlProcessing html={pageData.dateText.html}/>
            <p className="festival-date__btns">
              {
                sections.map((section, index)=>(
                    <Fragment key={index}>
                      <button
                        className={classNames(
                            "festival-date__btn",
                            index==activeDateIndex? "festival-date__btn--disabled":'link-underline',
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
          <motion.div
            key={activeDateIndex}
            initial={{opacity: 0,}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.5}}
            className="festival-date__date">
            {
              sections[activeDateIndex] && <HtmlProcessing html={sections[activeDateIndex].date}/>
            }
          </motion.div>
        </div>
      </div>
  );
};

export default FestivalDate;
