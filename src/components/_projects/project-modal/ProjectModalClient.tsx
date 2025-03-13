// components/ProjectModalClient.tsx
'use client'

import React, {useRef} from 'react'
import { IProject } from "@/types/data"
import ProjectImagesSlider from "@/components/_projects/project-images-slider/ProjectImagesSlider"
import { diplomas } from "@/variables"
import { nonBreakingSpaces } from "@/utils/nonBreakingSpaces"
import SmoothScrolling from "@/app/SmoothScrolling"
import "./project-modal.scss"

interface ClientProps {
  projectItem: IProject | null
}

const ProjectModalClient = ({ projectItem }: ClientProps) => {
  if (!projectItem) return <div>Проект не найден</div>

  const diploma = diplomas[projectItem.diploma]

  return (
      <div className="project-modal">
            <SmoothScrolling >
              <ProjectImagesSlider project={projectItem} />
              <div className="project-modal__content">
                <h2 className="project-modal__title">{nonBreakingSpaces(projectItem.name)}</h2>
                <div className="project-modal__subtitle">
                  <span className="project-modal__year">{projectItem.year}</span>
                  <span style={{ color: diploma.color }}>{diploma.text}</span>
                </div>
                <div className="project-modal__row">
                  <p>{nonBreakingSpaces(projectItem.winner)}</p>
                  <p className="project-modal__nomination">
                    {projectItem.nomination && nonBreakingSpaces(projectItem.nomination)}
                  </p>
                </div>
              </div>
            </SmoothScrolling>
      </div>
  )
}

export default ProjectModalClient