'use client'
import React from 'react';
import "./festival-projects.scss"
import {Swiper, SwiperSlide} from "swiper/react";
import Project from "@/components/_projects/project/Project";
import BigSlider from "../../big-slider/BigSlider";
import pagesData from "@/store/pagesData";
import HtmlProcessing from "../../HtmlProcessing";
import {useMediaQuery} from "react-responsive";
import {IFestival} from "@/types/data";

interface Props{
  festivalText: IFestival
}

const FestivalProjects = ({festivalText}:Props) => {
  const mobileScreen = useMediaQuery({maxWidth: 660});

  if (!festivalText) return <div/>

  return (
      <div className="festival-projects">
        <div className="container">
          <div className="titles-block">
            <h2 className="titles-block__title titles-block__title--small">{festivalText.projectsTitle}</h2>
            <div className="titles-block__section">
              <HtmlProcessing html={festivalText.projectsRightSignature.html}/>
            </div>
          </div>

          <BigSlider slidesPerView={mobileScreen? 2:4}>
            {
              festivalText.projects.map(project=>(
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
