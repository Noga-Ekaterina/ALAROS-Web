import React from "react";
import "./about-main.scss";
import { IAbout } from "@/types/data";
import { nonBreakingSpaces } from "@/utils/nonBreakingSpaces";
import { getBtns } from "@/utils/getBtns";
import HtmlProcessing from "@/components/HtmlProcessing";
import Image from "@/components/Image";

interface Props {
  pageData: IAbout;
}

const AboutMain = ({ pageData }: Props) => {
  return (
    <div className="about-main" id="main">
      <div className="container">
        <div className="about-main__col">
          <div className="titles-block">
            <h2 className="titles-block__title">
              {nonBreakingSpaces(pageData.mainAboutTitle)}
            </h2>
          </div>

          <div className="about-main__text">
            <HtmlProcessing html={pageData.mainAboutText} />
          </div>
          <div className="about-main__row">
            {pageData.mainAboutLinks.map((btn, idx) => (
              <HtmlProcessing html={btn.text} key={idx} />
            ))}
          </div>
        </div>
        <div className="about-main__img">
          <Image
              image={pageData.mainAboutImage}
              size="small"
              mediaSizes={{
                bigDesktop: "xl",
                desktop: "large",
                laptop: "medium"
              }}
          />
        </div>
      </div>
    </div>
  );
};

export default AboutMain;
