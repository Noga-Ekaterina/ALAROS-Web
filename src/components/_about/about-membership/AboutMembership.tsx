import React from 'react';
import "./about-membership.scss"
import {IButtonBlock, IHtml} from "@/types/data";
import {getBtns} from "@/utils/getBtns";
import HtmlProcessing from "@/components/HtmlProcessing";
import Detalis from "@/components/detalis/Detalis";

interface Props{
  membership: IButtonBlock;
  membershipLinks: IHtml[];
  isDisabled: boolean
}

const AboutMembership = ({membership, membershipLinks, isDisabled}: Props) => {

  return (
      <div className="about-membership">
        <Detalis
            title={<p>{membership.left}</p>}
            rightElement={membership.right}
            isBtnBg
            disabled={isDisabled}
        >
          <div className="about-membership__content">
            {
              membershipLinks.map(({text}, index)=>(
                  <HtmlProcessing html={text} key={index}/>
              ))
            }
          </div>
        </Detalis>
      </div>
  );
};

export default AboutMembership;
