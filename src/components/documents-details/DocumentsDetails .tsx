import React from 'react';
import "./documents-details.scss"
import {IButtonBlock, IHtml} from "@/types/data";
import {getBtns} from "@/utils/getBtns";
import HtmlProcessing from "@/components/HtmlProcessing";
import Detalis from "@/components/detalis/Detalis";

interface Props{
  button: IButtonBlock;
  links: IHtml[];
  isDisabled: boolean
}

const DocumentsDetails = ({button, links, isDisabled}: Props) => {

  return (
      <div className="documents-details">
        <Detalis
            title={<p>{button.left}</p>}
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
