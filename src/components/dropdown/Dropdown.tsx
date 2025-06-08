'use client'
import React, {useRef, useState, useEffect, ChangeEvent, JSX} from 'react';
import "./dropdown.scss"
import {useClose} from "../../hoocs/useClose";
import classNames from "classnames";
import {IWithClass} from "../../types/tehnic";
import {ReactSVG} from "react-svg";
import {INomination} from "@/types/data";
import SmoothScrolling from "@/app/SmoothScrolling";
import HtmlProcessing from "@/components/HtmlProcessing";

interface Props extends IWithClass{
  id?: string|number
  value: string
  values: string[]
  name?: string
  elements?: JSX.Element[]
  arrow?: boolean
  years?: boolean
  handleCheck: (e: ChangeEvent<HTMLInputElement>)=> void
  nominations?: INomination[]
}

function Dropdown({id, value, values, name, handleCheck, className, elements, arrow, years, nominations}:Props) {
   const [isOpen, setIsOpen] = useState(false);
   const dropdownRef = useRef(null);
   const nominationsElements= nominations&& nominations.map(nomination=> (
       <span className="dropdown__nomination-item" key={nomination.number}>
            <span>{nomination.number}</span>
            <HtmlProcessing html={`<span>${nomination.title}</span>`}/>
          </span>
   ))

  useClose({ref: dropdownRef, isOpen, setIsOpen});
  return (
      <div className={classNames("dropdown", isOpen && "open", className)} ref={dropdownRef}>
        <button className="dropdown__title" onClick={()=> setIsOpen(!isOpen)}>
           <span className="dropdown__title-text">{elements? elements[values.indexOf(value)] :years? value.replace(/(года?)/, "") : nominationsElements? nominationsElements[values.indexOf(value)]: value}</span>

           {
             arrow &&(
                 <>
                  <span className="dropdown__line"></span>
                   <ReactSVG src='/Assets/Icons/arrow.svg' className="dropdown__arrow"/>
                 </>
               )
           }
         </button>
         <div className="dropdown__content"
         >

           <SmoothScrolling>
             {
               values.map((item, index) =>
                   <div key={item} className="dropdown__item">
                     <input
                         type='radio'
                         checked={item == value}
                         name={name ?? ""}
                         id={item+id}
                         onChange={e => {
                           handleCheck(e)
                           setIsOpen(false)
                         }}
                         value={item}
                     />
                     <label
                         htmlFor={item+id}
                         onClick={(e) => e.stopPropagation()} // Добавлено остановка всплытия
                     >
                       {elements ? elements[index] : nominationsElements ? nominationsElements[index] : item}
                     </label>
                   </div>
               )
             }

           </SmoothScrolling>
         </div>
      </div>
   );
}

export default Dropdown;