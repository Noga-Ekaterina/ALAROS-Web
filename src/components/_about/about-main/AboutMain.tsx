import React from "react";
import "./about-main.scss";
import { IAbout } from "@/types/data";
import { nonBreakingSpaces } from "@/utils/nonBreakingSpaces";
import { getBtns } from "@/utils/getBtns";
import HtmlProcessing from "@/components/HtmlProcessing";

interface Props {
  pageData: IAbout;
}

const AboutMain = ({ pageData }: Props) => {
  return (
    <div className="about-main">
      <div className="container">
        <div className="about-main__col">
          <div className="titles-block">
            <h2 className="titles-block__title">
              {nonBreakingSpaces(pageData.mainAboutTitle)}
            </h2>
          </div>

          <div className="about-main__text">
            {nonBreakingSpaces(pageData.mainAboutText.html)}
          </div>
          <div className="about-main__row">
            {pageData.mainAboutLinks.map((btn, idx) => (
              <HtmlProcessing html={btn.html} key={idx} />
            ))}
          </div>
        </div>
        <div className="about-main__img">
          <img src={`/Assets/Pages/About/${pageData.mainAboutImage}`} alt="" />
        </div>
      </div>
    </div>
  );
};

export default AboutMain;
