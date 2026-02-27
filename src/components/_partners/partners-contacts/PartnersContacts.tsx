import React from 'react';
import "./partners-contacts.scss"
import {IPartners} from "@/types/data";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";
import HumanContact from "@/components/human-contact/HumanContact";
import HtmlProcessing from "@/components/HtmlProcessing";

interface Props{
  pageData: IPartners
}

const PartnersContacts = ({pageData}: Props) => {
  return (
      <div className="partners-contacts" id="contacts">
        <div className="container">
          <div className="titles-block">
            <h2 className="titles-block__title titles-block__title--small red">{nonBreakingSpaces(pageData.contactsTitle)}</h2>
          </div>
          <div className="partners-contacts__content">
            <div className="partners-contacts__people">
              {
                pageData.contacts.map((human, index)=>(
                    <HumanContact {...human} key={index}/>
                ))
              }
            </div>

            <div className="partners-contacts__email">
              <HtmlProcessing html={pageData.contactsEmail}/>
            </div>
          </div>
        </div>
      </div>
  );
};

export default PartnersContacts;
