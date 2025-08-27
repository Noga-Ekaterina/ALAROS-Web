import React from 'react';
import HtmlProcessing from "@/components/HtmlProcessing";

interface Props{
  data: string
}

const AdditionItem = ({data}: Props) => {
  const html = data.replace(
      /<h1>(IMG)<\/h1>\s*<p>(.*?)<\/p>/gi,
      (match, type, path) => {
        return `<img src="/Assets/Pages/About/History/Additions/${path}">`;
      }
      );

  return (
      <div className="about-history__addition">
        <HtmlProcessing html={html}/>
      </div>
  );
};

export default AdditionItem;
