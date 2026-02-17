'use client'
import React from 'react';
import "./main-screen-project.scss"
import {IWithChildren, IWithClass} from "@/types/tehnic";
import {IImageSize, IMediaSizes, IProject} from "@/types/data";
import {buildLink} from "@/utils/buildLink";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";
import Link from "next/link";
import {usePathname, useSearchParams} from "next/navigation";
import cn from "classnames";
import Image from '@/components/Image';

interface Props extends IWithClass, IWithChildren{
  project: IProject
  isShowGrid?: boolean
  size?: IImageSize;
  mediaSizes?: IMediaSizes;
}

const MainScreenProject = ({
  className, 
  project, 
  isShowGrid, 
  children,
  size="small",
  mediaSizes
}:Props) => {
  const searchParams= useSearchParams()
  const pathname= usePathname()
  return (
      <Link
          href={buildLink(pathname, searchParams, {project: String(project.number), projectYear: String(project.year)})}
          scroll={false}
          className={cn("main-screen-project", {"main-screen-project--grid": isShowGrid}, className)}
      >
        {children}
        <Image 
          image={project.cover} 
          className="main-screen-project__img" 
          size={size} 
          mediaSizes={{
            bigDesktop: "xl",
            desktop: "large",
            laptop: "large",
            tablet: "medium",
            ...mediaSizes
          }}
        />
        <div className="main-screen-project__signature-wrapp">
          <strong className="main-screen-project__signature">{project.signature && nonBreakingSpaces(project.signature)}</strong>
        </div>
      </Link>
  );
};

export default MainScreenProject;
