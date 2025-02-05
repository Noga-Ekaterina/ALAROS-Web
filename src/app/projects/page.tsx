import React from 'react';
import {pagesData} from "@/pagesData";
import ProjectsFilter from "../../components/_projects/projects-filter/ProjectsFilter";
import ProjectsList from "../../components/_projects/projects-list/ProjectsList";
import {fetchData, getProjectsQueryStr} from "@/utils/fetchData";
import {IProject, IProjectsPage} from "@/types/data";
import {unstable_cache} from "next/cache";
import ProjectModal from "@/components/_projects/project-modal/ProjectModal";


interface Props{
  searchParams: { [key: string]: string | string[] | undefined }
}

interface IData{
  projects: IProject[]
  projectsConnection:{
    aggregate: {
      count: number
    }
  }
  projectsPages: IProjectsPage[]
}

const init=unstable_cache( async (year: undefined| string, diploma: undefined |string, page: string)=>{
  const data: IData|null= await fetchData(`
          query NewsAllQuery {
            ${getProjectsQueryStr(year, diploma, Number(page))}
            projectsPages {
              title
              years
            }
          }`)

  if (!data) return null

  return {
    pageData: data.projectsPages[0],
    projects: data.projects,
    count: data.projectsConnection.aggregate.count
  }
},
    ["projects"], {tags: ["projects"]})

const Page = async ({searchParams}: Props) => {
  const {page, diploma, year}= searchParams
  const data= await init(
      typeof year ==="string"? year:undefined,
      typeof diploma ==="string"? diploma:undefined,
      typeof page==="string"? isNaN(Number(page))? page:"1":"1"
  )


  if (!data ||!data.pageData) return <div>произошла ошибка, перезагрузите страницу</div>

  return (
      <>
        <ProjectModal projects={data.projects} searchParams={searchParams}/>
        <div className="container" style={{paddingBlock: "32rem"}}>
          <div className="titles-block">
            <h1 className="titles-block__title titles-block__title--small">{data.pageData.title}</h1>
          </div>
          <ProjectsFilter projectsPage={data.pageData}/>
          <ProjectsList projects={data.projects}/>
        </div>
      </>
  );
};

export default Page