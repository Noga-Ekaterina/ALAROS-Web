'use client'
import React, {useEffect, useState} from 'react';
import "./projects-filter.scss"
import pagesData from "@/store/pagesData";
import {useSearchParams} from "next/navigation";
import Dropdown from "../../dropdown/Dropdown";
import {diplomas} from "../../../variables";
import {IProjectsPage, TDiploma} from "../../../types/data";
import {useSearchParamsControl} from "@/hoocs/useSearchParamsControl";

interface Props{
  projectsPage: IProjectsPage
}

const ProjectsFilter = ({projectsPage}:Props) => {
  const [years, setYears] = useState<string[]>([])
  const [diplomaValues, setDiplomaValues] = useState<string[]>([])
  const diplomasKeys = Object.keys(diplomas) as Array<keyof typeof diplomas>;
  const searchParams= useSearchParams()
  const page= searchParams.get("page")?Number(searchParams.get("page")) :1
  const year= searchParams.get("year")
  const diploma= searchParams.get("diploma")
  const [yearValue, setYearValue] = useState("все года")
  const [diplomaValue, setDiplomaValue] = useState("все дипломы")
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

    let diplomaFilter: null|TDiploma=null

    for (let diploma of diplomasKeys) {
      if (diplomas[diploma].text===diplomaValue){
        diplomaFilter= diploma
        break
      }
    }

    setMultipleParams({page:"1", diploma: diplomaFilter, year: yearFilter})
  }

  useEffect(() => {
    if (!projectsPage) return

    const yearsResult: string[]=["все года"]
    const diplomasResult: string[]=["все дипломы"]

    const [start, end]= projectsPage.years.split("-")

    for (let i = Number(start); i <= Number(end); i++) {
      yearsResult.push(`${i} год`)
    }

    for (let diploma of diplomasKeys) {
      diplomasResult.push(diplomas[diploma].text)
    }

    setYears(yearsResult)
    setDiplomaValues(diplomasResult)
  }, []);

  // useEffect(() => {
  //   fetchProjects(year, diploma, page)
  // }, [year, diploma, page]);

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
        <Dropdown value={diplomaValue} values={diplomaValues} handleCheck={(e) => setDiplomaValue(e.target.value)} arrow={true} className="projects-filter__diploma"/>
        <button className="projects-filter__btn" onClick={handleFilter}>Применить</button>
      </div>
  );
};

export default ProjectsFilter;
