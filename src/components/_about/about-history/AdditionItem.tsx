import React, {JSX, useMemo} from 'react';
import HtmlProcessing from "@/components/HtmlProcessing";
import {IHistoryAdditionComponent} from "@/types/data";
import Image from "@/components/Image";
import parse from "html-react-parser";

interface Props{
  data: IHistoryAdditionComponent[]
}

const AdditionItem = ({data}: Props) => {
  const result= useMemo(() => {
    if (!data || data.length === 0) {
      return [];
    }

    const result: JSX.Element[] = [];

    data.forEach((component) => {
      const componentType = component.__component;


      if (componentType === 'conten.image' && component.image) {
        result.push(<Image image={component.image} size="xs"/>)
      }else if (componentType === 'conten.video' && component.link) {
        result.push(<iframe src={component.link}/>)
      }else if (componentType === 'conten.text-light' && component.text) {
        const replaceTd = component.text.replaceAll("^", "&nbsp;");

        const jsx = parse(replaceTd);

        if (typeof jsx === "object") {
          if (Array.isArray(jsx)) {
            result.push(...jsx);
          } else {
            result.push(jsx);
          }
        }
      }
    });

    return result;
  }, [data])


  return (
      <div className="about-history__addition">
        <HtmlProcessing html={result}/>
      </div>
  );
};

export default AdditionItem;
