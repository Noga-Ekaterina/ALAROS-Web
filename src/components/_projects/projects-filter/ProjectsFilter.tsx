'use client'
import React, {useEffect, useState} from 'react';
import "./projects-filter.scss"
import {useSearchParams} from "next/navigation";
import Dropdown from "../../dropdown/Dropdown";
import {IProjectsPage} from "../../../types/data";
import {useSearchParamsControl} from "@/hoocs/useSearchParamsControl";
import {nominationsSProcessing} from "@/utils/nominationsProcessing";

interface Props{
  projectsPage: IProjectsPage
}

const ProjectsFilter = ({projectsPage}:Props) => {
  const nominations= nominationsSProcessing(projectsPage.nominations.html).map(nomination=> ({id: nomination.number, title: nomination.title}))
  const nominationsValues =nominations.map(({title})=>title )
  nominationsValues.unshift("все номинации")

  const [years, setYears] = useState<string[]>([])
  const searchParams= useSearchParams()
  const year= searchParams.get("year")
  const nomination= searchParams.get("nomination")
  const [yearValue, setYearValue] = useState(year??"все года")
  const [nominationsValue, setNominationsValue] = useState(nomination? nominations.find(item=> item.id==nomination)?.title??"неизвестная номинация":"все номинации")
  const {
    setParam,
    deleteParam,
    clearParams,
    setMultipleParams,
    currentParams,
  } = useSearchParamsControl();

  const handleFilter=()=>{
    const yearValueWithoutText = yearValue.replace(" год", "");
    const yearFilter = isNaN(Number(yearValueWithoutText))? null: yearValueWithoutText;

    let nominationFilter: null|string=null

    for (let nomination of nominations) {
      if (nomination.title===nominationsValue){
        nominationFilter= nomination.id
        break
      }
    }

    setMultipleParams({page:"1", nomination: nominationFilter, year: yearFilter})
  }

  useEffect(() => {
    if (!projectsPage) return

    const yearsResult: string[]=["все года"]

    const [start, end]= projectsPage.years.split("-")

    for (let i = Number(start); i <= Number(end); i++) {
      yearsResult.push(`${i} год`)
    }

    setYears(yearsResult)
  }, []);

  return (
      <div className="projects-filter">
        <Dropdown
            value={yearValue}
            values={years}
            handleCheck={(e) => setYearValue(e.target.value)}
            arrow={true}
            years={true}
            className="projects-filter__year"
        />
        <Dropdown value={nominationsValue} values={nominationsValues} handleCheck={(e) => setNominationsValue(e.target.value)} arrow={true} className="projects-filter__nomination"/>
        <button className="projects-filter__btn" onClick={handleFilter}>Применить</button>
      </div>
  );
};

export default ProjectsFilter;
