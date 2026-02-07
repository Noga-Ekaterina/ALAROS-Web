'use client'
import React, {useEffect, useMemo, useState} from 'react';
import "./projects-filter.scss"
import {useSearchParams} from "next/navigation";
import Dropdown from "../../dropdown/Dropdown";
import {IProjectsPage} from "../../../types/data";
import {useSearchParamsControl} from "@/hoocs/useSearchParamsControl";
import {nominationsSProcessing} from "@/utils/nominationsProcessing";
import store from "@/store/store";

interface Props{
  projectsPage: IProjectsPage
}

const ProjectsFilter = ({projectsPage}:Props) => {
  const nominationsValues = useMemo(() => {
    const result=projectsPage.nominations.map(({name})=>name )
    result.unshift("Все номинации")

    return result
  }, [])
  console.log(projectsPage.nominations)

  const [years, setYears] = useState<string[]>([])
  const searchParams= useSearchParams()
  const year= searchParams.get("year")
  const nomination= searchParams.get("nomination")
  const [yearValue, setYearValue] = useState(year??"Все года")
  const [nominationsValue, setNominationsValue] = useState(nomination? projectsPage.nominations.find(item=> item.id.toString()==nomination)?.name??"неизвестная номинация":"Все номинации")
  const {setMultipleParams} = useSearchParamsControl();
  const {togleLoading}=store

  const handleFilter=()=>{
    const yearValueWithoutText = yearValue.replace(" год", "");
    const yearFilter = isNaN(Number(yearValueWithoutText))? null: yearValueWithoutText;

    let nominationFilter: null|string=null

    for (let nomination of projectsPage.nominations) {
      if (nomination.name===nominationsValue){
        nominationFilter= nomination.id.toString()
        break
      }
    }

    if (yearFilter!=year || nominationFilter!=nomination)
      togleLoading(true)

    setMultipleParams({page:"1", nomination: nominationFilter, year: yearFilter})
  }

  useEffect(() => {
    if (!projectsPage) return

    const yearsResult: string[]=["Все года"]

    const [start, end]= projectsPage.years.split("-")

    for (let i = Number(start); i <= Number(end); i++) {
      yearsResult.push(`${i} год`)
    }

    setYears(yearsResult)
  }, []);

  useEffect(() => {
    togleLoading(false)
  }, [year, nomination]);

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
