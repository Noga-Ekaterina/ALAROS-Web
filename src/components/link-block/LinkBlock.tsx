'use client'
import React, {Fragment, JSX, useCallback, useEffect, useRef, useState} from 'react';
import "./link-block.scss"
import HtmlProcessing from "@/components/HtmlProcessing";
import parse from "html-react-parser";
import {ReactSVG} from "react-svg";
import {useMediaQuery} from "react-responsive";
import {IWithClass} from "@/types/tehnic";
import cn from "classnames";
import Marquee from "react-fast-marquee";
import {useBreakpoints} from "@/hoocs/useBreakpoints";

interface Props extends IWithClass{
  title: string
  link: string
  mobileIcon?: string|JSX.Element
}

const LinkBlock = ({title, link, mobileIcon, className}:Props) => {
  const getLinkElement=(mobile: boolean)=>{
    const jsx= parse(link)
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
            (!mobile|| typeof jsx==='string' ||Array.isArray(jsx))? <HtmlProcessing html={link}/>:
                React.createElement(jsx.type, jsx.props, icon
                )
          }
        </>
    )
  }

  const mobileScreen = useMediaQuery({maxWidth: 660});
  const [linkElement, setLinkElement] = useState(getLinkElement(false))
  const titleRef=useRef<null|HTMLDivElement>(null)
  const titleTextRef=useRef<null|HTMLParagraphElement>(null)
  const [isPlay, setIsPlay] = useState(false)
  const setTitleTextRef = useCallback((node: HTMLParagraphElement | null) => {
    titleTextRef.current = node;
    if (node && titleRef.current) {

      const checkTruncation=()=>{
        if (!titleRef.current) return
        console.log(titleRef.current)
        setIsPlay(node.clientWidth>titleRef.current?.clientWidth)
      }
      checkTruncation();
      const observer = new ResizeObserver(checkTruncation);
      observer.observe(node);
      // cleanup при размонтировании или замене узла
      return () => observer.disconnect();
    }
  }, [titleRef]); // зависимость от titleRef, если он тоже может меняться

  useEffect(() => {
    setLinkElement(getLinkElement(mobileScreen))
  }, [mobileScreen]);

  return (
      <div className={cn("link-block", className)}>
        <div className="link-block__title" ref={titleRef}>
          <Marquee direction='left' play={isPlay} speed={25} className="link-block__running-line">
            <p ref={setTitleTextRef}>
              {title}
            </p>
          </Marquee>
        </div>
        <div className="link-block__link">{linkElement}</div>
      </div>
  );
};

export default LinkBlock;
