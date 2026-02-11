'use client'
import React, {Fragment, useEffect, useMemo, useRef, useState} from 'react';
import "./festival-date.scss"
import classNames from "classnames";
import {IFestival, IHtmlString} from '../../../types/data'
import HtmlProcessing from "../../HtmlProcessing";
import {motion, AnimatePresence} from "framer-motion";
import {formaterDate} from "@/utils/date";
interface Props{
  pageData: IFestival
}

const FestivalDate = ({pageData}:Props) => {
  const [activeDateIndex, setActiveDateIndex] = useState(0)
  const timeoutRef= useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    timeoutRef.current=setTimeout(()=>{
      setActiveDateIndex(prevState => prevState===pageData.dateSections.length-1? 0: prevState+1)
    }, 4000)

    return ()=>{
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }

  }, [activeDateIndex]);

  return (
      <div className='festival-date' id="date">
        <div className="container">
          <div className="festival-date__text">
            {pageData.dateText}
            <p className="festival-date__btns">
              {
                pageData.dateSections.map((section, index)=>(
                    <Fragment key={index}>
                      <button
                        className={classNames(
                            "festival-date__btn",
                            index==activeDateIndex? "festival-date__btn--disabled":'link-underline',
                        )}
                        onClick={()=> setActiveDateIndex(index)}
                      >
                        {section.title}
                      </button>

                      {
                        index<pageData.dateSections.length-1 && <span>|</span>
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
              pageData.dateSections[activeDateIndex] && formaterDate(pageData.dateSections[activeDateIndex].date)
            }
          </motion.div>
        </div>
      </div>
  );
};

export default FestivalDate;
