import React from 'react';
import ProjectsFilter from "../../components/_projects/projects-filter/ProjectsFilter";
import ProjectsList from "../../components/_projects/projects-list/ProjectsList";
import {IProject, IProjectsPage} from "@/types/data";
import {revalidateTag, unstable_cache} from "next/cache";
import ProjectModal from "@/components/_projects/project-modal/ProjectModal";
import AnimationPage from "@/app/AnimationPage";
import type {Metadata} from "next";
import Pagination from "@/components/pagination/Pagination";
import {fetchColection, fetchSingle} from "@/utils/strapFetch";


interface Props{
  searchParams: { [key: string]: string | string[] | undefined }
}

const getPage=unstable_cache( async ()=>{
  const data= await fetchSingle<IProjectsPage>("projects-page")

  if (typeof data==="string" || !data) {
    return data
  }
  return data
},
    ["projects-page"], {tags: [ "projects-page"]})

const getProjects=unstable_cache( async (year: undefined| string, nomination: undefined |string, page: string)=>{
  const filters: Record<string, unknown>={}

  if (year)
    filters.year={"$eq": year}

  if (nomination)
    filters.nomination={id:{"$eq": nomination}}

  const data= await fetchColection<IProject>({
    name: 'projects',
    sort: "year:desc",
    filters,
    pagination:{
      pageSize: 20,
      page: Number(page)
    }
  })

  if (typeof data==="string" || !data) {
    return data
  }
  return data
},
["projects"], {tags: ["project"]})

const Page = async ({searchParams}: Props) => {
  const {page, nomination, year}= searchParams
  const projectsPage= await getPage()

  const projectsData=await getProjects(
      typeof year ==="string"? year:undefined,
      typeof nomination ==="string"? nomination:undefined,
      typeof page==="string"? !isNaN(Number(page))? page:"1":"1"
  )

  if (typeof projectsData==="string" || !projectsData) {
    revalidateTag("Project")
    return <div>произошла ошибка{projectsPage && `: ${projectsPage}`}, перезагрузите страницу</div>
  }

  if (typeof projectsPage==="string" || !projectsPage) {
    revalidateTag("Project")
    return <div>произошла ошибка{projectsPage && `: ${projectsPage}`}, перезагрузите страницу</div>
  }

  return (
      <AnimationPage>
        <ProjectModal projects={projectsData.data} searchParams={searchParams}/>
        <div className="container" style={{paddingBlock: "52rem", position: "relative", zIndex: 4}}>
          <div className="titles-block">
            <h1 className="titles-block__title titles-block__title--small">{projectsPage.title}</h1>
          </div>
          <ProjectsFilter projectsPage={projectsPage}/>
          <ProjectsList projects={projectsData.data}/>
        </div>
        <Pagination pages={projectsData.meta.pagination.pageCount}/>
      </AnimationPage>
  );
};


export const metadata: Metadata = {
  title: "АЛАРОС | Архив премии",
};

export default Page