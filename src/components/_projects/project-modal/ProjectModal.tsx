import React from 'react';
import "./project-modal.scss"
import {IProject} from "@/types/data";
import {revalidateTag, unstable_cache} from "next/cache";
import {fetchData, getProjectsQueryStr} from "@/utils/fetchData";
import ProjectImagesSlider from "@/components/_projects/project-images-slider/ProjectImagesSlider";
import {diplomas} from "@/variables";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";
import SmoothScrolling from "@/app/SmoothScrolling";

interface Props{
  projects: IProject[]
  searchParams: { [key: string]: string | string[] | undefined }
}

interface IData{
  projects: IProject[]
}

const init=(year: string, number: string)=>(unstable_cache( async (year: string, number: string)=>{
          const data: IData|null|string= await fetchData(`
          query NewsAllQuery {
            projects(
              where: {year: ${year}, number: ${number}}
            ){
              name
              nomination
              number
              diploma
              year
              winner
              images
            }
          }`)

          if (typeof data==="string" || !data){
            return data
          }

          return data.projects[0]||undefined
        },
        ["project"], {tags: [`project-${year}-${number}`]})
)
const ProjectModal = async ({projects, searchParams}:Props) => {
  const {project, projectYear}= searchParams

  if (typeof project!=="string" || typeof projectYear!=="string")
    return <div/>

  const getProject= init(projectYear, project)

  const projectItem= projects.find(item=> String(item.year)===projectYear && String(item.number)===project) ?? await getProject(projectYear, project)

  if (projectItem===undefined) return <div><span>проект не найден
  </span></div>

  if (typeof projectItem ==="string" ||projectItem===null) {
    revalidateTag(`project-${projectYear}-${project}`)
    return <div>произошла ошибка{projectItem &&`: ${projectItem}`}, перезагрузите страницу</div>
  }


  const diploma=diplomas[projectItem.diploma]

  return (
      <div className="project-modal">
        <SmoothScrolling>
          <ProjectImagesSlider project={projectItem}/>
          <div className="project-modal__content">
            <h2 className="project-modal__title">{nonBreakingSpaces(projectItem.name)}</h2>
            <div className="project-modal__subtitle">
              <span className="project-modal__year">{projectItem.year}</span>
              <span style={{color: diploma.color}}>{diploma.text}</span>
            </div>

            <div className="project-modal__row">
              <p>{nonBreakingSpaces(projectItem.winner)}</p>
              <p className="project-modal__nomination">{projectItem.nomination&& nonBreakingSpaces(projectItem.nomination)}</p>
            </div>
          </div>
        </SmoothScrolling>
      </div>
  );
};

export default ProjectModal;
