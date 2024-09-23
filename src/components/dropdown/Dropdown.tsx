import React, {useRef, useState, useEffect, ChangeEvent} from 'react';
import "./dropdown.scss"
import {useClose} from "../../hoocs/useClose";
import classNames from "classnames";
import {IWithClass} from "../../types/tehnic";

interface Props extends IWithClass{
  value: string
  values: string[]
  name?: string
  handleCheck: (e: ChangeEvent<HTMLInputElement>)=> void
}
function Dropdown({value, values, name, handleCheck, className}:Props) {
   const [isOpen, setIsOpen] = useState(false);
   const dropdownRef = useRef(null);

   useClose({ref: dropdownRef, isOpen, setIsOpen});
   return ( 
      <div className={classNames("dropdown", isOpen && "open", className)} ref={dropdownRef}>
         <div className="dropdown__title" onClick={()=> setIsOpen(!isOpen)}>{value}</div>
         <div className="dropdown__content">
            {
               values.map((item)=>
                   <div key={item} className="dropdown__item">
                      <input type='radio' checked={item==value} name={name??""} id={item} value={item} onChange={e=> handleCheck(e)}/>
                      <label htmlFor={item}>{item}</label>
                   </div>
               )
            }

         </div>
      </div>
   );
}

export default Dropdown;