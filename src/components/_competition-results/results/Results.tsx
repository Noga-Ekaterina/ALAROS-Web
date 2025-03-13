'use client'
import React, {useState} from 'react';
import "./results.scss"
import {ICompetitionResults} from "@/types/data";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";
import {getRowsInTable} from "@/utils/getRowsInTable";

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
  const results= getResultsData(pageData.results.html)
  const [activeYear, setActiveYear] = useState(results[results.length-1].year)
  return (
      <div className="results">
        <div className="container">
          <div className="titles-block">
            <h2 className="titles-block__title titles-block__title--small results__title">{nonBreakingSpaces(pageData.resultsTitle)}</h2>
          </div>

         <div className="results__years">
           {
             results.map(({year})=>(
                 <button className="results__btn link-underline" disabled={year===activeYear} onClick={()=> setActiveYear(year)}>{year}</button>
             ))
           }
         </div>

          <div data-lenis-prevent="">
            <iframe src={results.find(({year}) => year === activeYear)?.link} className="results__iframe"></iframe>
          </div>
        </div>
      </div>
  );
};

export default Results;
