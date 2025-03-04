'use client'
import React from 'react';
import "./main-screen-project.scss"
import {IWithChildren, IWithClass} from "@/types/tehnic";
import {IProject} from "@/types/data";
import {buildLink} from "@/utils/buildLink";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";
import Link from "next/link";
import {usePathname, useSearchParams} from "next/navigation";
import cn from "classnames";

interface Props extends IWithClass, IWithChildren{
  project: IProject
}

const MainScreenProject = ({className, project, children}:Props) => {
  const searchParams= useSearchParams()
  const pathname= usePathname()
  return (
      <Link
          href={buildLink(pathname, searchParams, {project: String(project.number), projectYear: String(project.year)})}
          scroll={false}
          className={cn("main-screen-project", className)}
      >
        {children}
        <img src={`/Assets/Projects/${project.year}/Project_${project.number}/${project.cover}`} alt="" className="main-screen-project__img"/>
        <div className="main-screen-project__signature-wrapp">
          <strong className="main-screen-project__signature">{project.signature && nonBreakingSpaces(project.signature)}</strong>
        </div>
      </Link>
  );
};

export default MainScreenProject;
