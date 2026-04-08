'use client'
import React from 'react';
import {IWithChildren, IWithClass} from "@/types/tehnic";
import {IImageSize, IMainScreenImage, IMediaSizes, IProject} from "@/types/data";
import {buildLink} from "@/utils/buildLink";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";
import Link from "next/link";
import {usePathname, useSearchParams} from "next/navigation";
import cn from "classnames";
import Image from '@/components/Image';

interface Props extends IWithClass, IWithChildren{
  item: IProject | IMainScreenImage
  isShowGrid?: boolean
  size?: IImageSize;
  mediaSizes?: IMediaSizes;
}

const isProject = (item: IProject | IMainScreenImage): item is IProject => {
  return "number" in item && "year" in item && "cover" in item;
}

const MainScreenImageLink = ({
  className,
  item,
  isShowGrid,
  children,
  size="small",
  mediaSizes
}:Props) => {
  const searchParams= useSearchParams()
  const pathname= usePathname()
  const href = isProject(item)
    ? buildLink(pathname, searchParams, {project: String(item.number), projectYear: String(item.year)})
    : item.link
  const image = isProject(item) ? item.cover : item.image

  return (
      <Link
          href={href}
          scroll={false}
          target={isProject(item) ? "_self" : "_blank"}
          className={cn("main-screen-image-link", {"main-screen-image-link--grid": isShowGrid}, className)}
      >
        {children}
        <Image
          image={image}
          className="main-screen-image-link__img"
          size={size}
          mediaSizes={{
            bigDesktop: "xl",
            desktop: "large",
            laptop: "large",
            tablet: "medium",
            ...mediaSizes
          }}
        />
        <div className="main-screen-image-link__signature-wrapp">
          <strong className="main-screen-image-link__signature">{item.signature && nonBreakingSpaces(item.signature)}</strong>
        </div>
      </Link>
  );
};

export default MainScreenImageLink;
