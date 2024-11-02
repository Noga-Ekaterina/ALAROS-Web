import React, {useEffect, useState} from 'react';
import "./festival-price.scss"
import {observer} from "mobx-react-lite";
import pagesData from "../../../store/pagesData";
import Marquee from 'react-double-marquee';
import {useMediaQuery} from "react-responsive";
import {useGetRem} from "../../../hoocs/useGetRem";
import parse from "html-react-parser";

const FestivalPrice = () => {
  const {festivalText} =pagesData
  const [runningLine, setRunningLine] = useState('')
  const rem= useGetRem()

  useEffect(() => {
    if (!festivalText) return

    const {text, white}=festivalText.price.runningLine
    let result=text

    if (white){
      white.forEach(str=>{
        result=result.replace(str, `<span class="white">${str}</span>`)
      })
    }

    setRunningLine(result)
  }, [festivalText]);

  if (!festivalText) return <div/>

  return (
      <div className="festival-price">
        <div className="container">
          <div className="titles-block">
            <h2 className="titles-block__title">{festivalText.price.title}</h2>
          </div>
          <div className="festival-price__body">
            <table className="festival-price__table">
              <thead>
              <tr>
                <th className="festival-price__table-title">{festivalText.price.table.titles.count}</th>
                <th className="festival-price__table-title">{festivalText.price.table.titles.price}</th>
              </tr>
              </thead>
              <tbody>
              {
                festivalText.price.table.rows.map(row=>(
                    <tr>
                      <td className="festival-price__table-td">{row.count}</td>
                      <td className="festival-price__table-td">{(row.price as number).toLocaleString("ru-RU")}  &#x20bd;</td>
                    </tr>
                ))
              }
              </tbody>
            </table>
          </div>
        </div>
        <div className="festival-price__running-line">
          <Marquee direction='left' childMargin={rem*13}>
            <span className="festival-price__running-line-wrapp">
              <span className="festival-price__running-line-item">{parse(runningLine)}</span>
              <span className="festival-price__running-line-item">{parse(runningLine)}</span>
            </span>
          </Marquee>
        </div>
      </div>
  );
};

export default observer(FestivalPrice);
