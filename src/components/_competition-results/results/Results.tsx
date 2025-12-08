  'use client'
import React, {useMemo, useState} from 'react';
import "./results.scss"
import {ICompetitionResults} from "@/types/data";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";
import {getRowsInTable} from "@/utils/getRowsInTable";
  import {Swiper, SwiperSlide} from "swiper/react";
  import {useGetRem} from "@/hoocs/useGetRem";

interface Props{
  pageData: ICompetitionResults
}

const getResultsData=(table: string)=>{
  const rows= getRowsInTable(table)

  return rows.map(row=>{
    const [year, link] = Array.from(row.matchAll(/<td>(?:<p>)?(.*?)(?:<\/p>)?<\/td>/gs)).map(m => m[1]);

    return {year, link}
  })
}

const Results = ({pageData}:Props) => {
  const results= useMemo(() => getResultsData(pageData.results.html), [])
  const [activeYear, setActiveYear] = useState(results[results.length-1].year)
  const rem=useGetRem()

  return (
      <div className="results">
        <div className="container">
          <div className="titles-block">
            <h2 className="titles-block__title titles-block__title--small results__title">{nonBreakingSpaces(pageData.resultsTitle)}</h2>
          </div>
          <Swiper slidesPerView="auto" spaceBetween={35*rem} className="results__years" initialSlide={results.length-1}>
             {
               results.map(({year})=>(
                   <SwiperSlide key={year} style={{width: "fit-content"}}>
                     <button className="results__btn link-underline" disabled={year === activeYear}
                             onClick={() => setActiveYear(year)}>{year}</button>?
                   </SwiperSlide>
               ))
             }
          </Swiper>

          <div data-lenis-prevent="">
            <iframe src={results.find(({year}) => year === activeYear)?.link} className="results__iframe"></iframe>
          </div>
        </div>
      </div>
  );
};

export default Results;
