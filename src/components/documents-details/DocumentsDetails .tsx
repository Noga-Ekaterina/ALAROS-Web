import React from 'react';
import "./documents-details.scss"
import {IButtonBlock, IHtml} from "@/types/data";
import HtmlProcessing from "@/components/HtmlProcessing";
import Detalis from "@/components/detalis/Detalis";
import RunningLineTitle from "@/components/running-line-title/RunningLineTitle";

interface Props{
  button: IButtonBlock;
  links: IHtml[];
  isDisabled: boolean
}

const DocumentsDetails = ({button, links, isDisabled}: Props) => {
  return (
      <div className="documents-details">
        <Detalis
            title={
              <RunningLineTitle
                  text={button.left}
                  marqueeClassName="documents-details__running-line"
              />
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
