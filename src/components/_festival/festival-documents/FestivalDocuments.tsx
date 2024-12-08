import React, {useEffect, useState} from 'react';
import "./festival-documents.scss"
import pagesData from "../../../store/pagesData";
import HtmlProcessing from "../../HtmlProcessing";

interface IBtn{
  title: string
  link: string
}

const FestivalDocuments = () => {
  const {festivalText}=pagesData
  const [btns, setBtns] = useState<IBtn[]>([])

  useEffect(() => {
    if (!festivalText) return

    const result: IBtn[]=[]

    festivalText.documentsLinks.map(item=>{
      let str= item.html.replace('<p>','')
      str=str.replace('</p>','')

      const [title, link]= str.split(/:\s?/)

      result.push({title: `<span>${title}</span>`, link})
    })

    setBtns(result)
  }, []);

  if (!festivalText) return <div/>

  return (
      <div className="festival-documents">
        <div className="container">
          <div className="titles-block">
            <h2 className="titles-block__title">{festivalText.documentsTitle}</h2>
          </div>

          <div className="festival-documents__btns">
            {
              btns.map(btn=>(
                  <div className="festival-documents__btn">
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
