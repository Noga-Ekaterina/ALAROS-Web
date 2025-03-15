'use client'
import React, {Fragment, JSX, useEffect, useState} from 'react';
import "./link-block.scss"
import HtmlProcessing from "@/components/HtmlProcessing";
import parse from "html-react-parser";
import {ReactSVG} from "react-svg";
import {useMediaQuery} from "react-responsive";
import {IWithClass} from "@/types/tehnic";
import cn from "classnames";

interface Props extends IWithClass{
  title: string
  link: string
  mobileIcon?: string|JSX.Element
}

const LinkBlock = ({title, link, mobileIcon, className}:Props) => {
  const getLinkElement=(mobile: boolean)=>{
    const jsx= parse(link)
    const icon= (
        <span className="link-block__icon">
          [
          {
            mobileIcon || <ReactSVG src='/Assets/Icons/arrow.svg' className="link-block__arrow"/>
          }
          ]
        </span>
    )
    return (
        <>
          {
            (!mobile|| typeof jsx==='string' ||Array.isArray(jsx))? <HtmlProcessing html={link}/>:
                React.createElement(jsx.type, jsx.props, icon
                )
          }
        </>
    )
  }

  const mobileScreen = useMediaQuery({maxWidth: 660});
  const [linkElement, setLinkElement] = useState(getLinkElement(false))

  useEffect(() => {
    setLinkElement(getLinkElement(mobileScreen))
  }, [mobileScreen]);


  return (
      <div className={cn("link-block", className)}>
        <HtmlProcessing html={title}/>
        {linkElement}
      </div>
  );
};

export default LinkBlock;
