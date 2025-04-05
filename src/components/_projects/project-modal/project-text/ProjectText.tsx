import React from 'react';
import "./project-text.scss"
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";
import {IProject} from "@/types/data";
import {diplomas} from "@/variables";

interface Props{
  project: IProject
}

const ProjectText = ({project}:Props) => {

  const diploma =diplomas[project.diploma]

  return (
      <div className="project-text">
        <h2 className="project-text__title">
          {nonBreakingSpaces(project.name)}
        </h2>

        <div className="project-text__subtitle">
                <span className="project-text__year">
                  {project.year}
                </span>
          <span style={{color: diploma.color}}>
                  {diploma.text}
                </span>
        </div>

        <div className="project-text__row">
          <p>{nonBreakingSpaces(project.winner)}</p>
          {project.nomination && (
              <p className="project-text__nomination">
                {nonBreakingSpaces(project.nomination)}
              </p>
          )}
        </div>
      </div>
  );
};

export default ProjectText;
