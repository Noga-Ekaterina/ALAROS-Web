'use client'
import React from 'react';
import "./festival-projects.scss"
import {Swiper, SwiperSlide} from "swiper/react";
import Project from "@/components/_projects/project/Project";
import BigSlider from "../../big-slider/BigSlider";
import HtmlProcessing from "../../HtmlProcessing";
import {useMediaQuery} from "react-responsive";
import {IFestival} from "@/types/data";
import {nonBreakingSpaces} from "@/utils/nonBreakingSpaces";

interface Props{
  pageData: IFestival
}

const FestivalProjects = ({pageData}:Props) => {
  const mobileScreen = useMediaQuery({maxWidth: 660});

  if (!pageData) return <div/>

  return (
      <div className="festival-projects" id="projects">
        <div className="container">
          <div className="titles-block">
            <h2 className="titles-block__title titles-block__title--small">{nonBreakingSpaces(pageData.projectsTitle)}</h2>
            <div className="titles-block__section">
              <HtmlProcessing html={pageData.projectsRightSignature.html}/>
            </div>
          </div>

          <BigSlider slidesPerView={mobileScreen? 2:4}>
            {
              pageData.projects.map(project=>(
                  <SwiperSlide key={`${project.year} ${project.number}`} className="festival-projects__slide">
                    <Project project={project}/>
                  </SwiperSlide>
              ))
            }
          </BigSlider>
        </div>
      </div>
  );
};

export default FestivalProjects;
