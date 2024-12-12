import React, {JSX, useEffect, useRef, useState} from 'react';
import "./detalis.scss"
import {IWithChildren} from "../../types/tehnic";
import cn from "classnames";
import {useGetRem} from "../../hoocs/useGetRem";

interface IProps extends IWithChildren{
  title: JSX.Element
}

const Detalis = ({title, children}: IProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const contentRef= useRef<null | HTMLDivElement>(null)
  const [marginTop, setMarginTop] = useState<string|0>(0)
  const [overflow, setOverflow] = useState<"hidden"|"visible">("hidden")
  const rem=useGetRem()

  const handleClick=()=>{
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    setMarginTop((!isOpen && contentRef.current)? `-${contentRef.current.clientHeight+ 3*rem}px`:0)

    if (!isOpen)
      setOverflow("hidden")
    else
      setTimeout(()=> setOverflow("visible"), 500)
  }, [contentRef, isOpen, rem]);

  return (
      <div className={cn("detalis", isOpen&& "detalis--opened")} style={{overflow}}>
        <button className="detalis__btn" onClick={handleClick}>
          {title}
          <span className="detalis__icon">+</span>
        </button>
        <div
            className="detalis__content"
          ref={contentRef}
          style={{marginTop}}
        >
          {children}
        </div>
      </div>
  );
};

export default Detalis;
