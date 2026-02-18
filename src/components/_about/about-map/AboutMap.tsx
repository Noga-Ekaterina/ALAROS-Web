import { IAbout } from "@/types/data";
import "./about-map.scss";
import { nonBreakingSpaces } from "@/utils/nonBreakingSpaces";
import HtmlProcessing from "@/components/HtmlProcessing";
import Image from "@/components/Image";

interface Props {
  pageData: IAbout;
}

const AboutMap = ({ pageData }: Props) => {
  return (
    <div className="about-map" id="map">
      <img
        src="/Assets/Pages/About/bg/3.svg"
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
                <HtmlProcessing html={col.text}/>
              </div>
          ))}
        </div>

        <Image
            image={pageData.map}
            className="about-map__map"
        />

        <div className="about-map__info">
          {pageData.mapInfoColumns.map((col, idx) => (
              <div className="about-map__info-col" key={idx}>
                <HtmlProcessing html={col.text}/>
              </div>
          ))}
        </div>

        <div className="about-map__bottom">
          <HtmlProcessing html={pageData.mapBottom}/>
        </div>
      </div>
    </div>
  );
};

export default AboutMap;
