import React from 'react';
import TextAndImagesSliders from "@/components/text-and-images-sliders/TextAndImagesSliders";
import {IHistoryYear} from "@/types/data";
import AdditionItem from "@/components/_about/about-history/AdditionItem";
import cn from "classnames";

interface Props{
  data: IHistoryYear
}

const Year = ({data}: Props) => {
  return (
      <div className="about-history__year-wrap">
        <div
            className={cn(
                "about-history__additions-desctop",
                {"about-history__additions-desctop--padding": data.additions?.length}
            )}
        >
          {
            data.additions?.map(additionItem=>(
                <AdditionItem data={additionItem.body} key={additionItem.id}/>
            ))
          }
        </div>

        <div className="about-history__year-content">
          <div className="about-history__year">{data.year}</div>
          <div className="about-history__year-text-content">
            <TextAndImagesSliders html={data.body} className="about-history__slide"/>
          </div>
        </div>
      </div>
  );
};

export default Year;
