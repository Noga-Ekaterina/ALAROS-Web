'use client'
import React, {useEffect, useState} from 'react';
import "./festival-documents.scss"
import HtmlProcessing from "../../HtmlProcessing";
import {IFestival, IHtmlString} from "@/types/data";

interface Props{
  festivalText: IFestival
}

interface IBtn{
  title: string
  link: string
}

const getBtns=(arr: IHtmlString[]) => {
  return arr.map(item => {
    let str = item.html.replace('<p>', '')
    str = str.replace('</p>', '')

    const [title, link] = str.split(/:\s?/)

    return ({title: `<span>${title}</span>`, link})
  })
}

const FestivalDocuments = ({festivalText}: Props) => {
  const btns= getBtns(festivalText.documentsLinks)

  return (
      <div className="festival-documents" id="documents">
        <div className="container">
          <div className="titles-block">
            <h2 className="titles-block__title">{festivalText.documentsTitle}</h2>
          </div>

          <div className="festival-documents__btns">
            {
              btns.map(btn=>(
                  <div className="festival-documents__btn" key={btn.title}>
                    <HtmlProcessing html={btn.title}/>
                    <HtmlProcessing html={btn.link}/>
                  </div>
              ))
            }
          </div>
        </div>
      </div>
  );
};

export default FestivalDocuments;
