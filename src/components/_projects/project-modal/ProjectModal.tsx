import React from 'react';
import "./project-modal.scss"
import {IProject} from "@/types/data";
import {unstable_cache} from "next/cache";
import {fetchData, getProjectsQueryStr} from "@/utils/fetchData";
import ProjectImagesSlider from "@/components/_projects/project-images-slider/ProjectImagesSlider";
import {diplomas} from "@/variables";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";

interface Props{
  projects: IProject[]
  searchParams: { [key: string]: string | string[] | undefined }
}

interface IData{
  projects: IProject[]
}

const init=unstable_cache( async (year: string, number: string)=>{
      const data: IData|null= await fetchData(`
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

      if (!data) return null

      return data.projects[0]
    },
    ["project"], {tags: ["projects"]})

const ProjectModal = async ({projects, searchParams}:Props) => {
  const {project, projectYear}= searchParams

  if (typeof project!=="string" || typeof projectYear!=="string")
    return <div/>


  const projectItem= projects.find(item=> String(item.year)===projectYear && String(item.number)===project) ?? await init(projectYear, project)

  if (!projectItem) return <div><span>проект не найден
  </span></div>

  const diploma=diplomas[projectItem.diploma]

  return (
      <div className="project-modal">
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
      </div>
  );
};

export default ProjectModal;
