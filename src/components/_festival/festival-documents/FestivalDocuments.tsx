'use client'
import React, {Fragment, useEffect, useState} from 'react';
import "./festival-documents.scss"
import HtmlProcessing from "../../HtmlProcessing";
import {IFestival, IHtmlString, INomination} from "@/types/data";
import {getBtns} from "@/utils/getBtns";
import FestivalTemplates from "@/components/_festival/festival-templates/FestivalTemplates";
import {useMediaQuery} from "react-responsive";
import {ReactSVG} from "react-svg";
import parse from "html-react-parser";

interface Props{
  festivalText: IFestival
  nominations: INomination[]
}

const FestivalDocuments = ({festivalText, nominations}: Props) => {
  const btns= getBtns(festivalText.documentsLinks)

  const getLinks=(mobile: boolean)=>(
      btns.map(btn=>{
        const jsx= parse(btn.link)
        const link=<HtmlProcessing html={btn.link}/>
        const icon= <span className="festival-documents__icon">[<ReactSVG src='/Assets/Icons/arrow.svg' className="festival-documents__arrow"/>]</span>
        console.log(link)
        return (
            <Fragment key={btn.title}>
              {
                (!mobile|| typeof jsx==='string' ||Array.isArray(jsx))? <>{link}</>:
                    React.createElement(jsx.type, jsx.props, icon
                    )
              }
            </Fragment>
        )
      })
  )

  const mobileScreen = useMediaQuery({maxWidth: 660});
  const [links, setLinks] = useState(getLinks(false))

  useEffect(() => {
    setLinks(getLinks(mobileScreen))
  }, [mobileScreen]);

  return (
      <div className="festival-documents" id="documents">
        <div className="container">
          <div className="titles-block">
            <h2 className="titles-block__title">{festivalText.documentsTitle}</h2>
          </div>

          <div className="festival-documents__btns">
            {
              btns.map((btn, index)=>{
                return (
                    <div className="festival-documents__btn" key={btn.title}>
                      <HtmlProcessing html={btn.title}/>
                      {links[index]}
                    </div>
                )
              })
            }
            <FestivalTemplates festivalText={festivalText} nominations={nominations}/>
          </div>
        </div>
      </div>
  );
};

export default FestivalDocuments;
