import React, {JSX, useEffect, useRef, useState} from 'react';
import "./detalis.scss"
import {IWithChildren} from "../../types/tehnic";
import cn from "classnames";

interface IProps extends IWithChildren{
  title: JSX.Element
  icon: JSX.Element
}

const Detalis = ({title, icon, children}: IProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const contentRef= useRef<null | HTMLDivElement>(null)

  const handleClick=()=>{
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    console.log(contentRef)
    console.log(isOpen)
  }, [contentRef]);

  return (
      <div className={cn("detalis", isOpen&& "detalis__opened")}>
        <button className="detalis__btn" onClick={handleClick}>
          {title}
          {icon}
        </button>
        <div
            className="detalis__content"
          ref={contentRef}
          style={{marginTop: (!isOpen && contentRef.current)? `-${contentRef.current.clientHeight}px`:0}}
        >
          {children}
        </div>
      </div>
  );
};

export default Detalis;
