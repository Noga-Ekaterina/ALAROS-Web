import React from 'react';
import "./projects-list.scss"
import Project from "@/components/_projects/project/Project";
import {IProject} from "@/types/data";

interface Props{
  projects: IProject[]
}

const ProjectsList = ({projects}:Props) => {
  return (
      <div className="projects-list">
        {
          projects.length==0?
              <p>ничего не найдено</p>
              :
              <>
                {
                  projects.map(project=>(
                      <Project project={project} key={`${project.year}-${project.number}`}/>
                  ))
                }
              </>
        }
      </div>
  );
};

export default ProjectsList