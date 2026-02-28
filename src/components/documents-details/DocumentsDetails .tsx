import React, {useCallback, useRef, useState} from 'react';
import "./documents-details.scss"
import {IButtonBlock, IHtml} from "@/types/data";
import {getBtns} from "@/utils/getBtns";
import HtmlProcessing from "@/components/HtmlProcessing";
import Detalis from "@/components/detalis/Detalis";
import Marquee from "react-fast-marquee";

interface Props{
  button: IButtonBlock;
  links: IHtml[];
  isDisabled: boolean
}

const DocumentsDetails = ({button, links, isDisabled}: Props) => {
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

  return (
      <div className="documents-details">
        <Detalis
            title={
              <div ref={titleRef}>
                <Marquee direction='left' play={isPlay} speed={25} className="documents-details__running-line">
                  <p ref={setTitleTextRef}>{button.left}</p>
                </Marquee>
              </div>
            }
            rightElement={button.right}
            isBtnBg
            disabled={isDisabled}
        >
          <div className="documents-details__content">
            {
              links.map(({text}, index)=>(
                  <HtmlProcessing html={text} key={index}/>
              ))
            }
          </div>
        </Detalis>
      </div>
  );
};

export default DocumentsDetails;
