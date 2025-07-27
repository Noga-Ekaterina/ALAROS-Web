import { IAbout } from "@/types/data";
import "./about-map.scss";
import { nonBreakingSpaces } from "@/utils/nonBreakingSpaces";
import HtmlProcessing from "@/components/HtmlProcessing";

interface Props {
  pageData: IAbout;
}

const AboutMap = ({ pageData }: Props) => {
  return (
    <div className="about-map">
      <img
        src="/Assets/Pages/About/bg/2.svg"
        className="about-map__line"
        alt=""
      />

      <div className="container">
        <div className="about-map__title">
          {nonBreakingSpaces(pageData.mapTitle)}
        </div>

        <div className="about-map__top">
          {pageData.mapTopColumns.map((col, idx) => (
              <div className="about-map__top-col" key={idx}>
                <HtmlProcessing html={col.html}/>
              </div>
          ))}
        </div>

        <img
            src={`/Assets/Pages/About/${pageData.map}`}
            className="about-map__map"
            alt=""
        />

        <div className="about-map__info">
          {pageData.mapInfoColumns.map((col, idx) => (
              <div className="about-map__info-col" key={idx}>
                <HtmlProcessing html={col.html}/>
              </div>
          ))}
        </div>

        <div className="about-map__bottom">
          <HtmlProcessing html={pageData.mapBottom.html}/>
        </div>
      </div>
    </div>
  );
};

export default AboutMap;
