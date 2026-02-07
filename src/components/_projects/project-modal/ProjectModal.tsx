import React from 'react';
import "./project-modal.scss"
import {IProject} from "@/types/data";
import {revalidateTag, unstable_cache} from "next/cache";
import ProjectModalClient from "@/components/_projects/project-modal/ProjectModalClient";
import {fetchColection} from "@/utils/strapFetch";

interface Props {
  projects: IProject[]
  searchParams: { [key: string]: string | string[] | undefined }
}

const init = (year: string, number: string) => unstable_cache(
    async () => {
      const data = await fetchColection<IProject>({
        name: "projects",
        filters:{
          number,
          year
        }
      })

      if (typeof data === "string" || !data) return data
      return data.data[0] || undefined
    },
    [`project-${year}-${number}`],
    {tags: [`project-${year}-${number}`]}
)

const ProjectModal = async ({projects, searchParams}: Props) => {
  const {project, projectYear} = searchParams
  const isInvalidParams = typeof project !== "string" || typeof projectYear !== "string" || isNaN(Number(project)) || isNaN(Number(projectYear))

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