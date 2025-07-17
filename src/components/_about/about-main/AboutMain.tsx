import React from 'react';
import "./about-main.scss"
import {IAbout} from "@/types/data";

interface Props{
  pageData: IAbout
}

const AboutMain = ({pageData}: Props) => {
  return (
      <div className="about-main">
        <div className="container"></div>
      </div>
  );
};

export default AboutMain;
