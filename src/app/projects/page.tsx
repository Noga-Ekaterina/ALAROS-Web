import React from 'react';
import ProjectsFilter from "../../components/_projects/projects-filter/ProjectsFilter";
import ProjectsList from "../../components/_projects/projects-list/ProjectsList";
import {fetchData, getProjectsQueryStr} from "@/utils/fetchData";
import {IProject, IProjectsPage} from "@/types/data";
import {revalidateTag, unstable_cache} from "next/cache";
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

const init=unstable_cache( async (year: undefined| string, nomination: undefined |string, page: string)=>{
  const data= await fetchData<IData>(`
          query NewsAllQuery {
            ${getProjectsQueryStr(year, nomination, Number(page))}
            projectsPages {
              title
              years
              nominations{
                html
              }
            }
          }`)

  if (typeof data==="string" || !data) {
    return data
  }
  return {
    pageData: data.projectsPages[0],
    projects: data.projects,
    count: data.projectsConnection.aggregate.count
  }
},
    ["projects"], {tags: ["Project", "ProjectsPage"]})

const Page = async ({searchParams}: Props) => {
  const {page, nomination, year}= searchParams
  const data= await init(
      typeof year ==="string"? year:undefined,
      typeof nomination ==="string"? nomination:undefined,
      typeof page==="string"? isNaN(Number(page))? page:"1":"1"
  )

  if (typeof data==="string" || !data) {
    revalidateTag("ProjectsPage")
    return <div>произошла ошибка{data && `: ${data}`}, перезагрузите страницу</div>
  }

  return (
      <>
        <ProjectModal projects={data.projects} searchParams={searchParams}/>
        <div className="container" style={{paddingBlock: "32rem", position: "relative", zIndex: 4}}>
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