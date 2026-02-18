'use client'
import React, {useMemo} from 'react';
import {getUser} from "@/components/_about/about-management/getUser";
import HtmlProcessing from "@/components/HtmlProcessing";
import Dropdown from "@/components/dropdown/Dropdown";
import {IManagement} from "@/types/data";
import Image from "@/components/Image";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";

interface Props{
  data: IManagement
}

const User = ({data}: Props) => {

  return (
      <div className="about-management__user">
        <div className="about-management__img-and-details">
          <Image
              image={data.image}
              size="xs"
              mediaSizes={{
                bigDesktop: 'medium',
                desktop: "medium",
                laptop: "small"
              }}
              className="about-management__img"
          />

          <div className="about-management__details">
            {
              data.details.map(({title, content}, index) => (
                  <Dropdown isNoForm title={<HtmlProcessing html={`<div>${title}</div>`}/>}
                            rightElement={<span className="about-management__icon">+</span>} key={index}>
                    <HtmlProcessing html={content}/>
                  </Dropdown>
              ))
            }
          </div>
        </div>

        <div className="about-management__text">
          <div className="top">
            <h3>{nonBreakingSpaces(data.name)}</h3>
            <h4>{nonBreakingSpaces(data.jobTitle)}</h4>
            <div className="signature">{nonBreakingSpaces(data.signature)}</div>
          </div>
          <div className="bottom">
            <HtmlProcessing html={data.description}/>
          </div>
        </div>
      </div>
  );
};

export default User;