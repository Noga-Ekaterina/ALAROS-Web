import React from 'react';
import "./about-management.scss"
import {IAbout, IManagement} from "@/types/data";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";
import User from "@/components/_about/about-management/User";

interface Props{
  pageData: IAbout
  management: IManagement[] | undefined
}

const AboutManagement = ({pageData, management}: Props) => {
  if (!management) return

  return (
      <div className="about-management container" id="management">
        <div className="titles-block">
          <h2 className="titles-block__title about-management__main-title">{nonBreakingSpaces(pageData.peopleTitle)}</h2>
        </div>
        <div className="titles-block">
          <h2 className="titles-block__title titles-block__title--small red">{nonBreakingSpaces(pageData.managementTitle)}</h2>
        </div>

        <div className="about-management__content">
          {
            management.map((item, index)=>(
                <User data={item} key={index}/>
            ))
          }
        </div>
      </div>
  );
};

export default AboutManagement;
