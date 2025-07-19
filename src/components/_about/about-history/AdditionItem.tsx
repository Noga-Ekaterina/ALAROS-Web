import React from 'react';
import HtmlProcessing from "@/components/HtmlProcessing";

interface Props{
  data: string
}

const AdditionItem = ({data}: Props) => {
  const html = data.replace(
      /<h1>(IMG|VIDEO)<\/h1>\s*<p>(.*?)<\/p>/gi,
      (match, type, path) => {
        if (type.toUpperCase() === 'IMG') {
          return `<img src="/Assets/Pages/About/History/Additions/${path}">`;
        } else if (type.toUpperCase() === 'VIDEO') {
          return `<div class="about-history__video"><video src="/Assets/Pages/About/History/Additions/${path}" controls></video></div>`;
        }
        return match; // Возвращаем оригинал, если тип не распознан
      }
  );

  return (
      <div className="about-history__addition">
        <HtmlProcessing html={html}/>
      </div>
  );
};

export default AdditionItem;
