import React from 'react';
import TextAndImagesSliders from "@/components/text-and-images-sliders/TextAndImagesSliders";

interface Props{
  data: string
}

const Year = ({data}: Props) => {
  const patternYear= /^<h1>(.*?)<\/h1>/
  const result = data.match(patternYear);
  const year=result? result[1]:""

  return (
      <div className="about-history__year-wrap">
        <div className="about-history__year">{year}</div>
        <div className="about-history__year-content">
          <TextAndImagesSliders html={data.replace(patternYear, "")} path={`/Assets/Pages/About/History/${year}`} className="about-history__slide"/>
        </div>
      </div>
  );
};

export default Year;
