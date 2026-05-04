'use client'

import React, {JSX, ReactNode, useEffect, useState} from 'react';
import "./link-block.scss"
import HtmlProcessing from "@/components/HtmlProcessing";
import parse from "html-react-parser";
import {ReactSVG} from "react-svg";
import {useMediaQuery} from "react-responsive";
import {IWithClass} from "@/types/tehnic";
import cn from "classnames";
import RunningLineTitle from "@/components/running-line-title/RunningLineTitle";

interface Props extends IWithClass{
  title: string
  link: string
  mobileIcon?: string|JSX.Element
}

type LinkElement = React.ReactElement<{children?: ReactNode}>

const findLinkElement = (node: ReactNode): LinkElement | null => {
  if (Array.isArray(node)) {
    for (const child of node) {
      const linkElement = findLinkElement(child)

      if (linkElement) {
        return linkElement
      }
    }

    return null
  }

  if (!React.isValidElement<{children?: ReactNode}>(node)) {
    return null
  }

  if (node.type === 'a') {
    return node
  }

  return findLinkElement(node.props.children)
}

const LinkBlock = ({title, link, mobileIcon, className}:Props) => {
  const getLinkElement=(mobile: boolean)=>{
    const jsx= parse(link)
    const linkJsx = findLinkElement(jsx)
    
    const icon= (
        <div className="link-block__icon">
          [
          {
            mobileIcon || <ReactSVG src='/Assets/Icons/arrow.svg' className="link-block__arrow"/>
          }
          ]
        </div>
    )
    return (
        <>
          {
            (!mobile)? <HtmlProcessing html={link}/>:
              React.createElement(linkJsx?.type || "div", linkJsx?.props, icon)
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
        <RunningLineTitle
            text={title}
            className="link-block__title"
            marqueeClassName="link-block__running-line"
        />
        <div className="link-block__link">{linkElement}</div>
      </div>
  );
};

export default LinkBlock;
