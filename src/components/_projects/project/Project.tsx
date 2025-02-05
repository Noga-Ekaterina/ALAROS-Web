'use client'
import React from 'react';
import "./project.scss"
import {IProject} from "../../../types/data";
import Link from 'next/link';
import {diplomas} from "../../../variables";
import {usePathname, useSearchParams} from "next/navigation";
import {buildLink} from "@/utils/buildLink";

interface Props{
  project: IProject
}

const Project = ({project}: Props) => {
  const pathname= usePathname()
  const searchParams= useSearchParams()
  const {text, color}=diplomas[project.diploma]
  return (
      <Link
          href={buildLink(pathname, searchParams, {project: String(project.number), projectYear: String(project.year)})}
          className="project"
          scroll={false}
      >
        <p style={{color}}>{text}</p>

        <div className="project__img">
          <img src={`/Assets/Projects/${project.year}/Project_${project.number}/cover.jpg`} alt=""/>

          <p className="project__year">{project.year}</p>

          <div className="project__info">
            <p className="project__winner">{project.winner}</p>
            <p>{project.name}</p>
          </div>
        </div>
        <p className="project__nomination">{project.nomination && project.nomination}</p>
      </Link>
  );
};

export default Project;
