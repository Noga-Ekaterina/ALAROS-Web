'use client'
import React from 'react';
import "./project.scss"
import {IProject} from "../../../types/data";
import Link from 'next/link';
import {diplomas} from "../../../variables";
import {usePathname, useSearchParams} from "next/navigation";
import {buildLink} from "@/utils/buildLink";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";
import SmoothScrolling from "@/app/SmoothScrolling";
import Image from "@/components/Image";

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
        <p style={{color}} className="project__diploma">{text}</p>

        <div className="project__img">
          <Image image={project.cover} size="small" mediaSizes={{tablet:'xs'}}/>

          <p className="project__year">{project.year}</p>

          <div className="project__info">
            <SmoothScrolling enableScrollTransfer>
              <p className="project__winner">{nonBreakingSpaces(project.winner)}</p>
              <p>{nonBreakingSpaces(project.name)}</p>
            </SmoothScrolling>
          </div>
        </div>
        <p className="project__nomination">{project.nomination && nonBreakingSpaces(project.nomination.textInProjects)}</p>
      </Link>
  );
};

export default Project;
