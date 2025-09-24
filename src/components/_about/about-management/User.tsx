'use client'
import React, {useMemo} from 'react';
import {getUser} from "@/components/_about/about-management/getUser";
import HtmlProcessing from "@/components/HtmlProcessing";
import Dropdown from "@/components/dropdown/Dropdown";

interface Props{
  data: string
}

const User = ({data}: Props) => {
  const {image, html, details}= useMemo(()=> getUser(data), [])

  return (
      <div className="about-management__user">
        <div className="about-management__img-and-details">
          <img src={`/Assets/Pages/People/${image}`} alt="" className="about-management__img"/>

          <div className="about-management__details">
            {
              details.map(({title, content}, index)=>(
                  <Dropdown isNoForm title={<HtmlProcessing html={`<div>${title}</div>`}/>} rightElement={<span className="about-management__icon">+</span>} key={index}>
                    <HtmlProcessing html={content}/>
                  </Dropdown>
              ))
            }
          </div>
        </div>

        <div className="about-management__text">
          <HtmlProcessing html={html}/>
        </div>
      </div>
  );
};

export default User;
