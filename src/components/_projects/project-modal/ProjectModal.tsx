import React from 'react';
import "./project-modal.scss"
import {IProject} from "@/types/data";
import {revalidateTag, unstable_cache} from "next/cache";
import {fetchData} from "@/utils/fetchData";
import ProjectImagesSlider from "@/components/_projects/project-modal/project-images-slider/ProjectImagesSlider";
import {diplomas} from "@/variables";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";
import SmoothScrolling from "@/app/SmoothScrolling";
import AnimationPage from "@/app/AnimationPage";
import ProjectModalClient from "@/components/_projects/project-modal/ProjectModalClient";

interface Props {
  projects: IProject[]
  searchParams: { [key: string]: string | string[] | undefined }
}

interface IData {
  projects: IProject[]
}

const init = (year: string, number: string) => unstable_cache(
    async () => {
      const data = await fetchData<IData>(`
      query ProjectQuery {
        projects(where: {year: ${year}, number: ${number}}) {
          name
          nomination
          number
          diploma
          year
          winner
          images
        }
      }`
      )

      if (typeof data === "string" || !data) return data
      return data.projects[0] || undefined
    },
    [`project-${year}-${number}`],
    {tags: [`project-${year}-${number}`]}
)

const ProjectModal = async ({projects, searchParams}: Props) => {
  const {project, projectYear} = searchParams
  const isInvalidParams = typeof project !== "string" || typeof projectYear !== "string"

  let projectItem: IProject | string | null | undefined
  if (!isInvalidParams) {
    const getProject = init(projectYear, project)
    projectItem = projects.find(item =>
        String(item.year) === projectYear &&
        String(item.number) === project
    ) ?? await getProject()
  }

  if (!isInvalidParams && (typeof projectItem === "string" || projectItem === null)) {
    revalidateTag(`project-${projectYear}-${project}`)
  }


  return <ProjectModalClient key={`${projectYear}-${project}`} isInvalidParams={isInvalidParams} project={projectItem} startIsOpened={!!(project && projectYear)}/>
}

export default ProjectModal