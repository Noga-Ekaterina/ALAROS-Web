import React from 'react';
import "./about-membership.scss"
import {IHtmlString} from "@/types/data";
import {getBtns} from "@/utils/getBtns";
import HtmlProcessing from "@/components/HtmlProcessing";
import Detalis from "@/components/detalis/Detalis";

interface Props{
  membership: IHtmlString;
  membershipLinks: IHtmlString[];
  isDisabled: boolean
}

const AboutMembership = ({membership, membershipLinks, isDisabled}: Props) => {
  const [btn]= getBtns([membership])

  return (
      <div className="about-membership">
        <Detalis
            title={<HtmlProcessing html={btn.title}/>}
            rightElement={btn.link}
            isBtnBg
            disabled={isDisabled}
        >
          <div className="about-membership__content">
            {
              membershipLinks.map(({html}, index)=>(
                  <HtmlProcessing html={html} key={index}/>
              ))
            }
          </div>
        </Detalis>
      </div>
  );
};

export default AboutMembership;
