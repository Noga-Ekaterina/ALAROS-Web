import React, {useState} from 'react';
import "./festival-date.scss"
import pagesData from "../../../store/pagesData";
import classNames from "classnames";

const FestivalDate = () => {
  const {festivalText}=pagesData
  const [activeDateIndex, setActiveDateIndex] = useState(0)

  if (!festivalText) return <div/>
  return (
      <div className='festival-date'>
        <div className="container">
          <div className="festival-date__text">
            <p>{festivalText.date.text}</p>
            <p className="festival-date__btns">
              {
                festivalText.date.sections.map((section, index)=>(
                    <>
                      <button
                        className={classNames(
                            "festival-date__btn",
                            index==activeDateIndex && "festival-date__btn--disabled",
                        )}
                        onClick={()=> setActiveDateIndex(index)}
                      >
                        {section.title}
                      </button>

                      {
                        index<festivalText.date.sections.length-1 && <span>|</span>
                      }
                    </>
                ))
              }
            </p>
          </div>
          <div className="festival-date__date">{festivalText.date.sections[activeDateIndex].date}</div>
        </div>
      </div>
  );
};

export default FestivalDate;
