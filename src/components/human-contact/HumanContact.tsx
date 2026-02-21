import React from 'react';
import "./human-contact.scss"
import {IHumanContact} from "@/types/data";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";
import HtmlProcessing from "@/components/HtmlProcessing";
import Image from "@/components/Image";

const HumanContact = ({name, jobTitle, links, image}: IHumanContact) => {
  return (
      <div className="human-contact">
        <Image image={image} size="xs"/>
        <div className="human-contact__block-text">
          <p className="human-contact__name">{nonBreakingSpaces(name)}</p>
          <div>
            <p className="human-contact__job-title">{nonBreakingSpaces(jobTitle)}</p>
            <div className="human-contact__links">
              {
                links.map((link, index) => (
                    <HtmlProcessing html={link.text} key={index}/>
                ))
              }
            </div>
          </div>
        </div>
      </div>
  );
};

export default HumanContact;
